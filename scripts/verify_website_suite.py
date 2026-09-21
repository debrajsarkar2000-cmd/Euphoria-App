import os
import json
import re

PAGES = [
    'index.html',
    'courses.html',
    'course-detail.html',
    'free-resources.html',
    'learn.html',
    'checkout.html',
    'dashboard.html',
    'about.html',
    'contact.html'
]

print("=== Checking HTML Pages Existence & Sizes ===")
all_ok = True
for page in PAGES:
    if os.path.exists(page):
        sz = os.path.getsize(page)
        print(f"[OK] {page:<20} -> {sz / 1024:.1f} KB")
    else:
        print(f"[FAIL] Missing page: {page}")
        all_ok = False

print("\n=== Checking Course Data ===")
with open('data/courses.json', encoding='utf-8') as f:
    courses = json.load(f)
print(f"[OK] data/courses.json loaded: {len(courses)} courses.")

print("\n=== Checking Key Navigation Links across Pages ===")
for page in PAGES:
    with open(page, encoding='utf-8') as f:
        content = f.read()
    # Check essential anchors
    links = re.findall(r'href=["\']([^"\'#:]+\.html(?:\?[^"\']*)?)["\']', content)
    unique_links = set(links)
    for l in unique_links:
        target_file = l.split('?')[0]
        if not os.path.exists(target_file):
            print(f"[WARN] In {page}: link '{l}' target '{target_file}' not found!")
            all_ok = False

print(f"\nVerification {'PASSED' if all_ok else 'FAILED'}!")
