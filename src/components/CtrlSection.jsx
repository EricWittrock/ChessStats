import ParameterCtrl from "./ParameterCtrl.jsx";
import EloSelect from "./EloSelect.jsx";
import { useEffect, useContext, useState } from "react";
import { DataContext } from '../App.jsx'

export default function CtrlSection({genericCallback}) {
  const [currentSlider, setCurrentSlider] = useState("Theory");
  const [lastSlider, setLastSlider] = useState("Popularity");
  const data = useContext(DataContext);

  function _genericCallback(msg) {
    if(msg.type === "MainSliderChange") {
      if(msg.sliderName !== currentSlider) {
        setLastSlider(currentSlider);
        setCurrentSlider(msg.sliderName);
      }
      genericCallback(msg);
    }else if(msg.type === "WeightSliderChange") {
      genericCallback(msg);
    }else if(msg.type === "EloChange") {
      genericCallback(msg);
    }else if(msg.type === "InitialSliderUpdate") {
      const msg = {
        type: "MainSliderChange",
        sliderName: "Theory",
        mainValue: 0.5,
        weightValue: 0.5,
      }
      genericCallback(msg);
      setLastSlider("Theory");
      setCurrentSlider("Mistakes");
    }
  }

  useEffect(()=>{
    if(data) _genericCallback({type:"InitialSliderUpdate"})
  }, [data]);


  return (
    <>
      <EloSelect genericCallback={_genericCallback}/>
      <div className="vstack gap-3">
        <ParameterCtrl key={"slider1"} sliderName={"Theory"} genericCallback={_genericCallback} />
        <ParameterCtrl key={"slider2"} sliderName={"Mistakes"} genericCallback={_genericCallback} />
        <ParameterCtrl key={"slider3"} sliderName={"Eval"} genericCallback={_genericCallback} />
        <ParameterCtrl key={"slider4"} sliderName={"Length"} genericCallback={_genericCallback} />
        <ParameterCtrl key={"slider5"} sliderName={"Draws"} genericCallback={_genericCallback} />
        <ParameterCtrl key={"slider6"} sliderName={"Popularity"} genericCallback={_genericCallback} />
      </div>
    </>
  );
}