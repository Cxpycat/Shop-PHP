const upBTn = document.querySelector(".up-button");
const downBTn = document.querySelector(".down-button");
const sidebar = document.querySelector(".sidebar");
const mainSlide = document.querySelector(".main-slide");
const container = document.querySelector(".container");
const slideCount = mainSlide.querySelectorAll("div").length;

let activeSlideId = 0;
sidebar.style.top = `-${(slideCount - 1) * 100}vh`;

upBTn.addEventListener("click", () => {
  changerSlide("up");
});
downBTn.addEventListener("click", () => {
  changerSlide("down");
});

function changerSlide(move) {
  if (move === "up") {
    activeSlideId++;
    if (activeSlideId === slideCount) {
      activeSlideId = 0;
    }
  } else if (move === "down") {
    activeSlideId--;
    if (activeSlideId < 0) {
      activeSlideId = slideCount - 1;
    }
  }

  const height = container.clientHeight;

  mainSlide.style.transform = `translateY(-${activeSlideId * height}px)`;
  sidebar.style.transform = `translateY(${activeSlideId * height}px)`;
}
