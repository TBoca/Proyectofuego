let boton = 1;
let relleno;
let sobre = 0;
let superior = 1;
let colors;
let colorSeleccionado = 0;
let fondo = 255;

function setup() {
  createCanvas(windowWidth, windowHeight);
  relleno = color(234, 182, 118);
  colors = [
    color(255, 0, 0, 180),      // Rojo brillante
    color(0, 200, 255, 180),    // Celeste brillante
    color(0, 255, 80, 180)      // Verde brillante
  ];
  background(fondo);
}

function draw() {
  background(fondo);

  // Dimensiones dinámicas
  let margenDerecho = 20;
  let panelLateralAncho = 60;
  let panelSuperiorAlto = 60;
  let panelInferiorAlto = 60;
  let margen = 10;
  let sep = 10;
  let altoBotonLateral = 200;

  // ¡Agrega esto!
  let areaBotones = width - panelLateralAncho - margenDerecho - 4 * sep;
  let botonAncho = areaBotones / 3;
  let botonAlto = 40;

  // Panel lateral derecho (con margen)
  fill(234,182,118);
  rect(width - panelLateralAncho - margenDerecho, 0, panelLateralAncho, height);
  strokeWeight(3);
  stroke(255);

  // Rectángulo para fondo blanco
  fill(255);
  rect(width - panelLateralAncho - margenDerecho + 10, 10, 40, altoBotonLateral);
  // Rectángulo para fondo negro
  fill(0);
  rect(width - panelLateralAncho - margenDerecho + 10, 30 + altoBotonLateral, 40, altoBotonLateral);

  // Panel superior
  noStroke();
  fill(234,200,160);
  rect(0, 0, width - panelLateralAncho, panelSuperiorAlto);

  // Botones superiores (casos)
  for (let i = 0; i < 3; i++) {
    if (superior === i + 1) fill(255,200,118);
    else fill(226,135,67);
    rect(sep + i * (botonAncho + sep), margen, botonAncho, botonAlto, 8);
  }

  // Panel inferior
  noStroke();
  fill(234,182,118);
  rect(0, height - panelInferiorAlto, width, panelInferiorAlto);
  strokeWeight(5);
  stroke(226,135,67);

  // Botones inferiores (colores)
  for (let i = 0; i < 3; i++) {
    if (sobre === i + 1) fill(relleno);
    else fill(colors[i]);
    rect(sep + i * (botonAncho + sep), height - panelInferiorAlto + margen, botonAncho, botonAlto, 8);
  }

  // Figura generativa central
  noStroke();
  push();
  // Ajuste: centro vertical más abajo para evitar superposición con botones
  let centroX = (width - panelLateralAncho) / 2;
  let centroY = (height - panelSuperiorAlto - panelInferiorAlto) / 2 + panelSuperiorAlto / 2 + 30;
  if (superior === 3) centroY += 60; // Baja aún más el caso 3
  translate(centroX, centroY);
  dibujarFlame(superior);
  pop();

  // Etiquetas
  noStroke();
  fill(0);
  textSize(16);
  text('ROJO', sep + botonAncho / 2, height - panelInferiorAlto + margen + 25);
  text('CELESTE', sep + botonAncho + sep + botonAncho / 2, height - panelInferiorAlto + margen + 25);
  text('VERDE', sep + 2 * (botonAncho + sep) + botonAncho / 2, height - panelInferiorAlto + margen + 25);
  text('CASO1', sep + botonAncho / 2, margen + 25);
  text('CASO2', sep + botonAncho + sep + botonAncho / 2, margen + 25);
  text('CASO3', sep + 2 * (botonAncho + sep) + botonAncho / 2, margen + 25);

  // Etiquetas para fondo (vertical, centradas en el botón)
  textSize(12);
  textAlign(CENTER, CENTER);

  // Fondo blanco
  let textoBlanco = "FONDO\nBLANCO";
  let xBlanco = width - panelLateralAncho - margenDerecho + 30;
  let yBlanco = 10 + altoBotonLateral / 2 - 40; // Centrado verticalmente
  push();
  translate(xBlanco, yBlanco);
  let offset = 0;
  for (let i = 0; i < textoBlanco.length; i++) {
    if (textoBlanco[i] === '\n') {
      offset += 15;
      translate(0, 15);
    } else {
      fill(0);
      text(textoBlanco[i], 0, offset + i * 13);
    }
  }
  pop();

  // Fondo negro
  let textoNegro = "FONDO\nNEGRO";
  let xNegro = width - panelLateralAncho - margenDerecho + 30;
  let yNegro = 30 + altoBotonLateral + altoBotonLateral / 2 - 40; // Centrado verticalmente
  push();
  translate(xNegro, yNegro);
  offset = 0;
  for (let i = 0; i < textoNegro.length; i++) {
    if (textoNegro[i] === '\n') {
      offset += 15;
      translate(0, 15);
    } else {
      fill(255);
      text(textoNegro[i], 0, offset + i * 13);
    }
  }
  pop();
  textAlign(LEFT, BASELINE);
}

