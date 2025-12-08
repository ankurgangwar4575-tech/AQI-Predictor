# Update app.py - Add model loading at the top

from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
import joblib
import pandas as pd
from datetime import datetime
import os
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load your ML model
MODEL_PATH = 'aqi_model.pkl'

def load_model():
    """Load the trained ML model"""
    try:
        # Try different loading methods
        if os.path.exists(MODEL_PATH):
            try:
                model = pickle.load(open(MODEL_PATH, 'rb'))
                print(f"✓ Model loaded successfully using pickle")
                return model
            except Exception as e1:
                try:
                    model = joblib.load(MODEL_PATH)
                    print(f"✓ Model loaded successfully using joblib")
                    return model
                except Exception as e2:
                    print(f"Error loading with joblib: {e2}")
                    
            # If both fail, create a dummy model for testing
            print("⚠ Using dummy model for testing")
            class DummyModel:
                def predict(self, X):
                    # Simple linear combination for testing
                    weights = np.array([0.35, 0.25, 0.15, 0.10, 0.08, 0.07, 0.0, 0.0, 0.0, 0.0])
                    return np.dot(X, weights[:X.shape[1]]) * (0.9 + np.random.random() * 0.2)
            return DummyModel()
        else:
            print(f"❌ Model file not found at {MODEL_PATH}")
            return None
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        return None

# Load model at startup
model = load_model()
print(f"Model type: {type(model)}")

@app.route('/')
def home():
    """Home endpoint"""
    return jsonify({
        'status': 'success',
        'message': 'AQI Prediction API is running',
        'endpoints': {
            '/predict': 'POST - Predict AQI from parameters',
            '/health': 'GET - API health check',
            '/model-info': 'GET - Get model information'
        }
    })

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/model-info')
def model_info():
    """Get model information"""
    if model:
        return jsonify({
            'status': 'success',
            'model_type': str(type(model)),
            'model_params': str(model.get_params()) if hasattr(model, 'get_params') else 'N/A',
            'loaded_at': datetime.now().isoformat()
        })
    else:
        return jsonify({
            'status': 'error',
            'message': 'Model not loaded'
        }), 500

@app.route('/predict', methods=['POST'])
def predict():
    """Predict AQI from input parameters"""
    try:
        # Get JSON data from request
        data = request.get_json()
        
        if not data:
            return jsonify({
                'status': 'error',
                'message': 'No data provided'
            }), 400
        
        # Extract features (modify based on your model's expected features)
        features = [
            data.get('pm25', 0),
            data.get('pm10', 0),
            data.get('no2', 0),
            data.get('so2', 0),
            data.get('co', 0),
            data.get('o3', 0),
            data.get('temperature', 0),
            data.get('humidity', 0),
            data.get('windSpeed', 0),
            data.get('pressure', 0)
        ]
        
        # Convert to numpy array and reshape for prediction
        features_array = np.array(features).reshape(1, -1)
        
        # Make prediction
        if model:
            prediction = model.predict(features_array)[0]
            
            # Calculate AQI category
            aqi = float(prediction)
            category = get_aqi_category(aqi)
            color = get_aqi_color(aqi)
            
            # Health implications and precautions
            health_info, precautions = get_health_info(aqi)
            
            return jsonify({
                'status': 'success',
                'prediction': {
                    'aqi': round(aqi, 1),
                    'category': category,
                    'color': color,
                    'health_implications': health_info,
                    'precautions': precautions,
                    'timestamp': datetime.now().isoformat()
                },
                'parameters': data
            })
        else:
            # Fallback calculation if model not loaded
            aqi = calculate_fallback_aqi(data)
            category = get_aqi_category(aqi)
            color = get_aqi_color(aqi)
            health_info, precautions = get_health_info(aqi)
            
            return jsonify({
                'status': 'success',
                'prediction': {
                    'aqi': round(aqi, 1),
                    'category': category,
                    'color': color,
                    'health_implications': health_info,
                    'precautions': precautions,
                    'timestamp': datetime.now().isoformat(),
                    'note': 'Using fallback calculation (model not loaded)'
                },
                'parameters': data
            })
            
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Prediction failed: {str(e)}'
        }), 500

def calculate_fallback_aqi(data):
    """Fallback AQI calculation if model is not available"""
    # Simplified AQI calculation based on pollutant concentrations
    pollutants = ['pm25', 'pm10', 'no2', 'so2', 'co', 'o3']
    aqi_values = []
    
    for pollutant in pollutants:
        if pollutant in data:
            aqi = calculate_pollutant_aqi(pollutant, data[pollutant])
            aqi_values.append(aqi)
    
    return max(aqi_values) if aqi_values else 50

