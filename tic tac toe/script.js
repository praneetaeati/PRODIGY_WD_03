document.addEventListener("DOMContentLoaded", function () {
    const heading = document.getElementById("heading");
    const restartBtn = document.getElementById("restart");
    const boxes = document.querySelectorAll(".box");

    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let active = true;

    function checkWin() {
        const patterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (let pattern of patterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                highlightWinner(pattern);
                return true;
            }
        }

        return false;
    }

    function highlightWinner(pattern) {
        for (let index of pattern) {
            boxes[index].classList.add("winner");
        }
    }

    function handleClick(index) {
        if (board[index] === "" && active) {
            board[index] = currentPlayer;
            boxes[index].textContent = currentPlayer;

            if (checkWin()) {
                heading.textContent = `Player ${currentPlayer} wins!`;
                active = false;
            } else if (board.every((value) => value !== "")) {
                heading.textContent = "It's a Tie!";
                active = false;
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                heading.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function restart() {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        active = true;
        heading.textContent = "Tic Tac Toe Game";
        boxes.forEach((box) => {
            box.textContent = "";
            box.classList.remove("winner");
        });
    }

    boxes.forEach((box, index) => {
        box.addEventListener("click", () => handleClick(index));
    });

    restartBtn.addEventListener("click", restart);
});
