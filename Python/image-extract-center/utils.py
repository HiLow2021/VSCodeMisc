import cv2


def extract_center(image_path):
    img = cv2.imread(image_path)
    width = img.shape[1]
    height = img.shape[0]
    center_x = width // 2
    center_y = height // 2
    range_x, range_h = (
        (height, height)
        if width > height
        else (width, width)
        if height > width
        else (width, height)
    )
    x1 = center_x - range_x // 2
    x2 = center_x + range_x // 2
    y1 = center_y - range_h // 2
    y2 = center_y + range_h // 2
    cropped_img = img[y1:y2, x1:x2]

    return cropped_img
