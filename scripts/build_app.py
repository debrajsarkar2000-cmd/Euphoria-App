import os
import shutil

def build_app():
    dist_dir = 'www'
    if os.path.exists(dist_dir):
        shutil.rmtree(dist_dir)
    os.makedirs(dist_dir, exist_ok=True)
    
    print(f"Bundling web assets into '{dist_dir}'...")
    
    # Files to copy
    html_files = [
        'index.html',
        'courses.html',
        'free-resources.html',
        'course-detail.html',
        'learn.html',
        'manifest.json'
    ]
    for h in html_files:
        if os.path.exists(h):
            shutil.copy2(h, os.path.join(dist_dir, h))
            
    # Folders to copy
    folders = ['css', 'js', 'assets', 'data']
    for f in folders:
        if os.path.exists(f):
            dest = os.path.join(dist_dir, f)
            shutil.copytree(f, dest, dirs_exist_ok=True)
            
    print(f"Successfully built mobile distribution bundle in '{dist_dir}/'!")

if __name__ == '__main__':
    build_app()
