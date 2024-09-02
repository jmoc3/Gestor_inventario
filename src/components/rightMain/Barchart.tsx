import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, BarElement, Tooltip } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
);

export function BarChart ({labels, quantity, type}:{labels:string[],quantity:number[], type:string }){

  const data = {
    labels,
    datasets: [
      {
        label: 'Quantity',
        data: quantity,
        backgroundColor: labels.map((_, index) => `rgba(${index * 10}, ${index * 80}, 250, 0.3)`),
        borderColor: labels.map((_, index) => `rgba(${index * 10}, ${index * 80}, 250, 0.5)`),
        borderWidth: 1,
        borderRadius: 5
      },
    ],
  };

  const options = {
    responsive: true
    };

  if (type == "bar") return <Bar data={data} options={options} className='w-full h-full'/>;
  if (type == "dou") return <Doughnut data={data} options={options} className=''/>;
};

