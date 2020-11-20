const fieldEl = document.querySelector('.field');
let snakeDirection = 'up';
const snake = [
  {
    x: 7,
    y: 10
  }
]
const food = {};
let score = 0;

function fillField() {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 15; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('xCoord', `${j}`);
      cell.setAttribute('yCoord', `${i}`);
      fieldEl.appendChild(cell);
    }
  }
}

fillField();

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowUp' && snakeDirection !== 'down') snakeDirection = 'up';
  if (event.key === 'ArrowDown' && snakeDirection !== 'up') snakeDirection = 'down';
  if (event.key === 'ArrowLeft' && snakeDirection !== 'right') snakeDirection = 'left';
  if (event.key === 'ArrowRight' && snakeDirection !== 'left') snakeDirection = 'right';
});

function drawFood() {
  document.querySelector('.food')?.classList.remove('food');
  food.x = Math.floor(Math.random()*15);
  food.y = Math.floor(Math.random()*20);
  document.querySelector(`[xCoord="${food.x}"][yCoord="${food.y}"]`).classList.add('food');
}
drawFood();

function addScore() {
  document.querySelector('.score-counter').innerText = ++score;
}

function drawSnake() {
  fieldEl.querySelectorAll('.snake').forEach(el => el.classList.remove('snake'));
  snake.forEach(cell => {
    fieldEl.querySelector(`[xCoord="${cell.x}"][yCoord="${cell.y}"]`).classList.add('snake');
  })
}

function eatItSelf() {
  return snake.filter(cell => cell.x === snake[0].x && cell.y === snake[0].y).length > 1;
}

function goOutside() {
  return snake[0].x < 0 || snake[0].x > 14 || snake[0].y < 0 || snake[0].y > 19;
}

function endGame() {
  clearInterval(game);
  fieldEl.innerHTML = `<div>You lose! Your score is ${score}</div>`
}

function moveSnake() {
  const snakeHead = snake[0];
  switch (snakeDirection) {
    case 'up':
      snake.unshift({x: snakeHead.x, y: snakeHead.y - 1});
      break;
    case 'down':
      snake.unshift({x: snakeHead.x, y: snakeHead.y + 1});
      break;
    case 'left':
      snake.unshift({x: snakeHead.x - 1, y: snakeHead.y});
      break;
    case 'right':
      snake.unshift({x: snakeHead.x + 1, y: snakeHead.y});
      break;
  }
  if(eatItSelf() || goOutside()) {
    endGame();
    return;
  }
  if (snakeHead.x === food.x && snakeHead.y === food.y) {
    addScore();
    drawFood();
  }  else {
    snake.pop();
  }
  drawSnake();
}

const game = setInterval(moveSnake, 200)