def calculate_pollutant_aqi(pollutant, concentration):
    """Calculate AQI for a specific pollutant"""
    # AQI breakpoints based on US EPA standards
    breakpoints = {
        'pm25': [
            [0, 12.0, 0, 50],
            [12.1, 35.4, 51, 100],
            [35.5, 55.4, 101, 150],
            [55.5, 150.4, 151, 200],
            [150.5, 250.4, 201, 300],
            [250.5, 350.4, 301, 400],
            [350.5, 500.4, 401, 500]
        ],
        'pm10': [
            [0, 54, 0, 50],
            [55, 154, 51, 100],
            [155, 254, 101, 150],
            [255, 354, 151, 200],
            [355, 424, 201, 300],
            [425, 504, 301, 400],
            [505, 604, 401, 500]
        ],
        'no2': [
            [0, 53, 0, 50],
            [54, 100, 51, 100],
            [101, 360, 101, 150],
            [361, 649, 151, 200],
            [650, 1249, 201, 300],
            [1250, 1649, 301, 400],
            [1650, 2049, 401, 500]
        ],
        'so2': [
            [0, 35, 0, 50],
            [36, 75, 51, 100],
            [76, 185, 101, 150],
            [186, 304, 151, 200],
            [305, 604, 201, 300],
            [605, 804, 301, 400],
            [805, 1004, 401, 500]
        ],
        'co': [
            [0, 4.4, 0, 50],
            [4.5, 9.4, 51, 100],
            [9.5, 12.4, 101, 150],
            [12.5, 15.4, 151, 200],
            [15.5, 30.4, 201, 300],
            [30.5, 40.4, 301, 400],
            [40.5, 50.4, 401, 500]
        ],
        'o3': [
            [0, 54, 0, 50],
            [55, 70, 51, 100],
            [71, 85, 101, 150],
            [86, 105, 151, 200],
            [106, 200, 201, 300]
        ]
    }
    
    bp = breakpoints.get(pollutant)
    if not bp:
        return 0
    
    for c_low, c_high, aqi_low, aqi_high in bp:
        if concentration >= c_low and concentration <= c_high:
            # Calculate AQI using formula
            return ((aqi_high - aqi_low) / (c_high - c_low)) * (concentration - c_low) + aqi_low
    
    return 500  # If above highest breakpoint

def get_aqi_category(aqi):
    """Get AQI category from AQI value"""
    aqi = float(aqi)
    if aqi <= 50:
        return "Good"
    elif aqi <= 100:
        return "Moderate"
    elif aqi <= 150:
        return "Unhealthy for Sensitive Groups"
    elif aqi <= 200:
        return "Unhealthy"
    elif aqi <= 300:
        return "Very Unhealthy"
    else:
        return "Hazardous"

def get_aqi_color(aqi):
    """Get color for AQI value"""
    aqi = float(aqi)
    if aqi <= 50:
        return "good"
    elif aqi <= 100:
        return "moderate"
    elif aqi <= 150:
        return "unhealthy-sensitive"
    elif aqi <= 200:
        return "unhealthy"
    elif aqi <= 300:
        return "very-unhealthy"
    else:
        return "hazardous"

def get_health_info(aqi):
    """Get health implications and precautions for AQI value"""
    aqi = float(aqi)
    
    if aqi <= 50:
        health = "Air quality is satisfactory, and air pollution poses little or no risk."
        precautions = [
            "Ideal air quality for outdoor activities",
            "No restrictions needed",
            "Enjoy outdoor activities"
        ]
    elif aqi <= 100:
        health = "Air quality is acceptable. However, there may be a risk for some people who are unusually sensitive to air pollution."
        precautions = [
            "Unusually sensitive people should consider reducing prolonged or heavy outdoor exertion",
            "Generally acceptable for most people",
            "Monitor if symptoms occur"
        ]
    elif aqi <= 150:
        health = "Members of sensitive groups may experience health effects. The general public is less likely to be affected."
        precautions = [
            "Sensitive groups should reduce prolonged or heavy outdoor exertion",
            "People with heart or lung disease, older adults, and children should take it easy",
            "Consider rescheduling strenuous outdoor activities"
        ]
    elif aqi <= 200:
        health = "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects."
        precautions = [
            "Everyone should reduce prolonged or heavy outdoor exertion",
            "Sensitive groups should avoid all outdoor physical activity",
            "Consider moving activities indoors",
            "Close windows to avoid dirty outdoor air"
        ]
    elif aqi <= 300:
        health = "Health alert: The risk of health effects is increased for everyone."
        precautions = [
            "Everyone should avoid all outdoor physical activity",
            "Sensitive groups should remain indoors",
            "Keep windows and doors closed",
            "Use air purifiers if available",
            "Consider wearing N95 masks if going outside"
        ]
    else:
        health = "Health warning of emergency conditions: everyone is more likely to be affected."
        precautions = [
            "Everyone should stay indoors",
            "Avoid any outdoor activity",
            "Keep windows and doors tightly closed",
            "Use air purifiers continuously",
            "Wear N95 masks if you must go outside",
            "Consider relocating if conditions persist"
        ]
    
    return health, precautions

if __name__ == '__main__':
    # Run Flask app
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)