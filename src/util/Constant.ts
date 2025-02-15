const CANVAS_SIZE = [800, 600];

const SCALE = 40;

const centerX = Math.floor(window.innerWidth / 2);
const centerY = Math.floor(window.innerHeight / 2);

const snakeX = Math.floor(centerX / SCALE);
const snakeY = Math.floor(centerY / SCALE);

const SNAKE_START = [
  [snakeX, snakeY - 1],
  [snakeX, snakeY],
];
let APPLE_START = [4, 4];

const APPLEGENTER = () => {
  let appleX = Math.floor(Math.random() * (window.innerWidth / SCALE));
  let appleY = Math.floor(Math.random() * (window.innerHeight / SCALE));

  

  while (
    appleX >= window.innerWidth ||
    appleY >= window.innerHeight ||
    appleX <= 0 ||
    appleY <= 0
  ) {
    appleX = Math.floor(Math.random() * (window.innerWidth / SCALE));
    appleY = Math.floor(Math.random() * (window.innerHeight / SCALE));
  }

  APPLE_START = [appleX, appleY];
  return APPLE_START;
};

APPLEGENTER();

const SPEED = 300;

const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0], // right
};

export { CANVAS_SIZE, SNAKE_START, APPLE_START, SCALE, SPEED, DIRECTIONS ,APPLEGENTER};
