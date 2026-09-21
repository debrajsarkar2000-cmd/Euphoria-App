import os
from PIL import Image

def extract():
    src_path = '362dbbfa-69f2-4d94-b061-c1689f0894c2.png'
    out_dir = os.path.join('assets', 'images')
    os.makedirs(out_dir, exist_ok=True)
    
    im = Image.open(src_path)
    w, h = im.size
    print(f"Source image size: {w}x{h}")
    
    # 1. Logo from Apron (highest clarity, on white fabric)
    apron_logo = im.crop((680, 205, 825, 290))
    apron_logo.save(os.path.join(out_dir, 'logo-apron.png'))
    
    # Navbar logo
    nav_logo = im.crop((195, 8, 295, 45))
    nav_logo.save(os.path.join(out_dir, 'logo-navbar.png'))

    # Footer logo
    footer_logo = im.crop((120, 1435, 225, 1495))
    footer_logo.save(os.path.join(out_dir, 'logo-footer.png'))
    
    # 2. Hero instructor with cakes and background
    hero_chef = im.crop((485, 45, 935, 318))
    hero_chef.save(os.path.join(out_dir, 'hero-instructor.png'))
    
    # Floating 70k badge on hero
    badge_70k = im.crop((535, 50, 650, 140))
    badge_70k.save(os.path.join(out_dir, 'hero-badge-70k.png'))
    
    # 3. Price Cards Visuals
    im.crop((255, 410, 360, 495)).save(os.path.join(out_dir, 'price-cookies-1.png'))
    im.crop((520, 405, 625, 500)).save(os.path.join(out_dir, 'price-cake.png'))
    im.crop((770, 410, 875, 495)).save(os.path.join(out_dir, 'price-cookies-2.png'))
    
    # 4. Best Selling Courses thumbnails
    im.crop((130, 595, 275, 668)).save(os.path.join(out_dir, 'course-chocolate.png'))
    im.crop((282, 595, 427, 668)).save(os.path.join(out_dir, 'course-cookies.png'))
    im.crop((435, 595, 580, 668)).save(os.path.join(out_dir, 'course-brownies.png'))
    im.crop((588, 595, 733, 668)).save(os.path.join(out_dir, 'course-cupcakes.png'))
    im.crop((740, 595, 885, 668)).save(os.path.join(out_dir, 'course-halwai.png'))
    
    # 5. Why Learn With Euphoria:
    im.crop((715, 775, 955, 885)).save(os.path.join(out_dir, 'why-learn-note.png'))
    
    # 6. Testimonials (What Our Students Say)
    im.crop((135, 1005, 195, 1065)).save(os.path.join(out_dir, 'student-priya.png'))
    im.crop((310, 1012, 368, 1065)).save(os.path.join(out_dir, 'bake-priya.png'))
    
    im.crop((380, 1005, 442, 1065)).save(os.path.join(out_dir, 'student-sneha.png'))
    im.crop((555, 1012, 618, 1065)).save(os.path.join(out_dir, 'bake-sneha.png'))
    
    im.crop((638, 1005, 700, 1065)).save(os.path.join(out_dir, 'student-ankita.png'))
    im.crop((833, 1012, 875, 1065)).save(os.path.join(out_dir, 'bake-ankita.png'))
    
    # 7. From Learner to Entrepreneur:
    im.crop((100, 1140, 235, 1245)).save(os.path.join(out_dir, 'story-step-1.png'))
    im.crop((280, 1140, 420, 1245)).save(os.path.join(out_dir, 'story-step-2.png'))
    im.crop((430, 1160, 555, 1248)).save(os.path.join(out_dir, 'story-step-3.png'))
    im.crop((775, 1135, 930, 1255)).save(os.path.join(out_dir, 'story-note-plant.png'))
    im.crop((900, 1160, 988, 1255)).save(os.path.join(out_dir, 'plant-succulent.png'))
    
    # 8. CTA Banner Cookies & Whisks:
    im.crop((830, 1355, 895, 1400)).save(os.path.join(out_dir, 'cta-cookies.png'))
    im.crop((585, 1330, 630, 1400)).save(os.path.join(out_dir, 'cta-whisk.png'))
    
    print(f"Extraction complete! Files written to {out_dir}")

if __name__ == '__main__':
    extract()
