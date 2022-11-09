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

let xCell, yCell;

function setBombs() {
    for (let i = 0; i <= boardSize; ++i) {
        do {
            xCell = Math.floor(Math.random() * 9);
            yCell = Math.floor(Math.random() * 9);
        } while (isNaN(gameBoard.rows[xCell].cells[xCell].innerHTML));
        gameBoard.rows[yCell].cells[yCell].innerHTML = `<i class="las la-bomb" style="color: red;"></i>`;
    }
}

let seconds = 0;

function timer() {
    seconds += 1
    document.getElementById('timer').innerHTML = new Date(seconds * 1000).toISOString().slice(14, 19) + " ⏱";
}