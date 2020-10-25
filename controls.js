function keyPressed() {
  if (key == 'p' || key == 'P') {
    paused = !paused;
    if (paused) noLoop();
    else loop();
  }

  if (key == 'h') {
    show_qtree = !show_qtree;
  }

  if (key == 'f') {
    show_frame_rate = !show_frame_rate;
  }

  if (key == 'r') {
    reset = !reset;
  }
}
