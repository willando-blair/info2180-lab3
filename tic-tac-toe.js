document.addEventListener('DOMContentLoaded', () => {
	const statusMsg = document.getElementById('status');
	const cells = document.querySelectorAll('#board > div');
	const newGameBtn = document.getElementsByClassName('btn')[0];
	cells.forEach((div)=> {
		div.classList.add("square");
	});
    const winList = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
    let options = ["", "", "", "", "", "", "", "", ""];
	let currentPlayer = "X";
    let running = false;

    startGame();

	function startGame() {
		cells.forEach((arrayItem, index, fullArray)=> {arrayItem.setAttribute("cellnum", index)});
		cells.forEach(cell=> cell.addEventListener("click", cellSelected));
        cells.forEach(cell=> cell.addEventListener("mouseover", function() {
			cell.classList.add("hover");
		}));
		cells.forEach(cell=> cell.addEventListener("mouseleave", function() {
			if(Array.from(cell.classList).includes("hover")) {
				cell.classList.remove("hover");
			}
		}));
		statusMsg.classList.add("status");
		statusMsg.textContent = `${currentPlayer}'s turn`;
		running = true;
	}

    function cellSelected() {
		const cellIndex = this.getAttribute("cellnum");

		if(options[cellIndex] != "" || !running) {
			return;
		}
		else {
			updateCell(this, cellIndex);
			checkWinner();
		}
	}

    function updateCell(cell, index) {
		options[index] = currentPlayer;
		cell.textContent = currentPlayer;
		if(currentPlayer=="X") {
			cell.classList.add("X");
		}
		else if(currentPlayer=="O") {
			cell.classList.add("O");
		}
	}

    function changePlayer() {
		currentPlayer = (currentPlayer == "X") ? "O":"X";
		statusMsg.textContent = `${currentPlayer}'s turn`;
	}

    function checkWinner() {
		let roundWon = false;

		for(let c = 0; c < winList.length; c++) {
			const condition = winList[c];
			const cellA = options[condition[0]];
			const cellB = options[condition[1]];
			const cellC = options[condition[2]];

			if(cellA == "" || cellB == "" || cellC == "") {
				continue;
			}

			if(cellA == cellB && cellB == cellC) {
				roundWon = true;
				break;
			}
		}

		if(roundWon) {
			statusMsg.classList.add("you-won");
			statusMsg.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
			running = false;
		}

		else if(!options.includes("")) {
			statusMsg.textContent = 'Draw!';
			running = false;
		}

		else{
			changePlayer();
		}
	}
});