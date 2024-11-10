from PIL import Image
from pytesseract import pytesseract
import enum 

def main():
    print("ha")
    img = Image.open("/Users/2monkey3/Desktop/madhack/Print_Payment_Receipt.JPG")
    extracted_text = pytesseract.image_to_string(img, lang='eng')
    # print(extracted_text)
    # print(extracted_text.strip().split("\n"))
    text_array = extracted_text.strip().split("\n")
    title = text_array[0]
    print(title)

# def extract_image(image, lang):
        

# This block ensures main() is called only when the script is run directly
if __name__ == "__main__":
    main()
