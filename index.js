let currentGridSize = 16;

function createGrid(gridSize) {
    const container = document.getElementById('container');

    // Clear existing grid
    container.innerHTML = '';

    // Calculate square size to fit in 960px container
    const squareSize = 960 / gridSize;

    // Create squares
    const totalSquares = gridSize * gridSize;
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        square.style.width = squareSize + 'px';
        square.style.height = squareSize + 'px';
        container.appendChild(square);
    }
}

function createNewGrid() {
    const userInput = prompt('Enter number of squares per side (max 100):');

    if (userInput === null) return; // User cancelled

    const gridSize = parseInt(userInput);

    if (isNaN(gridSize) || gridSize < 1 || gridSize > 100) {
        alert('Please enter a number between 1 and 100.');
        return;
    }

    currentGridSize = gridSize;
    createGrid(gridSize);
}

// Create initial 16x16 grid
createGrid(16);

// Add event listener to the button
document.getElementById('newGridBtn').addEventListener('click', createNewGrid);