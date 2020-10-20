class Person {
  constructor(infected=false) {
    this.r = 5;
    this.x = random(this.r, width - this.r);
    this.y = random(this.r, height - this.r);
    this.speed = 1;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.colour = color(170, 198, 202); // "#aac6ca";
    this.infected = infected;
    this.days_infected = 0;
    this.recovered = false;

    if (this.infected) {this.infection()}
  }

  contact(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    let is_in_contact = d < this.r + other.r
    if (is_in_contact) {
      if (this.infected || other.infected) {
        this.infected = true;
        other.infected = true;
        return true;
      }
      else {
        return false;
      }
    }
  }

  infection() {
    this.infected = true;
    this.r = 8;
    this.colour = color(187, 100, 29); //"#bb641d";
  }

  recovery() {
    this.infected = false;
    this.recovered = true;
    this.r = 5;
    this.colour = color(203, 138, 192); //"#cb8ac0";
  }

  move() {
    this.x += this.vx * this.speed;
    this.y += this.vy * this.speed;
  }

  checkup() {
    if (this.infected && this.days_infected > 12) {
      this.recovery()
    }
    if (this.infected) {
      this.days_infected += 0.1;
    }
  }

  show() {
    colorMode(RGB, 255, 255, 255, 100);
    this.colour.setAlpha(100);
    stroke(this.colour);
    ellipse(this.x, this.y, 1);
    strokeWeight(2);
    this.colour.setAlpha(30);
    fill(this.colour);
    ellipse(this.x, this.y, this.r * 2);
  }

  bounce() {
    if (this.x - this.r < 0 || this.x + this.r > width) {
      this.vx *= -1;
    }

    if (this.y - this.r < 0 || this.y + this.r > height) {
      this.vy *= -1;
    }
  }
}
