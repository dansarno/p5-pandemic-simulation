function keyPressed() {
  if (key == 'p' || key == 'P') {
    paused = !paused;
    if (paused) noLoop();
    else loop();
  }

  if (key == 'h') {
    showQtree = !showQtree;
  }

  if (key == 'f') {
    showFrameRate = !showFrameRate;
  }

  if (key == 'r') {
    reset = !reset;
  }
}