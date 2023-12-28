import os
from PIL import Image

image_dir = "./media/"
output_dir = "./out/"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

width = 600
height = 600

for filename in os.listdir(image_dir):
    if filename.lower().endswith((".png", ".jpg", ".jpeg", ".bmp")):
        input_image_path = os.path.join(image_dir, filename)
        image = Image.open(input_image_path)
        resized_image = image.resize((width, height))
        output_image_path = os.path.join(output_dir, f"resized_{filename}")

        resized_image.save(output_image_path, quality=100)
