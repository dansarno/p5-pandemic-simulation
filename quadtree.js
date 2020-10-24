class Point {
  constructor (x, y, data) {
    this.x = x;
    this.y = y;
    this.data = data;
  }
}

class Box {
  constructor (centre_x, centre_y, half_w, half_h) {
    this.centre_x = centre_x;
    this.centre_y = centre_y;
    this.half_w = half_w;
    this.half_h = half_h;
    // Convenient attributes...
    this.left_edge = this.centre_x - this.half_w;
    this.right_edge = this.centre_x + this.half_w;
    this.top_edge = this.centre_y - this.half_h;
    this.bottom_edge = this.centre_y + this.half_h;
  }

  contains_point(p) {
    return this.left_edge < p.x && p.x < this.right_edge &&
        this.top_edge < p.y && p.y < this.bottom_edge;
  }

  intersects_box(other_box) {
    return !(other_box.left_edge > this.right_edge ||
         other_box.right_edge < this.left_edge ||
         other_box.top_edge > this.bottom_edge ||
         other_box.bottom_edge < this.top_edge);
  }
}

class QuadTree {
  constructor (boundary, capacity) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.points = [];
    this.nw = null;
    this.ne = null;
    this.sw = null;
    this.se = null;
  }

  subdivide() {
    let x = this.boundary.centre_x;
    let y = this.boundary.centre_y;
    let w = this.boundary.half_w / 2;
    let h = this.boundary.half_h / 2;
    this.nw = new QuadTree(new Box(x - w, y - h, w, h), this.capacity);
    this.ne = new QuadTree(new Box(x + w, y - h, w, h), this.capacity);
    this.sw = new QuadTree(new Box(x - w, y + h, w, h), this.capacity);
    this.se = new QuadTree(new Box(x + w, y + h, w, h), this.capacity);
  }

  // Insert a point into the QuadTree
  insert(p) {
    // Ignore objects that do not belong in this quad tree
    if (!this.boundary.contains_point(p)) {
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

    if (this.nw.insert(p)) {return true;}
    if (this.ne.insert(p)) {return true;}
    if (this.sw.insert(p)) {return true;}
    if (this.se.insert(p)) {return true;}

    // Otherwise, the point cannot be inserted for some unknown reason (this should never happen)
    return false;
  }

  // Find all points that appear within a range
  query_range(range) {
    // Prepare an array of results
    let pointsInRange = [];

    // Automatically abort if the range does not intersect this quad
    if (!this.boundary.intersects_box(range)) {
        return pointsInRange; // empty list
      }

    // Check objects at this quad level
    for (let p of this.points) {
        if (range.contains_point(p)) {
            pointsInRange.push(p);
          }
        }

    // Terminate here, if there are no children
    if (this.nw == null) {
        return pointsInRange;
      }

    // Otherwise, add the points from the children
    pointsInRange = pointsInRange.concat(this.nw.query_range(range));
    pointsInRange = pointsInRange.concat(this.ne.query_range(range));
    pointsInRange = pointsInRange.concat(this.sw.query_range(range));
    pointsInRange = pointsInRange.concat(this.se.query_range(range));

    return pointsInRange;
  }
}