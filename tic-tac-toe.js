document.addEventListener('DOMContentLoaded', () => {
	const statusMsg = document.getElementById('status');
	const cells = document.querySelectorAll('#board > div');
	const newGameBtn = document.getElementsByClassName('btn')[0];
	cells.forEach((div)=> {
		div.classList.add("square");
	});
});