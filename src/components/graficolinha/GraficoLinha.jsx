import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart,
    registerables,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { ptBR } from 'date-fns/locale';
Chart.register(
    ...registerables,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);

const GraficoLinha = ({ data, cor, titulo, label }) => {
    const labels = data.map(item => item.mes);
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
        interaction: { intersect: false, mode: 'index' },
        scales: {
            x: {
                type: 'time',
                time: {
                    parser: 'yyyy-MM', // Definindo o formato de data personalizado
                    tooltipFormat: 'MMM yyyy', // Formato de tooltip
                    unit: 'month',
                    displayFormats: {
                        month: 'MMM yyyy' // Formato de exibição para os rótulos do eixo x
                    },
                },
                title: {
                    display: true,
                    text: 'Data',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Valor'
                },
            },
        },
        plugins: {}
    };

    return (
        <div style={{ border: "1px solid #0005", marginTop: "10px", padding: "10px" }}>
            <h5 style={{ color: "#21272A" }}><strong>{titulo}</strong></h5>
            <Line data={dados} options={options} />
        </div>
    );
};
export default GraficoLinha;