import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import SelectScrt from "../../components/select/SelectScrt";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GraficoBarrasHorizontais = ({
  data,
  titulo,
  label,
  selectObj,
  selectFunc,
}) => {
  alert(JSON.stringify(data))
  const labels = data.map((item) => item.nome);
  const dataValues = data.map((item) => item.qtdProdutos);

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
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Valor",
        },
      },
      y: {
        title: {
          display: true,
          text: "Campanha",
        },
      },
    },
  };

  return (
    <div style={{ marginTop: "10px", padding: "10px", height: "100%" }}>
      <h5 style={{ color: "#21272A" }}>
        <strong>{titulo}</strong>
      </h5>
      {selectObj != undefined && (
        <>
          <SelectScrt dados={selectObj} onChange={selectFunc} />
        </>
      )}
      <Bar data={dados} options={options} />
    </div>
  );
};

export default GraficoBarrasHorizontais;

// labels.forEach((element, index) => {
//   alert(dataValues[index])
//   datasetsV.push({
//     label: element,
//     backgroundColor: colors.map((color) => color),
//     borderColor: colors.map((color) => color),
//     borderWidth: 1,
//     hoverBackgroundColor: colors,
//     hoverBorderColor: colors,
//     data: dataValues[index],
//   });
// });