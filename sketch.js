let population_slider;
let init_infection_slider;
let timeline_canvas;
let timeline_height = 200;
let controls_height = 50;

function setup() {
  // frameRate(30);
  createCanvas(windowWidth, windowHeight - controls_height);
  let initial_frame = frameCount;
  timeline_canvas = createGraphics(windowWidth, timeline_height);
  timeline_canvas.background(255);

  let reset_button = createButton("Start Simulation");
  reset_button.mousePressed(resetSketch);
  population_slider = createSlider(0, 500, 100, 1);
  init_infection_slider = createSlider(0.0, 0.2, 0.1, 0.01);
  let show_button = createButton("Show QuadTree");
  show_button.mousePressed(resetSketch);

  env = new Environment(windowWidth, windowHeight - controls_height - timeline_height);
  resetSketch();
}

function draw() {
  background(255);
  population.update();
  population.test();

  update_timeline(population, initial_frame);
  image(timeline_canvas, 0, windowHeight - controls_height - timeline_height);
  fill(0);
  noStroke();
  textSize(32);
  text(int(frameRate()), 10, 30);
}

function resetSketch() {
  population = new Population(population_slider.value(),
                              init_infection_slider.value(), env);
  initial_frame = frameCount;
  timeline_canvas.background(255);
}

function update_timeline(people, startFrame) {
  // Draw infected
  timeline_canvas.stroke(color(187, 100, 29));
  timeline_canvas.line(frameCount - startFrame, timeline_height - people.I,
    frameCount - startFrame, timeline_height);

  // // Draw recoverd
  timeline_canvas.stroke(color(203, 138, 192));
  timeline_canvas.line(frameCount - startFrame, timeline_height - people.I - people.R,
    frameCount - startFrame, timeline_height - people.I);

  // Draw susceptible
  timeline_canvas.stroke(color(170, 198, 202));
  timeline_canvas.line(frameCount - startFrame, timeline_height - people.size,
    frameCount - startFrame, timeline_height - people.I - people.R);
}
