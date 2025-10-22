let player1Emoji = null;
let player2Emoji = null;
let currentPlayer = 1;
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;
let player1Score = 0;
let player2Score = 0;

const cells = document.querySelectorAll(".cell");
const startButton = document.getElementById("start-game");
const restartButton = document.getElementById("restart");
const gameBoard = document.getElementById("game-board");
const scoreboard = document.getElementById("scoreboard");
const p1ScoreDisplay = document.getElementById("p1-score");
const p2ScoreDisplay = document.getElementById("p2-score");
const p1EmojiDisplay = document.getElementById("p1-emoji-display");
const p2EmojiDisplay = document.getElementById("p2-emoji-display");

// 🟡 EMOJI SELECTION
document.querySelectorAll("#player1-emojis .emoji").forEach(emoji => {
  emoji.addEventListener("click", () => {
    document.querySelectorAll("#player1-emojis .emoji").forEach(e => e.classList.remove("selected"));
    emoji.classList.add("selected");
    player1Emoji = emoji.textContent;
  });
});

document.querySelectorAll("#player2-emojis .emoji").forEach(emoji => {
  emoji.addEventListener("click", () => {
    document.querySelectorAll("#player2-emojis .emoji").forEach(e => e.classList.remove("selected"));
    emoji.classList.add("selected");
    player2Emoji = emoji.textContent;
  });
});

// 🟢 START GAME
startButton.addEventListener("click", () => {
  if (!player1Emoji || !player2Emoji) {
    alert("Both players must choose an emoji!");
    return;
  }

  document.getElementById("emoji-selection").classList.add("hidden");
  gameBoard.classList.remove("hidden");
  restartButton.classList.remove("hidden");
  scoreboard.classList.remove("hidden");

  p1EmojiDisplay.textContent = player1Emoji;
  p2EmojiDisplay.textContent = player2Emoji;

  gameActive = true;
});

// 🟢 GAMEPLAY
cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = cell.dataset.index;
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer === 1 ? player1Emoji : player2Emoji;
    cell.textContent = board[index];
    cell.classList.add("selected-cell"); // glow effect on click

    const winnerCombo = checkWinner();
    if (winnerCombo) {
      // Animate winning cells
      winnerCombo.forEach(i => cells[i].classList.add("winner"));

      setTimeout(() => {
        alert(`Player ${currentPlayer} wins! 🎉`);
        updateScore(currentPlayer);
        // Confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 150);
      gameActive = false;
      return;
    }

    if (board.every(c => c !== "")) {
      setTimeout(() => alert("It's a tie! 😅"), 100);
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === 1 ? 2 : 1;
  });
});

// 🟢 RESTART GAME
restartButton.addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(c => {
    c.textContent = "";
    c.classList.remove("selected-cell", "winner");
  });
  currentPlayer = 1;
  gameActive = true;
});

// 🧩 WINNER CHECK
function checkWinner() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let combo of wins) {
    const [a,b,c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combo; // return winning cells
    }
  }
  return null;
}

// 🧮 UPDATE SCORE
function updateScore(player) {
  if (player === 1) {
    player1Score++;
    p1ScoreDisplay.textContent = player1Score;
  } else {
    player2Score++;
    p2ScoreDisplay.textContent = player2Score;
  }
}


