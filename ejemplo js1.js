var rojo = 255 ;
var verde = 128;
var azul =0;
function setup() {
  createCanvas(700, 1200);
}

function draw() {
  background(azul,verde,rojo);
  fill(rojo,verde,azul);
  strokeWeight(10);
  stroke(0,255,0);
  rect(150,150,100,60);
  line(150, 0, 150,400);
  line(250, 0, 250,400);
  stroke(0,128,255);
  line(0,150, 400,150);
  line(0,210, 400, 210);
}