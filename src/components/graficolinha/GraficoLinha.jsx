import React from "react";
import { Line } from "react-chartjs-2";
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
import { ptBR } from "date-fns/locale";
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

const GraficoLinha = ({ data, cor, titulo, label }) => {
  let datasets = [];
  let labels = [];
  let unicoDataset = !Array.isArray(data[0]);
  if (unicoDataset){
    data = [data]
    label = [label]
  }
  data.forEach((element, i) => {
    let dataValues = [];
    let labels2 = []
    for (let j = 0; j < element.length; j++) {
        labels2.push(element[j].mes);
    }
    for (let j = 0; j < element.length; j++) {
        dataValues.push(element[j].count);
    }
    labels.push(labels2);
    
    let color = ["#22CC52", "#004AAD"]

    datasets.push({
      label: label[i],
      backgroundColor: color[i] + "44",
      borderColor: color[i],
      borderWidth: 1,
      hoverBackgroundColor: cor,
      hoverBorderColor: cor,
      data: dataValues,
    });
  });
  
  const dados = {
    labels: labels[0],
    datasets: datasets,
  };

  const options = {
    interaction: { intersect: false, mode: "index" },
    scales: {
      x: {
        type: "time",
        time: {
          parser: "yyyy-MM", // Definindo o formato de data personalizado
          tooltipFormat: "MMM yyyy", // Formato de tooltip
          unit: "month",
          displayFormats: {
            month: "MMM yyyy", // Formato de exibição para os rótulos do eixo x
          },
        },
        title: {
          display: true,
          text: "Data",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Valor",
        },
      },
    },
    plugins: {},
  };

  return (
    <div
      style={{ border: "1px solid #0005", marginTop: "10px", padding: "10px" }}
    >
      <h5 style={{ color: "#21272A" }}>
        <strong>{titulo}</strong>
      </h5>
      <Line data={dados} options={options} />
    </div>
  );
};

export default GraficoLinha;