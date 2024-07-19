from flask import Flask, jsonify
import numpy as np
from sklearn.neural_network import MLPRegressor
from sklearn.preprocessing import StandardScaler
import requests

app = Flask(__name__)

MOVIE_API_URL = 'http://192.168.0.25:5092/api/movie'
FAVORITE_MOVIES_API_URL = 'http://192.168.0.25:5092/api/movie/favourite'

def fetch_all_movies():
    try:
        response = requests.get(MOVIE_API_URL)
        if response.status_code == 200:
            return response.json()
        else:
            return None
    except Exception as e:
        print(f'Error fetching movies data: {str(e)}')
        return None

def fetch_favorite_movies():
    try:
        response = requests.get(f'{FAVORITE_MOVIES_API_URL}')
        if response.status_code == 200:
            return response.json()
        else:
            return None
    except Exception as e:
        print(f'Error fetching favorite movies data: {str(e)}')
        return None

def preprocess_movie_data(data):
    X = []
    for movie in data:
        X.append([
            movie['genre'],           
            movie['duration'],
            movie['year'],
            movie['rating'],
            len(movie['actorIds'])    
        ])
    return np.array(X)

def preprocess_user_preferences(favorite_movies, all_movies):
    y = []
    for movie in all_movies:
        if movie['id'] in favorite_movies:
            y.append(1)  
        else:
            y.append(0)  
    return np.array(y)

all_movies_data = fetch_all_movies()
favorite_movies_data = fetch_favorite_movies()

if all_movies_data is None or favorite_movies_data is None:
    raise RuntimeError('Failed to fetch data from API')

X_movies = preprocess_movie_data(all_movies_data)
y_user = preprocess_user_preferences(favorite_movies_data, all_movies_data)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_movies)

regressor = MLPRegressor(hidden_layer_sizes=(100, 50), activation='relu', solver='adam', max_iter=500)
regressor.fit(X_scaled, y_user)

@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    try:
        X_predict = X_scaled  
        similarity_scores = regressor.predict(X_predict)

        recommendations = []
        for i, movie in enumerate(all_movies_data):
            recommendations.append({
                'movie_id': movie['id'],
                'similarity_score': similarity_scores[i]
            })

        recommendations = sorted(recommendations, key=lambda x: x['similarity_score'], reverse=True)

        recommended_movie_ids = [rec['movie_id'] for rec in recommendations]
        return jsonify({"recommended_movies": recommended_movie_ids})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
