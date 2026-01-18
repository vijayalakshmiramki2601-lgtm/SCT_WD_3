const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const modeSelect = document.getElementById("mode");

let currentPlayer = "❌";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(cell, index));
});

function handleCellClick(cell, index) {
    if (gameState[index] !== "" || !gameActive) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        statusText.textContent = `🎉 ${currentPlayer} Wins!`;
        alert(`🥳 ${currentPlayer} is the WINNER!`);
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusText.textContent = "😵 It's a Draw!";
        alert("😵 Draw Match!");
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "❌" ? "⭕" : "❌";
    statusText.textContent = `Player ${currentPlayer} Turn`;

    if (modeSelect.value === "cpu" && currentPlayer === "⭕") {
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    let emptyCells = gameState
        .map((val, idx) => val === "" ? idx : null)
        .filter(v => v !== null);

    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    handleCellClick(cells[randomIndex], randomIndex);
}

function checkWinner() {
    return winConditions.some(condition => {
        return condition.every(index => gameState[index] === currentPlayer);
    });
}

function restartGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "❌";
    statusText.textContent = "Player ❌ Turn";
    cells.forEach(cell => cell.textContent = "");
}
