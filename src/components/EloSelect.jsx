import { useRef, useState } from "react";

export default function EloSelect({ genericCallback }) {
  const tipBoxRef = useRef(null);
  const [eloRange, setEloRange] = useState("all");

  function mouseEnter() {
    tipBoxRef.current.classList.remove("hide-box");
  }

  function mouseLeave() {
    tipBoxRef.current.classList.add("hide-box");
  }

  function clickLow() {
    genericCallback({ type: "EloChange", eloRange: "low" });
    setEloRange("low");
  }

  function clickMed() {
    genericCallback({ type: "EloChange", eloRange: "med" });
    setEloRange("med");
  }

  function clickHigh() {
    genericCallback({ type: "EloChange", eloRange: "high" });
    setEloRange("high");
  }

  function clickAll() {
    genericCallback({ type: "EloChange", eloRange: "all" });
    setEloRange("all");
  }

  return (
    <div id="eloButtonHolder">
      <div className="row">
        <div className="col-3">
          <h4
            data-toggle="tooltip"
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-question-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
            </svg>
            <span> Elo</span>
          </h4>
        </div>

        <div className="col-9">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className={
                "btn btn-elo" + (eloRange == "low" ? " elo-selected" : "")
              }
              onClick={clickLow}
            >
              Low
            </button>
            <button
              type="button"
              className={
                "btn btn-elo" + (eloRange == "med" ? " elo-selected" : "")
              }
              onClick={clickMed}
            >
              Medium
            </button>
            <button
              type="button"
              className={
                "btn btn-elo" + (eloRange == "high" ? " elo-selected" : "")
              }
              onClick={clickHigh}
            >
              High
            </button>
            <button
              type="button"
              className={
                "btn btn-elo" + (eloRange == "all" ? " elo-selected" : "")
              }
              onClick={clickAll}
            >
              All
            </button>
          </div>
        </div>
      </div>
      <p ref={tipBoxRef} className="tip-box hide-box">
        An opening that is common among low-rated players might not be popular
        for advanced players and vice versa. The same is true for mistakes,
        length, and draws. Selecting “Low” will calculate the statistics from
        games below 1200 Elo (Lichess). “Medium” corresponds to games from
        1200-2000, and “High” includes all games above 2000 Elo.<br/><br/>Also, I don’t
        know where else to tell you this, but be sure to check out the “info”
        tab in the header if you want to know more about what each of these
        sliders mean.
      </p>
    </div>
  );
}
