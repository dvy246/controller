import re
import os

# SEO optimization data for each page
# Format: (file_path, new_title, new_description)
pages = [
    (
        "src/pages/test/controller/xbox.astro",
        'title="Xbox Controller Test Online - Free Gamepad Button & Stick Tester"',
        'description="Test your Xbox Series X, Xbox One, or Xbox 360 controller online for free. Check buttons, analog sticks, triggers, vibration, and stick drift with our browser-based Xbox gamepad tester."',
        'title="Xbox Controller Test - Driver & Input Check | Gamepad Tester"',
        'description="Free online Xbox controller tester. Diagnose Xbox Series X|S, Elite, and Xbox One controllers for input lag, stick drift, and faulty buttons instantly."',
    ),
    (
        "src/pages/test/controller/ps5.astro",
        'title="PS5 Controller Test - Free DualSense Gamepad Tester Online"',
        'description="Test your PS5 DualSense controller online for free. Check stick drift, buttons, adaptive triggers, touchpad, haptic feedback, and gyroscope with our browser-based PlayStation 5 controller tester."',
        'title="PS5 Controller Test - DualSense Stick Drift Check & Input Tool"',
        'description="Free PS5 DualSense tester — check stick drift, buttons, triggers, touchpad, haptics, and gyroscope directly in your browser. No download."',
    ),
    (
        "src/pages/test/controller/buttons.astro",
        'title="Controller Button Test - Free Online Gamepad Button Tester"',
        'description="Test every button on your PS5, Xbox, or Switch controller. Detect ghosting, double-press faults, and unresponsive buttons with our free online controller button tester."',
        'title="Controller Button Tester — Test Gamepad Buttons & Ghosting Online | ControllerTesting.com"',
        'description="Interactive face-button matrix and ghosting detector. Press every gamepad button and verify the browser receives the correct input — free, no download."',
    ),
    (
        "src/pages/test/controller/deadzone.astro",
        'title="Controller Deadzone Test - Free Online Stick Deadzone Visualizer"',
        'description="Visualize and measure your controller\'s inner and outer deadzone thresholds. Find the perfect deadzone settings for competitive FPS games on PS5, Xbox, and PC gamepads."',
        'title="Controller Deadzone Test — Find Optimal Game Deadzone Online | ControllerTesting.com"',
        'description="Inner & outer deadzone threshold tuning — visualize your analog stick\'s dead zone and find the perfect setting for competitive FPS games."',
    ),
    (
        "src/pages/test/controller/vibration.astro",
        'title="Controller Vibration Test - Free Online Rumble Motor Tester"',
        'description="Test your controller\'s vibration motors and haptic feedback online for free. Check if dual rumble motors work on your PS5, Xbox, or Switch controller."',
        'title="Controller Vibration Test — Test Gamepad Haptic Rumble Online | ControllerTesting.com"',
        'description="Dual haptic rumble motor pulse tester — test left and right vibration motors on PS5, Xbox, Switch Pro and any USB/Bluetooth gamepad. Free, no download."',
    ),
    (
        "src/pages/test/controller/polling-rate.astro",
        'title="Controller Polling Rate Test - Free Online Hz Input Frequency Checker"',
        'description="Measure your controller\'s real polling rate in Hz. Compare wired vs Bluetooth input frequency and latency on PS5, Xbox, Switch, and PC controllers."',
        'title="Controller Polling Rate Test — Measure Gamepad Hz & Latency Online | ControllerTesting.com"',
        'description="Real-time Hz input report frequency checker — measure your controller\'s polling rate and compare wired vs Bluetooth latency."',
    ),
    (
        "src/pages/test/controller/circularity.astro",
        'title="Controller Circularity Test - Free Stick Range of Motion Tester"',
        'description="Test your controller\'s analog stick circularity and 360-degree range of motion. Measure stick precision and detect irregular movement patterns on any gamepad."',
        'title="Controller Circularity Test — Measure Stick Range of Motion Online | ControllerTesting.com"',
        'description="360-degree stick range of motion & error — measure analog stick circularity and detect irregular movement patterns."',
    ),
    (
        "src/pages/test/controller/latency.astro",
        'title="Controller Latency Test - Free Online Input Delay & Reaction Timer"',
        'description="Measure your controller\'s input latency and reaction speed online. Compare wired vs wireless delay times on PS5, Xbox, Switch, and PC controllers."',
        'title="Controller Input Latency Test — Test Gamepad Reaction Speed Online | ControllerTesting.com"',
        'description="Input delay & reaction speed timer — measure your controller\'s end-to-end response latency in milliseconds."',
    ),
    (
        "src/pages/test/controller/gyroscope.astro",
        'title="Controller Gyroscope Test - Free Online Motion Sensor Tester"',
        'description="Test your controller\'s gyroscope and motion sensors online. Calibrate 3-axis motion sensing on PS5 DualSense, Switch Pro Controller, and Joy-Cons."',
        'title="Controller Gyroscope Test — Test Motion Controls & Calibration Online | ControllerTesting.com"',
        'description="3-axis motion sensor calibration — test gyroscope sensitivity and zero-point offset on PS5, Switch Pro, Joy-Con and other motion controllers."',
    ),
    (
        "src/pages/test/controller/dpad.astro",
        'title="D-Pad Test - Free Online 8-Way Controller D-Pad Tester"',
        'description="Test your controller\'s D-pad for diagonal precision and directional accuracy. Check all 8 directions on PS5, Xbox, Switch, and PC gamepads online for free."',
        'title="Controller D-Pad Test — Test Directional Pad & Diagonals Online | ControllerTesting.com"',
        'description="Directional pad diagonal precision — test all 8 D-pad directions and detect misinput on PS5, Xbox, Switch, and PC gamepads."',
    ),
    (
        "src/pages/test/controller/triggers.astro",
        'title="Controller Trigger Test - Free Analog L2/R2 Pressure Curve Tester"',
        'description="Measure your controller\'s analog trigger pressure and linearity. Test L2/R2 trigger range on PS5 DualSense, Xbox, and PC gamepads with our free online tester."',
        'title="Controller Trigger Test — Measure Analog L2/R2 Pressure Online | ControllerTesting.com"',
        'description="Analog L2/R2 pressure curve analyzer — measure trigger range, linearity, and response on PS5, Xbox, and PC controllers."',
    ),
]

for file_path, new_title, new_desc, old_title, old_desc in pages:
    full_path = os.path.join(os.getcwd(), file_path)
    if not os.path.exists(full_path):
        print(f"SKIP (not found): {file_path}")
        continue

    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Replace title
    if old_title in content:
        content = content.replace(old_title, new_title)
    else:
        print(f"WARNING: Could not find old title in {file_path}")

    # Replace description
    if old_desc in content:
        content = content.replace(old_desc, new_desc)
    else:
        print(f"WARNING: Could not find old description in {file_path}")

    if content != original:
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"UPDATED: {file_path}")
    else:
        print(f"NO CHANGE: {file_path}")
