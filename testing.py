from PIL import Image
from pytesseract import pytesseract
import cv2
import enum 
import re

class ReceiptReader():
    def __init__(self, image):
        self.image = image
        Image.LOAD_TRUNCATED_IMAGES = True
        
    def reader(self):
        print("ha")
        self.image = cv2.imread(self.image, cv2.IMREAD_GRAYSCALE)
        img = Image.open("tmp_image.png")
        img = img.rotate(270)
        extracted_text = pytesseract.image_to_string(img, lang='eng')
        print(extracted_text)
        numbers = re.findall(r"\d+\.{1}\d+", extracted_text)
        total = float(numbers[-1])
        # print(extracted_text)
        print(numbers)
        print(extracted_text.strip().split("\n"))
        text_array = extracted_text.strip().split("\n")
        title = text_array[0]
        print(title)
        print(total)
        return title, total
        
