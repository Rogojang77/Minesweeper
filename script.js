let gameBoard;
let cell;
let boardSize = 10;
let bombs = boardSize;

window.onload = () => {
    createBoard()
    generateBombs();
    setInterval(timer, 1000);
}

function createBoard() {
    gameBoard = document.getElementById("gameBoard");
    for (let i = 0; i < boardSize; ++i) {
        for (let j = 0; j < boardSize; ++j) {
            cell = document.createElement("tr");
            cell.className = "cell";
            cell.id = [i, j];
            gameBoard.appendChild(cell);
        }
    }
}

let seconds = 0;

function timer() {
    seconds += 1
    document.getElementById('timer').innerHTML = new Date(seconds * 1000).toISOString().slice(14, 19) + " ⏱";
}

function generateBombs() {
    let bomb;
    do {
        row = Math.floor(Math.random() * boardSize);
        column = Math.floor(Math.random() * boardSize);
        bomb = document.getElementById([row, column]);
        bomb.innerHTML = "💣";
        --bombs;
    } while (bombs > 0);
}