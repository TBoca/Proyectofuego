let preguntas;
let preguntaIndex = 0;
let respuestaSeleccionada = -1;
let respuestaAnterior = -1;
let mensaje = "";
let incorrecta=false;
let fin=false;
let imagenes = [];
let puntaje = 0; // Contador de puntos
let botonVolver; // Botón para volver al index
let particulasFuego = []; // Array para partículas de fuego

function preload() {
  preguntas = loadJSON("preguntas.json");
  imagenes[0] = loadImage("florachaqueña.jpeg");  // Pregunta 1: Chaco
  imagenes[1] = loadImage("floraespinal.jpg");    // Pregunta 2: Córdoba
  imagenes[2] = loadImage("florayunga.jpg");      // Pregunta 3: Jujuy
  imagenes[3] = loadImage("floralarioja.png");    // Pregunta 4: La Rioja
  imagenes[4] = loadImage("florepatagonica.jpg"); // Pregunta 5: Neuquén
  imagenes[5] = loadImage("floramisionera.jpg");  // Pregunta 6: Misiones
}

function setup() {
  createCanvas(1200, 800);
  textAlign(CENTER, CENTER);
  textFont('Chewy');
}


function draw() {
  background(220);
  
  // Dibujar efecto de fuego en el fondo
  fuego(width/2, height/2, color(255, 0, 0), 1000);

  fill(0);
  if (preguntas.preguntas.length > 0) {
    let pregunta = preguntas.preguntas[preguntaIndex];

    textSize(24);
    text(pregunta.pregunta, width / 2, 60);

    // Mostrar imagen correspondiente a la pregunta
    let imagenActual = imagenes[preguntaIndex];
    if (imagenActual) {
      let anchoImagen = 500;
      let altoImagen = (imagenActual.height / imagenActual.width) * anchoImagen;
      image(imagenActual, width / 2 - anchoImagen / 2, 100, anchoImagen, altoImagen);
    }

    textSize(20);
    for (let i = 0; i < pregunta.opciones.length; i++) {
      let imagenActual = imagenes[preguntaIndex];
      let altoImagen = imagenActual ? (imagenActual.height / imagenActual.width) * 500 : 0;
      let y = 150 + altoImagen + i * 50; // Aumentado de 120 a 150 para más espacio

      if (respuestaSeleccionada === i) {
        if(incorrecta){
           fill(255, 0, 0); // Resaltar la respuesta mal
        } else {
          fill(0, 255, 0); // Resaltar la respuesta bien
        }
      } else{
        if(respuestaAnterior===i){
          fill(255, 0, 0); // Resaltar la respuesta mal
        }else{
          fill(0); // Color normal de las respuestas (negro)
        }
         
      } 
      text(pregunta.opciones[i], width / 2, y);
    }
  }
  
  // Mostrar puntaje en la esquina superior derecha
  push();
  fill(0);
  textSize(28);
  textAlign(RIGHT, TOP);
  text("Puntaje: " + puntaje, width - 30, 30);
  pop();
  
  // Solo mostrar mensaje si no ha finalizado
  if(!fin){
    textSize(20);
    fill(0); // Color del mensaje (negro)
    text(mensaje, width / 2, height - 80);
  }
  
  if(fin){
    push();
    textSize(52);
    textAlign(CENTER, CENTER);
    fill(puntaje >= 0 ? color(0, 150, 0) : color(200, 0, 0));
    text('Puntaje Final: ' + puntaje, width / 2, height - 60);
    pop();
    
    // Mostrar botón para volver al inicio si no existe
    if (!botonVolver) {
      botonVolver = createButton("🏠 Volver al Inicio");
      botonVolver.position(width / 2 - 100, height - 150);
      botonVolver.size(200, 50);
      botonVolver.style('font-family', 'Chewy, cursive');
      botonVolver.style('font-size', '18px');
      botonVolver.style('background-color', '#4facfe');
      botonVolver.style('color', 'white');
      botonVolver.style('border', 'none');
      botonVolver.style('border-radius', '10px');
      botonVolver.style('cursor', 'pointer');
      botonVolver.style('box-shadow', '0 5px 15px rgba(0, 0, 0, 0.5)');
      botonVolver.mousePressed(() => {
        window.location.href = 'index.html';
      });
    }
  }
}
function mousePressed() {
  if (preguntas.preguntas.length > 0 && (respuestaSeleccionada === -1 || respuestaAnterior != -1))  {
    let pregunta = preguntas.preguntas[preguntaIndex];
    let imagenActual = imagenes[preguntaIndex];
    let altoImagen = imagenActual ? (imagenActual.height / imagenActual.width) * 500 : 0;
    
    for (let i = 0; i < pregunta.opciones.length; i++) {
      let y = 150 + altoImagen + i * 50; // Aumentado de 120 a 150 para coincidir con draw()

      if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > y - 20 && mouseY < y + 20) {
        respuestaSeleccionada = i;
        verificarRespuesta(pregunta);
        break;
      }
    }
  }
}

