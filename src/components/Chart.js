import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

export default function Chart() {
  const [queueData, setQueueData] = useState({});

  let dataArray = [];
  let colorArray = [];
  useEffect(() => {
    const getDataInterval = setInterval(() => {
      //console.log(dataArray);
      axios.get("https://kea-alt-del.dk/kata-distortion/").then((res) => {
        dataArray.unshift(Number(res.data.inQueue));
        // const color = () => {
        //   return res.data.inQueue > 15
        //     ? "rgba(194, 9, 9, 0.9)"
        //     : "rgba(6, 130, 35, 0.9)";
        // };
        if (res.data.inQueue < 5) {
          colorArray.unshift("rgba(6, 130, 35, 0.9)");
        } else if (res.data.inQueue > 5 && res.data.inQueue < 15) {
          colorArray.unshift("rgba(6, 130, 35, 0.8)");
        } else {
          colorArray.unshift("rgba(194, 9, 9, 0.8)");
        }
        colorArray.splice(1, 1, "rgba(89, 89, 89, 0.3)");
        //colorArray.unshift(color);
        console.log(colorArray);
        chart(dataArray, colorArray);
      });
    }, 5000);
    return () => clearInterval(getDataInterval);
  }, []);

  function chart(dataArray, color) {
    setQueueData({
      labels: ["NOW", "10s", "20s", "30s", "40s", "50s", "1min"],
      datasets: [
        {
          label: `Queue: ${dataArray[0]}`,
          data: dataArray,
          backgroundColor: color,
          borderWidth: 3,
          barPercentage: [0.8, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4],
        },
      ],
    });
  }

  return (
    <div>
      <Bar
        data={queueData}
        options={{
          responsive: true,
          title: { text: "Queue for FooBar", display: true, fontSize: 40 },
          layout: {
            padding: {
              top: 15,
              left: 30,
              right: 30,
              bottom: 15,
            },
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  beginAtZero: true,
                  max: 30,
                  min: 0,
                },
                gridLines: {
                  display: true,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 30,
              boxWidth: 30,
            },
          },
        }}
      />
    </div>
  );
}
