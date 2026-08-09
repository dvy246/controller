import os
import re

replacements = {
    # 1. Claims
    r'Predictive wear reference': 'Personal measurement history',
    r'predictive wear': 'personal measurement history',
    r'True Hz': 'Observed Hz',
    r'true hardware polling rate': 'browser-observed update timing',
    r'true hardware polling': 'browser-observed update timing',
    r'firmware save': 'compatible-device WebHID calibration',
    
    # 2. Tool counts
    r'21 Free Gamepad Diagnostic Tools': '39 Core Gamepad Diagnostic Tools',
    r'29 diagnostic tools': '39 core diagnostic tools',
    r'29 tools\.': '39 core diagnostic tools.',
    r'21 Diagnostic Tools': '39 Core Diagnostic Tools',
}

files_to_check = [
    'src/components/tools/controller/DriftTimeline.astro',
    'src/components/global/Header.astro',
    'src/layouts/ToolLayout.astro',
    'src/pages/index.astro',
    'src/pages/test/controller/index.astro',
]

# Add overclock-validator and tools/index.astro across all locales
for root, dirs, files in os.walk('src/pages'):
    for file in files:
        if file.endswith('.astro'):
            if 'overclock-validator' in root or file == 'index.astro':
                path = os.path.join(root, file)
                if path not in files_to_check:
                    files_to_check.append(path)

updated = 0
for filepath in files_to_check:
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original = content
    for old, new in replacements.items():
        content = re.sub(old, new, content, flags=re.IGNORECASE)
        
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"UPDATED: {filepath}")
        updated += 1

print(f"Total files updated for claims/counts: {updated}")
