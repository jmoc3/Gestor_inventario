import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,

);

export function BarChart ({labels, quantity}:{labels:string[],quantity:number[]}){
  const data = {
    labels,
    datasets: [
      {
        label: 'Quantity',
        data: quantity,
        backgroundColor: 'rgb(167, 139, 250,0.5)',
        borderColor: 'rgb(124, 58, 237,0.6)',
        borderWidth: 1,
        borderRadius: 5
      },
    ],
  };

  const options = {
    responsive: true
  };

  return <Bar data={data} options={options} className='w-full h-full'/>;
};

