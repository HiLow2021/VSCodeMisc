from PIL import Image


def split_image(image_path, n):
    with Image.open(image_path) as image:
        width, height = image.size
        for i in range(n):
            for j in range(n):
                left = j * width // n
                top = i * height // n
                right = (j + 1) * width // n
                bottom = (i + 1) * height // n
                yield image.crop((left, top, right, bottom))
