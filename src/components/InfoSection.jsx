import OpeningCard from "./OpeningCard.jsx";
import ScatterPlot from "./ScatterPlot.jsx";
import { useState } from "react";

export default function InfoSection({ cards, slider1, slider2, genericCallback }) {
  const [numShown, setNumShown] = useState(15);

  function showMoreClick() {
    if (numShown < cards.length) {
      setNumShown(Math.min(numShown + 15, cards.length));
    }
  }

  return (
    <>
      <ScatterPlot slider1={slider1} slider2={slider2} elo={(cards && cards[0]) ? cards[0].elo : "all"}/>
      <div className="vstack gap-1 card-stack" style={{height:numShown*50+"px"}}>
        {cards.map((opening, index) => {
          const ranking = opening.index;
          if (ranking < numShown) {
            return (
              <OpeningCard key={opening.name + "_card"} cards={cards} index={index} genericCallback={genericCallback}/>
            );
          }
        })}
      </div>
      {numShown < cards.length && (
        <button className="btn show-more" onClick={showMoreClick}>
          Show More
        </button>
      )}
    </>
  );
}
