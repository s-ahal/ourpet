console.log("client / frontend! ");

document.getElementById("open-menu").addEventListener("click", function () {
  document.getElementById("popup-menu").style.display = "flex";
});

document.getElementById("close-menu").addEventListener("click", function () {
  document.getElementById("popup-menu").style.display = "none";
});

const urlParams = new URLSearchParams(window.location.search);
const petID = urlParams.get("petID") || 1;

let playButton = document.getElementById("play-button");
let feedButton = document.getElementById("feed-button");
let cleanButton = document.getElementById("clean-button");

let happinessStat = document.getElementById("happiness-stat");
let healthStat = document.getElementById("health-stat");
let cleanlinessStat = document.getElementById("cleanliness-stat");

playButton.addEventListener("click", () => {
  interact(petID, "play");
});

feedButton.addEventListener("click", () => {
  interact(petID, "feed");
});

cleanButton.addEventListener("click", () => {
  interact(petID, "clean");
});

// Function to update pet status on the frontend
function updatePetStatus(pet) {
  healthStat.innerHTML = `health: ${pet.health}%`;
  happinessStat.innerHTML = `happiness: ${pet.happiness}%`;
  cleanlinessStat.innerHTML = `cleanliness: ${pet.cleanliness}%`;
}

// Function to interact with the pet
async function interact(petID, action) {
  const response = await fetch(`/interact/${petID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action }),
  });
  const data = await response.json();
  updatePetStatus(data);
}

// Function to fetch pet data from the backend
async function getPetData(petID) {
  const response = await fetch(`/pet/${petID}`);
  const data = await response.json();
  return data;
}

// Initialize the pet data when the page loads
document.addEventListener("DOMContentLoaded", async () => {
  const petData = await getPetData(petID);
  updatePetStatus(petData);
  document.getElementById("pet-name").innerHTML = petData.name;
});

//Periodically update the pet data on the frontend
setInterval(async () => {
  const petData = await getPetData(petID);
  updatePetStatus(petData);
}, 10000);

let canvas = document.getElementById("main-canvas");
let ctx = canvas.getContext("2d");

let width;
let height;
if (window.innerWidth >= window.innerHeight) {
  canvas.height = window.innerHeight;
  canvas.width = canvas.height;
  width = canvas.width;
  height = canvas.height;
} else {
  canvas.width = window.innerWidth;
  canvas.height = canvas.width;
  width = canvas.width;
  height = canvas.height;
}

ctx.fillStyle = "#759e61";

const frames = [drawFrame1, drawFrame2];
let currentFrameIndex = 0;

drawFrame();

setInterval(() => {
  currentFrameIndex = (currentFrameIndex + 1) % frames.length;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame();
}, 500);

function drawFrame() {
  frames[currentFrameIndex]();
}

function drawFrame1() {
  //row 1
  drawSquare((14 * width) / 30, (10 * height) / 30);
  drawSquare((15 * width) / 30, (10 * height) / 30);
  //2
  drawSquare((12 * width) / 30, (11 * height) / 30);
  drawSquare((13 * width) / 30, (11 * height) / 30);
  drawSquare((14 * width) / 30, (11 * height) / 30);
  drawSquare((15 * width) / 30, (11 * height) / 30);
  drawSquare((16 * width) / 30, (11 * height) / 30);
  drawSquare((17 * width) / 30, (11 * height) / 30);
  //3
  drawSquare((11 * width) / 30, (12 * height) / 30);
  drawSquare((18 * width) / 30, (12 * height) / 30);
  //4
  drawSquare((10 * width) / 30, (13 * height) / 30);
  drawSquare((11 * width) / 30, (13 * height) / 30);
  drawSquare((13 * width) / 30, (13 * height) / 30);
  drawSquare((16 * width) / 30, (13 * height) / 30);
  drawSquare((18 * width) / 30, (13 * height) / 30);
  drawSquare((19 * width) / 30, (13 * height) / 30);
  //5
  drawSquare((10 * width) / 30, (14 * height) / 30);
  drawSquare((13 * width) / 30, (14 * height) / 30);
  drawSquare((16 * width) / 30, (14 * height) / 30);
  drawSquare((19 * width) / 30, (14 * height) / 30);
  //6
  drawSquare((10 * width) / 30, (15 * height) / 30);
  drawSquare((19 * width) / 30, (15 * height) / 30);
  //7
  drawSquare((10 * width) / 30, (16 * height) / 30);
  drawSquare((14 * width) / 30, (16 * height) / 30);
  drawSquare((15 * width) / 30, (16 * height) / 30);
  drawSquare((19 * width) / 30, (16 * height) / 30);
  //8
  drawSquare((11 * width) / 30, (17 * height) / 30);
  drawSquare((18 * width) / 30, (17 * height) / 30);
  //9
  drawSquare((12 * width) / 30, (18 * height) / 30);
  drawSquare((13 * width) / 30, (18 * height) / 30);
  drawSquare((14 * width) / 30, (18 * height) / 30);
  drawSquare((15 * width) / 30, (18 * height) / 30);
  drawSquare((16 * width) / 30, (18 * height) / 30);
  drawSquare((17 * width) / 30, (18 * height) / 30);
}

function drawFrame2() {
  //row 2
  drawSquare((14 * width) / 30, (11 * height) / 30);
  drawSquare((15 * width) / 30, (11 * height) / 30);
  //3
  drawSquare((12 * width) / 30, (12 * height) / 30);
  drawSquare((13 * width) / 30, (12 * height) / 30);
  drawSquare((14 * width) / 30, (12 * height) / 30);
  drawSquare((15 * width) / 30, (12 * height) / 30);
  drawSquare((16 * width) / 30, (12 * height) / 30);
  drawSquare((17 * width) / 30, (12 * height) / 30);
  //4
  drawSquare((11 * width) / 30, (13 * height) / 30);
  drawSquare((18 * width) / 30, (13 * height) / 30);
  //5
  drawSquare((10 * width) / 30, (14 * height) / 30);
  drawSquare((11 * width) / 30, (14 * height) / 30);
  drawSquare((18 * width) / 30, (14 * height) / 30);
  drawSquare((19 * width) / 30, (14 * height) / 30);
  //6
  drawSquare((10 * width) / 30, (15 * height) / 30);
  drawSquare((13 * width) / 30, (15 * height) / 30);
  drawSquare((16 * width) / 30, (15 * height) / 30);
  drawSquare((19 * width) / 30, (15 * height) / 30);
  //7
  drawSquare((10 * width) / 30, (16 * height) / 30);
  drawSquare((19 * width) / 30, (16 * height) / 30);
  //8
  drawSquare((11 * width) / 30, (17 * height) / 30);
  drawSquare((14 * width) / 30, (17 * height) / 30);
  drawSquare((15 * width) / 30, (17 * height) / 30);
  drawSquare((18 * width) / 30, (17 * height) / 30);
  //9
  drawSquare((12 * width) / 30, (18 * height) / 30);
  drawSquare((13 * width) / 30, (18 * height) / 30);
  drawSquare((14 * width) / 30, (18 * height) / 30);
  drawSquare((15 * width) / 30, (18 * height) / 30);
  drawSquare((16 * width) / 30, (18 * height) / 30);
  drawSquare((17 * width) / 30, (18 * height) / 30);
}

function drawSquare(x, y) {
  ctx.fillRect(x, y, width / 30, height / 30);
}
