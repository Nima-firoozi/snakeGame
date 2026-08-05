const wrapper = document.querySelector(".wrapper");
const fragment = document.createDocumentFragment();
const score = document.querySelector(".score");
const startBtn = document.querySelector(".start");
let nextSnakeNumber = 191; //select a center block
let moveSnakeDirect = 0;
let start = false;
let startSetInterval;

startBtn.addEventListener("click", () => {
  beforeStrat();
});

function beforeStrat() {
  // clear wrapper
  wrapper.innerHTML = "";
  // clear wrapper

  //build ui of wrapper
  for (let i = 1; i <= 400; i++) {
    const childDiv = document.createElement("div");
    childDiv.classList.add("empty");
    childDiv.setAttribute("data-number", i);
    fragment.appendChild(childDiv);
  }
  wrapper.appendChild(fragment);
  //build ui of wrapper

  //select center div for first of snake
  const numbersOfStart = [190, 191, 210, 211];
  const startSelected = Math.floor(Math.random() * numbersOfStart.length);
  document
    .querySelector(`[data-number="${numbersOfStart[startSelected]}"]`)
    .classList.add("snake", "first", "last");
  document
    .querySelector(`[data-number="${numbersOfStart[startSelected]}"]`)
    .classList.remove("empty");
  //select center div for first of snake

  //create food
  createFood();
  //create food

  //set controls
  document.querySelector("body").addEventListener("keydown", (e) => {
    if (e.keyCode > 36 && e.keyCode < 41) {
      if (snakeLengthNumber() != 1) {
        if (
          moveSnakeDirect - 2 == e.keyCode ||
          moveSnakeDirect + 2 == e.keyCode
        ) {
          return;
        }
      }

      moveSnakeDirect = e.keyCode;
      start ? null : startGame();
      start = true;
    }
  });
}
//set controls

function snakeLengthNumber() {
  return document.querySelectorAll(".snake").length;
}

function winCheck() {
  snakeLengthNumber() == 400 ? win() : null;
}

//build ui of win
function win() {
  wrapper.innerHTML = `<h2>win</h2>`;
  clearInterval(startSetInterval);
}
//build ui of win

//buil ui of gameover
function gameOver() {
  clearInterval(startSetInterval);
  wrapper.innerHTML = `<h2>Gamo Over</h2>
                                 <div class="gameover">
                                    <button class="restart">RESTART</button>
                                    <button class="exit">EXIT</button>
                                 </div>`;
  document.querySelector(".exit").addEventListener("click", () => {
    window.close();
  });
  document.querySelector(".restart").addEventListener("click", () => {
    start = false;
    beforeStrat();
  });
}
//buil ui of gameover

//create food logic
function createFood() {
  let emptyBlock = document.querySelectorAll(".empty");
  let numberRandomEmptyBlock = Math.floor(Math.random() * emptyBlock.length);
  while (!emptyBlock[numberRandomEmptyBlock]) {
    console.log(1);
    numberRandomEmptyBlock = Math.floor(Math.random() * emptyBlock.length);
  }
  emptyBlock[numberRandomEmptyBlock].classList.add("food");
  emptyBlock[numberRandomEmptyBlock].classList.remove("empty");
}
//create food logic

function moveTo(direct, numberOfDirect) {
  let firstOfSnake = document.querySelector(".first"); // select first of snake
  let numberOfFirst = firstOfSnake.dataset.number; //Calculate the number of the block where the first snake is in it
  nextSnakeNumber = +numberOfFirst + +numberOfDirect; // Calculation of the number of the next block of the snake

  //Checking for top and bottom collisions

  if (nextSnakeNumber > 400 || nextSnakeNumber < 1) {
    gameOver();
  }

  //Checking for top and bottom collisions

  let nextOfSnake = document.querySelector(
    `[data-number="${+nextSnakeNumber}"]`,
  ); // select next block
  let lastOfSnake = document.querySelector(".last"); //select last of snake
  let numberOfLast = lastOfSnake.dataset.number; ////Calculate the number of the block where the last snake is in it
  firstOfSnake.classList.add(direct); // add class direct to block for next move

  // rules for next block if not empty
  ////////////////////////////////////////////////////
  if (nextOfSnake.classList.contains("food")) {
    nextOfSnake.classList.remove("food");
    firstOfSnake.classList.remove("first");
    nextOfSnake.classList.add("first", "snake");
    score.innerHTML = `Level : ${snakeLengthNumber()}/400`;
    winCheck();
    snakeLengthNumber() < 400 ? createFood() : null;
    return;
  }

  if (nextOfSnake.classList.contains("snake")) {
    gameOver();
    return;
  }
  //////////////////////////////////////////////////
  // rules for next block if not empty

  //// rules for next block if  empty
  ///////////////////////////////////////////
  firstOfSnake.classList.remove("first");
  nextOfSnake.classList.add("first", "snake");
  nextOfSnake.classList.remove("empty");
  lastOfSnake.classList.remove("snake", "last");
  switch (lastOfSnake.className) {
    case "right":
      document
        .querySelector(`[data-number="${+numberOfLast + +1}"]`)
        .classList.add("last");
      lastOfSnake.className = "empty";
      break;
    case "up":
      document
        .querySelector(`[data-number="${+numberOfLast + -20}"]`)
        .classList.add("last");
      lastOfSnake.className = "empty";
      break;
    case "left":
      document
        .querySelector(`[data-number="${+numberOfLast + -1}"]`)
        .classList.add("last");
      lastOfSnake.className = "empty";
      break;
    case "down":
      document
        .querySelector(`[data-number="${+numberOfLast + +20}"]`)
        .classList.add("last");
      lastOfSnake.className = "empty";
      break;
  }

  ////////////////////////////////////
  //// rules for next block if  empty
}

function startGame() {
  !moveSnakeDirect
    ? null
    : (startSetInterval = setInterval(() => {
        switch (moveSnakeDirect) {
          case 37:
            nextSnakeNumber % 20 == 1 ? gameOver() : moveTo("left", -1); // Checking for a collision on the left
            break;
          case 38:
            moveTo("up", -20);
            break;
          case 39:
            nextSnakeNumber % 20 ? moveTo("right", 1) : gameOver(); // // Checking for a collision on the right
            break;
          case 40:
            moveTo("down", 20);
            break;
        }
      }, 200));
}
