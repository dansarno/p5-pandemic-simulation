function setupUI() {
  population_slider = createSlider(10, 500, 100, 10);
  init_infection_slider = createSlider(0.0, 0.2, 0.1, 0.01);

  sliderContainers.push(new SliderElement(population_slider, "Population Size",
      170, windowHeight - 55, color(255, 255, 255)));
  sliderContainers.push(new SliderElement(init_infection_slider, "Initial Infection",
      330, windowHeight - 55, color(255, 255, 255)));
}

function update_framerate_text() {
  fill(150);
  noStroke();
  textSize(20);
  textAlign(LEFT);
  text("fps", 35, 30);
  text(int(frameRate()), 10, 30);
}

class SliderElement {
  constructor (slider, label, x, y, colour) {
    this.slider = slider;
    this.label = label;
    this.x = x;
    this.y = y;
    this.colour = colour;

    this.height = 50;
    this.width = 150;
    this.padding = 10;

    this.slider.style('width', (this.width - (2 * this.padding)) +'px')
    this.slider.position(this.x + this.padding, this.y + (this.padding / 2));
  }

  show() {
    // Display boarder
    rectMode(CORNER);
    fill(this.colour);
    stroke(100);
    strokeWeight(1);
    rect(this.x, this.y, this.width, this.height);

    // Display label
    fill(50);
    noStroke();
    textSize(14);
    textAlign(LEFT, BOTTOM);
    text(this.label + ":", this.x + this.padding, this.y + this.height - this.padding);

    // Display slider value
    textAlign(RIGHT, BOTTOM);
    text(this.slider.value(), this.x + this.width - this.padding, this.y + this.height - this.padding);
  }
}
