let population_size = 200;
let init_infection = 0.05;
let timeline_canvas;
let timeline_height = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  timeline_canvas = createGraphics(windowWidth, timeline_height);
  timeline_canvas.background(255);
  env = new Environment(windowWidth, windowHeight - timeline_height);
  population = new Population(population_size, init_infection, env);
}

function draw() {
  background(255);
  population.update();
  population.test();

  update_timeline(population);
  image(timeline_canvas, 0, windowHeight - timeline_height);
}

function update_timeline(people) {
  // Draw infected
  timeline_canvas.stroke(color(187, 100, 29));
  timeline_canvas.line(frameCount, timeline_height - people.I,
    frameCount, timeline_height);

  // // Draw recoverd
  timeline_canvas.stroke(color(203, 138, 192));
  timeline_canvas.line(frameCount, timeline_height - people.I - people.R,
    frameCount, timeline_height - people.I);

  // Draw susceptible
  timeline_canvas.stroke(color(170, 198, 202));
  timeline_canvas.line(frameCount, timeline_height - people.size,
    frameCount, timeline_height - people.I - people.R);


}
