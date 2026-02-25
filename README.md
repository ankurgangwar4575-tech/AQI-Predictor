🌫️ AQI Predictor – Machine Learning Based Air Quality Forecasting System

🔗 Live Application: https://aqi-predictor-sepia.vercel.app/

📌 Overview

The AQI Predictor is a full-stack Machine Learning web application that predicts the Air Quality Index (AQI) using pollutant concentration data.

The system integrates:

📊 A trained Random Forest Regression model

⚙️ Angular frontend for user interaction

🔌 Backend API serving ML predictions

🚀 Deployment on Vercel

This project demonstrates end-to-end ML deployment — from data preprocessing and training to real-time prediction through a web interface.

🧠 Problem Statement

Air pollution significantly impacts public health.
Predicting AQI based on pollutant concentrations allows:

Early warning systems

Urban monitoring

Environmental analysis

Data-driven decision making

This project builds a regression model to estimate AQI using historical pollutant data.

📊 Dataset

Dataset: city_day_descriptive_augmented.csv

Input Features Used:

PM2.5

PM10

NO2

SO2

CO

O3

Target Variable:

AQI

🤖 Machine Learning Model
Algorithm Used:

Random Forest Regressor

Model Configuration:

n_estimators = 300

max_depth = None

test_size = 0.2

random_state = 42

📈 Model Performance
Metric	Value
MAE	0.606
RMSE	4.765
R² Score	0.9978
Interpretation:

The model explains 99.78% of variance in AQI

PM2.5 is the most influential pollutant

Strong predictive performance with low error
