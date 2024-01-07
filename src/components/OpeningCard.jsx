export default function OpeningCard({cards, index, genericCallback}) {
  let ranking = cards[index].index;
  let distance = cards[index].distance;
  let name = cards[index].name;
  let moves = cards[index].moves;
  let percent = percentMatch(distance);
  let radialGradient = `radial-gradient(rgb(75 77 80) 57%, transparent 61%), conic-gradient(rgb(57 61 66) ${100-percent}%, rgb(0 202 165) ${100-percent}%)`;

  function clickedCard() {
    const msg = {
      type:"OpeningCardClick",
      name:name,
      index:ranking
    }
    genericCallback(msg);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <div className="opening-card" style={{top:ranking*50+"px"}} onClick={clickedCard}>
      <div className="row">
        <div className="col-4 match-txt-col">
          <div className="match-txt" style={{backgroundImage: radialGradient}}>{percent}%</div>
          <span className="text-that-says-match">Match</span>
        </div>
        <div className="col-8">
          <div className="opening-name-txt"><span className="opening-name-span">{name}</span></div>
        </div>
      </div>
    </div>
  )
}

function percentMatch(dist) {
  //const percent = Math.pow(Math.E, -32*dist*dist);
  const percent = 1/(1+60*dist*dist);
  return (percent*100).toFixed();
}