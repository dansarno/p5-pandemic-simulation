function setupUI() {
  populationSlider = createSlider(10, 500, 100, 10);
  initInfectionSlider = createSlider(0.0, 0.2, 0.1, 0.01);

  sliderContainers.push(new SliderElement(null, null,
      10, windowHeight - 55, color(255, 255, 255), 50, 50));
  sliderContainers.push(new SliderElement(populationSlider, "Population Size",
      70, windowHeight - 55, color(255, 255, 255)));
  sliderContainers.push(new SliderElement(initInfectionSlider, "Initial Infection",
      230, windowHeight - 55, color(255, 255, 255)));
}

function updateFrameRateText() {
  fill(150);
  noStroke();
  textSize(20);
  textAlign(LEFT);
  text("fps", 35, 30);
  text(int(frameRate()), 10, 30);
}

class SliderElement {
  constructor (slider, label, x, y, colour, w=150, h=50) {
    this.slider = slider;
    this.label = label;
    this.x = x;
    this.y = y;
    this.colour = colour;

    this.h = h;
    this.w = w;
    this.padding = 10;

    if (this.slider) {
      this.slider.style('width', (this.w - (2 * this.padding)) +'px')
      this.slider.position(this.x + this.padding, this.y + (this.padding / 2));
    }
  }

  show() {
    // Display boarder
    rectMode(CORNER);
    fill(this.colour);
    stroke(100);
    strokeWeight(1);
    rect(this.x, this.y, this.w, this.h, 10);

    // Display label
    if (this.label) {
      fill(50);
      noStroke();
      textSize(14);
      textAlign(LEFT, BOTTOM);
      text(this.label + ":", this.x + this.padding, this.y + this.h - this.padding);
    }

    // Display slider value
    if (this.slider) {
      textAlign(RIGHT, BOTTOM);
      text(this.slider.value(), this.x + this.w - this.padding, this.y + this.h - this.padding);
    }
  }
}
