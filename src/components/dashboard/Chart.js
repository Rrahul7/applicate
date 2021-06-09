import React from "react";
import "./styles/chart.css";

import { Line } from "react-chartjs-2";

export default function Chart({ labels, dataValue }) {
  let data = {
    labels,
    datasets: [
      {
        label: "Orders",
        data: dataValue,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };
  return (
    <div className="App">
      <Line data={data} />
    </div>
  );
}
