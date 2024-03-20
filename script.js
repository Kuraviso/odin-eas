// basic Variables

let size = 16;
let isDrawing = false;
let isRandom = false;
let isEraserOn = false;
let showGrid = true;
let gridItems = [];
let color = "black";

// Get the required elements from the document

const gridAreaSize = 600;
const drawItems = document.getElementById("item");
const drawArea = document.getElementById("draw-area");
const buttonContainer = document.getElementById("button-container");
const slider = document.getElementById("slider");
const sliderValue = document.getElementById("slider-value");
const buttonSelector = document.querySelectorAll(".grid-button");
const colorPicker = document.getElementById("colorPicker");

// basic styles for the document modifications

drawArea.style.width = `${gridAreaSize}px`;
drawArea.style.height = `${gridAreaSize}px`;
buttonContainer.style.width = `${gridAreaSize}px`;
sliderValue.innerText = `${slider.value} x ${slider.value} Pixels`;
buttonSelector[0].style.color = "green";

// change the color of the target square aplying the selected color

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

// toggle to activate the random colors

function toggleRandomColor() {
  isRandom = !isRandom;
  buttonSelector[3].style.color = isRandom ? "green" : "";
}

//function to generate a random rgb color

function generateRandomColor() {
  return `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
}

//toggle the grid lines on/off

function toggleGrid() {
  showGrid = showGrid ? false : true;
  buttonSelector[0].style.color = showGrid ? "green" : "";
  gridItems.forEach((gridItem) => {
    gridItem.style.border = showGrid ? "1px solid whitesmoke" : "hidden";
  });
}

//restore the grid to the default white color

function clearGrid() {
  gridItems.forEach((gridItem) => {
    gridItem.style.backgroundColor = "white";
  });
}

//toggle the eraser on/off and disables the buttons that could conflict
//with the feature

function toggleEraser() {
  if (isEraserOn) {
    color = previousColor;
    isEraserOn = false;
    buttonSelector[4].style.color = "black";
    colorPicker.hidden = false;
    buttonSelector[5].disabled = false;
    buttonSelector[3].disabled = false;
    buttonSelector[2].disabled = false;
  } else {
    if (isRandom) {
      toggleRandomColor();
    }
    previousColor = color;
    color = "white";
    isEraserOn = true;
    colorPicker.hidden = true;
    buttonSelector[4].style.color = "green";
    buttonSelector[5].disabled = true;
    buttonSelector[3].disabled = true;
    buttonSelector[2].disabled = true;
  }
}

//create the a grid with the specified size (takes size from slider)

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

  buttonSelector[4].addEventListener("click", toggleEraser);
}

//generates a random number between 0 and 255 for the randomColor function

function random(number) {
  return Math.floor(Math.random() * (number + 1));
}

// resets the grid to all the default values
function resetGrid() {
  while (drawArea.firstChild) {
    drawArea.removeChild(drawArea.firstChild);
  }
  gridItems.length = 0;
  isRandom = false;
  if (isEraserOn) {
    toggleEraser();
  }
  applyDefaultValues();
}

// removes the event listeners everytime that the grid is set to default values
// to prevent performance issues

function applyDefaultValues() {
  buttonSelector[0].style.color = "green";
  buttonSelector[3].style.color = "";
  buttonSelector[0].removeEventListener("click", toggleGrid);
  buttonSelector[1].removeEventListener("click", clearGrid);

  buttonSelector[3].removeEventListener("click", toggleRandomColor);
  buttonSelector[4].removeEventListener("click", toggleEraser);
}

// takes the input from the slider to re-generate the grid with
// the selected resolution

slider.oninput = (e) => {
  sliderValue.innerText = `${e.target.value} x ${e.target.value} Pixels`;
  resetGrid();
  createGrid(e.target.value);
};

// lets the user pick a color in hex value to paint on the grid

colorPicker.oninput = (e) => {
  color = e.target.value;
};

//initialize the grid

createGrid(size);
