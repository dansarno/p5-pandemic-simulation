# Pandemic Simulation
Simulation inspired the popular [Why outbreaks like
coronavirus spread exponentially and how to "flatten the curve"](https://www.washingtonpost.com/graphics/2020/world/corona-simulator/)
article by Harry Stevens published in the Washington Post
on March 14, 2020.

The simulation can be viewed and controlled [here](https://dansarno.github.io/p5-pandemic-simulation/).

#### Key Bindings
- `p` = pause/resume simulation
- `r` = restart simulation
- `h` = show/hide quadtree
- `f` = hide/show frames per second

### About
This project is a simple visual representation of a spatial SIR
(susceptible, infectious, recovered) model run in p5.js. 
The simulation uses a quadtree data structure to hold the location
and information of the members of the population. A quadtree
is a commonly used data structure when needed to detect collisions
of many particles on a 2D plane.
