document.addEventListener('DOMContentLoaded', () => {
	const statusMsg = document.getElementById('status');
	const cells = document.querySelectorAll('#board > div');
	const newGameBtn = document.getElementsByClassName('btn')[0];
	cells.forEach((div)=> {
		div.classList.add("square");
	});

    let options = ["", "", "", "", "", "", "", "", ""];
	let currentPlayer = "X";
    let running = false;

    startGame();

	function startGame() {
		cells.forEach((arrayItem, index, fullArray)=> {arrayItem.setAttribute("cellnum", index)});
		cells.forEach(cell=> cell.addEventListener("click", cellSelected));
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
			changePlayer();
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
});