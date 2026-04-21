import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Sample dataset
events = [
    {
        "title": "Hackathon 2024",
        "category": "Tech",
        "location": "Bangalore",
        "description": "coding hackathon AI ML"
    },
    {
        "title": "Cultural Fest",
        "category": "Cultural",
        "location": "Mysore",
        "description": "dance music celebration"
    },
    {
        "title": "AI Workshop",
        "category": "Tech",
        "location": "Online",
        "description": "machine learning deep learning"
    }
]

df = pd.DataFrame(events)

def get_recommendations(user_interest):
    corpus = df["description"].tolist()

    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(corpus + [user_interest])

    similarity = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1])

    scores = list(enumerate(similarity[0]))
    scores = sorted(scores, key=lambda x: x[1], reverse=True)

    results = [events[i[0]] for i in scores]

    return results
        
    