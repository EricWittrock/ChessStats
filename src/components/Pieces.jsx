export function WhitePawn({squareWidth, isDragging}) {
    return (
        <img className={"chess-piece"+(isDragging?"-dragging":"")} width={squareWidth} src="../src/assets/wp1.png"></img>
    )
}

export function BlackPawn({squareWidth, isDragging}) {
    return (
        <img className={"chess-piece"+(isDragging?"-dragging":"")} width={squareWidth} src="../src/assets/bp1.png"></img>
    )
}

export function WhiteRook({squareWidth, isDragging}) {
    return (
        <img className={"chess-piece"+(isDragging?"-dragging":"")} width={squareWidth} src="../src/assets/wr1.png"></img>
    )
}

export function BlackRook({squareWidth, isDragging}) {
    return (
        <img className={"chess-piece"+(isDragging?"-dragging":"")} width={squareWidth} src="../src/assets/br1.png"></img>
    )
}

export function WhiteKnight({squareWidth, isDragging}) {
    return (
        <img className={"chess-piece"+(isDragging?"-dragging":"")} width={squareWidth} src="../src/assets/wn1.png"></img>
    )
}

export function BlackKnight({squareWidth, isDragging}) {
    return (
        <img className={"chess-piece"+(isDragging?"-dragging":"")} width={squareWidth} src="../src/assets/bn1.png"></img>
    )
}

export function WhiteBishop({squareWidth, isDragging}) {
    return (
        <img className={"chess-piece"+(isDragging?"-dragging":"")} width={squareWidth} src="../src/assets/wb1.png"></img>
    )
}

export function BlackBishop({squareWidth, isDragging}) {
    return (
        <img className={"chess-piece"+(isDragging?"-dragging":"")} width={squareWidth} src="../src/assets/bb1.png"></img>
    )
}

export function WhiteQueen({squareWidth, isDragging}) {
    return (
        <img className={"chess-piece"+(isDragging?"-dragging":"")} width={squareWidth} src="../src/assets/wq1.png"></img>
    )
}

export function BlackQueen({squareWidth, isDragging}) {
    return (
        <img className={"chess-piece"+(isDragging?"-dragging":"")} width={squareWidth} src="../src/assets/bq1.png"></img>
    )
}

export function WhiteKing({squareWidth, isDragging}) {
    return (
        <img className={"chess-piece"+(isDragging?"-dragging":"")} width={squareWidth} src="../src/assets/wk1.png"></img>
    )
}

export function BlackKing({squareWidth, isDragging}) {
    return (
        <img className={"chess-piece"+(isDragging?"-dragging":"")} width={squareWidth} src="../src/assets/bk1.png"></img>
    )
}