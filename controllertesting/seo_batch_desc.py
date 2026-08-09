import os

# Fix descriptions that weren't updated
# Format: (file_path, old_description, new_description)
pages = [
    (
        "src/pages/test/controller/ps5.astro",
        'description="Free online PS5 controller tester. Diagnose DualSense controllers for stick drift, polling rate, adaptive triggers, and deadzones instantly in your browser."',
        'description="Test your PS5 DualSense controller online for free. Check stick drift, buttons, adaptive triggers, touchpad, haptic feedback, and gyroscope with our browser-based PlayStation 5 controller tester."',
    ),
    (
        "src/pages/test/controller/buttons.astro",
        'description="Test every button on your PS5 DualSense, Xbox, or Switch controller. Real-time response visualizer, click counter, and multi-button ghosting detector."',
        'description="Test every button on your PS5, Xbox, or Switch controller. Detect ghosting, double-press faults, and unresponsive buttons with our free online controller button tester."',
    ),
    (
        "src/pages/test/controller/deadzone.astro",
        'description="Test and visualize inner and outer stick deadzones for Apex, COD, and Fortnite. Find the perfect deadzone setting to eliminate drift while keeping max responsiveness."',
        'description="Visualize and measure your controller\'s inner and outer deadzone thresholds. Find the perfect deadzone settings for competitive FPS games on PS5, Xbox, and PC gamepads."',
    ),
    (
        "src/pages/test/controller/vibration.astro",
        'description="Test heavy and light vibration motors on PS5 DualSense, Xbox, and Switch controllers. Free browser tool to pulse haptic rumble actuators."',
        'description="Test your controller\'s vibration motors and haptic feedback online for free. Check if dual rumble motors work on your PS5, Xbox, or Switch controller."',
    ),
    (
        "src/pages/test/controller/polling-rate.astro",
        'description="Test controller polling rate frequency in Hz and report interval in milliseconds. Test PS5 DualSense, Xbox, and Switch controller input latency online."',
        'description="Measure your controller\'s real polling rate in Hz. Compare wired vs Bluetooth input frequency and latency on PS5, Xbox, Switch, and PC controllers."',
    ),
    (
        "src/pages/test/controller/circularity.astro",
        'description="Test thumbstick circularity error and outer range of motion on PS5, Xbox, and Switch gamepads. Plot 360-degree outer boundaries in real time."',
        'description="Test your controller\'s analog stick circularity and 360-degree range of motion. Measure stick precision and detect irregular movement patterns on any gamepad."',
    ),
    (
        "src/pages/test/controller/latency.astro",
        'description="Test controller input latency and human visual reaction speed in milliseconds. Measure response delay on PS5, Xbox, and Switch controllers online."',
        'description="Measure your controller\'s input latency and reaction speed online. Compare wired vs wireless delay times on PS5, Xbox, Switch, and PC controllers."',
    ),
    (
        "src/pages/test/controller/gyroscope.astro",
        'description="Test 3-axis motion sensors (Pitch, Roll, Yaw) on PS5 DualSense, Switch Pro, and DualShock 4 controllers. Free online gyro aiming diagnostic tool."',
        'description="Test your controller\'s gyroscope and motion sensors online. Calibrate 3-axis motion sensing on PS5 DualSense, Switch Pro Controller, and Joy-Cons."',
    ),
    (
        "src/pages/test/controller/dpad.astro",
        'description="Test 8-way D-pad inputs and diagonal combinations on PS5, Xbox, and Switch controllers. Test fighting game combo precision online."',
        'description="Test your controller\'s D-pad for diagonal precision and directional accuracy. Check all 8 directions on PS5, Xbox, Switch, and PC gamepads online for free."',
    ),
    (
        "src/pages/test/controller/triggers.astro",
        'description="Test L2 and R2 analog trigger pressure, linearity, and full pull range on PS5 DualSense, Xbox, or Switch controllers. Free, online, no download required."',
        'description="Measure your controller\'s analog trigger pressure and linearity. Test L2/R2 trigger range on PS5 DualSense, Xbox, and PC gamepads with our free online tester."',
    ),
]

for file_path, old_desc, new_desc in pages:
    full_path = os.path.join(os.getcwd(), file_path)
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if old_desc in content:
        content = content.replace(old_desc, new_desc)
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"UPDATED: {file_path}")
    else:
        print(f"NOT FOUND: {file_path}")
