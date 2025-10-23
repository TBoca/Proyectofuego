function dibujarHumo(){
    colors = [
    color(255, 0, 0, 5),   // naranja translúcido
    color(0, 150, 255, 10),   // azul translúcido
    color(180, 255, 100, 10)  // verde claro translúcido
  ];
 translate(width / 2, height / 1.6);

  for (let i = 0; i < 50000; i++) { // Aumenté de 500 a 50000 puntos
    let x = random(-1.3, 1.3);
    let y = random(-1, 1);
    
    // Aplicamos una transformación no lineal tipo "flame"
    let nx = sin(3 * y) - tan(x);
    let ny = sin(3 * x) - cos(y);
    
    // Escalamos y desplazamos para mantener dentro del lienzo
    let px = nx * 150 + random(-8, 8);
    let py = ny * 150 + random(-8, 8);
    
    // Seleccionamos color aleatorio
    let c = random(colors);
    fill(40,40,40,random(20,60)); // Gris mucho más oscuro con más opacidad
    noStroke()
    // Dibujamos un pequeño punto con tamaño variable
    let tamaño = random(0.5, 3); // Círculos más pequeños
    ellipse(px, py, tamaño, tamaño);
  }
  
  // Detenemos después de muchos cuadros
  if (frameCount > 5000) noLoop();
}
function dibujarArbol(x, y, tronco , maxLevel = 5, angle = null, opts = {}) {
  // opciones por defecto
  const o = {
    colorModeHSB: true,
    colors: {
      tronco: [60, 100, 100],    // amarillo HSB
      primera: [30, 100, 100],   // naranja HSB
      ramas: [0, 100, 100]       // rojo HSB
    },
    scale: 0.66,
    minH: 2,
    strokeBase: 2,
    ...opts
  };

  if (o.colorModeHSB) colorMode(HSB, 360, 100, 100);

  // usar ángulo provisto o aleatorio
  const ang = (angle === null) ? random(20, 40) : angle;

  push();
  translate(x, y);

  // dibuja tronco
  stroke(...o.colors.tronco);
  strokeWeight(map(tronco, 10, 200, 1, 6));
  line(0, 0, 0, -tronco);
  translate(0, -tronco);

  // función recursiva local
  function branch(h, level) {
    h *= o.scale;
    if (h > o.minH && level < maxLevel) {
      // elegir color según el nivel
      if (level === 0) {
        stroke(...o.colors.primera);
      } else {
        stroke(...o.colors.ramas);
      }
      strokeWeight(map(h, 2, tronco, 0.5, o.strokeBase));

      // rama derecha
      push();
      rotate(ang);
      line(0, 0, 0, -h);
      translate(0, -h);
      branch(h, level + 1);
      pop();

      // rama izquierda
      push();
      rotate(-ang);
      line(0, 0, 0, -h);
      translate(0, -h);
      branch(h, level + 1);
      pop();
    }
  }

  branch(tronco, 0);
  pop();
  colorMode(RGB);
}

function fuego(x, y, col, tam) {
  // Definir paleta de colores de fuego
  let coloresFuego = [
    color(255, 255, 0),    // amarillo
    color(255, 165, 0),    // anaranjado
    color(255, 69, 0),     // rojo-naranja
    color(255, 0, 0)       // rojo
  ];

  // Generar círculos más lentamente
  let numCirculos = min(frameCount * 10, 200); // Aún más lento
  
  for (let i = 0; i < numCirculos; i++) {
    let ang = random(TWO_PI);
    let rX = random(tam * 0.6);
    let rY = random(tam * 0.3);
    let px = x + cos(ang) * rX;
    let py = y + sin(ang) * rY;
    let tamCir = random(tam * 0.015, tam * 0.04);

    // Seleccionar un color aleatorio
    let colorElegido = random(coloresFuego);
    
    // Crear efecto difuminado dibujando múltiples círculos concéntricos
    noStroke();
    
    // Círculo exterior más transparente (halo difuminado)
    fill(red(colorElegido), green(colorElegido), blue(colorElegido), 20);
    ellipse(px, py, tamCir * 2.5);
    
    // Círculo medio
    fill(red(colorElegido), green(colorElegido), blue(colorElegido), 40);
    ellipse(px, py, tamCir * 1.5);
    
    // Círculo interior más opaco (centro brillante)
    fill(red(colorElegido), green(colorElegido), blue(colorElegido), 80);
    ellipse(px, py, tamCir);
  }
}

