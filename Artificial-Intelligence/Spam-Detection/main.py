import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report
import os

def load_data(filepath):
    """Loads the dataset from a CSV file."""
    if not os.path.exists(filepath):
        print(f"Error: File '{filepath}' not found.")
        return None
    try:
        data = pd.read_csv(filepath)

        if 'label' not in data.columns or 'message' not in data.columns:
            print("Error: Dataset must contain 'label' and 'message' columns.")
            return None
        return data
    except Exception as e:
        print(f"Error loading data: {e}")
        return None

def train_model(data):
    """Trains a Naive Bayes model for spam detection."""

    data['label_num'] = data['label'].map({'spam': 1, 'ham': 0})
    
    X = data['message']
    y = data['label_num']


    vectorizer = CountVectorizer()
    X_vectorized = vectorizer.fit_transform(X)


    X_train, X_test, y_train, y_test = train_test_split(X_vectorized, y, test_size=0.2, random_state=42)


    clf = MultinomialNB()
    clf.fit(X_train, y_train)


    y_pred = clf.predict(X_test)


    return clf, vectorizer

def predict_message(model, vectorizer, message):
    """Predicts if a message is spam or not."""
    message_vectorized = vectorizer.transform([message])
    prediction = model.predict(message_vectorized)
    return "Spam" if prediction[0] == 1 else "Not Spam (Ham)"

def main():
    print("Welcome to the Spam Detection System!")
    filepath = 'data.csv'
    

    data = load_data(filepath)
    
    if data is not None:

        model, vectorizer = train_model(data)
        

        print("Type a message to check if it's spam or not.")
        print("Type 'exit' or 'quit' to stop the program.\n")
        
        while True:
            user_input = input("Enter message: ")
            if user_input.lower() in ['exit', 'quit']:
                break
            
            result = predict_message(model, vectorizer, user_input)
            print(f"Prediction: {result}\n")
            
    print("Goodbye!")

if __name__ == "__main__":
    main()
