import cv2

cap = cv2.VideoCapture(0)
cv2.namedWindow("Window", cv2.WINDOW_NORMAL)

while True:
    ret, frame = cap.read()
    cv2.imshow("Window", frame)
    key = cv2.waitKey(1)
    if key != -1:
        break

cap.release()
cv2.destroyAllWindows()
