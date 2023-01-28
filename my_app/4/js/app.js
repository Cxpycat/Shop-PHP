var colors = [];
while (colors.length < 100) {
  do {
    var color = Math.floor(Math.random() * 1000000 + 1);
  } while (colors.indexOf(color) >= 0);
  colors.push("#" + ("444444" + color.toString(16)).slice(-6));
}
console.log(colors);
const board = document.querySelector("#board");
const SQUARE_COUNT = 500 - 4;

for (let i = 0; i < SQUARE_COUNT; i++) {
  const square = document.createElement("div");
  square.classList.add("square");

  square.addEventListener("mouseover", () => setColor(square));
  square.addEventListener("mouseleave", () => removeColor(square));

  board.append(square);
}

function setColor(el) {
  const color = getRnd();
  el.style.backgroundColor = color;
  el.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function removeColor(el) {
  el.style.backgroundColor = "#1d1d1d";
  el.style.boxShadow = `0 0 2px #000`;
}

function getRnd() {
  const id = Math.floor(Math.random() * colors.length);
  return colors[id];
}
