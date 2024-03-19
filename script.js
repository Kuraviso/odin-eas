let size = 16;
const color = "black";
const gridAreaSize = 600;
const drawItems = document.getElementById("item");
const drawArea = document.getElementById("draw-area");
const buttonContainer = document.getElementById("button-container");
const slider = document.getElementById("slider");
const sliderValue = document.getElementById("slider-value");
drawArea.style.width = `${gridAreaSize}px`;
drawArea.style.height = `${gridAreaSize}px`;
buttonContainer.style.width = `${gridAreaSize * 0.8}px`;
sliderValue.innerText = `${slider.value} x ${slider.value} Pixels`;
// function changeColor() {
//   this.style.backgroundColor = `${color}`;
// }

function createGrid(size) {
  for (i = 0; i < size * size; i++) {
    const gridItem = document.createElement("div");
    gridItem.style.width = `${gridAreaSize / size}px`;
    gridItem.style.height = `${gridAreaSize / size}px`;
    gridItem.classList.add("item");
    drawArea.appendChild(gridItem);

    gridItem.addEventListener("mouseover", (e) => {
      e.target.style.backgroundColor = `${color}`;
    });
  }
}

function removeGrid() {
  while (drawArea.firstChild) {
    drawArea.removeChild(drawArea.firstChild);
  }
}

slider.oninput = (e) => {
  sliderValue.innerText = `${e.target.value} x ${e.target.value} Pixels`;
  size = e.target.value;
  removeGrid();
  createGrid(size);
};

createGrid(size);
