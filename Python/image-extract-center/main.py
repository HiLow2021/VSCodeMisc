import os
import cv2
from utils import extract_center

image_dir = "./media/"
output_dir = "./out/"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)


width = 800
height = 800

for filename in os.listdir(image_dir):
    if filename.lower().endswith((".png", ".jpg", ".jpeg", ".bmp")):
        input_image_path = os.path.join(image_dir, filename)
        cropped_image = extract_center(input_image_path, width, height)
        output_image_path = os.path.join(output_dir, f"cropped_{filename}")

        cv2.imwrite(output_image_path, cropped_image)
