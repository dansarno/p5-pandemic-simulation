function showQuadtree(quadTree) {
  noFill();
  strokeWeight(1);
  stroke(200);
  rectMode(CENTER);
  rect(quadTree.boundary.centreX, quadTree.boundary.centreY,
    quadTree.boundary.halfW * 2, quadTree.boundary.halfH * 2);

  if (quadTree.nw != null) {
    showQuadtree(quadTree.nw);
    showQuadtree(quadTree.ne);
    showQuadtree(quadTree.sw);
    showQuadtree(quadTree.se);
  }
}
