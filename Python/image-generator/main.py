import json
from PIL import Image
from generator import generate

input_dir = "./img/"
output_dir = "./out/"

width = 32
height = 32
threshold = 200

image = Image.open(f"{input_dir}img.png")
image.convert("L").point(lambda x: 0 if x <= threshold else 255).show()

rows, cols, answer = generate(image, width, height, threshold)

data = {"rows": rows, "cols": cols, "answer": answer}

with open(f"{output_dir}result.json", "w") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)
