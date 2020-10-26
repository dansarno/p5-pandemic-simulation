let sliderContainers = [];
let timelineCanvas;
let timelineHeight = 150;
let controlsHeight = 60;
let canvasWidth = 720;
let paused = false;
let showQtree = false;
let showFrameRate = true;
let reset = false;
let currentFrame = 0;
let newQtree;
// let icon;
//
// function preload() {
//   icon = loadImage('assests/refresh_icon.png');
// }

function setup() {
  // frameRate(10);
  createCanvas(canvasWidth, windowHeight);
  let initialFrame = currentFrame;
  timelineCanvas = createGraphics(canvasWidth, timelineHeight);
  timelineCanvas.background(230);

  setupUI();

  env = new Environment(canvasWidth, windowHeight - controlsHeight - timelineHeight);
  newSimulation();
}

function draw() {
  if (reset) newSimulation();

  newQtree = population.update();
  if (showQtree) showQuadtree(newQtree);

  updateSliders();
  updateTimeline(population, initialFrame);
  if (showFrameRate) updateFrameRateText();

  image(timelineCanvas, 0, windowHeight - controlsHeight - timelineHeight);
  currentFrame++;

  // image(icon, 15, windowHeight - 50, 40, 40);
}

function newSimulation() {
  population = new Population(populationSlider.value(), initInfectionSlider.value(), env);
  initialFrame = currentFrame;
  timelineCanvas.background(230);
  reset = false;
}

function updateSliders() {
  for (let c of sliderContainers) {
    c.show();
  }
}

function updateTimeline(people, startFrame) {
  let pixelLengths = [];
  pixelLengths.push((people.S / people.size) * timelineHeight);
  pixelLengths.push((people.I / people.size) * timelineHeight);
  pixelLengths.push((people.R / people.size) * timelineHeight);

  // Largest remainder method to ensure the desired sum is met
  pixelLengths = largestRemainderRound(pixelLengths, timelineHeight);

  let xPixel = currentFrame - startFrame;

  // Draw infected
  timelineCanvas.stroke(color(187, 100, 29));
  timelineCanvas.line(xPixel, timelineHeight - pixelLengths[1],
    xPixel, timelineHeight);

  // // Draw recoverd
  timelineCanvas.stroke(color(203, 138, 192));
  timelineCanvas.line(xPixel, timelineHeight - pixelLengths[1] - pixelLengths[2],
    xPixel, timelineHeight - pixelLengths[1]);

  // Draw susceptible
  timelineCanvas.stroke(color(170, 198, 202));
  timelineCanvas.line(xPixel, 0,
    xPixel, timelineHeight - pixelLengths[1] - pixelLengths[2]);
}