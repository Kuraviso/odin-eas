let size = 16;
let isDrawing = false;
let isRandom = false;
let showGrid = true;
let gridItems = [];
let color = "black";
const gridAreaSize = 600;
const drawItems = document.getElementById("item");
const drawArea = document.getElementById("draw-area");
const buttonContainer = document.getElementById("button-container");
const slider = document.getElementById("slider");
const sliderValue = document.getElementById("slider-value");
const buttonSelector = document.querySelectorAll(".grid-button");
drawArea.style.width = `${gridAreaSize}px`;
drawArea.style.height = `${gridAreaSize}px`;
buttonContainer.style.width = `${gridAreaSize}px`;
sliderValue.innerText = `${slider.value} x ${slider.value} Pixels`;
buttonSelector[0].style.color = "green";

function setBackgroundColor(e) {
  let newColor;
  switch (true) {
    case e.type === "mousedown":
      isDrawing = true;
      newColor = isRandom ? generateRandomColor() : color;
      break;
    case e.type === "mouseover" && isDrawing:
      newColor = isRandom ? generateRandomColor() : color;
      break;
    default:
      isDrawing = false;
      return;
  }

  e.target.style.backgroundColor = newColor;
}

function toggleRandomColor() {
  isRandom = !isRandom;
  buttonSelector[3].style.color = isRandom ? "green" : "black";
}

function generateRandomColor() {
  return `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
}

function toggleGrid() {
  showGrid = showGrid ? false : true;
  buttonSelector[0].style.color = showGrid ? "green" : "black";
  gridItems.forEach((gridItem) => {
    gridItem.style.border = showGrid ? "1px solid whitesmoke" : "hidden";
  });
}

function clearGrid() {
  console.log("clear click");
  gridItems.forEach((gridItem) => {
    gridItem.style.backgroundColor = "white";
  });
}

function createGrid(size) {
  showGrid = true;
  for (i = 0; i < size * size; i++) {
    const gridItem = document.createElement("div");
    gridItem.style.width = `${gridAreaSize / size}px`;
    gridItem.style.height = `${gridAreaSize / size}px`;
    gridItem.classList.add("item");
    drawArea.appendChild(gridItem);
    gridItems.push(gridItem);

    gridItem.addEventListener("mousedown", (e) => setBackgroundColor(e));
    gridItem.addEventListener("mouseover", (e) => setBackgroundColor(e));
    gridItem.addEventListener("mouseup", (e) => setBackgroundColor(e));
  }
  buttonSelector[0].addEventListener("click", toggleGrid);
  buttonSelector[1].addEventListener("click", clearGrid);

  // buttonSelector[2].addEventListener("click", () => {
  //   // TODO
  // });

  buttonSelector[3].addEventListener("click", toggleRandomColor);

  // buttonSelector[3].addEventListener("click", () => {
  //   const randomColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  //   gridItem.addEventListener("mouseover", (e) => {
  //     e.target.style.backgroundColor = randomColor;
  //   });
  // });

  // buttonSelector[4].addEventListener("click", () => {
  //   gridItem.addEventListener("mouseover", (e) => {
  //     e.target.style.backgroundColor = "white";
  //   });
  // });

  // buttonSelector[5].addEventListener("click", () => {});
}

function random(number) {
  return Math.floor(Math.random() * (number + 1));
}
function resetGrid() {
  while (drawArea.firstChild) {
    drawArea.removeChild(drawArea.firstChild);
  }
  gridItems.length = 0;
  isRandom = false;
  buttonSelector[0].style.color = "green";
  buttonSelector[3].style.color = "black";
  buttonSelector[0].removeEventListener("click", toggleGrid);
  buttonSelector[1].removeEventListener("click", clearGrid);

  buttonSelector[3].removeEventListener("click", toggleRandomColor);
}

slider.oninput = (e) => {
  sliderValue.innerText = `${e.target.value} x ${e.target.value} Pixels`;
  resetGrid();
  createGrid(e.target.value);
};

createGrid(size);
