import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [emotion, setEmotion] = useState("");

  const predictEmotion = async () => {
    const res = await axios.post(
      "http://localhost:5000/predict",
      { text }
    );

    setEmotion(res.data.emotion);
  };

  return (
    <div>
      <h1>Emotion Detector</h1>

      <textarea
        rows="5"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br />

      <button onClick={predictEmotion}>
        Predict Emotion
      </button>

      <h2>{emotion}</h2>
    </div>
  );
}

export default App;