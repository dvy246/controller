import os
import re

def resolve_alias(import_path, file_path):
    file_dir = os.path.dirname(file_path)
    abs_import_path = os.path.normpath(os.path.join(file_dir, import_path))
    
    if 'src/components/' in abs_import_path:
        return abs_import_path.replace('src/components/', '@components/')
    elif 'src/layouts/' in abs_import_path:
        return abs_import_path.replace('src/layouts/', '@layouts/')
    elif 'src/lib/' in abs_import_path:
        return abs_import_path.replace('src/lib/', '@lib/')
    elif 'src/data/' in abs_import_path:
        return abs_import_path.replace('src/data/', '@data/')
    elif 'src/styles/' in abs_import_path:
        return abs_import_path.replace('src/styles/', '@styles/')
    elif 'src/' in abs_import_path:
        return abs_import_path.replace('src/', '@/')
    
    return import_path

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    pattern = r"from\s+['\"](\.\.?\/[^'\"]+)['\"]"
    
    def replacer(match):
        relative_path = match.group(1)
        new_path = resolve_alias(relative_path, file_path)
        return match.group(0).replace(relative_path, new_path)
    
    new_content = re.sub(pattern, replacer, content)
    
    # Also fix dynamic imports like import(...)
    pattern_dyn = r"import\(['\"](\.\.?\/[^'\"]+)['\"]\)"
    def replacer_dyn(match):
        relative_path = match.group(1)
        new_path = resolve_alias(relative_path, file_path)
        return match.group(0).replace(relative_path, new_path)
        
    new_content = re.sub(pattern_dyn, replacer_dyn, new_content)
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")

for root, dirs, files in os.walk('src/pages'):
    # skip es, de, fr, ja, pt, ko, ru, zh-tw, it directories as they will be overwritten
    dirs[:] = [d for d in dirs if d not in ['es', 'de', 'fr', 'ja', 'pt', 'ko', 'ru', 'zh-tw', 'it']]
    for file in files:
        if file.endswith(('.astro', '.ts', '.js', '.tsx', '.jsx')):
            process_file(os.path.join(root, file))
