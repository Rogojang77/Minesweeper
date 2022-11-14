let gameBoard;
let boardSize = 9;
let gameOver = false;
let displayMines = 10;
let displayMinesAC = 10;
let board = [];
let hiddenBoard = [];
let timerA;
const counterDisplay = document.getElementById("minesCounter");

window.onload = () => {
    createBoard()
    generateMines();
    timerA = setInterval(timer, 1000);
    countMines();
}

function createBoard() {
    gameBoard = document.getElementById("gameBoard");
    gameBoard.addEventListener('contextmenu', (ev) => {
        ev.preventDefault();
    });
    for (let i = 0; i < boardSize; ++i) {
        hiddenBoard.push([0]);
        board[i] = document.createElement("tr"); 
        gameBoard.appendChild(board[i]);
        for (let j = 0; j < boardSize; ++j) {
            hiddenBoard[i][j] = "0";
            board[i][j] = document.createElement("td");
            board[i][j].id = [i, j];
            board[i][j].value = 0;
            board[i][j].onclick = 
                function() {
                    clickOnCell(board, i, j);
                };
           
            board[i][j].oncontextmenu = 
                function() {
                    if (!gameOver) {
                        if(this.className == "flag") {
                            this.classList.remove("flag");
                            displayMines += 1;
                            counterDisplay.innerHTML = displayMines + " 💣";
                        }
                        else if(this.className != "clicked" && this.className != "mine") {
                            this.className = "flag";
                            displayMines -= 1;
                            counterDisplay.innerHTML = displayMines + " 💣";
                        }
                    }
                };
            board[i].appendChild(board[i][j]);
        }
    }
}


let seconds = 0;

function timer() {
    seconds += 1
    document.getElementById('timer').innerHTML = new Date(seconds * 1000).toISOString().slice(14, 19) + " ⏱";
}

function generateMines() {
    for (let mines = 0; mines <= boardSize; ++mines) {
        row = Math.floor(Math.random() * boardSize);
        column = Math.floor(Math.random() * boardSize);
        if(board[row][column].className == "💣") {
            row = Math.floor(Math.random() * boardSize);
            column = Math.floor(Math.random() * boardSize);
        }
        hiddenBoard[row][column] = "💣";
        board[row][column].className = "💣";
    }
}

function showMines() {
    for (let i = 0; i < boardSize; ++i) {
        for (let j = 0; j < boardSize; ++j) {
            if(board[i][j].className != "flag") {
                if(hiddenBoard[i][j] == "💣") {
                    board[i][j].className = "mine";
                }   
            }
        }    
    }
    gameOver = true;
    clearInterval(timerA);
    return;
}

function clickOnCell(board, i, j) {
    if(gameOver) {
        return;
    }
    if (board[i][j].className != "flag") {
        if(hiddenBoard[i][j] == "💣") {
            showMines();
        } else {
            showNumberCell(board, i, j);
        }
        if (hiddenBoard[i][j] == "") {
            findEmptyCells(i, j);
        }
    }
    if(gameWon()) {
        gameWon();
        return;
    }
}

function countMines() {
    for (let i = 0; i < boardSize; ++i) {
        for (let j = 0; j < boardSize; ++j) {
            if (board[i][j].className != "💣") {
                var mineCounter = 0;
                for (let x = i - 1; x <= i + 1; ++ x) {
                    for (let y = j - 1; y <= j + 1; ++y) {
                        if (x >= 0 && x < boardSize && y >= 0 && y < boardSize && 
                            board[x][y].className == "💣") {
                            ++mineCounter;
                        }
                    }
                }
                if (mineCounter != 0) {
                    board[i][j].className = mineCounter;
                    hiddenBoard[i][j] = mineCounter;
                } else {
                    hiddenBoard[i][j] = "";
                }
            }
        }
    }
}

function showNumberCell(board, i, j) {
    if(hiddenBoard[i][j] > 0) {
        board[i][j].innerHTML = hiddenBoard[i][j];
        board[i][j].className = "clicked";
    }
}

function findEmptyCells(i, j) {
    for (let x = i - 1; x <= i + 1; ++x) {
        for (let y = j - 1; y <= j + 1; ++y) {
            if (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
                if (hiddenBoard[x][y] != "💣"&& board[x][y].className != "clicked") {
                    board[x][y].innerText = hiddenBoard[x][y];
                    board[x][y].value = 1;
                    board[x][y].className = "clicked";
                    if (hiddenBoard[x][y] == "") {
                        findEmptyCells(x, y);
                    }
                }
            }
        }
    }
}

function gameWon() {
    for (let i = 0; i < boardSize; ++i) {
        for (let j = 0; j < boardSize; ++j) {
            if(displayMines == 0) {
                if(hiddenBoard[i][j] == "💣" && board[i][j].className == "flag") {
                    alert("game won");
                    return;
                }
            }
        }
    }
}
