import json

with open('data/courses.json', 'r', encoding='utf-8') as f:
    courses = json.load(f)

js_content = f"// Precompiled course catalog from live Euphoria WordPress store\nwindow.EUPHORIA_COURSES = {json.dumps(courses, ensure_ascii=False, indent=2)};\n"

with open('js/courses-data.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Generated js/courses-data.js with {len(courses)} courses!")
