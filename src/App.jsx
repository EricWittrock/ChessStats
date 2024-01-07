import { useState, useRef, useEffect, createContext } from 'react'
import CtrlSection from './components/CtrlSection.jsx'
import InfoSection from './components/InfoSection.jsx'
import BoardSection from './components/BoardSection.jsx'
import DescriptionSection from './components/DescriptionSection.jsx'
import PolarPlotHolder from './components/PolarPlot.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

export const DataContext = createContext();

export function App() {
  const [data, setData] = useState(null);
  const sliderValuesRef = useRef({});
  const sliderWeightsRef = useRef({});
  const [cards, setCards] = useState([]);
  const [displayedCardName, setDisplayedCardName] = useState(0);
  const [slider1, setSlider1] = useState("Theory");
  const [slider2, setSlider2] = useState("Mistakes");

  useEffect(() => {
    fetch("../src/data/data.json")
    .then((response) => response.json())
    .then((_data) => {
      console.log(_data);
      setData(handleData(_data));
    })
    .catch((error) => {
      console.log(error);
    });
  }, [])

  function sliderUpdate(sliderName, mainValue, weightValue, eloRange, changeIndex=true) {
    if(!sliderName) return;

    sliderValuesRef.current[sliderName] = mainValue;
    sliderWeightsRef.current[sliderName] = weightValue;

    let c = data.map((opening)=>{
      opening.elo = eloRange||opening.elo;
      return {...opening, distance: dist(opening, sliderValuesRef.current, sliderWeightsRef.current)}
    });

    const indices = c.map((opening, index)=>{
      return [opening, index]
    }).sort((a, b)=>{
      return a[0].distance - b[0].distance;
    });

    for(let i = 0; i<indices.length; i++) {
      c[indices[i][1]].index = i;
    };

    if(changeIndex) {
      let topCard = c[indices[0][1]];
      setDisplayedCardName(topCard.name);
    }

    setCards(c);
  }

  function genericCallback(msg) {
    if(msg.type === "OpeningCardClick") {
      console.log("OpeningCardClick @ App.jsx | name: "+msg.name);
      setDisplayedCardName(msg.name);
    } else if(msg.type === "MainSliderChange") {
      sliderUpdate(msg.sliderName, msg.mainValue, msg.weightValue, 0);
      if(msg.sliderName !== slider1) {
        setSlider2(slider1);
        setSlider1(msg.sliderName);
      }
    } else if(msg.type === "WeightSliderChange") {
      sliderUpdate(msg.sliderName, msg.mainValue, msg.weightValue, 0);
    } else if(msg.type === "EloChange") {
      console.log("EloChange @ App.jsx | eloRange: "+msg.eloRange);
      sliderUpdate(slider1, sliderValuesRef.current[slider1], sliderWeightsRef.current[slider1], msg.eloRange, false);
    }
  }

  return (
    <>
    <Header/>

    <div id="main-div">

      <p className="read-the-docs">
        Move the sliders to find <i>your</i> chess opening
      </p>
      
      <div className="card w-100 mb-2">
      <DescriptionSection cards={cards} displayedCardName={displayedCardName}/>
        <div className="row">
              <div className="col-sm-6">
                <BoardSection cards={cards} displayedCardName={displayedCardName}/>
              </div>
              <div className="col-sm-6">
                <PolarPlotHolder cards={cards} displayedCardName={displayedCardName}/>
              </div>
          </div>
      </div>

      <div className="container w-100">
          <div className="row">
            <DataContext.Provider value={data}>
              {
                data && // render when data is not null
                <>
                  <div className="col-lg-6">
                    <CtrlSection genericCallback={genericCallback}/>
                  </div>
                  <div className="col-lg-6">
                    <InfoSection cards={cards} slider1={slider1} slider2={slider2} genericCallback={genericCallback}/>
                  </div>
                </>
              }
            </DataContext.Provider>
          </div>
      </div>
      </div>
      <Footer/>
    </>
  )
}

