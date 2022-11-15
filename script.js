let gameBoard;
let boardSize = 9;
let displayMines = 10;
let squares = boardSize * boardSize - displayMines;
let gameActive = false;
let gameOver = false;
let time;
let board = [];
let behindBoard = [];
let seconds = 0;
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
            board[i][j].onclick = function() {
                if(!gameOver) {
                    clickOnCell(board, i, j);
                }
            };          
            board[i][j].oncontextmenu = function() {
                if (!gameOver) {
                   flag(board, i, j);
                }
            };
            board[i].appendChild(board[i][j]);
        }
    }
}

function timer() {
    seconds += 1
    document.getElementById('timer').innerHTML = new Date(seconds * 1000).toISOString().slice(14, 19) + " ⏱";
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

function flag(board, i, j) {
    if(board[i][j].className == "flag") {
        board[i][j].classList.remove("flag");
        displayMines += 1;
        counterDisplay.innerHTML = displayMines + " 💣";
    }
    else if(board[i][j].className != "clicked" && board[i][j].className != "mine") {
        board[i][j].className = "flag";
        displayMines -= 1;
        counterDisplay.innerHTML = displayMines + " 💣";
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
    if(!gameActive) {
        time = setInterval(timer, 1000);
    }
    gameActive = true;
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
    if(displayMines == 0 && squares == 0) {
        clearInterval(time);
        gameOver = true;
        gameWon();
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
    document.getElementById("img").src = "images/face_lose.svg";
    clearInterval(time);
    gameOver = true;
    return;
}

function showNumberCell(board, i, j) {
    if(behindBoard[i][j] > 0) {
        board[i][j].innerHTML = behindBoard[i][j];
        board[i][j].className = "clicked";
        --squares;
    }
}

function findEmptyCells(i, j) {
    for(let x = i - 1; x <= i + 1; ++x) {
        for(let y = j - 1; y <= j + 1; ++y) {
            if(x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
                if(behindBoard[x][y] != "💣"&& board[x][y].className != "clicked") {
                    board[x][y].innerText = behindBoard[x][y];
                    board[x][y].className = "clicked";
                    --squares;
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
            if(behindBoard[i][j] == "💣" && board[i][j].className == "flag") {
                document.getElementById("img").src = "images/face_win.svg";
            }
        }
    }
}