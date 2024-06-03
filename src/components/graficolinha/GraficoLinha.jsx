// GraficoLinha.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, 
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
  Legend );

const GraficoLinha = ({data}) => {
  const dados = {
    datasets: [
      {
        label: 'Cestas feitas',
        backgroundColor: '#bcefcb',
        borderColor: '#22CC52',
        borderWidth: 1,
        hoverBackgroundColor: '#22CC52',
        hoverBorderColor: '#22CC52',
        data: data
      ,
      }
    ],
  };

  const options = {
  interaction: {intersect: false,mode: 'index',},
  scales: {
    x: {type: 'time',
      time: {parser: 'yyyy-MM-dd HH:mm:ss',tooltipFormat: 'dd MMMM yyyy',unit: 'month',displayFormats:
        {month: 'MMM',},locale:ptBR,},
      title: {display: true,text: 'Data',},},
      
    y: {beginAtZero: true,title:{display:true,text:'Valor'}},
  },
  plugins:{}
  };

  return (
    <div style={{border:"1px solid #0005", marginTop:"10px", padding:"10px"
    }}>
      <h5>Quantidade em Estoque</h5>
      <Line data={dados} options={options} />
    </div>
  );
};

export default GraficoLinha;