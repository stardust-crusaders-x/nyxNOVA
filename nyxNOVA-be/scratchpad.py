import matplotlib.pyplot as plt
import torch
from ultralytics import YOLO
import glob
import random
import torchvision.transforms.functional as F
import numpy as np
from neural_astar.planner import NeuralAstar
from neural_astar.utils.training import load_from_ptl_checkpoint

device = "cpu"
model = YOLO('yolov10l.yaml')
model = YOLO("best.pt")

paths = glob.glob('trail\\WhatsApp\\*.jpeg')
ind = random.randint(a=0, b=len(paths) - 1)
img_path = paths[ind]

# img_path = "mars.jpg"
img = plt.imread(img_path)
img = F.resize(torch.tensor(img).permute(2,0,1),(640,640)).permute(1,2,0).numpy()
img = np.ascontiguousarray(img)

results = model.predict(img, save=True, imgsz=640, conf=0.1, iou=0.5, save_txt=True, save_conf=True, save_dir='D:\\isro_hack\\predictions')
results[0].show()
binary_map = [[1 for _ in range(img.shape[1])] for _ in range(img.shape[0])]

for result in results:
    boxes = result.boxes.xyxy  
    for box in boxes:
        x1, y1, x2, y2 = map(int, box) 
        for i in range(y1, y2):
            for j in range(x1, x2):
                binary_map[i][j] = 0

dilated_map = F.resize(torch.tensor(binary_map,dtype=torch.uint8).unsqueeze(0).unsqueeze(0), size=(32, 32)).squeeze(0)

def is_valid_point(point, dilated_map):
    return dilated_map[0, point[0], point[1]] == 1

while True:
    start_point = (random.randint(0, 31), random.randint(0, 31))
    if is_valid_point(start_point, dilated_map):
        break

while True:
    goal_point = (random.randint(0, 31), random.randint(0, 31))
    if is_valid_point(goal_point, dilated_map) and goal_point != start_point:
        break

start_map = torch.zeros((1, 1, 32, 32), dtype=torch.float32)
start_map[0, 0, start_point[0], start_point[1]] = 1

goal_map = torch.zeros((1, 1, 32, 32), dtype=torch.float32)
goal_map[0, 0, goal_point[0], goal_point[1]] = 1

neural_astar = NeuralAstar(encoder_arch='CNN').to(device)
neural_astar.load_state_dict(load_from_ptl_checkpoint("C:\\Hackathons\\ISRO-NASA\\nyxNOVA\\nyxNOVA-be\\model"))

neural_astar.eval()
na_outputs = neural_astar(torch.tensor(dilated_map).unsqueeze(0).to(device), start_map.to(device), goal_map.to(device), store_intermediate_results=True)
na_outputs[-1][-1]['paths'][0] = (1 - na_outputs[-1][-1]['paths'][0])

path = F.resize(na_outputs[-1][-1]['paths'][0],(640,640))


plt.imshow(path.permute(1,2,0).cpu().detach().numpy(),cmap='gray')
plt.imshow(img,alpha=0.5)
plt.show()