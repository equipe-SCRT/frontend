import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, 
  registerables, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(
  ...registerables,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GraficoBarra = ({ data, cor, titulo, label }) => {
    const labels = data.map(item => item.count);
    const dataValues = data.map(item => item.count);
    const dados = {
        labels: labels,
        datasets: [
            {
                label: label,
                backgroundColor: cor + "44",
                borderColor: cor,
                borderWidth: 1,
                hoverBackgroundColor: cor,
                hoverBorderColor: cor,
                data: dataValues
            }
        ],
    };

    const options = {
        indexAxis: 'y',
        interaction: { intersect: false, mode: 'index' },
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'qtd do alimento escolhido'
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'nomes condominios'
                },
            },
        },
        plugins: {}
    };

    return (
        <div style={{ border: "1px solid #0005", marginTop: "10px", padding: "10px" }}>
            <h5>{titulo}</h5>
            <Bar data={dados} options={options} />
        </div>
    );
};

export default GraficoBarra;