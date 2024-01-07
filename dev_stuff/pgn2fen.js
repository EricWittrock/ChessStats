// run this in the console of https://www.chess-poster.com/english/lt_pgn_to_fen/lt_pgn_fen.htm

let list = [
    "1.Na3",
    "1.Nc3",
    "1.Nf3 d5 2.c4",
    "1.Nf3 d5 2.g3",
    "1.Nh3",
    "1.a3",
    "1.a4",
    "1.b3",
    "1.b4",
    "1.c3",
    "1.c4",
    "1.d4 e6 2.c4 b6",
    "1.d3",
    "1.d4 d5 2.Nf3 Nf6 3.Bf4",
    "1.d4 d5 2.Bf4",
    "1.d4 c5",
    "1.d4 Nf6",
    "1.d4 d5 2.c4",
    "1.d4 d6 2.Nf3 Bg4",
    "1.d4 e5",
    "1.d4 e6 2.Nf3 Nf6 3.Bg5",
    "1.d4 f5",
    "1.d4 g6",
    "1.e3",
    "1.e4 Na6",
    "1.e4 Nc6",
    "1.e4 Nf6",
    "1.e4 Nh6",
    "1.e4 a6",
    "1.e4 b6",
    "1.e4 c5",
    "1.e4 c6",
    "1.e4 d5",
    "1.e4 d6",
    "1.e4 e5 2.Nc3",
    "1.e4 e5 2.Nf3 Nc6 3.Bb5",
    "1.e4 e5 2.Nf3 Nc6 3.Bc4",
    "1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6",
    "1.e4 e5 2.Nf3 Nc6 3.d4",
    "1.e4 e5 2.Nf3 Nc6 3.c3",
    "1.e4 e5 2.Nf3 Nf6",
    "1.e4 e5 2.Nf3 d6",
    "1.e4 e5 2.Nf3 d5",
    "1.e4 e5 2.Nf3 Qf6",
    "1.e4 e5 2.f4",
    "1.e4 e5 2.Ke2",
    "1.e4 e5 2.Bc4",
    "1.e4 e5 2.d4",
    "1.e4 e5 2.d3",
    "1.e4 e6",
    "1.e4 g6",
    "1.e4 f6",
    "1.e4 f5",
    "1.e4 h6",
    "1.f3",
    "1.f4",
    "1.g3",
    "1.g4",
    "1.h3",
    "1.h4"
]

let str = "";
for(let i = 0; i<list.length; i++) {
    document.querySelectorAll("textarea")[0].value = list[i];
    pgn2fen();
    let out = document.querySelectorAll("textarea")[1].value;
    let outs = out.split('\n')
    str += "\""+outs[outs.length-2]+"\",\n"
}
console.log(str)
    