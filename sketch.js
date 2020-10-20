population_size = 200;
init_infection = 0.05;

function setup() {
  createCanvas(700, 500);  
  population = new Population(population_size, init_infection);
}

function draw() {
  background(255);
  population.update();
  population.test();
  update_timeline(population);
  console.log(population.S, population.I, population.R);
}

function update_timeline(people) {
  stroke(color(170, 198, 202));
  line(frameCount, height, frameCount, height - people.S);
}