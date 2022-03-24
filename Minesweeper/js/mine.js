'use strict'

const MINE = '💣'
const FLAG = '🚩'
var elTimer = document.querySelector('.timer');
var gMineCounter;

var gLevel = {
    size: 4,
    mines: 2
}
var gBoard = {
    minesAroundCount: gMineCounter,
    isShown: false,
    isMine: false,
    isMarked: false

}
var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gGameBoard;


function init() {
    gGameBoard = createBoard()
    renderBoard(gGameBoard)
    // locateMines(gGameBoard, gLevel.mines)
    gGameBoard[3][1].isMine = true;
    gGameBoard[1][3].isMine = true;

    var mineCell = document.querySelector('.cell-3-1')
    mineCell.innerText = MINE
    var mineCell1 = document.querySelector('.cell-1-3')
    mineCell1.innerText = MINE

}


function cellClicked(event, i, j) {
    var cell = document.querySelector('.cell-' + i + '-' + j)
    if (gGameBoard[i][j].isMine) checkGameOver()
    else {
        gGameBoard[i][j].isShown = true;
        gMineCounter = setMinesNegsCount(i, j)
        cell.innerText = gMineCounter
    }

    // setInterval(startTimer, 10)

}


function setMinesNegsCount(colIdx, rowIdx) {
    var counter = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > gGameBoard.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > gGameBoard[0].length - 1) continue;
            if (i === rowIdx && j === colIdx) continue;
            var cell = gGameBoard[i][j];
            if (cell.isMine) counter++
        }
    }
    if (counter === 0) expandShown(colIdx, rowIdx)
    return counter
}

function cellMarked(event, i, j) {
    var cell = document.querySelector('.cell-' + i + '-' + j)

    if (!gGameBoard[i][j].isShown) gGameBoard[i][j].isMarked = true;
    if (gGameBoard[i][j].isMarked) {
        cell.innerText = FLAG;
        gGameBoard[j][i].isMine = false;
    }


}


function expandShown(colIdx, rowIdx) {

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > gGameBoard.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > gGameBoard[0].length - 1) continue;
            if (i === rowIdx && j === colIdx) continue;
            var cell = gGameBoard[i][j];
            if (!cell.isMine) cell.isShown = true;
            console.log('f', cell.isShown);
        }
    }
    console.table(gGameBoard)
}


function checkGameOver() {
    init()
}

function startTimer() {
    count += (1 / 100);
    elTimer.innerText = count.toFixed(3);
}

// function locateMines(board, amount) {
//     for (var i = 0; i < amount; i++) {
//         var rowIdx = getRandomIntInclusive(0, board.length - 1)
//         var colIdx = getRandomIntInclusive(0, board.length - 1)
//         board[rowIdx][colIdx].isMine = true;
//         board[rowIdx][colIdx].isMine = true;

//         var mineCell = document.querySelector('.cell-' + rowIdx + '-' + colIdx)
//         mineCell.innerText = MINE
//         var mineCell1 = document.querySelector('.cell-' + rowIdx + '-' + colIdx)
//         mineCell1.innerText = MINE
//     }
//     console.table(board);
// }