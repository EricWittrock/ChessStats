import { useRef, useEffect } from "react";

export default function PolarPlotHolder({ cards, displayedCardName }) {
  let topCard = null;
  if (cards) {
    topCard = cards.find((card) => card.name === displayedCardName);
  }
  return <>{topCard && <PolarPlot card={topCard} />}</>;
}

function PolarPlot({ card }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const lastCardName = useRef(null);
  const lastElo = useRef(null);

  useEffect(() => {
    if (!card || (lastCardName.current === card.name && lastElo.current === card.elo)) return;
    lastCardName.current = card.name;
    lastElo.current = card.elo;

    const labels = [
      "Theory",
      "Mistakes",
      "Eval",
      "Length",
      "Draws",
      "Popularity",
    ];
    const data = {
      labels: labels,
      datasets: [
        {
          data: [
            card["theory"] * 100,
            card["mistakes_"+card.elo] * 100,
            card["evalulate"] * 100,
            card["length_"+card.elo] * 100,
            card["draws_"+card.elo] * 100,
            card["popularity_"+card.elo] * 100,
          ],
          backgroundColor: 'rgba(0, 202, 165, 0.2)',
          borderColor: 'rgb(0, 202, 165)',
          pointBackgroundColor: 'rgb(0, 202, 165)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255z, 99, 132)',
        },
      ],
    };

    const config = {
      type: "radar",
      data: data,
      options: {
        responsive: true,
        scales: {
          r: {
            min: 0,
            max: 100,
            beginAtZero: true,
            angleLines: {
              display: true,
            },
            ticks: {
              stepSize: 20,
              display: false,
            },
            pointLabels: {
              font: {
                size: 15,
              },
            },
            grid: {
              color: "#48484a",
            },
            angleLines: {
              color: '#48484a'
            }
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };

    if (!chartRef.current) {
      chartRef.current = new Chart(canvasRef.current, config);
      console.log("create polar plot");
    } else {
      chartRef.current.data.datasets[0].data = data.datasets[0].data;
      chartRef.current.update();
      console.log("update polar plot");
    }
  }, [card]);

  return <canvas id="polarPlot" ref={canvasRef} style={{display:"inline-block"}}></canvas>;
}
