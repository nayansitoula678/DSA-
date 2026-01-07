const container = document.getElementById("arrayContainer");

const generateBtn = document.getElementById("generateBtn");
const sortBtn = document.getElementById("sortBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");

const sizeSlider = document.getElementById("sizeSlider");
const speedSlider = document.getElementById("speedSlider");
const sizeLabel = document.getElementById("sizeLabel");
const speedLabel = document.getElementById("speedLabel");

let array = [];
let bars = [];

let running = false;
let paused = false;
let stopRequested = false;

// Utility
function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function waitIfPaused() {
  while (paused && !stopRequested) {
    await sleep(50);
  }
}

function getSpeed() {
  return Number(speedSlider.value);
}

function swap(i, j) {
  [array[i], array[j]] = [array[j], array[i]];
  bars[i].style.height = `${array[i]}px`;
  bars[j].style.height = `${array[j]}px`;
}

// Generate array
function generateArray() {
  array = [];
  bars = [];
  container.innerHTML = "";

  const n = Number(sizeSlider.value);
  for (let i = 0; i < n; i++) {
    const val = Math.floor(Math.random() * 320) + 30;
    array.push(val);

    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${val}px`;

    container.appendChild(bar);
    bars.push(bar);
  }
}

// Heapify function
async function heapify(n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && array[left] > array[largest]) largest = left;
  if (right < n && array[right] > array[largest]) largest = right;

  if (largest !== i) {
    bars[i].classList.add("swap");
    bars[largest].classList.add("swap");
    await sleep(getSpeed());

    swap(i, largest);

    bars[i].classList.remove("swap");
    bars[largest].classList.remove("swap");

    await heapify(n, largest);
  }
}

// Heap Sort
async function heapSort() {
  const n = array.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }

  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    await waitIfPaused();
    if (stopRequested) return;

    swap(0, i);
    bars[i].classList.add("sorted");
    await sleep(getSpeed());

    await heapify(i, 0);
  }

  bars[0].classList.add("sorted");
}

// Controls
async function startSort() {
  running = true;
  paused = false;
  stopRequested = false;

  pauseBtn.disabled = false;
  stopBtn.disabled = false;

  await heapSort();

  running = false;
}

generateBtn.onclick = generateArray;
sortBtn.onclick = startSort;

pauseBtn.onclick = () => {
  paused = !paused;
  pauseBtn.textContent = paused ? "Resume" : "Pause";
};

stopBtn.onclick = () => {
  stopRequested = true;
  paused = false;
};

// Init
sizeLabel.textContent = sizeSlider.value;
speedLabel.textContent = speedSlider.value;
sizeSlider.oninput = () => sizeLabel.textContent = sizeSlider.value;
speedSlider.oninput = () => speedLabel.textContent = speedSlider.value;

generateArray();
