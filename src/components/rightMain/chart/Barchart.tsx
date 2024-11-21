import React from 'react';
import { Bar, Doughnut, PolarArea, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, PolarAreaController, RadialLinearScale,  BarElement, Tooltip } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PolarAreaController,
  RadialLinearScale,
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

  if (type == "bar") return <div className='w-3/4'><Bar data={data} options={options} className='w-full h-content'/></div>;
  if (type == "dou") return <div><Doughnut data={data} options={options} className='w-full h-content'/></div>;
  if (type == "polar") return <div><PolarArea data={data} options={options} className='w-full h-content' /></div>
  else return <div><Line data={data} options={options} /> </div>

};

