let size = 16;

const gridAreaSize = 600;
const drawItems = document.getElementById("item");
const drawArea = document.getElementById("draw-area");
const buttonContainer = document.getElementById("button-container");
drawArea.style.width = `${gridAreaSize}px`;
drawArea.style.height = `${gridAreaSize}px`;
buttonContainer.style.width = `${gridAreaSize * 0.8}px`;

function createGrid(size) {
  for (i = 0; i < size * size; i++) {
    const gridItem = document.createElement("div");
    gridItem.style.width = `${gridAreaSize / size}px`;
    gridItem.style.width = `${gridAreaSize / size}px`;
    gridItem.classList.add("item");
    drawArea.appendChild(gridItem);
  }
}

createGrid(size);