function dibujarPajaro(x, y) {
    // Cuerpo del pájaro
    fill(139, 100, 71); // Color marrón
    ellipse(x, y, 40, 25);
    
    // Cabeza
    fill(120, 85, 60); // Marrón más oscuro
    ellipse(x + 15, y - 5, 20, 20);
    
    // Pico
    fill(204, 136, 51); // Amarillo marrón
    triangle(x + 25, y - 5, x + 35, y - 2, x + 25, y + 2);
    
    // Ojo
    fill(255); // Blanco
    ellipse(x + 18, y - 8, 8, 8);
    fill(0); // Negro
    ellipse(x + 19, y - 8, 4, 4);
    
    // Alas que se mueven
    let movimiento = sin(frameCount * 0.3) * 5;
    fill(101, 67, 33); // Marrón para alas
    ellipse(x - 5, y - 5 + movimiento, 25, 12); // Ala de arriba
    ellipse(x - 5, y + 5 - movimiento, 25, 12); // Ala de abajo
}

// Array para pájaros individuales con direcciones aleatorias
let pajaritos = [];

function dibujarPajaros(numPajaros) {
    // Inicializar pájaros si no existen o cambió el número
    if (pajaritos.length != numPajaros) {
        pajaritos = [];
        for (let i = 0; i < numPajaros; i++) {
            pajaritos.push({
                x: random(-200, -50),           // Posición inicial aleatoria
                y: random(height - 150, height - 50), // Altura inicial aleatoria
                velocidadX: random(1, 4),       // Velocidad horizontal aleatoria
                velocidadY: random(-4, 1),      // Velocidad vertical aleatoria (puede ir hacia arriba o abajo)
                retraso: random(0, 180)         // Retraso para que no aparezcan todos juntos
            });
        }
    }
    
    // Dibujar y mover cada pájaro individualmente
    for (let i = 0; i < pajaritos.length; i++) {
        let pajaro = pajaritos[i];
        
        // Solo mostrar el pájaro si ha pasado su tiempo de retraso
        if (frameCount > pajaro.retraso) {
            // Dibujar el pájaro
            dibujarPajaro(pajaro.x, pajaro.y);
            
            // Mover el pájaro con su velocidad individual
            pajaro.x += pajaro.velocidadX;
            pajaro.y += pajaro.velocidadY;
            
            // Cambiar dirección ocasionalmente para movimiento más natural
            if (random() < 0.01) { // 1% de probabilidad cada frame
                pajaro.velocidadX += random(-0.5, 0.5);
                pajaro.velocidadY += random(-0.5, 0.5);
                // Mantener velocidades dentro de rangos razonables
                pajaro.velocidadX = constrain(pajaro.velocidadX, 0.5, 5);
                pajaro.velocidadY = constrain(pajaro.velocidadY, -5, 2);
            }
            
            // Reiniciar pájaro cuando sale del canvas
            if (pajaro.x > width + 50 || pajaro.x < -100 || pajaro.y > height + 50 || pajaro.y < -100) {
                pajaro.x = random(-200, -50);
                pajaro.y = random(height - 150, height - 50);
                pajaro.velocidadX = random(1, 4);
                pajaro.velocidadY = random(-4, 1);
                pajaro.retraso = frameCount + random(60, 240);
            }
        }
    }
}

