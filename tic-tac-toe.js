let currPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameStatus = '';

const saveGameState = () => {
  localStorage.setItem('gameState', JSON.stringify({
    currPlayer,
    board,
    gameStatus
  }));
}

const loadGameState = () => {
  const savedState = localStorage.getItem('gameState');
  if (!savedState) return;
  const gameState = JSON.parse(savedState);
  currPlayer = gameState.currPlayer;
  board = gameState.board;
  gameStatus = gameState.gameStatus;

  for (let i = 0; i < 9; i++) {
    if (board[i] !== '') {
      const mark = document.createElement('img');
      mark.src = `https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${board[i].toLowerCase()}.svg`
      document.getElementById(`cell-${i}`).appendChild(mark);
    }
  }

  if (gameStatus !== '') {
    document.getElementById('game-status').innerText = `Winner: ${gameStatus}`;
    document.getElementById('new-game').disabled = false;
    document.getElementById('give-up').disabled = true;
  }
}

const chooseSquare = e => {
  if (gameStatus !== '') return;
  const id = e.target.id;
  if (id.startsWith('cell-') && e.target.innerHTML === '') {
    const mark = document.createElement('img');
    mark.src = `https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${currPlayer.toLowerCase()}.svg`;
    e.target.appendChild(mark);

    const cellIdx = Number(id[id.length - 1]);
    board[cellIdx] = currPlayer;

    if (currPlayer === 'X') {
      currPlayer = 'O';
    } else {
      currPlayer = 'X';
    }

    checkWin();
  }
}

const checkWin = () => {

  // rows
  for (let i = 0; i < 9; i += 3) {
    if (board[i] !== '' && board[i] === board[i + 1] && board[i + 1] === board[i + 2]) {
      gameStatus = board[i];
      break;
    }
  }

  // cols
  for (let i = 0; i < 3; i++) {
    if (board[i] !== '' && board[i] === board[i + 3] && board[i + 3] === board[i + 6]) {
      gameStatus = board[i];
      break;
    }
  }

  // diagonals
  if (board[0] !== '' && board[0] === board[4] && board[4] === board[8]) {
    gameStatus = board[0];
  }
  if (board[2] !== '' && board[2] === board[4] && board[4] === board[6]) {
    gameStatus = board[2];
  }

  // check if tie
  if (gameStatus === '') {
    if (!board.some(cell => cell === '')) {
      gameStatus = 'None';
    }
  }

  if (gameStatus !== '') {
    document.getElementById('game-status').innerText = `Winner: ${gameStatus}`;
    document.getElementById('new-game').disabled = false;
    document.getElementById('give-up').disabled = true;
  }

  saveGameState()
}

const resetGame = (e) => {
  gameStatus = '';
  document.getElementById('game-status').innerText = '';
  board = ['', '', '', '', '', '', '', '', ''];
  currPlayer = 'X';

  for (let i = 0; i < 9; i++) {
    document.getElementById(`cell-${i}`).innerHTML = '';
  }

  e.target.disabled = true;
  document.getElementById('give-up').disabled = false;
  saveGameState();
}

const giveUp = (e) => {
  const gameStatusHeading = document.getElementById('game-status');
  if (currPlayer === 'X') {
    gameStatus = 'O';
  } else {
    gameStatus = 'X';
  }

  gameStatusHeading.innerText = `Winner: ${gameStatus}`

  e.target.disabled = true;
  document.getElementById('new-game').disabled = false;
  saveGameState();
}

window.onload = () => {
  loadGameState();

  document.querySelector('.grid-container').addEventListener('click', chooseSquare);
  document.getElementById('new-game').addEventListener('click', resetGame);
  document.getElementById('give-up').addEventListener('click', giveUp);
}