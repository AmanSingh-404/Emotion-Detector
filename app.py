from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS




app = Flask(__name__)
CORS(app)

model = pickle.load(open("emotion_model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))
emotion_mapping = pickle.load(open("emotion_mapping.pkl", "rb"))

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
    app.run(debug=True)