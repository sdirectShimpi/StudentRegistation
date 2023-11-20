// import React from "react";
// import { Pie } from "react-chartjs-2";
// import { Tooltip, ArcElement, Legend, Title, ChartJs } from "chart.js";
// ChartJs.register(Tooltip, ArcElement, Legend, Title);
// const data = {
//   datasets: [
//     {
//       data: [10, 20, 30],
//     },
//   ],

//   labels: ["Red", "Yellow", "Blue"],
// };

// const AddChart = () => {
//   return (
//     <>
//       <div>
//         <Pie data={data} />
//       </div>
//     </>
//   );
// };

// export default AddChart;
import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import axios from "axios";

const data = {
  datasets: [
    {
      data: [10, 20, 30],
      backgroundColor: ["red", "yellow", "blue"],
    },
  ],
  labels: ["Red", "Yellow", "Blue"],
};

const AddChart = () => {
  useEffect(() => {
    if (Chart.controllers && Chart.controllers.pie) {
      Chart.register(Chart.controllers.pie);
    } else {
      console.error("PieController not available or undefined.");
    }

    return () => {
      if (Chart.controllers && Chart.controllers.pie) {
        Chart.unregister(Chart.controllers.pie);
      }
    };
  }, []);

  useEffect(() => {
    const featchData = async () => {
      axios
        .get(`http://localhost:3008/getProduct`)

        .then((response) => {
          console.log("<<<response>>>", response);

          //setData(response.data);
        })
        .catch((err) => console.log(err));
    };
    featchData()
  }, []);

  return (
    <>
      <div style={{ width: "30%", hight: "30%" }}>
        <Pie data={data} />
      </div>
    </>
  );
};

export default AddChart;
