import os
from utils import split_image


image_dir = "./media/"
output_dir = "./out/"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

n = 4
for i, split_image in enumerate(split_image(f"{image_dir}image.jpg", n)):
    split_image.save(f"{output_dir}split_{i}.jpg")
