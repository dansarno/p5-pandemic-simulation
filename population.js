class Population {
  constructor(size, init_infection, environment) {
    this.size = size;
    this.init_infection = init_infection;
    this.environment = environment;
    this.people = [];
    this.S = 0;
    this.I = 0;
    this.R = 0;

    this.populate();
  }

  populate() {
    for (let i = 0; i < this.size; i++) {
      this.people[i] = new Person(this.environment, random() < this.init_infection);
    }
  }

  update() {
    let boundary = new Box(this.environment.w / 2, this.environment.h / 2,
      this.environment.w / 2, this.environment.h / 2);
    let qtree = new QuadTree(boundary, 4);

    for (let p of this.people) {
      for (let q of this.people) {
        if (p !== q && p.contact(q)) {
          p.infection();
          q.infection();
        }
      }

      p.bounce();
      p.checkup();
      p.move();

      let point = new Point(p.x, p.y, p);
      qtree.insert(point);
    }
    qtree.show();

    for (let p of this.people) {
      p.show();
    }

    // console.log(qtree);
  }

  test() {
    this.S = 0;
    this.I = 0;
    this.R = 0;
    for (let p of this.people) {
      if (p.infected) {
        this.I++;
      }
      else if (p.recovered) {
        this.R++;
      }
      else {
        this.S++;
      }
    }
  }

  slow_down() {
    for (let p of this.people) {
          p.speed *= 0.5;
      }
  }

  speed_up() {
    for (let p of this.people) {
          p.speed *= 1.5;
      }
  }
}
