function keyPressed() {
  if (key == 'p' || key == 'P') {
    paused = !paused;
    if (paused) noLoop();
    else loop();
  }

  if (key == 'h' || key == 'H') {
    showQtree = !showQtree;
  }

  if (key == 'f' || key == 'F') {
    showFrameRate = !showFrameRate;
  }

  if (key == 'r' || key == 'R') {
    reset = !reset;
  }
}