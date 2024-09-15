from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import numpy as np
import heapq
from ultralytics import YOLO
import cv2
import io
import base64
from PIL import Image
import matplotlib.pyplot as plt
from gevent.pywsgi import WSGIServer


app = Flask(__name__)
CORS(app)  

# model = YOLO('yolov10l.yaml')
# model = YOLO("runs\\detect\\train33\\train33\\weights\\best.pt")
model = YOLO('best.pt')


class Node:
    def __init__(self, position, parent=None):
        self.position = position  
        self.parent = parent
        self.g = 0  
        self.h = 0  
        self.f = 0  

    def __lt__(self, other):
        return self.f < other.f

def heuristic(a, b):
    return np.linalg.norm(np.array(a) - np.array(b))

def line_of_sight(start, end, grid):
    """Check if there is a clear line of sight between two points."""
    x0, y0 = start
    x1, y1 = end
    dx = abs(x1 - x0)
    dy = abs(y1 - y0)
    sx = 1 if x0 < x1 else -1
    sy = 1 if y0 < y1 else -1

    if dx == 0 and dy == 0:  
        return grid[y0, x0] == 1

    if dx > dy:
        err = dx / 2.0
        while x0 != x1:
            if grid[y0][x0] == 0:
                return False
            err -= dy
            if err < 0:
                y0 += sy
                err += dx
            x0 += sx
    else:
        err = dy / 2.0
        while y0 != y1:
            if grid[y0][x0] == 0:
                return False
            err -= dx
            if err < 0:
                x0 += sx
                err += dy
            y0 += sy
    return True

def theta_star(start, goal, grid):
    open_list = []
    closed_set = set()

    start_node = Node(start)
    goal_node = Node(goal)
    
    heapq.heappush(open_list, start_node)

    while open_list:
        current_node = heapq.heappop(open_list)

        if current_node.position == goal:
            path = []
            while current_node:
                path.append(current_node.position)
                current_node = current_node.parent
            return path[::-1]  

        closed_set.add(current_node.position)

        for new_position in [(0, 1), (1, 0), (0, -1), (-1, 0), (1, 1), (1, -1), (-1, 1), (-1, -1)]:
            node_position = (current_node.position[0] + new_position[0], current_node.position[1] + new_position[1])

            if (0 <= node_position[0] < grid.shape[0] and
                0 <= node_position[1] < grid.shape[1] and
                grid[node_position[0]][node_position[1]] == 1 and
                node_position not in closed_set):

                neighbor_node = Node(node_position, current_node)
                
                if not line_of_sight(current_node.position, node_position, grid):
                    continue

                neighbor_node.g = current_node.g + heuristic(current_node.position, neighbor_node.position)
                neighbor_node.h = heuristic(neighbor_node.position, goal)
                neighbor_node.f = neighbor_node.g + neighbor_node.h

                if add_to_open(open_list, neighbor_node):
                    heapq.heappush(open_list, neighbor_node)

    return None 

def add_to_open(open_list, neighbor_node):
    """Check if the neighbor node should be added to the open list."""
    for node in open_list:
        if neighbor_node.position == node.position and neighbor_node.g >= node.g:
            return False
    return True

def process_image(img_data, start, goal):
    
    img_data = base64.b64decode(img_data)
    img = Image.open(io.BytesIO(img_data))
    img = np.array(img)

    
    results = model.predict(img, save=True, imgsz=640, conf=0.1, iou=0.5, save_txt=True, save_conf=True, save_dir='D:\\isro_hack\\predictions')
    results[0].show()
    binary_map = np.ones(img.shape[:2], dtype=np.uint8)  
    kernel = np.ones((17, 17), np.uint8)  
    
    
    for result in results:
        boxes = result.boxes.xyxy  
        for box in boxes:
            x1, y1, x2, y2 = map(int, box) 
            binary_map[y1:y2, x1:x2] = 0  
    dilated_map = cv2.erode(binary_map, kernel, iterations=1)
    
    path = theta_star(start, goal, dilated_map)


    if path is None:
        print("No path found with Theta*.")
        return None

    
    for p in path:
        img[p[1], p[0]] = [255,0,0]  
    plt.imshow(binary_map,cmap='gray')
    plt.show()
    return img

@app.route('/api', methods=['POST'])
def api():
    print("what is going on?")
    data = request.json
    start = tuple(data['start'])
    goal = tuple(data['goal'])
    img_data = data['image'] 
    print("image recieved")
    result_image = process_image(img_data, start, goal)

    if result_image is not None:
        
        img_pil = Image.fromarray((result_image * 255).astype(np.uint8))  
        img_io = io.BytesIO()
        img_pil.save(img_io, 'PNG')
        img_io.seek(0)
        return send_file(img_io, mimetype='image/png')

    return jsonify({"error": "No valid path found."}), 404

if __name__ == '__main__':
    http_server = WSGIServer(("127.0.0.1", 8000), app)
    # app.run(host='0.0.0.0', port=5000, threaded=True)
    http_server.serve_forever()