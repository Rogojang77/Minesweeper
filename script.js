let gameBoard;
let cell;
let boardSize = 10;

window.onload = () => {
    createBoard()
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