window.onload = async () => {
  // Initialize the pet data when the page loads
  const petID = getPetID();
  const petData = await getPetData(petID);
  updatePetStatus(petData);

  // Set up the page
  const pageTitle = document.getElementById("pet-name");
  pageTitle.innerHTML = petData.name;
  addEventListeners();
  startPetAnimation();

  setInterval(async () => {
    const petID = getPetID();
    const petData = await getPetData(petID);
    updatePetStatus(petData);
  }, 10000); //Update the pet data on the frontend every 10 seconds
};

function getPetID() {
  // Get the ID of the current pet from the URL
  const petID = new URLSearchParams(window.location.search).get("petID") || 1;
  return petID;
}

function addEventListeners() {
  // Add open and close functions for the popup menu
  document.getElementById("open-menu").addEventListener("click", function () {
    document.getElementById("popup-menu").style.display = "flex";
  });

  document.getElementById("close-menu").addEventListener("click", function () {
    document.getElementById("popup-menu").style.display = "none";
  });

  // Add callbacks for interaction buttons
  const playButton = document.getElementById("play-button");
  const feedButton = document.getElementById("feed-button");
  const cleanButton = document.getElementById("clean-button");

  playButton.addEventListener("click", () => {
    const petID = getPetID();
    interact(petID, "play");
  });

  feedButton.addEventListener("click", () => {
    const petID = getPetID();
    interact(petID, "feed");
  });

  cleanButton.addEventListener("click", () => {
    const petID = getPetID();
    interact(petID, "clean");
  });
}

// Update pet stats on the frontend
function updatePetStatus(pet) {
  const happinessStat = document.getElementById("happiness-stat");
  const healthStat = document.getElementById("health-stat");
  const cleanlinessStat = document.getElementById("cleanliness-stat");

  happinessStat.innerHTML = `happiness: ${pet.happiness}%`;
  healthStat.innerHTML = `health: ${pet.health}%`;
  cleanlinessStat.innerHTML = `cleanliness: ${pet.cleanliness}%`;
}

// Send a POST request to the backend with interaction details when the user interacts with pet
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

// Fetch pet data from the backend
async function getPetData(petID) {
  const response = await fetch(`/pet/${petID}`);
  const data = await response.json();
  return data;
}

function startPetAnimation() {
  // Set up the canvas
  const canvas = document.getElementById("main-canvas");
  const ctx = canvas.getContext("2d");

  if (window.innerWidth >= window.innerHeight) {
    canvas.height = window.innerHeight;
    canvas.width = canvas.height;
  } else {
    canvas.width = window.innerWidth;
    canvas.height = canvas.width;
  }
  ctx.fillStyle = "#759e61";

  // Draw the pet to the canvas
  const frames = [() => drawFrame1(canvas, ctx), () => drawFrame2(canvas, ctx)]; // Pet animation frames

  let currentFrameIndex = 0;
  frames[currentFrameIndex](canvas, ctx);

  setInterval(() => {
    currentFrameIndex = (currentFrameIndex + 1) % frames.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frames[currentFrameIndex]();
  }, 500); // Change the animation frame every 500ms
}

function drawFrame1(canvas, ctx) {
  // Draw Row 1
  drawSquare(canvas, ctx, (14 * canvas.width) / 30, (10 * canvas.height) / 30);
  drawSquare(canvas, ctx, (15 * canvas.width) / 30, (10 * canvas.height) / 30);
  // Row 2
  drawSquare(canvas, ctx, (12 * canvas.width) / 30, (11 * canvas.height) / 30);
  drawSquare(canvas, ctx, (13 * canvas.width) / 30, (11 * canvas.height) / 30);
  drawSquare(canvas, ctx, (14 * canvas.width) / 30, (11 * canvas.height) / 30);
  drawSquare(canvas, ctx, (15 * canvas.width) / 30, (11 * canvas.height) / 30);
  drawSquare(canvas, ctx, (16 * canvas.width) / 30, (11 * canvas.height) / 30);
  drawSquare(canvas, ctx, (17 * canvas.width) / 30, (11 * canvas.height) / 30);
  // Row 3
  drawSquare(canvas, ctx, (11 * canvas.width) / 30, (12 * canvas.height) / 30);
  drawSquare(canvas, ctx, (18 * canvas.width) / 30, (12 * canvas.height) / 30);
  // Row 4
  drawSquare(canvas, ctx, (10 * canvas.width) / 30, (13 * canvas.height) / 30);
  drawSquare(canvas, ctx, (11 * canvas.width) / 30, (13 * canvas.height) / 30);
  drawSquare(canvas, ctx, (13 * canvas.width) / 30, (13 * canvas.height) / 30);
  drawSquare(canvas, ctx, (16 * canvas.width) / 30, (13 * canvas.height) / 30);
  drawSquare(canvas, ctx, (18 * canvas.width) / 30, (13 * canvas.height) / 30);
  drawSquare(canvas, ctx, (19 * canvas.width) / 30, (13 * canvas.height) / 30);
  // Row 5
  drawSquare(canvas, ctx, (10 * canvas.width) / 30, (14 * canvas.height) / 30);
  drawSquare(canvas, ctx, (13 * canvas.width) / 30, (14 * canvas.height) / 30);
  drawSquare(canvas, ctx, (16 * canvas.width) / 30, (14 * canvas.height) / 30);
  drawSquare(canvas, ctx, (19 * canvas.width) / 30, (14 * canvas.height) / 30);
  // Row 6
  drawSquare(canvas, ctx, (10 * canvas.width) / 30, (15 * canvas.height) / 30);
  drawSquare(canvas, ctx, (19 * canvas.width) / 30, (15 * canvas.height) / 30);
  // Row 7
  drawSquare(canvas, ctx, (10 * canvas.width) / 30, (16 * canvas.height) / 30);
  drawSquare(canvas, ctx, (14 * canvas.width) / 30, (16 * canvas.height) / 30);
  drawSquare(canvas, ctx, (15 * canvas.width) / 30, (16 * canvas.height) / 30);
  drawSquare(canvas, ctx, (19 * canvas.width) / 30, (16 * canvas.height) / 30);
  // Row 8
  drawSquare(canvas, ctx, (11 * canvas.width) / 30, (17 * canvas.height) / 30);
  drawSquare(canvas, ctx, (18 * canvas.width) / 30, (17 * canvas.height) / 30);
  // Row 9
  drawSquare(canvas, ctx, (12 * canvas.width) / 30, (18 * canvas.height) / 30);
  drawSquare(canvas, ctx, (13 * canvas.width) / 30, (18 * canvas.height) / 30);
  drawSquare(canvas, ctx, (14 * canvas.width) / 30, (18 * canvas.height) / 30);
  drawSquare(canvas, ctx, (15 * canvas.width) / 30, (18 * canvas.height) / 30);
  drawSquare(canvas, ctx, (16 * canvas.width) / 30, (18 * canvas.height) / 30);
  drawSquare(canvas, ctx, (17 * canvas.width) / 30, (18 * canvas.height) / 30);
}

