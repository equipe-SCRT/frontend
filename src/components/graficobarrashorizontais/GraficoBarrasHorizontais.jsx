import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Select from '../selectscrt/Select';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const GraficoBarrasHorizontais = ({ data, titulo, label }) => {
    const [selectedFilter, setSelectedFilter] = useState('Arroz');

    const filteredData = selectedFilter
        ? data[selectedFilter]
        : [];

    const labels = filteredData.map(item => item.nome);
    const dataValues = filteredData.map(item => item.count);

    const colors = ["#0263FF", "#FF7723", "#8E30FF", "#7F8B32", "#A27035"];

    const dados = {
        labels: labels,
        datasets: [
            {
                label: label,
                backgroundColor: colors.map(color => color),
                borderColor: colors.map(color => color),
                borderWidth: 1,
                hoverBackgroundColor: colors,
                hoverBorderColor: colors,
                data: dataValues
            }
        ],
    };

    const options = {
        indexAxis: 'y', // Configurar o gráfico para ser horizontal
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Valor'
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Campanha'
                },
            },
        },
    };

    return (
        <div style={{ marginTop: "10px", padding: "10px", height: "100%" }}>
            <h5 style={{ color: "#21272A" }}><strong>{titulo}</strong></h5>
            <Select
                options={[
                    { value: 'Arroz', label: 'Arroz' },
                    { value: 'Feijão', label: 'Feijão' },
                    // Adicione mais opções conforme necessário
                ]}
                onChange={(option) => setSelectedFilter(option.value)}
            />
            <Bar data={dados} options={options} />
        </div>
    );
};

export default GraficoBarrasHorizontais;