const board = document.querySelector(".board")
const status = document.querySelector(".status")
const restartBtn = document.querySelector(".reset-btn")



let playGame = true;
let grid = [null, null, null, null, null, null, null, null, null];
let playerTurn = 1; // 1 means X ; 0 means O


//Console.log/dir || alert for debugging
let debug = false; // set this to false in production
function debugLog(text, loud=0) {
  if (!debug) {
    return
  }
  if (loud == 1) {
    console.dir(text)
  } else if (loud == 2) {
    alert(text)
  } else {
    console.log(text)
  }
}

debugLog(board.children)

if (playGame) {
  restartBtn.hidden = true;
  debugLog(restartBtn.hidden, 1)
  board.addEventListener("click", (evt) => {
    const box = evt.target
    validateInput(box)
    debugLog(box.getAttribute("data-index")) 
  })
}

function validateInput(box) {
  const index = box.getAttribute("data-index")
  if (grid[index] != null) {
    debugLog("This box is already filled", 2)
  } else {
    grid[index] = playerTurn
    showXO(box, playerTurn)
    changePlayerTurn()
    checkWinManager()
  }
}

function changePlayerTurn() {
  if (playerTurn == 1) {
    playerTurn = 0
    status.innerText = "Player O's Turn"
  } else {
    playerTurn = 1
    status.innerText = "Player X's Turn"
  }
}

function showXO(box, player) {
  if (player == 0) {
    box.innerText = "O"
  } else {
    box.innerText = "X"
  }
}
function checkWinManager() {
  
  if (checkWin(0) == true) {
    debugLog(`${grid} || 0 won! `)
    status.innerHTML = "<h2>Player O Won The Match! </h2>"
    stopGame()
  }
  if (checkWin(1) == true) {
    debugLog(`${grid} || X won! `)
    status.innerHTML = "<h2>Player X Won The Match! </h2>"
    stopGame()
  }
  if (!grid.includes(null)) {
    status.innerHTML = "<h2>Its a Draw</h2>"
    stopGame()
  }
}


function checkWin(XO) {
  //Horizontal win checks
  if (grid[0] == XO && grid[1] == XO && grid[2] == XO) {
    return true;
  }
  if (grid[3] == XO && grid[4] == XO && grid[5] == XO) {
    return true;
  }
  if (grid[6] == XO && grid[7] == XO && grid[8] == XO) {
    return true;
  }
  //Vertical win checks
  if (grid[0] == XO && grid[3] == XO && grid[6] == XO) {
    return true;
  }
  if (grid[1] == XO && grid[4] == XO && grid[7] == XO) {
    return true;
  }
  if (grid[2] == XO && grid[5] == XO && grid[8] == XO) {
    return true;
  }
  //Diagonal win checks
  if (grid[0] == XO && grid[4] == XO && grid[8] == XO) {
    return true;
  }
  if (grid[2] == XO && grid[4] == XO && grid[6] == XO) {
    return true;
  }
  return false;
}

function stopGame() {
  playGame = false
  board.hidden = true;
  debugLog(`board.hidden = ${board.hidden}`)
  fillExtraGrid()
  restartGame()
  
  
}


function restartGame() {
  restartBtn.hidden = false;
  restartBtn.addEventListener("click", (evt) => {
    playGame = true;
    grid = [null, null, null, null, null, null, null, null, null];
    playerTurn = 1;
    restartBtn.hidden = true;
    cleanBoard()
    board.hidden = false;
  })
}

function cleanBoard() {
  for (let i = 0; i != 9; i++) {
    board.children[i].innerText = `${i+1}`
  }
  status.innerText = "Player X's Turn"
}

function fillExtraGrid() {
  for (var i = 0; i < grid.length; i++) {
    if (grid[i] == null) {
      grid[i] = "Extra"
    }
  }
}

/*
1# (0,1,2) or (3,4,5) or (6,7,8) are same
2# (0,3,6) or (1,4,7) or (2,5,8) are samr
3# (0,4,8) or (2,4,6) are same
X |  | 
 | X |
 |  | X

*/
