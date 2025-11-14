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
  // Calcular altura dinámica del canvas
  let alturaCanvas = windowHeight;
  
  // En móviles, hacer el canvas más alto para permitir scroll
  if(windowWidth < 768) {
    alturaCanvas = max(windowHeight, 900); // Mínimo 900px en móviles
  }
  
  createCanvas(windowWidth, alturaCanvas);
  textAlign(CENTER, TOP);
  textFont('Chewy');
  
  // Debug: verificar que las preguntas se cargaron
  console.log("Preguntas cargadas:", preguntas);
  if(preguntas && preguntas.preguntas) {
    console.log("Cantidad de preguntas:", preguntas.preguntas.length);
  } else {
    console.error("ERROR: No se cargaron las preguntas");
  }
}

// Función para redimensionar cuando cambia el tamaño de ventana
function windowResized() {
  let alturaCanvas = windowHeight;
  
  if(windowWidth < 768) {
    alturaCanvas = max(windowHeight, 900);
  }
  
  resizeCanvas(windowWidth, alturaCanvas);
  if (botonVolver) {
    let anchoBoton = windowWidth < 480 ? 160 : 200;
    botonVolver.position(windowWidth / 2 - anchoBoton/2, height - (windowWidth < 768 ? 100 : 130));
  }
}

