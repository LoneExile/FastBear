from PIL import Image, ImageDraw, ImageFont

# pip install Pillow

width = 512
height = 512
font = ImageFont.truetype(r"./JetBrainsMono-Regular.ttf", size=140)

for i in range(0, 101):
    if i != 0:
        img = Image.open("../../assets/bare-present.png")
        imgDraw = ImageDraw.Draw(img)
        message = str(i)
        textWidth, textHeight = imgDraw.textsize(message, font=font)
        xText = 300
        yText = (height - textHeight) / 4
        imgDraw.text((xText, yText), message, font=font, fill=(0, 0, 0))
        img.save("../../assets/numberPic/{}.png".format(i))
