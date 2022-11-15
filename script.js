let gameBoard;
let boardSize = 9;
let gameActive = true;
let timeSet = false;
let time;
let displayMines = 10;
let board = [];
let behindBoard = [];
const counterDisplay = document.getElementById("minesCounter");

window.onload = () => {
    createBoard()
    generateMines();
    countMines();
}

function createBoard() {
    gameBoard = document.getElementById("gameBoard");
    gameBoard.addEventListener('contextmenu', (ev) => {
        ev.preventDefault();
    });
    for (let i = 0; i < boardSize; ++i) {
        behindBoard.push([0]);
        board[i] = document.createElement("tr"); 
        gameBoard.appendChild(board[i]);
        for (let j = 0; j < boardSize; ++j) {
            behindBoard[i][j] = "0";
            board[i][j] = document.createElement("td");
            board[i][j].id = [i, j];
            board[i][j].onclick = function() {
                if (gameActive) {
                    clickOnCell(board, i, j);
                } 
            };          

            board[i][j].oncontextmenu = function() {
                if (gameActive) {
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
    timeSet = true;
    gameWon();
}

function generateMines() {
    for(let mines = 0; mines <= boardSize; ++mines) {
        row = Math.floor(Math.random() * boardSize);
        column = Math.floor(Math.random() * boardSize);
        while(board[row][column].className == "💣") {
            row = Math.floor(Math.random() * boardSize);
            column = Math.floor(Math.random() * boardSize);
        }
        behindBoard[row][column] = "💣";
        board[row][column].className = "💣";
    }
}

function countMines() {
    for(let i = 0; i < boardSize; ++i) {
        for(let j = 0; j < boardSize; ++j) {
            if(board[i][j].className != "💣") {
                var mineCounter = 0;
                for(let x = i - 1; x <= i + 1; ++ x) {
                    for(let y = j - 1; y <= j + 1; ++y) {
                        if(x >= 0 && x < boardSize && y >= 0 && y < boardSize && 
                            board[x][y].className == "💣") {
                            ++mineCounter;
                        }
                    }
                }
                if(mineCounter != 0) {
                    board[i][j].className = mineCounter;
                    behindBoard[i][j] = mineCounter;
                } else {
                    behindBoard[i][j] = "";
                }
            }
        }
    }
}

function clickOnCell(board, i, j) {
    if(!timeSet && gameActive) {
        time = setInterval(timer, 1000);
    }
    if(board[i][j].className != "flag") {      
        if(behindBoard[i][j] == "💣") {
            showMines();
        } else {
            showNumberCell(board, i, j);
        }
        if(behindBoard[i][j] == "") {
            findEmptyCells(i, j);
        }
    }
}

function showMines() {
    for(let i = 0; i < boardSize; ++i) {
        for(let j = 0; j < boardSize; ++j) {
            if(board[i][j].className != "flag") {
                if(behindBoard[i][j] == "💣") {
                    board[i][j].className = "mine";
                }   
            }
        }    
    }
    document.getElementById("img").src = "face_lose.svg";
    gameActive = false;
    clearInterval(time);
    return;
}

function showNumberCell(board, i, j) {
    if(behindBoard[i][j] > 0) {
        board[i][j].innerHTML = behindBoard[i][j];
        board[i][j].className = "clicked";
    }
}

function findEmptyCells(i, j) {
    for(let x = i - 1; x <= i + 1; ++x) {
        for(let y = j - 1; y <= j + 1; ++y) {
            if(x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
                if(behindBoard[x][y] != "💣"&& board[x][y].className != "clicked") {
                    board[x][y].innerText = behindBoard[x][y];
                    board[x][y].className = "clicked";
                    if(behindBoard[x][y] == "") {
                        findEmptyCells(x, y);
                    }
                }
            }
        }
    }
}

function gameWon() {
    for(let i = 0; i < boardSize; ++i) {
        for(let j = 0; j < boardSize; ++j) {
            if(displayMines == 0) {
                gameActive = false;
                clearInterval(time);
                if(behindBoard[i][j] == "💣" && board[i][j].className == "flag") {
                    document.getElementById("img").src = "face_win.svg";
                    return;
                }
            } else {
                continue;
            }
        }
    }
}