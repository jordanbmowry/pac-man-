const $grid = document.querySelector('.grid');
const $scoreDisplay = document.querySelector('#score');
const width = 28;
let squares = [];

// 28 by 28; 784 items in the grid;
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty
const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0,
  1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,
  1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4,
  4, 4, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1,
];

// create board
function createBoard() {
  layout.forEach((ele, i) => {
    // create a square
    const square = document.createElement('div');
    // put square into the grid
    $grid.append(square);
    // put square in squares array
    squares.push(square);

    if (layout[i] === 0) {
      squares[i].classList.add('pac-dot');
    }
    if (layout[i] === 1) {
      squares[i].classList.add('wall');
    }
    if (layout[i] === 2) {
      squares[i].classList.add('ghost-lair');
    }
    if (layout[i] === 3) {
      squares[i].classList.add('power-pellet');
    }
  });
}

createBoard();

// starting position of pacman
let pacmanCurrentIndex = 490;
squares[pacmanCurrentIndex].classList.add('pacman');

function control(event) {
  squares[pacmanCurrentIndex].classList.remove('pacman');
  switch (event.key) {
    case 'ArrowDown':
      if (
        !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
        !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
        pacmanCurrentIndex + width < width * width
      ) {
        pacmanCurrentIndex += width;
      }
      break;
    case 'ArrowLeft':
      if (
        !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
        !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
        pacmanCurrentIndex % width !== 0
      ) {
        pacmanCurrentIndex -= 1;
      }
      break;
    case 'ArrowUp':
      if (
        !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
        !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
        pacmanCurrentIndex - width >= 0
      ) {
        pacmanCurrentIndex -= width;
      }
      break;
    case 'ArrowRight':
      if (
        !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
        !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
        pacmanCurrentIndex % width < width - 1
      ) {
        pacmanCurrentIndex += 1;
      }
  }
  squares[pacmanCurrentIndex].classList.add('pacman');
}

document.addEventListener('keyup', control);
