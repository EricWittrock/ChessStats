import { useRef, useState } from "react";

export default function ParameterCtrl({sliderName, genericCallback}) {
  const [sliderValue, setSliderValue] = useState(-1);
  const [weightValue, setWeightValue] = useState(1);
  const [eloRange, setEloRange] = useState(3);
  const weightSliderRef = useRef(null);
  const mainSliderRef = useRef(null);
  const advancedRef = useRef(null);
  const advancedButtonRef = useRef(null);
  const sliderHovered = useRef(false);

  const labelStrings = {
    "Theory": ["Theory", "Mostly Common lines", "Medium Theory", "Frequent Offbeat Lines"],
    "Mistakes": ["Mistakes", "Trivial Opening", "Blunders Are Rare", "Normal Opening", "A Few Mistakes", "You'll Shoot Yourself In The Foot"],
    "Eval": ["Eval", "Inacuracy By White", "Favors Black", "Even", "Favors White", "Inacuracy By Black"],
    "Length": ["Length", "~25 Moves/Game", "~30 Moves/Game", "~35 Moves/Game"],
    "Draws": ["Draws", "1 Draw Per 20 Games", "Slightly Agressive", "Average Draw-Rate", "Slightly Passive", "1 Draw Per 30 Games"],
    "Popularity": ["Popularity", "Frivilous", "Mainstream", "Popular", "Very Popular", "The Sicillian"],
  }

  function clickAdvanced(e) {
    if(advancedButtonRef.current.classList.contains('on')) {
      advancedRef.current.style.maxHeight = "0em";
      advancedRef.current.classList.add('hide-advanced');
      advancedButtonRef.current.classList.remove('on');
    }else {
      advancedRef.current.style.maxHeight = "20em";
      advancedRef.current.classList.remove('hide-advanced');
      advancedButtonRef.current.classList.add('on');
    }
  }

  function mainSliderChanged() {
    setSliderValue(mainSliderRef.current.value*1);
    let mainValue = mainSliderRef.current.value/100;
    let weightValue = weightSliderRef.current.value/100;
    //changeCallback(sliderName, mainValue, weightValue, eloRange);
    let msg = {
      type: "MainSliderChange",
      sliderName: sliderName,
      mainValue: mainValue,
      weightValue: weightValue,
    }
    genericCallback(msg);
  }

  function sliderMouseEnter() {
    sliderHovered.current = true;
  }

  function sliderMouseOut() {
    sliderHovered.current = false;
    setTimeout(function() {
      if(!sliderHovered.current) {
        setSliderValue(-1*Math.abs(sliderValue));
      }
    }, 1000);
  }

  function weightSliderChanged() {
    let mainValue = mainSliderRef.current.value/100;
    let weightValue = 4*Math.pow(weightSliderRef.current.value/100,2);
    setWeightValue(weightValue);
    //changeCallback(sliderName, mainValue, weightValue, eloRange);
    let msg = {
      type: "WeightSliderChange",
      sliderName: sliderName,
      mainValue: mainValue,
      weightValue: weightValue,
    }
    genericCallback(msg);
  }

  
  return (
    <div className="p-2 border controller-box">
      <div>
        <div className="row">
          <div className="col-10">
            <div className="w-100 slider-label-box">
              {
                labelStrings[sliderName].map((str, index)=>{
                  const strs = labelStrings[sliderName];
                  let sv = sliderValue;
                  if(sv < 0) sv = -1;
                  let shift = Math.min(Math.floor(sv/(100/(strs.length-1))), strs.length-2);
                  shift += 1;
                  shift*=-1.5;

                  let opacity = 0;
                  if(index == Math.floor(Math.abs(shift/1.5))){
                    opacity = 1;
                  }

                  let classname = "slider-label-text-description";
                  if(str == labelStrings[sliderName][0]) {
                    classname = "slider-label-text-main";
                  }
                  
                  const styleObj = {transform: "translateY("+shift+"em) rotateY("+(1-opacity)*70+"deg)", opacity:opacity};
                  return <div key={index+"_labelString"} className={"slider-label-text "+classname} style={styleObj}>{str}</div>
                })
              }
            </div>
          </div>
          <div className="col-2">
            <div ref={advancedButtonRef} className="toggle" type="button" onClick={clickAdvanced}>
              <div className="one"></div>
              <div className="two"></div>
              <div className="three"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {(weightValue == 0) && <span style={{color:"rgb(231 106 106)"}}>Disabled. Enable using this cards's settings.</span>}
        <input ref={mainSliderRef} type="range" className="opening-slider" id={"slider_"+sliderName} style={{display: (weightValue == 0)?"none":""}} onChange={mainSliderChanged} onMouseDown={sliderMouseEnter} onMouseUp={sliderMouseOut}></input>
      </div>

      {/* Advanced Settings Section */}
      <div ref={advancedRef} className="advanced-section hide-advanced" style={{width:"100%"}}>
        <hr></hr>
        <h4>Slider Weight ({(weightValue*100).toFixed()}%)</h4>
        {(weightValue == 0) && <span style={{color:"rgb(231 106 106)"}}>Enable by increasing the slider weight from zero</span>}
        <p>use this slider to change the importance of the <b>{sliderName}</b> statistic</p>
        <input ref={weightSliderRef} type="range" className="weight-slider" onChange={weightSliderChanged} defaultValue={(Math.sqrt(weightValue/4)*100).toFixed()}></input>
      </div>
    </div>
  )
}