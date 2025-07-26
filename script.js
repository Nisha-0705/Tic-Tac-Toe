const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winnerMessage = document.getElementById('winner-message');
const restartBtn = document.getElementById('restartBtn');

let isXTurn = true;

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function startGame() {
  isXTurn = true;
  winnerMessage.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell';
    cell.addEventListener('click', handleClick, { once: true });
  });
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'x' : 'o';
  cell.textContent = currentClass.toUpperCase();
  cell.classList.add(currentClass);

  if (checkWin(currentClass)) {
    endGame(false, currentClass);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isXTurn = !isXTurn;
  }
}

function endGame(draw, winner = '') {
  if (draw) {
    winnerMessage.textContent = "It's a Draw!";
  } else {
    winnerMessage.textContent = `${winner.toUpperCase()} Wins!`;
  }
  // Disable further clicks
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function isDraw() {
  return [...cells].every(cell =>
    cell.classList.contains('x') || cell.classList.contains('o')
  );
}

function checkWin(currentClass) {
  return winningCombos.some(combo => {
    if (combo.every(index => cells[index].classList.contains(currentClass))) {
      combo.forEach(i => cells[i].classList.add('highlight'));
      return true;
    }
  });
}

restartBtn.addEventListener('click', startGame);

// Start the first game
startGame();