function pasarSiguientePregunta() {
  if( mensaje != "¡Correcto!"){
     return;
  }
  if (preguntaIndex < preguntas.preguntas.length - 1) {
    preguntaIndex++;
    respuestaSeleccionada = -1;
    respuestaAnterior = -1;
    mensaje = "";
  } else {
    console.log("Fin del juego");
    fin=true;
  }
}

function verificarRespuesta(pregunta) {
  if (respuestaSeleccionada === pregunta.respuesta_correcta) {
    mensaje = "¡Correcto! +1 punto";
    incorrecta=false;
    respuestaAnterior= -1;
    puntaje++; // Sumar 1 punto
    
    // Avanzar automáticamente a la siguiente pregunta después de un breve delay
    setTimeout(() => {
      if (preguntaIndex < preguntas.preguntas.length - 1) {
        preguntaIndex++;
        respuestaSeleccionada = -1;
        respuestaAnterior = -1;
        mensaje = "";
      } else {
        console.log("Fin del juego");
        fin = true;
      }
    }, 800); // Esperar 800ms para que vean el mensaje de "Correcto"
    
  } else {
    mensaje = "Incorrecto -1 punto";
    mostrarPista(pregunta);
    incorrecta=true;
    respuestaAnterior = respuestaSeleccionada;
    puntaje--; // Restar 1 punto
  }
}

function mostrarPista(pregunta) {
  let pista;

  if (random() < 0.5) {
    pista = pregunta.pista_1;
  } else {
    pista = pregunta.pista_2;
  }

  mensaje += ". Pista: " + pista;
}

// Función de efecto de fuego con mayor transparencia
function fuego(x, y, col, tam) {
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
      x: width/2 + random(-tam * 0.6, tam * 0.6),  // Dispersión más ancha
      y: height - random(50, 150),                  // Nacen desde abajo
      velocidadX: random(-1, 1),                    // Mayor deriva horizontal
      velocidadY: random(-3, -1.5),                 // Suben más rápido
      tamaño: random(15, 40),                       // Tamaño inicial
      opacidad: random(50, 80),                     // Opacidad inicial MUY BAJA (antes 150-200)
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
    p.velocidadY *= 0.99;  // Se desacelera menos
    p.tamaño *= 0.985;     // Se encoge más lento
    p.opacidad -= 0.5;     // Se vuelve transparente más rápido (antes 0.8)
    
    // Las partículas más viejas se vuelven más rojas/oscuras
    if(p.vida > 60) {
      p.color = lerpColor(p.color, color(100, 0, 0), 0.05);
    }
    
    // Eliminar partículas transparentes o que salieron
    if(p.opacidad <= 0 || p.tamaño < 2 || p.x < -100 || p.x > width + 100) {
      particulasFuego.splice(i, 1);
    }
  }
}
