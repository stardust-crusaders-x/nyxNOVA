from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import cv2
import io
import base64
from PIL import Image
import time
from ultralytics import YOLO as YOLO
from pathfinding1 import theta_star
from gevent.pywsgi import WSGIServer

app = Flask(__name__)
CORS(app)

model = YOLO('yolov10l.yaml')
model = YOLO("best.pt")

def process_image(img_data, start, goal):
    img_data = base64.b64decode(img_data)
    img = Image.open(io.BytesIO(img_data))
    img = np.array(img)

    results = model.predict(img, save=True, imgsz=640, conf=0.5, iou=0.5,
                            save_txt=True, save_conf=True, save_dir='nyxNOVA-be\\runs')

    binary_map = np.ones(img.shape[:2], dtype=np.uint8)

    for result in results:
        boxes = result.boxes.xyxy
        for box in boxes:
            x1, y1, x2, y2 = map(int, box)
            binary_map[y1:y2, x1:x2] = 0

    kernel_size = 17
    kernel = np.ones((kernel_size, kernel_size), np.uint8)
    dilated_map = cv2.erode(binary_map, kernel, iterations=1)

    dilated_map_np = np.array(dilated_map, dtype=np.int32)

    if dilated_map_np[start[1], start[0]] == 0:
        return None, "Invalid start coordinate: lies in an unsafe zone."
    if dilated_map_np[goal[1], goal[0]] == 0:
        return None, "Invalid goal coordinate: lies in an unsafe zone."

    path = theta_star(start, goal, dilated_map_np)

    return path, None

@app.route('/api', methods=['POST'])
def api():
    data = request.json
    start = tuple(data['start'])
    goal = tuple(data['goal'])
    img_data = data['image']

    path, error_message = process_image(img_data, start, goal)

    if error_message:
        return jsonify({"error": error_message}), 400

    if path is not None:
        return jsonify({"path": path})

    return jsonify({"error": "No valid path found."}), 404

if __name__ == '__main__':
    http_server = WSGIServer(("127.0.0.1", 8000), app)
    http_server.serve_forever()
