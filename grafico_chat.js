// Sketch: mini "flame" generativo simple en p5.js

let colors;

function setup() {
  createCanvas(800, 800);
  background(255);
  colors = [
    color(255, 0, 0, 50),   // naranja translúcido
    color(0, 150, 255, 10),   // azul translúcido
    color(180, 255, 100, 10)  // verde claro translúcido
  ];
  noStroke();
}

function draw() {
    
  translate(width / 2, height / 2);
  
  for (let i = 0; i < 500; i++) {
    let x = random(-1, 1);
    let y = random(-1, 1);
    
    // Aplicamos una transformación no lineal tipo "flame"
    let nx = sin(3 * y) - tan(x);
    let ny = sin(3 * x) - cos(y);
    
    // Escalamos y desplazamos para mantener dentro del lienzo
    let px = nx * 150 + random(-2, 2);
    let py = ny * 150 + random(-2, 2);
    
    // Seleccionamos color aleatorio
    let c = random(colors);
    fill(c);
    
    // Dibujamos un pequeño punto
    ellipse(px, py, 2, 2);
  }
  
  // Detenemos después de muchos cuadros
  if (frameCount > 5000) noLoop();
}
