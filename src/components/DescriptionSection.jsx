import PolarPlot from "./PolarPlot";

export default function DescriptionSection({ cards, displayedCardName }) {
  let title = "";
  let moves = "";
  const topCard = cards.find((card) => card.name === displayedCardName);
  if (topCard) {
    title = topCard.name;
    moves = topCard.moves;
  }

  return (
    <div className="">
      <h1>{title}</h1>
      <p>{moves}</p>
      <OpeningDescription name={title}/>
      {topCard && <PolarPlot card={topCard} />}
    </div>
  );
}


function OpeningDescription({name}) {
  switch(name){
    case "London System*":
    return (
      <p>*This is not an opening, it is a system. However, it is being treated as an opening with the move order shown above. </p>
    );

    default:
    return null;
  }
}