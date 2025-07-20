// noinspection JSUnresolvedVariable
// Global variable to keep track of the current grid size
let currentGridSize = 16;

/**
 * Creates a new grid with the specified number of squares per side
 * @param {number} gridSize - Number of squares per row and column (e.g., 16 for 16x16 grid)
 */
function createGrid(gridSize) {
    // Step 1: Get reference to the HTML container element
    const container = document.getElementById('container');

    // Step 2: Remove all existing squares from previous grids
    // innerHTML = '' deletes everything inside the container
    container.innerHTML = '';

    // Step 3: Calculate how big each square should be
    // If the container is 960 px wide, and we want 16 squares per row: 960/16 = 60 px per square
    // If we want 64 squares per row: 960/64 = 15 px per square
    const squareSize = 960 / gridSize;

    // Step 4: Calculate the total number of squares needed
    // For a 16x16 grid: 16 * 16 = 256 squares
    // For a 64x64 grid: 64 * 64 = 4,096 squares
    const totalSquares = gridSize * gridSize;

    // Step 5: Create each square one by one using a loop
    for (let i = 0; i < totalSquares; i++) {
        // Create a new div element in memory (not yet visible on page)
        const square = document.createElement('div');

        // Give it the CSS class 'square' so it gets the styling from our CSS
        square.className = 'square';

        // Set the exact width and height calculated above
        // squareSize + 'px' converts the number to a CSS measurement (e.g., "60px")
        square.style.width = squareSize + 'px';
        square.style.height = squareSize + 'px';

        // Step 6: Add custom properties to track this square's state
        // These properties don't exist by default - we're creating them!
        square.interactions = 0;        // How many times has a mouse hovered over this square?
        square.originalR = 255;         // Red component of original color (starts white)
        square.originalG = 255;         // Green component of original color (starts white)
        square.originalB = 255;         // Blue component of original color (starts white)

        // Step 7: Add event listener for mouse hover
        // When mouse enters this square, call our hover handler function
        // 'this' inside the function will refer to the specific square that was hovered
        square.addEventListener('mouseenter', function () {
            handleSquareHover(this);
        });

        // Step 8: Add this completed square to the container on the webpage
        // Now it becomes visible and part of the grid
        container.appendChild(square);
    }
}

/**
 * Generates a random RGB color
 * @returns {Object} Object with r, g, b properties (each 0-255)
 */
function getRandomColor() {
    // Math.random() gives a decimal between 0 and 0.999999...
    // Multiply by 256 to get 0 to 255.999999...
    // Math.floor() rounds down to get integers from 0 to 255
    const r = Math.floor(Math.random() * 256);  // Red: 0-255
    const g = Math.floor(Math.random() * 256);  // Green: 0-255
    const b = Math.floor(Math.random() * 256);  // Blue: 0-255

    // Return as an object so we can access color.r, color.g, color.b
    return {r, g, b};
}

/**
 * Handles what happens when mouse hovers over a square
 * @param {HTMLElement} square - The specific square element that was hovered
 */
function handleSquareHover(square) {
    // Check if this is the first time hovering over this square
    if (square.interactions === 0) {
        // First hover: Give it a random color and remember that color
        const color = getRandomColor();          // Get random RGB values
        square.originalR = color.r;              // Store red component
        square.originalG = color.g;              // Store green component
        square.originalB = color.b;              // Store blue component

        // Apply the random color to the square immediately
        // Template literal `rgb(${color.r}, ${color.g}, ${color.b})` creates "rgb(143, 67, 201)"
        square.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    }

    // Increment the interaction counter (even for first hover)
    square.interactions++;

    // Calculate how much to darken the square (10% darker each hover)
    // Hover 1: 1 - (1 × 0.1) = 0.9 (90% of original brightness)
    // Hover 2: 1 - (2 × 0.1) = 0.8 (80% of original brightness)
    // Hover 10: 1 - (10 × 0.1) = 0 (0% = completely black)
    // Math.max(0, ...) ensures we never go below 0 (negative colors don't exist)
    const darkenFactor = Math.max(0, 1 - (square.interactions * 0.1));

    // Apply the darkening to each color component
    // If the original red was 200 and darkenFactor is 0.8: 200 × 0.8 = 160
    const newR = Math.floor(square.originalR * darkenFactor);
    const newG = Math.floor(square.originalG * darkenFactor);
    const newB = Math.floor(square.originalB * darkenFactor);

    // Update the square's color with the darkened values
    square.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;
}

/**
 * Handles the "New Grid" button click - prompts user for new grid size
 */
function createNewGrid() {
    // Show a popup asking user to enter a number
    const userInput = prompt('Enter number of squares per side (max 100):');

    // If user clicked Cancel, userInput will be null - exit early
    if (userInput === null) return;

    // Convert the text input to an integer
    // parseInt("64") becomes the number 64
    const gridSize = parseInt(userInput);

    // Validate the input
    // isNaN() checks if it's "Not a Number" (like if they typed "hello")
    if (isNaN(gridSize) || gridSize < 1 || gridSize > 100) {
        alert('Please enter a number between 1 and 100.');
        return; // Exit function without creating grid
    }

    // Input is valid - update our global variable and create new grid
    currentGridSize = gridSize;
    createGrid(gridSize);
}

// EXECUTION STARTS HERE when the page loads:

// Create the initial 16x16 grid when page first loads
createGrid(16);

// Set up the "New Grid" button to respond to clicks
// Find the button by its ID and attach our function to its click event
document.getElementById('newGridBtn').addEventListener('click', createNewGrid);