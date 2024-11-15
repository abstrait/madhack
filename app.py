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
    image_data = base64.b64decode(base64_image)
    
    # Save or process the image
    image = Image.open(BytesIO(image_data))
    rgb_image = image.convert('RGB')
    rgb_image.save("tmp_image.png")

    return {"status": "success", "message": "Image received"}



@app.route('/get', methods=['GET'])
def get_expenditures():
    receiptReader = ReceiptReader("tmp_image.png")
    title, total = receiptReader.reader()
    ret = {
        "title": title,
        "total": total
    }
    print("Title:", title)
    print("Total:", total)
    return json.dumps(ret)
    


if __name__ == '__main__':
    app.run(debug=True, port=8000)