function draw() {
  background(220);
  
  // Dibujar efecto de fuego en el fondo
  fuego(width/2, height/2, color(255, 0, 0), 1000);

  fill(0);
  if (preguntas.preguntas.length > 0) {
    let pregunta = preguntas.preguntas[preguntaIndex];

    // Ajustar tamaño de texto de pregunta según pantalla
    let tamanoPregunta = width < 480 ? 18 : (width < 768 ? 22 : 24);
    textSize(tamanoPregunta);
    
    // Fondo para la pregunta para mejor legibilidad
    push();
    fill(255, 255, 255, 200);
    noStroke();
    rectMode(CENTER);
    let anchoPregunta = width < 480 ? width * 0.95 : (width < 768 ? width * 0.85 : 700);
    let yPregunta = width < 768 ? 50 : 70;
    rect(width / 2, yPregunta, anchoPregunta, width < 480 ? 70 : 80, 10);
    pop();
    
    fill(0);
    textAlign(CENTER);
    // Centrar el texto dentro del contenedor con ancho máximo
    text(pregunta.pregunta, width / 2 - anchoPregunta/2 + 10, yPregunta, anchoPregunta - 20);

    // Mostrar imagen correspondiente a la pregunta - responsive
    let imagenActual = imagenes[preguntaIndex];
    if (imagenActual) {
      let anchoImagen;
      if(width < 480) {
        anchoImagen = width * 0.7; // 70% del ancho en móviles
      } else if(width < 768) {
        anchoImagen = width * 0.55; // 55% en tablets
      } else {
        anchoImagen = 380; // Tamaño fijo en escritorio
      }
      
      let altoImagen = (imagenActual.height / imagenActual.width) * anchoImagen;
      let yImagen = width < 768 ? 110 : 130;
      
      // Centrar la imagen
      push();
      imageMode(CENTER);
      image(imagenActual, width / 2, yImagen + altoImagen / 2, anchoImagen, altoImagen);
      pop();
    }

    // Ajustar tamaño de texto de opciones según pantalla
    let tamanoOpciones = width < 480 ? 14 : (width < 768 ? 16 : 20);
    textSize(tamanoOpciones);
    
    for (let i = 0; i < pregunta.opciones.length; i++) {
      let imagenActual = imagenes[preguntaIndex];
      let anchoImagen = width < 480 ? width * 0.7 : (width < 768 ? width * 0.55 : 380);
      let altoImagen = imagenActual ? (imagenActual.height / imagenActual.width) * anchoImagen : 0;
      let yBase = width < 768 ? 110 : 130;
      let espaciadoOpciones = width < 480 ? 50 : (width < 768 ? 52 : 55);
      let margenSuperior = width < 480 ? 20 : 30;
      let y = yBase + altoImagen + margenSuperior + i * espaciadoOpciones;
      
      // Dimensiones del contenedor - responsive
      let anchoContenedor = width < 480 ? width * 0.9 : (width < 768 ? width * 0.8 : 550);
      let altoContenedor = width < 480 ? 40 : 44;
      
      // Detectar hover para efecto visual
      let isHover = mouseX > width / 2 - anchoContenedor/2 && 
                    mouseX < width / 2 + anchoContenedor/2 && 
                    mouseY > y - altoContenedor/2 && 
                    mouseY < y + altoContenedor/2;
      
      // Dibujar contenedor de respuesta
      push();
      
      // Determinar color del contenedor según el estado
      if (respuestaSeleccionada === i) {
        if(incorrecta){
          fill(255, 100, 100, 200); // Rojo claro para incorrecta
          stroke(255, 0, 0);
          strokeWeight(3);
        } else {
          fill(100, 255, 100, 200); // Verde claro para correcta
          stroke(0, 200, 0);
          strokeWeight(3);
        }
      } else if(respuestaAnterior === i){
        fill(255, 150, 150, 180); // Rojo más suave para respuesta anterior incorrecta
        stroke(255, 0, 0);
        strokeWeight(2);
      } else if(isHover) {
        fill(255, 200, 100, 150); // Naranja claro en hover
        stroke(255, 150, 0);
        strokeWeight(2);
      } else {
        fill(255, 255, 255, 180); // Blanco semi-transparente
        stroke(100, 100, 100);
        strokeWeight(2);
      }
      
      // Dibujar rectángulo con bordes redondeados
      rectMode(CENTER);
      rect(width / 2, y, anchoContenedor, altoContenedor, 10);
      pop();
      
      // Dibujar texto de la opción
      push();
      if (respuestaSeleccionada === i) {
        if(incorrecta){
           fill(255, 0, 0); // Texto rojo para respuesta mal
        } else {
          fill(0, 150, 0); // Texto verde oscuro para respuesta bien
        }
      } else{
        if(respuestaAnterior===i){
          fill(255, 0, 0); // Texto rojo para respuesta anterior mal
        }else{
          fill(0); // Color normal de las respuestas (negro)
        }
      }
      
      textAlign(CENTER);
      textSize(tamanoOpciones);
      text(pregunta.opciones[i], width / 2, y);
      pop();
    }
    
    // Calcular posición después de la última opción
    let imagenParaPosicion = imagenes[preguntaIndex];
    let anchoImagenPos = width < 480 ? width * 0.7 : (width < 768 ? width * 0.55 : 380);
    let altoImagenPos = imagenParaPosicion ? (imagenParaPosicion.height / imagenParaPosicion.width) * anchoImagenPos : 0;
    let yBase = width < 768 ? 110 : 130;
    let espaciadoOpciones = width < 480 ? 50 : (width < 768 ? 52 : 55);
    let margenSuperior = width < 480 ? 20 : 30;
    let yUltimaOpcion = yBase + altoImagenPos + margenSuperior + (pregunta.opciones.length - 1) * espaciadoOpciones;
    let altoContenedor = width < 480 ? 40 : 44;
    
    // Solo mostrar mensaje si no ha finalizado
    if(!fin){
      push();
      let tamanoMensaje = width < 480 ? 14 : (width < 768 ? 16 : 18);
      // Fondo para el mensaje - más alto para contener pistas largas
      fill(255, 255, 255, 220);
      noStroke();
      rectMode(CENTER);
      let anchoMensaje = width < 480 ? width * 0.95 : (width < 768 ? width * 0.85 : 650);
      let altoMensaje = width < 480 ? 100 : (width < 768 ? 100 : 110);
      let yMensaje = yUltimaOpcion + altoContenedor/2 + (width < 480 ? 70 : 80);
      rect(width / 2, yMensaje, anchoMensaje, altoMensaje, 10);
      
      fill(0);
      textSize(tamanoMensaje);
      textAlign(CENTER, TOP);
      // Con ancho máximo para que baje de renglón automáticamente
      text(mensaje, width / 2, yMensaje - altoMensaje/2 + 8, anchoMensaje - 20);
      pop();
    }
    
    // Mostrar puntaje DEBAJO del mensaje - responsive
    push();
    rectMode(CENTER);
    fill(255, 255, 255, 220); // Fondo blanco semi-transparente
    noStroke();
    let tamanoPuntaje = width < 480 ? 18 : (width < 768 ? 22 : 28);
    let anchoCajaPuntaje = width < 480 ? 140 : 180;
    let altoCajaPuntaje = width < 480 ? 38 : 48;
    // Posicionar justo después del mensaje (que ahora es más alto) o de las opciones
    let altoMensaje = width < 480 ? 100 : (width < 768 ? 100 : 110);
    let separacionPuntaje = width < 480 ? 30 : 40;
    let yPuntaje = yUltimaOpcion + altoContenedor/2 + (fin ? separacionPuntaje : (width < 480 ? 70 + altoMensaje/2 + 30 : 80 + altoMensaje/2 + 40));
    rect(width / 2, yPuntaje, anchoCajaPuntaje, altoCajaPuntaje, 8);
    
    fill(0);
    textSize(tamanoPuntaje);
    textAlign(CENTER);
    text("Puntaje: " + puntaje, width / 2, yPuntaje);
    pop();
  }
  
  if(fin){
    // Calcular posición después del puntaje
    let pregunta = preguntas.preguntas[preguntaIndex];
    let imagenParaPosicion = imagenes[preguntaIndex];
    let anchoImagenPos = width < 480 ? width * 0.7 : (width < 768 ? width * 0.55 : 380);
    let altoImagenPos = imagenParaPosicion ? (imagenParaPosicion.height / imagenParaPosicion.width) * anchoImagenPos : 0;
    let yBase = width < 768 ? 110 : 130;
    let espaciadoOpciones = width < 480 ? 50 : (width < 768 ? 52 : 55);
    let margenSuperior = width < 480 ? 20 : 30;
    let yUltimaOpcion = yBase + altoImagenPos + margenSuperior + (pregunta.opciones.length - 1) * espaciadoOpciones;
    let altoContenedor = width < 480 ? 40 : 44;
    
    push();
    let tamanoPuntajeFinal = width < 480 ? 28 : (width < 768 ? 40 : 52);
    textSize(tamanoPuntajeFinal);
    textAlign(CENTER);
    fill(puntaje >= 0 ? color(0, 150, 0) : color(200, 0, 0));
    let yPuntajeFinal = yUltimaOpcion + altoContenedor/2 + (width < 480 ? 80 : 100);
    text('Puntaje Final: ' + puntaje, width / 2, yPuntajeFinal);
    pop();
    
    // Mostrar botón para volver al inicio si no existe
    if (!botonVolver) {
      let anchoBoton = width < 480 ? 160 : 200;
      let altoBoton = width < 480 ? 40 : 50;
      let tamanoBoton = width < 480 ? 14 : 18;
      let yBoton = yPuntajeFinal + (width < 480 ? 50 : 70);
      
      botonVolver = createButton("🏠 Volver al Inicio");
      botonVolver.position(width / 2 - anchoBoton/2, yBoton);
      botonVolver.size(anchoBoton, altoBoton);
      botonVolver.style('font-family', 'Chewy, cursive');
      botonVolver.style('font-size', tamanoBoton + 'px');
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
    let anchoImagen = width < 480 ? width * 0.7 : (width < 768 ? width * 0.55 : 380);
    let altoImagen = imagenActual ? (imagenActual.height / imagenActual.width) * anchoImagen : 0;
    
    // Dimensiones del contenedor (iguales a las de draw()) - responsive
    let anchoContenedor = width < 480 ? width * 0.9 : (width < 768 ? width * 0.8 : 550);
    let altoContenedor = width < 480 ? 40 : 44;
    let yBase = width < 768 ? 110 : 130;
    let espaciadoOpciones = width < 480 ? 50 : (width < 768 ? 52 : 55);
    let margenSuperior = width < 480 ? 20 : 30;
    
    for (let i = 0; i < pregunta.opciones.length; i++) {
      let y = yBase + altoImagen + margenSuperior + i * espaciadoOpciones;

      if (mouseX > width / 2 - anchoContenedor/2 && 
          mouseX < width / 2 + anchoContenedor/2 && 
          mouseY > y - altoContenedor/2 && 
          mouseY < y + altoContenedor/2) {
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
