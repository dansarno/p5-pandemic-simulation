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
      p.bounce();
      p.checkup();
      p.move();

      // Create point object for person p and insert into quadtree
      let point = new Point(p.x, p.y, p);
      qtree.insert(point);
    }


    // O(n^2) collision detection
    // for (let p of this.people) {
    //   for (let q of this.people) {
    //     // stroke(150);
    //     // strokeWeight(1);
    //     // line(p.x, p.y, q.x, q.y);
    //     if (p !== q && p.contact(q)) {
    //       p.infection();
    //       q.infection();
    //     }
    //   }
    // }

    // O(n log(n)) collision detection
    for (let p of this.people) {
      // let neighbourhood = new Box(p.x, p.y, p.r, p.r);
      let neighbourhood = new Circle(p.x, p.y, p.r * 2);
      let neighbours = qtree.query_range(neighbourhood);
      for (let neighbour of neighbours) {
        let q = neighbour.data;
        // stroke(68, 207, 95);
        // strokeWeight(3);
        // line(p.x, p.y, q.x, q.y);
        if (p !== q && p.contact(q)) {
          p.infection();
          q.infection();
        }
      }
    }

    for (let p of this.people) {
      p.show();
    }

  return qtree;
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
