// Array para partículas de humo
let particulasHumo = [];
let ultimaFiguraHumo = ""; // Para detectar cambios de figura

function dibujarHumo(){
    // Reinicializar partículas si cambiamos de figura activa
    if (typeof figuraActiva !== 'undefined' && ultimaFiguraHumo !== figuraActiva) {
        particulasHumo = [];
        ultimaFiguraHumo = figuraActiva;
    }
    
    // Generar más partículas desde múltiples puntos del ancho del canvas
    for(let i = 0; i < 8; i++) {  // Aumentado de 3 a 8 partículas por frame
        particulasHumo.push({
            x: random(width * 0.2, width * 0.8),  // Origen más distribuido horizontalmente
            y: height - random(300, 400),          // Nacen aún más arriba en el canvas
            velocidadX: random(-2, 2),             // Mayor deriva horizontal
            velocidadY: random(-4, -2),            // Suben más rápido
            tamaño: random(20, 50),                // Tamaño inicial más grande
            opacidad: random(30, 50),              // Opacidad MUY REDUCIDA (antes 80-120)
            vida: 0                                // Edad de la partícula
        });
    }
    
    // Actualizar y dibujar cada partícula
    for(let i = particulasHumo.length - 1; i >= 0; i--) {
        let p = particulasHumo[i];
        
        // Dibujar partícula
        noStroke();
        
        // Color gris con opacidad decreciente
        let colorHumo = 180; // Gris claro
        fill(colorHumo, colorHumo, colorHumo, p.opacidad);
        
        // Dibujar círculo difuminado (varios círculos concéntricos)
        for(let j = 3; j > 0; j--) {
            let alpha = p.opacidad / (j * 1.5);
            fill(colorHumo, colorHumo, colorHumo, alpha);
            ellipse(p.x, p.y, p.tamaño * j * 0.7);
        }
        
        // Mover partícula
        p.x += p.velocidadX;
        p.y += p.velocidadY;
        p.vida++;
        
        // Al subir, se dispersa más horizontalmente y crece
        p.velocidadX += random(-0.4, 0.4);  // Más dispersión horizontal
        p.velocidadY *= 0.995;              // Se desacelera muy poco (sigue subiendo)
        p.tamaño += 0.8;                    // Crece más rápido
        p.opacidad -= 0.3;                  // Se vuelve transparente aún más lento
        
        // Eliminar partículas solo cuando salgan por arriba o los lados, o sean muy transparentes
        if(p.opacidad <= 0 || p.x < -200 || p.x > width + 200) {
            particulasHumo.splice(i, 1);
        }
    }
    
    // Limitar número de partículas para rendimiento
    if(particulasHumo.length > 500) {  // Aumentado de 300 a 500
        particulasHumo.splice(0, 50); // Eliminar las más viejas
    }
}

// Array para partículas de fuego
let particulasFuego = [];
let ultimaFiguraFuego = ""; // Para detectar cambios de figura

function fuego(x, y, col, tam) {
  // Reinicializar partículas si cambiamos de figura activa
  if (typeof figuraActiva !== 'undefined' && ultimaFiguraFuego !== figuraActiva) {
    particulasFuego = [];
    ultimaFiguraFuego = figuraActiva;
  }
  
  // Paleta de colores de fuego
  let coloresFuego = [
    color(255, 255, 0),    // amarillo
    color(255, 200, 0),    // amarillo-naranja
    color(255, 165, 0),    // anaranjado
    color(255, 100, 0),    // naranja-rojo
    color(255, 69, 0),     // rojo-naranja
    color(255, 0, 0),      // rojo
    color(200, 0, 0)       // rojo oscuro
  ];
  
  // Paleta de tonos de gris para el humo en el fuego
  let coloresGris = [
    color(200, 200, 200),  // gris muy claro
    color(180, 180, 180),  // gris claro
    color(150, 150, 150),  // gris medio
    color(120, 120, 120),  // gris oscuro
    color(100, 100, 100)   // gris muy oscuro
  ];
  
  // Generar nuevas partículas desde abajo (mezcla de fuego y humo gris)
  for(let i = 0; i < 10; i++) {
    // 60% fuego, 40% humo gris
    let esFuego = random() < 0.6;
    let colorElegido = esFuego ? random(coloresFuego) : random(coloresGris);
    
    particulasFuego.push({
      x: width/2 + random(-tam * 0.6, tam * 0.6),  // Dispersión más ancha (antes 0.3)
      y: height - random(50, 150),                  // Nacen desde abajo
      velocidadX: random(-1, 1),                    // Mayor deriva horizontal (antes -0.5, 0.5)
      velocidadY: random(-3, -1.5),                 // Suben más rápido (antes -2, -0.5)
      tamaño: random(15, 40),                       // Tamaño inicial
      opacidad: random(50, 80),                     // Opacidad MUY REDUCIDA (antes 150-200)
      color: colorElegido,                          // Color del fuego o gris
      esFuego: esFuego,                             // Tipo de partícula
      vida: 0
    });
  }
  
  // Actualizar y dibujar cada partícula
  for(let i = particulasFuego.length - 1; i >= 0; i--) {
    let p = particulasFuego[i];
    
    noStroke();
    
    // Dibujar partícula con efecto difuminado (círculos concéntricos)
    for(let j = 3; j > 0; j--) {
      let alpha = p.opacidad / (j * 2.5);  // Mayor divisor = más transparente (antes 1.2)
      fill(red(p.color), green(p.color), blue(p.color), alpha);
      ellipse(p.x, p.y, p.tamaño * j * 0.8);
    }
    
    // Mover partícula
    p.x += p.velocidadX;
    p.y += p.velocidadY;
    p.vida++;
    
    // Al subir, oscila levemente y se transforma
    p.velocidadX += random(-0.2, 0.2);
    p.velocidadY *= 0.99;  // Se desacelera menos (antes 0.98)
    p.tamaño *= 0.985;     // Se encoge más lento (antes 0.98)
    p.opacidad -= 0.8;     // Se vuelve transparente más lento (antes 1.5)
    
    // Las partículas más viejas se vuelven más rojas/oscuras
    if(p.vida > 60) {
      p.color = lerpColor(p.color, color(100, 0, 0), 0.05);
    }
    
    // Eliminar partículas transparentes o que salieron
    if(p.opacidad <= 0 || p.tamaño < 2 || p.x < -100 || p.x > width + 100) {
      particulasFuego.splice(i, 1);
    }
  }
  
  // Limitar número de partículas
  if(particulasFuego.length > 400) {
    particulasFuego.splice(0, 50);
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
let ultimaFigura = ""; // Para detectar cambios de figura

function dibujarPajaros(numPajaros) {
    // Reinicializar pájaros si cambiamos de figura activa
    if (typeof figuraActiva !== 'undefined' && ultimaFigura !== figuraActiva) {
        pajaritos = [];
        ultimaFigura = figuraActiva;
    }
    
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

