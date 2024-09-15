import time
from matplotlib import pyplot as plt
import requests
import base64
from io import BytesIO
from PIL import Image
 
img_path = "Crater and boulder detection.v2i.yolov9/images/test/ch2_ohr_ncp_20210401T2200364910_b_brw_d18_slice_0_8_jpg.rf.9fb81460cd3578232cea168e68559949.jpg"
 
start_x = int(input("Enter start X coordinate: "))
start_y = int(input("Enter start Y coordinate: "))
start = (start_x, start_y)

goal_x = int(input("Enter goal X coordinate: "))
goal_y = int(input("Enter goal Y coordinate: "))
goal = (goal_x, goal_y)
 
def process_image():
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
 
        # Check if the response is successful
        if response.status_code == 200:
            result_data = response.content
            result_img = Image.open(BytesIO(result_data))
            plt.imshow(result_img)
            plt.axis('off')  # Hide axes
            plt.show()
            print("Result displayed")
        else:
            print(f"Error: {response.status_code}, {response.text}")
 
    except Exception as e:
        print(f"Error: {e}")
    print(time.time()-t_)
process_image()