function drawFrame2(canvas, ctx) {
  // Draw Row 2
  drawSquare(canvas, ctx, (14 * canvas.width) / 30, (11 * canvas.height) / 30);
  drawSquare(canvas, ctx, (15 * canvas.width) / 30, (11 * canvas.height) / 30);
  // Row 3
  drawSquare(canvas, ctx, (12 * canvas.width) / 30, (12 * canvas.height) / 30);
  drawSquare(canvas, ctx, (13 * canvas.width) / 30, (12 * canvas.height) / 30);
  drawSquare(canvas, ctx, (14 * canvas.width) / 30, (12 * canvas.height) / 30);
  drawSquare(canvas, ctx, (15 * canvas.width) / 30, (12 * canvas.height) / 30);
  drawSquare(canvas, ctx, (16 * canvas.width) / 30, (12 * canvas.height) / 30);
  drawSquare(canvas, ctx, (17 * canvas.width) / 30, (12 * canvas.height) / 30);
  // Row 4
  drawSquare(canvas, ctx, (11 * canvas.width) / 30, (13 * canvas.height) / 30);
  drawSquare(canvas, ctx, (18 * canvas.width) / 30, (13 * canvas.height) / 30);
  // Row 5
  drawSquare(canvas, ctx, (10 * canvas.width) / 30, (14 * canvas.height) / 30);
  drawSquare(canvas, ctx, (11 * canvas.width) / 30, (14 * canvas.height) / 30);
  drawSquare(canvas, ctx, (18 * canvas.width) / 30, (14 * canvas.height) / 30);
  drawSquare(canvas, ctx, (19 * canvas.width) / 30, (14 * canvas.height) / 30);
  // Row 6
  drawSquare(canvas, ctx, (10 * canvas.width) / 30, (15 * canvas.height) / 30);
  drawSquare(canvas, ctx, (13 * canvas.width) / 30, (15 * canvas.height) / 30);
  drawSquare(canvas, ctx, (16 * canvas.width) / 30, (15 * canvas.height) / 30);
  drawSquare(canvas, ctx, (19 * canvas.width) / 30, (15 * canvas.height) / 30);
  // Row 7
  drawSquare(canvas, ctx, (10 * canvas.width) / 30, (16 * canvas.height) / 30);
  drawSquare(canvas, ctx, (19 * canvas.width) / 30, (16 * canvas.height) / 30);
  // Row 8
  drawSquare(canvas, ctx, (11 * canvas.width) / 30, (17 * canvas.height) / 30);
  drawSquare(canvas, ctx, (14 * canvas.width) / 30, (17 * canvas.height) / 30);
  drawSquare(canvas, ctx, (15 * canvas.width) / 30, (17 * canvas.height) / 30);
  drawSquare(canvas, ctx, (18 * canvas.width) / 30, (17 * canvas.height) / 30);
  // Row 9
  drawSquare(canvas, ctx, (12 * canvas.width) / 30, (18 * canvas.height) / 30);
  drawSquare(canvas, ctx, (13 * canvas.width) / 30, (18 * canvas.height) / 30);
  drawSquare(canvas, ctx, (14 * canvas.width) / 30, (18 * canvas.height) / 30);
  drawSquare(canvas, ctx, (15 * canvas.width) / 30, (18 * canvas.height) / 30);
  drawSquare(canvas, ctx, (16 * canvas.width) / 30, (18 * canvas.height) / 30);
  drawSquare(canvas, ctx, (17 * canvas.width) / 30, (18 * canvas.height) / 30);
}

function drawSquare(canvas, ctx, x, y) {
  ctx.fillRect(x, y, canvas.width / 30, canvas.height / 30);
}
