import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  registerables,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";
Chart.register(
  ...registerables,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraficoPizza = ({ titulo, data }) => {
    // console.log(data)
    const dados = {
        labels: ['Produtos'],
        datasets: [
            {
                label: 'Vencimento em 30 Dias',
                data: [data['vencimento30']],
                backgroundColor: [
                    '#0BDC2B'
                ],
                borderColor: [
                    '#0BDC2B'
                ],
                borderWidth: 1,
            },
            {
                label: 'Vencimento em 15 Dias',
                data: [data['vencimento15']],
                backgroundColor: [
                    '#F0A202'
                ],
                borderColor: [
                    '#F0A202'
                ],
                borderWidth: 1,
            }
        ],
    };

    const options = {
        indexAxis: 'y',
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
        barThickness: 40
    };

    return (

            <div
                style={{ marginTop: "10px", padding: "10px" }}
            >
                <h5 style={{ color: "#21272A" }}>
                    <strong>{titulo}</strong>
                </h5>
                <Bar data={dados} options={options} />
            </div>


    );

};

export default GraficoPizza;