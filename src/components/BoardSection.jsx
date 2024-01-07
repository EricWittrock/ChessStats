import { Chessboard } from "react-chessboard";
import { useEffect } from "react";
import * as Pieces from "./Pieces.jsx";

export default function BoardSection({cards, displayedCardName}) {

  let fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  if(cards && cards.length > 0) {
    fen = cards.find(card=>card.name===displayedCardName).fen;
  }

  useEffect(() => { // board wave animation
    const cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const rows = ['1', '2', '3', '4', '5', '6', '7', '8'];

    for(let i=0; i<cols.length; i++) {
      for(let j=0; j<rows.length; j++) {
        if((i+j)%2==0) continue; // skip dark squares
        let time = (i+j-1)*50;
        setTimeout(()=>{
          let div = document.querySelector(`div[data-square=${cols[i]+rows[j]}]`);
          if(div) div.style.backgroundColor='rgba(0, 202, 165, 0.5)';
        }, time);
        setTimeout(()=>{
          let div = document.querySelector(`div[data-square=${cols[i]+rows[j]}]`);
          if(div) div.style.backgroundColor='rgba(0, 202, 165, 0.25)';
        }, time+300);
      }
    }
  }, [fen]);

  return (
    <div style={{boxShadow: "0px 0px 8px #00000070", padding:"2%"}}>
        <Chessboard id="chessboard" 
          position={fen}
          customDarkSquareStyle={{ backgroundColor: 'rgba(0, 202, 165, 0.05)', borderRadius: "15%", transition: "0.5s"}}
          customLightSquareStyle={{ backgroundColor: 'rgba(0, 202, 165, 0.1)', borderRadius: "15%", transition: "0.5s"}}
          customPieces={{wP:Pieces.WhitePawn, bP:Pieces.BlackPawn, wR:Pieces.WhiteRook, bR:Pieces.BlackRook, wN:Pieces.WhiteKnight, bN:Pieces.BlackKnight, wB:Pieces.WhiteBishop, bB:Pieces.BlackBishop, wQ:Pieces.WhiteQueen, bQ:Pieces.BlackQueen, wK:Pieces.WhiteKing, bK:Pieces.BlackKing}}
        />
    </div>
  )
}


