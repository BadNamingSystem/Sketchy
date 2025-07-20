const container = document.getElementById('container');

// Create 256 square divs (16 x 16)
for (let i = 0; i < 256; i++) {
    const square = document.createElement('div');
    square.className = 'square';
    container.appendChild(square);
}