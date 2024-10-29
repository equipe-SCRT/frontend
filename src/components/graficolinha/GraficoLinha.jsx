import SelectScrt from "../../components/select/SelectScrt";
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

const GraficoLinha = ({ data, cores, titulo, label, selectObj, selectFunc }) => {
  let datasets = [];
  let labels = [];
  let unicoDataset = !Array.isArray(data[0]);
  if (unicoDataset) {
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


    datasets.push({
      label: label[i],
      backgroundColor: cores[i] + "44",
      borderColor: cores[i],
      borderWidth: 1,
      hoverBackgroundColor: cores[i],
      hoverBorderColor: cores[i],
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
          parser: "yyyy-MM",
          tooltipFormat: "MMM yyyy",
          unit: "month",
          displayFormats: {
            month: "MMM yyyy",
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
    plugins: {
      legend: {
        display: false
      }
    },
  };

  return (
    <div
      style={{ marginTop: "10px", padding: "10px" }}
    >
      <h5 style={{ color: "#21272A", marginBottom: "10px" }}>
        <strong>{titulo}</strong>
      </h5>
      {selectObj != undefined && <>
        <SelectScrt
          dados={selectObj}
          onChange={selectFunc}
        /></>}
      <Line data={dados} options={options} />
    </div>
  );
};

export default GraficoLinha;