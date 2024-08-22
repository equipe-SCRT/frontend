import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart,
    registerables,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import Select from '../selectscrt/Select';

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
    const [selectedFilter, setSelectedFilter] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        if (selectedFilter) {
            const newData = data.filter(item => item.category === selectedFilter);
            setFilteredData(newData);
        } else {
            setFilteredData(data);
        }
    }, [selectedFilter, data]);

    const labels = filteredData.map(item => item.mes);
    const dataValues = filteredData.map(item => item.count);
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
            <Select
                options={[
                    { value: 'categoria1', label: 'Categoria 1' },
                    { value: 'categoria2', label: 'Categoria 2' },
                    // Adicione mais opções conforme necessário
                ]}
                onChange={setSelectedFilter}
            />
            <Bar data={dados} options={options} />
        </div>
    );
};

export default GraficoBarra;