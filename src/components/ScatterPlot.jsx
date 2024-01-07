import { useContext, useRef } from "react";
import { DataContext } from "../App.jsx";

export default function ScatterPlot({ slider1, slider2, elo }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const canvasHolderRef = useRef(null);
  const lastSlider1 = useRef(null);
  const lastElo = useRef(null);
  const data = useContext(DataContext);

  if (canvasRef.current && data && (lastSlider1.current !== slider1 || lastElo.current !== elo)) {
    lastSlider1.current = slider1;
    lastElo.current = elo;
    
    const chart = chartRef.current;
    const dataset = [];
    for (let i = 0; i < data.length; i++) {
      dataset.push({
        x: data[i][getKey(slider1, elo)],
        y: data[i][getKey(slider2, elo)],
      });
    }

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              let label = data[tooltipItem.dataIndex].name;
              return label;
            },
          },
        },
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          title: {
            display: true,
            text: slider2,
            font: {
              size: 17,
            }
          },
          ticks: {
            display: false,
          },
          grid: {
            color: "#48484a",
          },
        },
        x: {
          title: {
            display: true,
            text: slider1,
            font: {
              size: 17,
            }
          },
          ticks: {
            display: false,
          },
          grid: {
            color: "#48484a",
          },
        },
      },
    };

    if (chart) {
      chart.data.datasets[0].data = dataset;
      chart.options = options;
      chart.update();
    } else {
      chartRef.current = new Chart(canvasRef.current, {
        type: "scatter",
        animationEnabled: true,
        data: {
          datasets: [
            {
              data: dataset,
              pointBackgroundColor: 'rgb(0, 202, 165)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(255z, 99, 132)',
            },
          ],
        },
        options: options,
      });
    }
  }

  function clickShowPlot(e) {
    e.target.classList.toggle("upside-down");
    canvasHolderRef.current.classList.toggle("hide-plot");
  }

  return (
    <div>
      <div className="w-100 plot-drop-header">
        <span>show plot</span>
        <button className="show-plot-button" onClick={clickShowPlot}>
          <svg
            style={{ pointerEvents: "none", marginBottom: "2px" }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-compact-down"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
            />
          </svg>
        </button>
      </div>
      <div id="canvas-holder" ref={canvasHolderRef} className="hide-plot">
        <canvas id="scatterPlot" ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

function getKey(key, elo) {
  switch (key) {
    case "Theory":
      return "theory";
    case "Mistakes":
      return "mistakes_"+elo;
    case "Eval":
      return "evalulate";
    case "Length":
      return "length_"+elo;
    case "Draws":
      return "draws_"+elo;
    case "Popularity":
      return "popularity_"+elo;
    default:
      console.log("error @ getKey: key does not exist. key:");
      console.log(key);
  }
}
