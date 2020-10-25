let sliderContainers = [];
let timeline_canvas;
let timeline_height = 200;
let controls_height = 60;
let paused = false;
let show_qtree = false;
let show_frame_rate = true;
let reset = false;
let current_frame = 0;
let new_qtree;

function setup() {
  // frameRate(30);
  createCanvas(windowWidth, windowHeight);
  let initial_frame = current_frame;
  timeline_canvas = createGraphics(windowWidth, timeline_height);
  timeline_canvas.background(255);

  let reset_button = createButton("Restart Simulation");
  reset_button.position(10, windowHeight - 55);
  reset_button.size(150, 50);
  reset_button.style("font-size", "14px");
  reset_button.mousePressed(newSimulation);

  setupUI();

  env = new Environment(windowWidth, windowHeight - controls_height - timeline_height);
  newSimulation();
}

function draw() {
  if (reset) newSimulation();

  new_qtree = population.update();
  if (show_qtree) show_quadtree(new_qtree);

  update_sliders();
  update_timeline(population, initial_frame);
  if (show_frame_rate) update_framerate_text();

  image(timeline_canvas, 0, windowHeight - controls_height - timeline_height);
  current_frame++;
}

function newSimulation() {
  population = new Population(population_slider.value(), init_infection_slider.value(), env);
  initial_frame = current_frame;
  timeline_canvas.background(255);
  reset = false;
}

function update_sliders() {
  for (let c of sliderContainers) {
    c.show();
  }
}

function update_timeline(people, startFrame) {
  let pixel_lens = [];
  pixel_lens.push((people.S / people.size) * timeline_height);
  pixel_lens.push((people.I / people.size) * timeline_height);
  pixel_lens.push((people.R / people.size) * timeline_height);

 // Largest remainder method to ensure the desired sum is met
  pixel_lens = largestRemainderRound(pixel_lens, timeline_height);

  let x_pixel = current_frame - startFrame;

  // Draw infected
  timeline_canvas.stroke(color(187, 100, 29));
  timeline_canvas.line(x_pixel, timeline_height - pixel_lens[1],
    x_pixel, timeline_height);

  // // Draw recoverd
  timeline_canvas.stroke(color(203, 138, 192));
  timeline_canvas.line(x_pixel, timeline_height - pixel_lens[1] - pixel_lens[2],
    x_pixel, timeline_height - pixel_lens[1]);

  // Draw susceptible
  timeline_canvas.stroke(color(170, 198, 202));
  timeline_canvas.line(x_pixel, 0,
    x_pixel, timeline_height -  pixel_lens[1] - pixel_lens[2]);
}