function dibujarFlame(caso) {
  let escala = 200;
  let cantidad = 4000;
  let tamPunto = 5;
  if (caso === 2) escala = 120; // Más compacto el caso 2
  if (caso === 3) escala = 90;

  for (let i = 0; i < cantidad; i++) {
    let x = random(-1, 1);
    let y = random(-1, 1);
    let nx, ny;
    switch(caso){
      case 1:
        nx = sin(x * y);
        ny = cos(x - y);
        break;
      case 2:
        nx = atan2(y, x);
        ny = sin(x * y * 2.0);
        break;
      case 3:
        nx = sin(3 * y) - tan(x);
        ny = sin(3 * x) - cos(y);
        break;
      default:
        nx = sin(x * y);
        ny = cos(x - y);
        break;
    }
    let px = nx * escala + random(-2, 2);
    let py = ny * escala + random(-2, 2);
    let c = colors[colorSeleccionado];
    fill(c);
    ellipse(px, py, tamPunto, tamPunto);
  }
}

function mousePressed(){
  let margenDerecho = 20;
  let panelLateralAncho = 60;
  let panelSuperiorAlto = 60;
  let panelInferiorAlto = 60;
  let margen = 10;
  let sep = 10;
  let altoBotonLateral = 200;
  let areaBotones = width - panelLateralAncho - margenDerecho - 4 * sep;
  let botonAncho = areaBotones / 3;
  let botonAlto = 40;

  // Botones de color (inferior)
  for (let i = 0; i < 3; i++) {
    let x = sep + i * (botonAncho + sep);
    let y = height - panelInferiorAlto + margen;
    if(mouseX > x && mouseX < x + botonAncho && mouseY > y && mouseY < y + botonAlto) {
      boton = i + 1;
      colorSeleccionado = i;
    }
  }

  // Botones de función (superior)
  for (let i = 0; i < 3; i++) {
    let x = sep + i * (botonAncho + sep);
    let y = margen;
    if(mouseX > x && mouseX < x + botonAncho && mouseY > y && mouseY < y + botonAlto) {
      superior = i + 1;
    }
  }

  // Cambiar fondo según el rectángulo lateral
  if(mouseX > width - panelLateralAncho - margenDerecho + 10 && mouseX < width - panelLateralAncho - margenDerecho + 50 && mouseY > 10 && mouseY < 10 + altoBotonLateral) fondo = 255;
  if(mouseX > width - panelLateralAncho - margenDerecho + 10 && mouseX < width - panelLateralAncho - margenDerecho + 50 && mouseY > 30 + altoBotonLateral && mouseY < 30 + altoBotonLateral * 2) fondo = 0;
}

function mouseMoved() {
  let panelInferiorAlto = 60;
  let margen = 10;
  let sep = 10;
  let areaBotones = width - 60 - 4 * sep;
  let botonAncho = areaBotones / 3;
  let botonAlto = 40;
  sobre = 0;
  for (let i = 0; i < 3; i++) {
    let x = sep + i * (botonAncho + sep);
    let y = height - panelInferiorAlto + margen;
    if(mouseX > x && mouseX < x + botonAncho && mouseY > y && mouseY < y + botonAlto) {
      relleno = color(255);
      sobre = i + 1;
      return;
    }
  }
  relleno = color(234,182,118);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}