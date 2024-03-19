let size = 16;
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

    buttonSelector[0].addEventListener("click", () => {
      const currentStyle = gridItem.style.border;
      const newStyle =
        currentStyle === "hidden" ? "1px solid whitesmoke" : "hidden";
      gridItem.style.border = newStyle;
    });

    buttonSelector[1].addEventListener("click", () => {
      gridItem.style.backgroundColor = "white";
    });

    buttonSelector[2].addEventListener("click", () => {
      // TODO
    });

    buttonSelector[3].addEventListener("click", () => {
      const randomColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
      gridItem.addEventListener("mouseover", (e) => {
        e.target.style.backgroundColor = randomColor;
      });
    });

    buttonSelector[4].addEventListener("click", () => {
      gridItem.addEventListener("mouseover", (e) => {
        e.target.style.backgroundColor = "white";
      });
    });

    buttonSelector[5].addEventListener("click", () => {});
  }
}

function random(number) {
  return Math.floor(Math.random() * (number + 1));
}
function removeGrid() {
  while (drawArea.firstChild) {
    drawArea.removeChild(drawArea.firstChild);
  }
}

slider.oninput = (e) => {
  sliderValue.innerText = `${e.target.value} x ${e.target.value} Pixels`;
  removeGrid();
  createGrid(e.target.value);
};

console.log(buttonSelector);
createGrid(size);
