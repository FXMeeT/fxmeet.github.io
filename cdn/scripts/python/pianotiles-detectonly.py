import subprocess
import time
import mss
import numpy as np
import re

# =========================
# CONFIG
# =========================

X1, X2, X3, X4 = 811, 911, 1010, 1113
Y = 550
# =========================
# SCRCPY START
# =========================

def start_scrcpy():
    subprocess.Popen([
        "scrcpy",
        "--stay-awake",
        "--no-audio",
        "--max-fps=120",
        "--max-size=720",
        "--video-codec=h264",
        "--video-bit-rate=8M",
        "--render-driver=opengl"
    ])
    time.sleep(2.5)

# =========================
# WINDOW DETECT
# =========================

def get_window():
    out = subprocess.check_output(
        ["xdotool", "search", "--onlyvisible", "--name", "scrcpy", "getwindowgeometry"],
        text=True
    )

    pos = re.search(r"Position:\s*(\d+),(\d+)", out)
    geo = re.search(r"Geometry:\s*(\d+)x(\d+)", out)

    return (
        int(pos.group(1)),
        int(pos.group(2)),
        int(geo.group(1)),
        int(geo.group(2))
    )

# =========================
# MAIN LOOP
# =========================

def run():
    start_scrcpy()
    wx, wy, w, h = get_window()

    monitor = {
        "top": wy,
        "left": wx,
        "width": w,
        "height": h
    }

    with mss.MSS() as sct:
        while True:
            frame = np.array(sct.grab(monitor))
            row = frame[Y]

            detected = False

            # check all lanes
            if row[X1][2] == 0 and row[X1][1] == 0 and row[X1][0] == 0:
                print("[BLACK] lane 1")
                detected = True

            if row[X2][2] == 0 and row[X2][1] == 0 and row[X2][0] == 0:
                print("[BLACK] lane 2")
                detected = True

            if row[X3][2] == 0 and row[X3][1] == 0 and row[X3][0] == 0:
                print("[BLACK] lane 3")
                detected = True

            if row[X4][2] == 0 and row[X4][1] == 0 and row[X4][0] == 0:
                print("[BLACK] lane 4")
                detected = True

            # ONLY log when NOTHING detected
            if not detected:
                print("NO DETECTION")

run()
