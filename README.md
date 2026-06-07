# Emotion Detection Using NLP and Machine Learning

## Overview

This project is an Emotion Detection System that analyzes text and predicts the underlying emotion using Natural Language Processing (NLP) and Machine Learning techniques. The model is trained on labeled text data and can classify user input into different emotion categories.

The project demonstrates the complete NLP pipeline, including text preprocessing, feature extraction, model training, evaluation, and prediction.

---

## Features

- Text preprocessing and cleaning
- Stopword removal
- Feature extraction using Bag of Words (BoW)
- Feature extraction using TF-IDF
- Machine Learning model training
- Emotion prediction from custom text input
- Model evaluation and comparison
- Flask-based deployment

---

## Technologies Used

- Python
- Pandas
- NumPy
- NLTK
- Scikit-learn
- Flask
- Pickle

---

## NLP Pipeline

### 1. Data Collection

The dataset contains text samples along with their corresponding emotion labels.

### 2. Data Preprocessing

The following preprocessing steps are performed:

- Convert text to lowercase
- Remove punctuation
- Remove special characters
- Remove stopwords
- Clean and normalize text

### 3. Feature Extraction

#### Bag of Words (BoW)

Converts text into numerical vectors based on word frequency.

#### TF-IDF

Measures the importance of words within a document relative to the entire dataset.

### 4. Model Training

The project trains and evaluates:

- Naive Bayes Classifier
- Logistic Regression Classifier

### 5. Prediction

Users can provide custom text input, and the trained model predicts the corresponding emotion.

---

## Project Structure

```text
Emotion-Detector/
│
├── app.py
├── pipeline.ipynb
├── emotion_model.pkl
├── vectorizer.pkl
├── emotion_mapping.pkl
├── requirements.txt
├── README.md
│
└── dataset/
    └── emotions.csv
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/Emotion-Detector.git
cd Emotion-Detector
```

### Create a Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

#### Windows

```bash
venv\Scripts\activate
```

#### Linux / macOS

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Running the Application

```bash
python app.py
```

The application will start on:

```text
http://127.0.0.1:5000
```

---

## Example

### Input

```text
I am feeling very happy today.
```

### Output

```text
joy
```

---

## Model Evaluation

The models are evaluated using standard classification metrics:

- Accuracy
- Precision
- Recall
- F1 Score

Logistic Regression achieved the best performance and was selected as the final model.

---

## Future Improvements

- Deep Learning-based emotion detection
- LSTM and GRU architectures
- Transformer-based models (BERT, RoBERTa)
- Real-time emotion analysis
- Modern frontend integration
- REST API deployment
- Multi-language emotion detection

---

## Learning Outcomes

This project covers:

- Natural Language Processing (NLP)
- Text Cleaning and Preprocessing
- Stopword Removal
- Feature Engineering
- Bag of Words
- TF-IDF Vectorization
- Machine Learning Classification
- Model Evaluation
- Flask Deployment

---

## Author

**Aman Singh**

B.Tech Student | Machine Learning Enthusiast | Full Stack Developer

GitHub: https://github.com/AmanSingh-404
