import time
import requests
import base64
import random
import glob
from PIL import Image, ImageDraw
import matplotlib.pyplot as plt
import numpy as np

def request_path_from_backend(img_path, start, goal):
    try:
        with open(img_path, "rb") as img_file:
            img_data = img_file.read()

        img_base64 = base64.b64encode(img_data).decode("utf-8")

        request_data = {
            "start": start,
            "goal": goal,
            "image": img_base64,
        }

        t_ = time.time()

        response = requests.post("http://localhost:8000/api", json=request_data)

        if response.status_code == 200:
            result_data = response.json()
            path = result_data.get("path", [])
            if path:
                print(f"Path found: {path}")
            else:
                print("No path found.")
        else:
            print(f"Error: {response.status_code}, {response.text}")
            path = None

    except Exception as e:
        print(f"Error: {e}")
        path = None

    print(f"Time taken: {time.time() - t_} seconds")
    return path

def draw_path_on_image(img_pil, path):
    draw = ImageDraw.Draw(img_pil)

    path_as_tuples = [(int(p[0]), int(p[1])) for p in path]

    draw.line(path_as_tuples, fill="red", width=3)
    return img_pil

paths = glob.glob('trail\\WhatsApp\\*.jpeg')
ind = random.randint(0, len(paths) - 1)
img_path = paths[ind]

start = (500, 500)
goal = (50, 50)

path = request_path_from_backend(img_path, start, goal)

if path:
    img_pil = Image.open(img_path).convert("RGB")
    img_with_path = draw_path_on_image(img_pil.copy(), path)

    plt.figure(figsize=(10, 5))
    
    plt.subplot(121)
    plt.imshow(img_pil)
    plt.title("Original Image")
    plt.axis('off')

    plt.subplot(122)
    plt.imshow(img_with_path)
    plt.title("Image with Path")
    plt.axis('off')

    plt.show()

else:
    print("No valid path received from the backend.")
