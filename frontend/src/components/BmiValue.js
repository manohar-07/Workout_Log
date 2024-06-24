import React from 'react';

function BmiValue({ bmi }) {
  if (!bmi || !bmi.weight || !bmi.height) {
    return null; // Handle the case where bmi data is not available
  }

  const bmiValue = (bmi.weight / (bmi.height / 100) ** 2).toFixed(2);
  let bmiStatus;

  if (bmiValue < 18.5) {
    bmiStatus = 'Under-Weight';
  } else if (bmiValue > 25.5) {
    bmiStatus = 'Over-Weight';
  } else {
    bmiStatus = 'Normal';
  }

  return (
    <div className='bmi-details'>
      {bmi && (
        <>
          <h3>Your BMI</h3>
          <p><strong>{bmiValue} </strong> ({bmiStatus})</p>
          <span>Age: {bmi.age}</span>
          <span>Weight: {bmi.weight}</span>
          <span>Height: {bmi.height}</span>
        </>
      )}
    </div>
  );
}

export default BmiValue;
