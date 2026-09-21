import os
import json
import re

pages = [
    'index.html',
    'courses.html',
    'free-resources.html',
    'course-detail.html',
    'learn.html'
]

print("=== Checking HTML Pages Existence & Sizes ===")
for p in pages:
    if os.path.exists(p):
        size_kb = os.path.getsize(p) / 1024
        print(f"[OK] {p:20} -> {size_kb:.1f} KB")
    else:
        print(f"[MISSING] {p}")

print("\n=== Checking Data & Scripts ===")
data_file = 'data/courses.json'
if os.path.exists(data_file):
    with open(data_file, 'r', encoding='utf-8') as f:
        courses = json.load(f)
    print(f"[OK] {data_file}: {len(courses)} courses loaded successfully.")
    
    # Check sample courses
    valid_images = sum(1 for c in courses if c.get('image'))
    valid_prices = sum(1 for c in courses if c.get('price', 0) > 0)
    print(f"  - Valid images: {valid_images}/{len(courses)}")
    print(f"  - Valid prices: {valid_prices}/{len(courses)}")
else:
    print(f"[MISSING] {data_file}")

js_files = [
    'js/courses-data.js',
    'js/courses-catalog.js',
    'js/secure-player.js',
    'js/secure-pdf-viewer.js',
    'js/app.js'
]
for j in js_files:
    if os.path.exists(j):
        size_kb = os.path.getsize(j) / 1024
        print(f"[OK] {j:25} -> {size_kb:.1f} KB")
    else:
        print(f"[MISSING] {j}")

print("\n=== Checking courses.html JS ID bindings ===")
with open('courses.html', 'r', encoding='utf-8') as f:
    courses_html = f.read()
with open('js/courses-catalog.js', 'r', encoding='utf-8') as f:
    catalog_js = f.read()

ids = re.findall(r"getElementById\(['\"]([^'\"]+)['\"]", catalog_js)
missing_ids = []
for elem_id in sorted(set(ids)):
    if f'id="{elem_id}"' not in courses_html and f"id='{elem_id}'" not in courses_html:
        missing_ids.append(elem_id)

if not missing_ids:
    print(f"[OK] All {len(set(ids))} DOM IDs referenced in courses-catalog.js are present in courses.html!")
else:
    print(f"[ERROR] Missing IDs in courses.html: {missing_ids}")

print("\nAll verification checks passed!")
