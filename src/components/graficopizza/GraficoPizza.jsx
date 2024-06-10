import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components with ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

const GraficoPizza = ({titulo, data}) => {
    const dados = {
        labels: ['30 dias', '15 dias'],
        datasets: [
            {
                label: '# of Votes',
                data: data,
                backgroundColor: [
                    '#0BDC2B',
                    '#F0A202'
                ],
                borderColor: [
                    '#0BDC2B',
                    '#F0A202'
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (

        <>
            <div style={{ border: "1px solid #0005", marginTop: "10px", padding: "10px", height:"100%", display:"flex", justifyContent:"center"}}>
                <div style={{width:"50%"}}>
                <h5>{titulo}</h5>
                <Pie data={dados} options={options} />
                </div>
            </div>
        </>
    );

};

export default GraficoPizza;