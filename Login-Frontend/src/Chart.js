import React, { useState, useEffect } from 'react';
import Plotly from 'plotly.js-dist';

const Chart = ({ xArray, yArray }) => { // Changed function name to 'Chart' (uppercase)
  useEffect(() => {
    const data = [{
      x: xArray,
      y: yArray,
      mode: 'lines'
    }];

    const layout = {
      xaxis: { title: 'Date (MMDD)' },
      yaxis: { title: 'Predicted Attendance' },
      title: 'Predicted Attendance Chart'
    };

    Plotly.newPlot('myPlot', data, layout);

    // Cleanup when component unmounts
    return () => {
      Plotly.purge('myPlot');
    };
  }, [xArray, yArray]);

  return (
    <div id="myPlot" style={{ width: '100%', maxWidth: '700px' }}></div>
  );
};

export default Chart; // Changed export name to 'Chart' (uppercase)