function handleData(data) { // parse data.json
  let c = [];
  for(let i = 0; i<data.names.length; i++) {
    c.push({
      name: data.names[i],
      fen: data.fen[i],
      moves: data.moves[i],
      theory: data.theory[i],
      mistakes_all: data.mistakes_all[i],
      mistakes_low: data.mistakes_low[i],
      mistakes_med: data.mistakes_med[i],
      mistakes_high: data.mistakes_high[i],
      evalulate: data.eval[i],
      popularity_all: data.length_all[i][0],
      popularity_low: data.length_low[i][0],
      popularity_med: data.length_med[i][0],
      popularity_high: data.length_high[i][0],
      length_all: data.length_all[i][1]/data.length_all[i][0],
      length_low: data.length_low[i][1]/data.length_low[i][0],
      length_med: data.length_med[i][1]/data.length_med[i][0],
      length_high: data.length_high[i][1]/data.length_high[i][0],
      draws_all: data.winrate_all[i][2]/(data.winrate_all[i][0]+data.winrate_all[i][1]),
      draws_low: data.winrate_low[i][2]/(data.winrate_low[i][0]+data.winrate_low[i][1]),
      draws_med: data.winrate_med[i][2]/(data.winrate_med[i][0]+data.winrate_med[i][1]),
      draws_high: data.winrate_high[i][2]/(data.winrate_high[i][0]+data.winrate_high[i][1]),
      distance: 0,
      elo: "all",
      index: i,
    })
  }

  const theory_max_min = getMaxMin(c, "theory");
  const mistakes_all_max_min = getMaxMin(c, "mistakes_all");
  const mistakes_low_max_min = getMaxMin(c, "mistakes_low");
  const mistakes_med_max_min = getMaxMin(c, "mistakes_med");
  const mistakes_high_max_min = getMaxMin(c, "mistakes_high");
  const eval_max_min = getMaxMin(c, "evalulate");
  const popularity_all_max_min = getMaxMin(c, "popularity_all");
  const popularity_low_max_min = getMaxMin(c, "popularity_low");
  const popularity_med_max_min = getMaxMin(c, "popularity_med");
  const popularity_high_max_min = getMaxMin(c, "popularity_high");
  const length_all_max_min = getMaxMin(c, "length_all");
  const length_low_max_min = getMaxMin(c, "length_low");
  const length_med_max_min = getMaxMin(c, "length_med");
  const length_high_max_min = getMaxMin(c, "length_high");
  const draws_all_max_min = getMaxMin(c, "draws_all");
  const draws_low_max_min = getMaxMin(c, "draws_low");
  const draws_med_max_min = getMaxMin(c, "draws_med");
  const draws_high_max_min = getMaxMin(c, "draws_high");

  for(let i = 0; i<c.length; i++) {
    c[i].theory = (c[i].theory - theory_max_min[1])/(theory_max_min[0] - theory_max_min[1]);
    c[i].mistakes_all = (c[i].mistakes_all - mistakes_all_max_min[1])/(mistakes_all_max_min[0] - mistakes_all_max_min[1]);
    c[i].mistakes_low = (c[i].mistakes_low - mistakes_low_max_min[1])/(mistakes_low_max_min[0] - mistakes_low_max_min[1]);
    c[i].mistakes_med = (c[i].mistakes_med - mistakes_med_max_min[1])/(mistakes_med_max_min[0] - mistakes_med_max_min[1]);
    c[i].mistakes_high = (c[i].mistakes_high - mistakes_high_max_min[1])/(mistakes_high_max_min[0] - mistakes_high_max_min[1]);
    c[i].evalulate = (c[i].evalulate - eval_max_min[1])/(eval_max_min[0] - eval_max_min[1]);
    c[i].popularity_all = (c[i].popularity_all - popularity_all_max_min[1])/(popularity_all_max_min[0] - popularity_all_max_min[1]);
    c[i].popularity_low = (c[i].popularity_low - popularity_low_max_min[1])/(popularity_low_max_min[0] - popularity_low_max_min[1]);
    c[i].popularity_med = (c[i].popularity_med - popularity_med_max_min[1])/(popularity_med_max_min[0] - popularity_med_max_min[1]);
    c[i].popularity_high = (c[i].popularity_high - popularity_high_max_min[1])/(popularity_high_max_min[0] - popularity_high_max_min[1]);
    c[i].length_all = (c[i].length_all - length_all_max_min[1])/(length_all_max_min[0] - length_all_max_min[1]);
    c[i].length_low = (c[i].length_low - length_low_max_min[1])/(length_low_max_min[0] - length_low_max_min[1]);
    c[i].length_med = (c[i].length_med - length_med_max_min[1])/(length_med_max_min[0] - length_med_max_min[1]);
    c[i].length_high = (c[i].length_high - length_high_max_min[1])/(length_high_max_min[0] - length_high_max_min[1]);
    c[i].draws_all = (c[i].draws_all - draws_all_max_min[1])/(draws_all_max_min[0] - draws_all_max_min[1]);
    c[i].draws_low = (c[i].draws_low - draws_low_max_min[1])/(draws_low_max_min[0] - draws_low_max_min[1]);
    c[i].draws_med = (c[i].draws_med - draws_med_max_min[1])/(draws_med_max_min[0] - draws_med_max_min[1]);
    c[i].draws_high = (c[i].draws_high - draws_high_max_min[1])/(draws_high_max_min[0] - draws_high_max_min[1]);
  }

  return c;
}

function getMaxMin(array, key) {
  let max = -Infinity;
  let min = Infinity;
  for(let i = 0; i<array.length; i++) {
    if(array[i][key] > max) {
      max = array[i][key];
    }
    if(array[i][key] < min) {
      min = array[i][key];
    }
  }
  return [max, min];
}

function dist(card, sliderValues, sliderWeights) {
  const elo = card.elo;
  const theory = card["theory"];
  const mistakes = card["mistakes_"+elo];
  const evalulate = card["evalulate"];
  const popularity = card["popularity_"+elo];
  const length = card["length_"+elo];
  const draws = card["draws_"+elo];

  const slider_theory = handleUndefined(sliderValues['Theory']);
  const slider_mistakes = handleUndefined(sliderValues['Mistakes']);
  const slider_evalulate = handleUndefined(sliderValues['Eval']);
  const slider_length = handleUndefined(sliderValues['Length']);
  const slider_draws = handleUndefined(sliderValues['Draws']);
  const slider_pop = handleUndefined(sliderValues['Popularity']);

  const weight_theory = handleUndefined(sliderWeights['Theory']);
  const weight_mistakes = handleUndefined(sliderWeights['Mistakes']);
  const weight_evalulate = handleUndefined(sliderWeights['Eval']);
  const weight_length = handleUndefined(sliderWeights['Length']);
  const weight_draws = handleUndefined(sliderWeights['Draws']);
  const weight_pop = handleUndefined(sliderWeights['Popularity']);

  let dist = 0;
  dist += Math.pow(theory - slider_theory, 2) * weight_theory;
  dist += Math.pow(mistakes - slider_mistakes, 2) * weight_mistakes;
  dist += Math.pow(evalulate - slider_evalulate, 2) * weight_evalulate;
  dist += Math.pow(length - slider_length, 2) * weight_length;
  dist += Math.pow(draws - slider_draws, 2) * weight_draws;
  dist += Math.pow(popularity - slider_pop, 2) * weight_pop;

  return dist;
}

function handleUndefined(value) {
  if(value === undefined) {
    return 0.5;
  }
  return value;
}