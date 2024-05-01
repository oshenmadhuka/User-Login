import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from './Chart'; 
import '../src/styles/model.css'

function Model() { 
  const [date, setDate] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([{ date: '0', predicted_attendance: 0 }]); // Initialize with default zero values

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handlePredictClick = async () => {
    try {
      const predictionResponse = await axios.post('http://127.0.0.1:8000/predict/', { date });
      setPrediction(predictionResponse.data.predicted_attendance.toFixed(2)); // Rounded to 2 decimal places
      setError(null);

      const chartResponse = await axios.post('http://127.0.0.1:8000/predict/chart/', { date });
      setChartData(chartResponse.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.detail);
      } else if (error.request) {
        setError('No response received. Please check your network connection.');
      } else {
        setError('An error occurred. Please try again later.');
      }
      setPrediction(null);
      setChartData([{ date: '0', predicted_attendance: 0 }]); // Reset chart data to default zero values
    }
  };
  
  return (
    <div className="modM">
      <h1>Employee Attendance Prediction</h1>
      <label>Date (MMDD): </label>
      <input type="text" value={date} onChange={handleDateChange} />
      <button onClick={handlePredictClick}>Predict</button>
      {error && <div className="error">{error}</div>}
      {prediction !== null && (
        <div>
          <h2>Predicted Attendance:</h2>
          <p>{prediction}</p>
        </div>
      )}
      <div>
        <h1>Predicted Attendance Chart</h1>
        <Chart xArray={chartData.map(data => data.date)} yArray={chartData.map(data => data.predicted_attendance)} />
      </div>
      
    </div>
  );
}

export default Model; // Changed export name to 'Model' (capitalized)
