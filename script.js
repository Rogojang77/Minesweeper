let gameBoard;
let cell;
let boardSize = 10;
let mines = boardSize;
let mineCounter = boardSize;
const counterDisplay = document.getElementById("minesCounter");

window.onload = () => {
    createBoard()
    generateMines();
    setInterval(timer, 1000);
}

function createBoard() {
    gameBoard = document.getElementById("gameBoard");
    gameBoard.addEventListener('contextmenu', (ev) => {
        ev.preventDefault();
    });
    for (let i = 0; i < boardSize; ++i) {
        for (let j = 0; j < boardSize; ++j) {
            cell = document.createElement("tr");
            cell.id = [i, j];
            cell.onclick = 
                function() {
                    clickOnCell(this);
                };
            cell.onmouseup = 
                function() { 
                    if(this.className != "clicked" && this.className != "mine") {
                        this.className = "flag";
                    }
                };
            gameBoard.appendChild(cell);
        }
    }
}

let seconds = 0;

function timer() {
    seconds += 1
    document.getElementById('timer').innerHTML = new Date(seconds * 1000).toISOString().slice(14, 19) + " ⏱";
}

function generateMines() {
    let mine;
    do {
        row = Math.floor(Math.random() * boardSize);
        column = Math.floor(Math.random() * boardSize);
        mine = document.getElementById([row, column]);
        mine.setAttribute("mine", "true");
        --mines;
    } while (mines > 0);
}

function selectMines() {
    for (let i = 0; i < boardSize; ++i) {
        for (let j = 0; j < boardSize; ++j) {
            let selectedMines = document.getElementById([i, j]);       
            if (selectedMines.getAttribute("mine")) {
                selectedMines.className = "mine";
            }
        }    
    }
}

function fillCells() {
    
}

function clickOnCell(cell) {
    if (cell.getAttribute("mine")) {
        selectMines();
    } else {
        cell.className = "clicked";
        fillCells();
    }
}