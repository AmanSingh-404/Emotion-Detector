import { useState } from "react";
import axios from "axios";
import "./App.css";

// Premium details mapping for the predicted emotions
const EMOTION_DETAILS = {
  joy: {
    emoji: "😊",
    label: "Joy & Happiness",
    desc: "Your text radiates positivity, excitement, or satisfaction.",
    class: "emotion-joy"
  },
  sadness: {
    emoji: "😢",
    label: "Sadness & Sorrow",
    desc: "Your text conveys grief, sorrow, or heavy-hearted sentiments.",
    class: "emotion-sadness"
  },
  love: {
    emoji: "❤️",
    label: "Love & Affection",
    desc: "Your text expresses warmth, empathy, or deep affection.",
    class: "emotion-love"
  },
  anger: {
    emoji: "😠",
    label: "Anger & Frustration",
    desc: "Your text shows irritation, resentment, or hostility.",
    class: "emotion-anger"
  },
  fear: {
    emoji: "😨",
    label: "Fear & Anxiety",
    desc: "Your text indicates concern, apprehension, or fear.",
    class: "emotion-fear"
  },
  surprise: {
    emoji: "😲",
    label: "Surprise & Wonder",
    desc: "Your text expresses amazement, astonishment, or shock.",
    class: "emotion-surprise"
  }
};

function App() {
  const [text, setText] = useState("");
  const [emotion, setEmotion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const predictEmotion = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    setError(null);
    setEmotion("");

    // Support dynamic backend URL from environment variables, fallback to production Render service
    const API_BASE = import.meta.env.VITE_API_URL || "https://emotion-detector.onrender.com";

    try {
      const res = await axios.post(
        `${API_BASE}/predict`,
        { text }
      );

      if (res.data && res.data.emotion) {
        // Normalise classification in case of case mismatches
        const detected = res.data.emotion.toLowerCase().trim();
        setEmotion(detected);
      } else {
        throw new Error("Unexpected API response structure.");
      }
    } catch (err) {
      console.error("Prediction failed:", err);
      setError({
        title: "Unable to reach backend API",
        message: `Could not connect to the server at ${API_BASE}. Please ensure the service is online and CORS is allowed.`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setEmotion("");
    setError(null);
  };

  const selectedDetails = EMOTION_DETAILS[emotion] || null;

  return (
    <div className="container">
      <div className="glass-card">
        {/* Brand Header */}
        <div className="brand-badge">
          <span className="brand-dot"></span>
          Emosense AI
        </div>

        {/* Title */}
        <h1 className="card-title">What's the feeling behind the words?</h1>
        <p className="card-subtitle">Paste any text — a message, review, or thought.</p>

        {/* Textarea Area */}
        <div className="textarea-wrapper">
          <textarea
            className="input-textarea"
            placeholder="e.g. I can't believe how amazing today turned out to be..."
            value={text}
            maxLength={500}
            disabled={isLoading}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="controls-row">
            <span className="char-counter">{text.length} / 500</span>
            <button 
              className="btn-clear" 
              onClick={handleClear}
              disabled={isLoading || (!text && !emotion && !error)}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Analyze Button */}
        <button
          className="btn-analyze"
          onClick={predictEmotion}
          disabled={isLoading || !text.trim()}
        >
          {isLoading ? (
            <>
              <div className="spinner"></div>
              <span>Analyzing emotion...</span>
            </>
          ) : (
            <>
              {/* Custom Neural Network Nodes SVG */}
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeWidth="1.5" strokeDasharray="3 3"/>
                <circle cx="12" cy="12" r="3" fill="currentColor"/>
                <circle cx="12" cy="6" r="1.5" fill="currentColor"/>
                <circle cx="12" cy="18" r="1.5" fill="currentColor"/>
                <circle cx="6" cy="12" r="1.5" fill="currentColor"/>
                <circle cx="18" cy="12" r="1.5" fill="currentColor"/>
              </svg>
              <span>Analyze emotion</span>
            </>
          )}
        </button>

        {/* Result Area */}
        {emotion && selectedDetails && (
          <div className="result-section">
            <div className={`result-card ${selectedDetails.class}`}>
              <div className="result-emoji">{selectedDetails.emoji}</div>
              <div className="result-info">
                <div className="result-label">Detected Sentiment</div>
                <div className="result-value">{selectedDetails.label}</div>
                <p style={{ margin: "4px 0 0", color: "#8c88a5", fontSize: "14px" }}>
                  {selectedDetails.desc}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Area */}
        {error && (
          <div className="error-card">
            {/* Warning SVG */}
            <svg 
              className="error-icon" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <div className="error-text">
              <div className="error-title">{error.title}</div>
              <div>{error.message}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;