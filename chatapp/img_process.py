from flask import Flask, request
import base64
from io import BytesIO
from PIL import Image

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_image():
    data = request.json
    base64_image = data['image']
    image_data = base64.b64decode(base64_image)
    
    # Save or process the image
    image = Image.open(BytesIO(image_data))
    image.save("received_image.jpg")

    return {"status": "success", "message": "Image received"}



@app.route('/get', methods=['GET'])
def get_expenditures():
    return {store_name, total_amount}
    


if __name__ == '__main__':
    app.run(debug=True)