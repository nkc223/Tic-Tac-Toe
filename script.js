const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

board.addEventListener("click", handleCellClick);
resetButton.addEventListener("click", resetGame);

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.getAttribute("data-index");

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase()); // Add class for styling
    clickedCell.innerHTML = currentPlayer;

    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
    let roundWon = false;
    let winningCells = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            winningCells = winCondition;  // Store the winning combination
            break;
        }
    }

    if (roundWon) {
        statusText.innerHTML = `${currentPlayer} wins!`;
        highlightWinningCells(winningCells);
        changeBackgroundColor(currentPlayer);
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusText.innerHTML = "It's a Draw!";
        changeBackgroundColor("draw");  // Draw background change
        gameActive = false;
        return;
    }

    statusText.innerHTML = `${currentPlayer}'s turn`;
}

function highlightWinningCells(winningCells) {
    winningCells.forEach(index => {
        const cell = document.querySelector(`.cell[data-index='${index}']`);
        cell.classList.add("win");  // Add win class for green background
    });
}

function resetGame() {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusText.innerHTML = `${currentPlayer}'s turn`;
    document.querySelectorAll(".cell").forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove("x", "o", "win");  // Reset styles and classes
    });
    document.body.style.backgroundColor = "#121212"; // Reset background color
}

function changeBackgroundColor(result) {
    let color;
    if (result === "X") {
        color = "#ff6b6b"; // Red-themed for X win
    } else if (result === "O") {
        color = "#4a90e2"; // Blue-themed for O win
    } else if (result === "draw") {
        color = "#f0e130"; // Yellow-themed for draw
    }
    document.body.style.transition = "background-color 0.5s ease"; // Smooth transition
    document.body.style.backgroundColor = color;
}
