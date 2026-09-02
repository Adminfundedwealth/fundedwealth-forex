from PIL import Image, ImageDraw

w, h = 1600, 1200
img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
d = ImageDraw.Draw(img)

for i in range(18, 0, -1):
    alpha = int(28 * (i / 18))
    r = int(120 + (i * 8))
    g = int(30 + (i * 10))
    b = int(90 + (i * 8))
    glow = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((260, 500, 1340, 1180), fill=(r, g, b, alpha))
    img = Image.alpha_composite(img, glow)

for shape in [
    (w // 2 - 70, 420, w // 2 + 70, 560),
    (w // 2 - 180, 560, w // 2 + 180, 950),
    (w // 2 - 110, 950, w // 2 - 40, 1180),
    (w // 2 + 40, 950, w // 2 + 110, 1180),
    (w // 2 - 230, 610, w // 2 - 120, 930),
    (w // 2 + 120, 610, w // 2 + 230, 930),
]:
    d.rounded_rectangle(shape, radius=35, fill=(25, 33, 44, 230))

inner = (w // 2 - 120, 620, w // 2 + 120, 930)
d.rounded_rectangle(inner, radius=30, fill=(7, 20, 30, 210))
d.rounded_rectangle((w // 2 - 80, 420, w // 2 + 80, 520), radius=25, fill=(8, 12, 18, 255))
d.ellipse((w // 2 - 60, 470, w // 2 + 60, 560), fill=(235, 212, 188, 255))

for x in [w // 2 - 130, w // 2 - 40, w // 2 + 40, w // 2 + 130]:
    d.rounded_rectangle((x, 640, x + 20, 860), radius=10, fill=(54, 71, 94, 200))

for x in [w // 2 - 160, w // 2 - 80, w // 2, w // 2 + 80, w // 2 + 160]:
    d.rounded_rectangle((x, 710, x + 30, 860), radius=10, fill=(6, 182, 212, 160))

platform = Image.new('RGBA', (w, h), (0, 0, 0, 0))
pd = ImageDraw.Draw(platform)
pd.rounded_rectangle((240, 980, 1360, 1170), radius=60, fill=(8, 18, 28, 200))
img = Image.alpha_composite(img, platform)

rim = Image.new('RGBA', (w, h), (0, 0, 0, 0))
rd = ImageDraw.Draw(rim)
rd.ellipse((320, 500, 1280, 1100), outline=(6, 182, 212, 80), width=5)
img = Image.alpha_composite(img, rim)

output_path = 'public/trader-foreground.png'
img.save(output_path)
print(f'created {output_path}')
