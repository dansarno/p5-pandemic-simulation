class Population {
  constructor(size, init_infection) {
    this.size = size;
    this.init_infection = init_infection;
    this.people = [];
    this.S = 0;
    this.I = 0;
    this.R = 0;
    
    this.populate();
  }
  
  populate() {
    for (let i = 0; i < this.size; i++) {
      this.people[i] = new Person(random() < init_infection);
    }
  }
  
  update() {
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
    p.show();
    }
  }
  
  test() {
    this.S = 0;
    this.I = 0;
    this.R = 0;
    for (let p of this.people) {
      if (p.infected) {
        this.I++;
      }
      if (p.recovered) {
        this.R++;
      }
    }
    this.S = this.size - (this.I + this.R);
  }
}