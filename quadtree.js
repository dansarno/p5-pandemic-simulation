class Point {
  constructor(x, y, data) {
    this.x = x;
    this.y = y;
    this.data = data;
  }
}

class Box {
  constructor(centreX, centreY, halfW, halfH) {
    this.centreX = centreX;
    this.centreY = centreY;
    this.halfW = halfW;
    this.halfH = halfH;
    // Convenient attributes...
    this.leftEdge = this.centreX - this.halfW;
    this.rightEdge = this.centreX + this.halfW;
    this.topEdge = this.centreY - this.halfH;
    this.bottomEdge = this.centreY + this.halfH;
  }

  containsPoint(p) {
    return this.leftEdge < p.x && p.x < this.rightEdge &&
      this.topEdge < p.y && p.y < this.bottomEdge;
  }

  intersectsBox(range) {
    return !(range.leftEdge > this.rightEdge ||
      range.rightEdge < this.leftEdge ||
      range.topEdge > this.bottomEdge ||
      range.bottomEdge < this.topEdge);
  }
}

class Circle {
  constructor(centreX, centreY, radius) {
    this.centreX = centreX;
    this.centreY = centreY;
    this.radius = radius;
  }

  containsPoint(p) {
    let d = dist(this.centreX, this.centreY, p.x, p.y);
    return d <= this.radius;
  }

  intersectsCircle(range) {
    // no intersection
    if (this.centreX + this.radius < range.leftEdge ||
      this.centreX - this.radius > range.rightEdge ||
      this.centreY + this.radius < range.topEdge ||
      this.centreY - this.radius > range.bottomEdge) {
      return false;
    }

    // must intersect if circle centre is within range boarders
    if ((this.centreX <= range.rightEdge && this.centreX >= range.leftEdge) ||
      (this.centreY <= range.bottomEdge && this.centreY >= range.topEdge)) {
      return false;
    }

    // difficult intersection check on the corners of the range
    let xDist = Math.abs(range.centreX - this.centreX);
    let yDist = Math.abs(range.centreY - this.centreY);

    cornerDistSq = Math.pow(xDist - range.halfW, 2) +
      Math.pow(yDist - range.halfH, 2);

    return (cornerDistSq <= (this.radius * this.radius));

  }
}

class QuadTree {
  constructor(boundary, capacity) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.points = [];
    this.nw = null;
    this.ne = null;
    this.sw = null;
    this.se = null;
  }

  subdivide() {
    let x = this.boundary.centreX;
    let y = this.boundary.centreY;
    let w = this.boundary.halfW / 2;
    let h = this.boundary.halfH / 2;
    this.nw = new QuadTree(new Box(x - w, y - h, w, h), this.capacity);
    this.ne = new QuadTree(new Box(x + w, y - h, w, h), this.capacity);
    this.sw = new QuadTree(new Box(x - w, y + h, w, h), this.capacity);
    this.se = new QuadTree(new Box(x + w, y + h, w, h), this.capacity);
  }

  // Insert a point into the QuadTree
  insert(p) {
    // Ignore objects that do not belong in this quad tree
    if (!this.boundary.containsPoint(p)) {
      return false; // object cannot be added
    }

    // If there is space in this quad tree and if doesn't have subdivisions,
    // add the object here
    if ((this.points.length < this.capacity) && this.nw == null) {
      this.points.push(p);
      return true;
    }

    // Otherwise, subdivide and then add the point to whichever node will accept it
    if (this.nw == null) {
      this.subdivide();
    }
    //We have to add the points/data contained into this quad array to the new
    //quads if we only want the last node to hold the data

    if (this.nw.insert(p)) return true;
    if (this.ne.insert(p)) return true;
    if (this.sw.insert(p)) return true;
    if (this.se.insert(p)) return true;

    // Otherwise, the point cannot be inserted for some unknown reason (this should never happen)
    return false;
  }

  // Find all points that appear within a range
  queryRange(range) {
    // Prepare an array of results
    let pointsInRange = [];

    // Automatically abort if the range does not intersect this quad
    if (!this.boundary.intersectsBox(range)) {
      return pointsInRange; // empty list
    }

    // Check objects at this quad level
    for (let p of this.points) {
      if (range.containsPoint(p)) {
        pointsInRange.push(p);
      }
    }

    // Terminate here, if there are no children
    if (this.nw == null) {
      return pointsInRange;
    }

    // Otherwise, add the points from the children
    pointsInRange = pointsInRange.concat(this.nw.queryRange(range));
    pointsInRange = pointsInRange.concat(this.ne.queryRange(range));
    pointsInRange = pointsInRange.concat(this.sw.queryRange(range));
    pointsInRange = pointsInRange.concat(this.se.queryRange(range));

    return pointsInRange;
  }
}