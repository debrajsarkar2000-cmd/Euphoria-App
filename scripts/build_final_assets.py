import os
from PIL import Image

def build_assets():
    src_path = '362dbbfa-69f2-4d94-b061-c1689f0894c2.png'
    out_dir = os.path.join('assets', 'images')
    os.makedirs(out_dir, exist_ok=True)
    
    im = Image.open(src_path)
    print(f"Processing source image ({im.size[0]}x{im.size[1]})...")

    # 1. Logos
    # Logo Navbar
    im.crop((195, 2, 300, 48)).save(os.path.join(out_dir, 'logo-navbar.png'))
    # Logo Footer
    im.crop((122, 1395, 226, 1455)).save(os.path.join(out_dir, 'logo-footer.png'))
    # Logo Apron (high res)
    im.crop((680, 205, 825, 290)).save(os.path.join(out_dir, 'logo-apron.png'))

    # 2. Hero instructor with cakes and background
    im.crop((480, 40, 935, 320)).save(os.path.join(out_dir, 'hero-instructor.png'))
    
    # 3. Find Courses by Price cards food elements
    im.crop((256, 435, 336, 540)).save(os.path.join(out_dir, 'price-cookies-1.png'))
    im.crop((530, 428, 630, 540)).save(os.path.join(out_dir, 'price-cake.png'))
    im.crop((842, 435, 960, 540)).save(os.path.join(out_dir, 'price-cookies-2.png'))

    # 4. Best Selling Courses thumbnails (clean images)
    im.crop((130, 585, 275, 663)).save(os.path.join(out_dir, 'course-chocolate.png'))
    im.crop((282, 585, 427, 663)).save(os.path.join(out_dir, 'course-cookies.png'))
    im.crop((435, 585, 580, 663)).save(os.path.join(out_dir, 'course-brownies.png'))
    im.crop((588, 585, 733, 663)).save(os.path.join(out_dir, 'course-cupcakes.png'))
    im.crop((741, 585, 886, 663)).save(os.path.join(out_dir, 'course-halwai.png'))

    # 5. Why Learn With Euphoria note with whisk
    im.crop((715, 765, 960, 915)).save(os.path.join(out_dir, 'why-learn-note.png'))

    # 6. Testimonials
    # Avatars
    im.crop((135, 995, 202, 1065)).save(os.path.join(out_dir, 'student-priya.png'))
    im.crop((380, 995, 448, 1065)).save(os.path.join(out_dir, 'student-sneha.png'))
    im.crop((638, 995, 706, 1065)).save(os.path.join(out_dir, 'student-ankita.png'))
    
    # Baked dishes
    im.crop((324, 1015, 372, 1075)).save(os.path.join(out_dir, 'bake-priya.png'))
    im.crop((568, 1015, 626, 1075)).save(os.path.join(out_dir, 'bake-sneha.png'))
    im.crop((835, 995, 888, 1075)).save(os.path.join(out_dir, 'bake-ankita.png'))

    # 7. Transformation story
    im.crop((95, 1130, 565, 1255)).save(os.path.join(out_dir, 'story-journey-composite.png'))
    im.crop((770, 1130, 990, 1258)).save(os.path.join(out_dir, 'story-note-plant.png'))

    # 8. CTA Banner elements
    im.crop((582, 1315, 642, 1405)).save(os.path.join(out_dir, 'cta-whisks.png'))
    im.crop((835, 1345, 895, 1405)).save(os.path.join(out_dir, 'cta-cookies.png'))

    print("All final assets built successfully!")

if __name__ == '__main__':
    build_assets()
