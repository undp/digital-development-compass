from flask import Flask, request, jsonify
from detoxify import Detoxify
import pandas as pd

app = Flask(__name__)

@app.route('/analyze', methods=['POST', 'GET'])
def analyze():
    if request.method == 'POST':
        try:
            text = request.get_json()['text']
            results = Detoxify('unbiased').predict(text)
            dataFrame = pd.DataFrame(results).round(3)
            dataFrameJson = dataFrame.to_json(orient="records")
            return dataFrameJson
        except:
            return {"status": 500, "message": 'There was an error processing the text.'}

if __name__ == '__main__': 
    app.run(debug=True)