from flask import Flask, request
from testing import ReceiptReader
import base64
import json
from io import BytesIO
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_image():
    data = request.json
    base64_image = data['image']
    image_data = base64.b64decode(base64_image.split(',')[1])
    
    # Save or process the image
    image = Image.open(BytesIO(image_data))
    rgb_image = image.convert('RGB')
    rgb_image.save("tmp_image.jpg")

    return {"status": "success", "message": "Image received"}



@app.route('/get', methods=['GET'])
def get_expenditures():
    receiptReader = ReceiptReader("../tmp_image.jpg")
    title, total = receiptReader.reader()
    return json.dumps({title, total})
    


if __name__ == '__main__':
    app.run(debug=True, port=8000)