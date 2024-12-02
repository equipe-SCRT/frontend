import SelectScrt from "../../components/select/SelectScrt";
import styles from './GraficoLinha.module.css'
import React from "react";
import { Line } from "react-chartjs-2";
import { ptBR } from "date-fns/locale";
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


const GraficoLinha = ({ children, data, cores, titulo, label, xValue, yValue }) => {
  let datasets = [];
  let unicoDataset = !Array.isArray(data[0]);
  xValue = xValue == undefined ? 'mes' : xValue;
  yValue = yValue == undefined ? 'count' : yValue;
  if (unicoDataset) {
    data = [data]
    label = [label]
  }

  data.forEach((element, i) => {
    let dataValues = [];

    for (let j = 0; j < element.length; j++) {
      dataValues.push(element[j][yValue]);
    }
    element.sort((a, b) => new Date(a[xValue]) - new Date(b[xValue]));

    datasets.push({
      label: label[i],
      backgroundColor: cores[i] + "44",
      borderColor: cores[i],
      borderWidth: 1,
      hoverBackgroundColor: cores[i],
      hoverBorderColor: cores[i],
      data: element,
      parsing: {
        xAxisKey: xValue,  // Chave personalizada para o eixo x
        yAxisKey: yValue   // Chave personalizada para o eixo y
      }
    });
  });

  const dados = {
    datasets: datasets,
  };


  const options = {
    interaction: { intersect: false, mode: "index" },
    scales: {
      x: {
        type: "time",
        time: {
          parser: "yyyy-MM-dd",
          tooltipFormat: "dd MMM  yyyy",
          unit: "day",
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
        beginAtZero: false,
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
    <div style={{ marginTop: "10px", padding: "10px" }}>
      <h5 style={{ color: "#21272A", marginBottom: "10px" }}>
        <strong>{titulo}</strong>
      </h5>

      <>
        {children}

      </>

      {/* <DatePicker className={styles.datepicker} label="Inicio" format="dd/MM/yyyy" size="xs"/> */}
      {/* <DatePicker className={styles.datepicker} label="Fim" format="dd/MM/yyyy" size="xs"/> */}
      <Line data={dados} options={options} />
    </div>
  );
};

export default GraficoLinha;