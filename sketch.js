let population_slider;
let init_infection_slider;
let timeline_canvas;
let timeline_height = 200;
let controls_height = 50;
let paused = false;
let show_qtree = false;
let current_frame = 0;
let new_qtree;

function setup() {
  // frameRate(30);
  createCanvas(windowWidth, windowHeight - controls_height);
  let initial_frame = current_frame;
  timeline_canvas = createGraphics(windowWidth, timeline_height);
  timeline_canvas.background(255);

  let reset_button = createButton("Restart Simulation");
  reset_button.mousePressed(resetSketch);
  let pause_button = createButton("Play/Pause");
  pause_button.mousePressed(paused_clicked);
  let show_button = createButton("Hide/Unhide QTree");
  show_button.mousePressed(hide_clicked);

  population_slider = createSlider(1, 500, 100, 1);
  init_infection_slider = createSlider(0.0, 0.2, 0.1, 0.01);

  env = new Environment(windowWidth, windowHeight - controls_height - timeline_height);
  resetSketch();
}

function draw() {
  if (!paused) {
    background(255);
    new_qtree = population.update();
    if (show_qtree) {
      show_quadtree(new_qtree);
    }
    population.test();

    update_timeline(population, initial_frame);
    update_framerate_text();
    image(timeline_canvas, 0, windowHeight - controls_height - timeline_height);

    current_frame++;
  }
}

function resetSketch() {
  paused = false;
  population = new Population(population_slider.value(),
                              init_infection_slider.value(), env);
  initial_frame = current_frame;
  timeline_canvas.background(255);
}

function paused_clicked() {
  paused = !paused;
}

function hide_clicked() {
  show_qtree = !show_qtree;
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

function update_framerate_text() {
  fill(150);
  noStroke();
  textSize(20);
  text("Frame Rate:", 10, 30);
  text(int(frameRate()), 130, 30);
}
