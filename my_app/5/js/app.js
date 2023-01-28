const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
let time = 0;
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
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
    createRngCircle();
  }
});

function startGame() {
  setInterval(changeTime, 1000);
  createRngCircle();
  setTime(time);
}

function changeTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`;
}

function createRngCircle() {
  var colors = [];
  while (colors.length < 100) {
    do {
      var color = Math.floor(Math.random() * 1000000 + 1);
    } while (colors.indexOf(color) >= 0);
    colors.push("#" + ("444444" + color.toString(16)).slice(-6));
  }
  const circle = document.createElement("div");
  const size = getRngNumber(10, 20);
  const { width, height } = board.getBoundingClientRect();

  const x = getRngNumber(0, width - size);
  const y = getRngNumber(0, height - size);

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = `${colors[getRngNumber(0, 100)]}`;

  board.append(circle);
}

function getRngNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
