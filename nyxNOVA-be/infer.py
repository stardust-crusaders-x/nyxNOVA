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
ind = random.randint(0, len(paths) - 1)
img_path = paths[ind]

img = plt.imread(img_path)
results = model.predict(img, save=True, imgsz=640, conf=0.5, iou=0.5, save_txt=True, save_conf=True, save_dir='D:\\isro_hack\\predictions')
binary_map = [[1 for _ in range(img.shape[1])] for _ in range(img.shape[0])]

for result in results:
    boxes = result.boxes.xyxy
    for box in boxes:
        x1, y1, x2, y2 = map(int, box)
        for i in range(y1, y2):
            for j in range(x1, x2):
                binary_map[i][j] = 0

dilated_map = F.resize(torch.tensor(binary_map).unsqueeze(0).float(), size=(32, 32)).squeeze(0).numpy().astype(np.uint8)

def is_valid_point(point, dilated_map):
    return dilated_map[point[0], point[1]] == 1

while True:
    start_point = (random.randint(0, 31), random.randint(0, 31))
    if is_valid_point(start_point, dilated_map):
        break

while True:
    goal_point = (random.randint(0, 31), random.randint(0, 31))
    if is_valid_point(goal_point, dilated_map) and goal_point != start_point:
        break

start_map = torch.zeros((1, 32, 32), dtype=torch.float32)
start_map[0, start_point[0], start_point[1]] = 1.0

goal_map = torch.zeros((1, 32, 32), dtype=torch.float32)
goal_map[0, goal_point[0], goal_point[1]] = 1.0

dilated_map = torch.tensor(dilated_map).unsqueeze(0).float().to(device)

neural_astar = NeuralAstar(encoder_arch='CNN').to(device)
neural_astar.load_state_dict(load_from_ptl_checkpoint("D:\\isro_hack\\model\\mazes_032_moore_c8\\lightning_logs\\version_0\\checkpoints\\"))

neural_astar.eval()
na_outputs = neural_astar(dilated_map, start_map.to(device), goal_map.to(device), store_intermediate_results=True)

print(torch.unique(na_outputs[-1][-1]['paths']))
plt.imshow(na_outputs[-1][-1]['paths'][0].permute(1, 2, 0).cpu().detach().numpy(), cmap='gray')
plt.show()
