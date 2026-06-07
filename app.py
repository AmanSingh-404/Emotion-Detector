from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Dynamically resolve file paths relative to script location
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model = pickle.load(open(os.path.join(BASE_DIR, "emotion_model.pkl"), "rb"))
vectorizer = pickle.load(open(os.path.join(BASE_DIR, "vectorizer.pkl"), "rb"))
emotion_mapping = pickle.load(open(os.path.join(BASE_DIR, "emotion_mapping.pkl"), "rb"))

reverse_mapping = {v:k for k,v in emotion_mapping.items()}

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json
    text = data["text"]

    text_vector = vectorizer.transform([text])

    prediction = model.predict(text_vector)[0]

    emotion = reverse_mapping[prediction]

    return jsonify({
        "emotion": emotion
    })

if __name__ == "__main__":
    # Support dynamic PORT environment binding for cloud platforms
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)