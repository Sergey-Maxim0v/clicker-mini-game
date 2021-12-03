const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const btnRestart = document.querySelector(".btnRestart")
const btnRestartRow = document.querySelector(".btnRestartRow")
const colors = [
  "white",
  "green",
  "yellow",
  "red",
  "blue",
  "blueviolet",
  "yellowgreen",
  "brown",
];
const userScore = document.querySelector("#userScore");

let time = 0;
let score = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
    setUserScore();
  } else {
    finishGame();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let curent = --time;
    if (curent < 10) {
      curent = `0${curent}`;
    }
    setTime(curent);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add("hide");
  userScore.parentNode.classList.add("hide");
  btnRestartRow.classList.add("visible");
  btnRestart.classList.add("visible");
  board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(20, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  const color = getRandomColor();

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.backgroundColor = color;
  circle.style.boxShadow = `0 0 3px ${color}, 0 0 5px ${color}`;
  board.style.boxShadow = `0 0 10px ${color}`;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function setUserScore() {
  userScore.innerHTML = score;
}

const restart = btnRestart.addEventListener('click', (event)=>{
  if(event){
    location.reload()
  }
})