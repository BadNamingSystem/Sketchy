// noinspection JSUnresolvedVariable
// Global variable to keep track of the current grid size
let currentGridSize = 16;

/**
 * Creates a new grid with the specified number of squares per side
 * @param {number} gridSize Number of squares per row and column (e.g., 16 for 16x16 grid)
 */
function createGrid(gridSize) {
    const container = document.getElementById('container');
    container.innerHTML = '';

    // Calculate square size to fit evenly in 960px container
    // Example: 960px ÷ 16 squares = 60px per square
    const squareSize = 960 / gridSize;

    // Calculate total squares needed for the grid
    const totalSquares = gridSize * gridSize;

    // Create each square using a loop
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.className = 'square';

        // Set dimensions based on calculated size
        square.style.width = squareSize + 'px';
        square.style.height = squareSize + 'px';

        // Store properties for tracking hover state and original color
        square.interactions = 0;
        square.originalColor = null;  // Will store the original RGB values

        // Add mouse hover event listener
        square.addEventListener('mouseenter', function () {
            handleSquareHover(this);
        });

        // Add the completed square to the container
        container.appendChild(square);
    }
}

/**
 * Generates a random RGB color
 * @returns {Object} Object containing r, g, b properties (values 0-255)
 */
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return {r, g, b};
}

/**
 * Handles mouse hover events on grid squares
 * First hover: applies random color and stores it
 * Subsequent hovers: darkens the original color progressively
 * @param {HTMLElement} square The square element that was hovered
 */
function handleSquareHover(square) {
    // First time hovering - assign and store a random color object ex. {r: 144, g: 45, b: 77}
    if (square.interactions === 0) {
        square.originalColor = getRandomColor();
        // Apply that color to make it visible
        square.style.backgroundColor = `rgb(${square.originalColor.r}, ${square.originalColor.g}, ${square.originalColor.b})`;
    }

    // Increment hover counter
    square.interactions++;

    // Calculate darkening factor (gets smaller with each hover)
    // Hover 1: 0.9 (90% of original brightness)
    // Hover 2: 0.8 (80% of original brightness)
    // Hover 10: 0.0 (completely black)
    const darkenFactor = Math.max(0, 1 - (square.interactions * 0.1));

    // Apply darkening to each color component
    const newR = Math.floor(square.originalColor.r * darkenFactor);
    const newG = Math.floor(square.originalColor.g * darkenFactor);
    const newB = Math.floor(square.originalColor.b * darkenFactor);

    // Update square with the darkened color
    square.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;
}

/**
 * Prompts user for new grid size and creates a fresh grid
 * Validates input to ensure it's between 1-100
 */
function createNewGrid() {
    // Prompt user for grid size input
    const userInput = prompt('Enter number of squares per side (max 100):');

    // Exit if user cancelled the prompt
    if (userInput === null) return;

    // Convert input to integer
    const gridSize = parseInt(userInput);

    // Validate input is a number within acceptable range
    if (isNaN(gridSize) || gridSize < 1 || gridSize > 100) {
        alert('Please enter a number between 1 and 100.');
        return;
    }

    // Update global variable and create new grid
    currentGridSize = gridSize;
    createGrid(gridSize);
}

// Initialize the application when page loads
createGrid(16);

// Set up button click handler for creating new grids
document.getElementById('newGridBtn').addEventListener('click', createNewGrid);