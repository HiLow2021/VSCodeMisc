from PIL import Image
from generator import generate

width = 32
height = 32
threshold = 200

image = Image.open("img/img.png")
image.convert("L").point(lambda x: 0 if x <= threshold else 255).show()

rows, cols = generate(image, width, height, threshold)

print({"rows": rows, "cols": cols})
