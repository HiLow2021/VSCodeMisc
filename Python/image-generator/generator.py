import numpy as np


def length(arr, target=1):
    suc_flg = False
    suc_num = 0
    ret = []
    for pix in arr:
        if pix == target:
            suc_num += 1
            if not suc_flg:
                suc_flg = True
        else:
            if suc_flg:
                ret.append(suc_num)
                suc_num = 0
                suc_flg = False
    if suc_flg:
        ret.append(suc_num)
    return ret


def generate(img, game_w, game_h, threshold):
    img = img.resize((game_w, game_h))
    img_bw = img.convert("L").point(
        lambda x: 1 if x <= threshold else 0
    )  # Black/White image
    img_arr = np.array(img_bw)  # Convert image to a numpy array

    # count row and column lines
    rows = [length(x) for x in img_arr]
    cols = [length(x) for x in img_arr.T]

    return (rows, cols, img_arr.tolist())
