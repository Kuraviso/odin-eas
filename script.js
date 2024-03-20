let size = 16;
let isDrawing = false;
let showGrid = true;
let gridItems = [];
const color = "black";
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
  if (e.type === "mousedown") {
    isDrawing = true;
    e.target.style.backgroundColor = `${color}`;
  } else if (e.type === "mouseover" && isDrawing) {
    e.target.style.backgroundColor = `${color}`;
  } else {
    isDrawing = false;
  }
}

function toggleGrid() {
  showGrid = showGrid ? false : true;
  buttonSelector[0].style.color = showGrid ? "green" : "black";
  gridItems.forEach((gridItem) => {
    gridItem.style.border = showGrid ? "1px solid whitesmoke" : "hidden";
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

  // buttonSelector[0].addEventListener("click", () => {
  //   const currentStyle = gridItem.style.border;
  //   const newStyle =
  //     currentStyle === "hidden" ? "1px solid whitesmoke" : "hidden";
  //   gridItem.style.border = newStyle;
  // });

  // buttonSelector[1].addEventListener("click", () => {
  //   gridItem.style.backgroundColor = "white";
  // });

  // buttonSelector[2].addEventListener("click", () => {
  //   // TODO
  // });

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
function removeGrid() {
  while (drawArea.firstChild) {
    drawArea.removeChild(drawArea.firstChild);
  }
  gridItems.length = 0;
  buttonSelector[0].removeEventListener("click", toggleGrid);
}

slider.oninput = (e) => {
  sliderValue.innerText = `${e.target.value} x ${e.target.value} Pixels`;
  removeGrid();
  createGrid(e.target.value);
};

createGrid(size);
