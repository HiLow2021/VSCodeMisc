import cv2


def extract_center(image_path, width, height):
    img = cv2.imread(image_path)
    center_x = img.shape[1] // 2
    center_y = img.shape[0] // 2
    x1 = center_x - width // 2
    x2 = center_x + width // 2
    y1 = center_y - height // 2
    y2 = center_y + height // 2
    cropped_img = img[y1:y2, x1:x2]

    return cropped_img
