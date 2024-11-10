from PIL import Image
from pytesseract import pytesseract
import cv2
import enum 
import re

def main():
    print("ha")
    grayscale_image = cv2.imread("/Users/2monkey3/Desktop/madhack/Print_Payment_Receipt.JPG", cv2.IMREAD_GRAYSCALE)
    # img = Image.open("/Users/2monkey3/Desktop/madhack/Print_Payment_Receipt.JPG")
    extracted_text = pytesseract.image_to_string(grayscale_image, lang='eng')
    numbers = re.findall(r"\d+\.{1}\d+", extracted_text)
    total = float(numbers[-1])
    # print(extracted_text)
    print(numbers)
    print(extracted_text.strip().split("\n"))
    text_array = extracted_text.strip().split("\n")
    title = text_array[0]
    print(title)
    print(total)

# def extract_image(image, lang):
        

# This block ensures main() is called only when the script is run directly
if __name__ == "__main__":
    main()
