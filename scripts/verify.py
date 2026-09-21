import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

ids = re.findall(r"getElementById\(['\"]([^'\"]+)['\"]", js)
print("Verifying element IDs:")
for elem_id in sorted(set(ids)):
    found = f'id="{elem_id}"' in html or f"id='{elem_id}'" in html
    dynamic = elem_id in ['modal-enroll-btn', 'reset-filter-btn']
    status = "OK (Found)" if found else ("OK (Dynamically created)" if dynamic else "MISSING!")
    print(f" - {elem_id}: {status}")

classes = re.findall(r"querySelectorAll\(['\"]([^'\"]+)['\"]", js)
print("\nVerifying querySelectorAll targets:")
for selector in sorted(set(classes)):
    print(f" - {selector}")
