function show_quadtree(quad_tree) {
  noFill();
  strokeWeight(1);
  stroke(200);
  rectMode(CENTER);
  rect(quad_tree.boundary.centre_x, quad_tree.boundary.centre_y,
    quad_tree.boundary.half_w * 2, quad_tree.boundary.half_h * 2);

  if (quad_tree.nw != null) {
    show_quadtree(quad_tree.nw);
    show_quadtree(quad_tree.ne);
    show_quadtree(quad_tree.sw);
    show_quadtree(quad_tree.se);
  }
}
