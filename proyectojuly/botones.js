


function dibujarBotonGlobal(_x,_y,_ancho,_alto,_cartel,_colboton,_colcartel){
   let colfinal = _colboton;
  if(mouseX>_x-_ancho/2 && mouseX<_x+_ancho/2 && mouseY>_y-_alto/2 && mouseY<_y+_alto/2){
        colfinal = lerpColor(_colboton,color(255),0.75);
        if(mouseIsPressed){
             figuraActiva = _cartel.toLowerCase();
             // No hacer background aquí, se dibuja automáticamente en draw()
        }
    }
  fill(colfinal);
  rect(_x,_y, _ancho, _alto);
  fill(0); // Texto negro para todos los botones
  
  // Ajustar tamaño de texto según el ancho del botón
  textFont('Chewy'); // Aplicar tipografía Chewy
  if(_ancho < 150) {
    textSize(18); // Texto más pequeño para botones angostos
  } else {
    textSize(32); // Texto normal para botones grandes
  }
  text(_cartel,_x,_y);
}

// Función específica para botones de regiones que cambian la imagen de fondo
function dibujarBotonRegion(_x,_y,_ancho,_alto,_cartel,_colboton,_colcartel, _imagen){
   let colfinal = _colboton;
  if(mouseX>_x-_ancho/2 && mouseX<_x+_ancho/2 && mouseY>_y-_alto/2 && mouseY<_y+_alto/2){
        colfinal = lerpColor(_colboton,color(255),0.75);
        if(mouseIsPressed){
             cambiarImagenFondo(_cartel);
             // No hacer background aquí, se dibuja automáticamente en draw()
        }
    }
  
  // Dibujar imagen arriba del botón solo si NO hay región seleccionada
  if(_imagen && imagenesRegiones[_imagen.toLowerCase()] && (typeof regionSeleccionada === 'undefined' || regionSeleccionada === null)) {
    let img = imagenesRegiones[_imagen.toLowerCase()];
    
    // Definir alto deseado y calcular ancho manteniendo proporción
    let alturaImagen = 400; // Mucho más grande (antes 180)
    let anchoImagen = (img.width / img.height) * alturaImagen; // Mantener proporción
    
    // Si el ancho calculado es mayor que el disponible, ajustar
    let anchoDisponible = _ancho * 2.0; // Mucho más ancho (antes 1.6)
    if(anchoImagen > anchoDisponible) {
      anchoImagen = anchoDisponible;
      alturaImagen = (img.height / img.width) * anchoImagen;
    }
    
    let imgY = _y - _alto/2 - alturaImagen/2 - 30; // 30px de separación (antes 25)
    
    imageMode(CENTER);
    image(img, _x, imgY, anchoImagen, alturaImagen);
  }
  
  // Dibujar botón
  fill(colfinal);
  rect(_x,_y, _ancho, _alto);
  fill(0); // Texto negro para todos los botones
  
  // Ajustar tamaño de texto según el ancho del botón
  textFont('Chewy'); // Aplicar tipografía Chewy
  if(_ancho < 150) {
    textSize(22); // Texto más pequeño para botones angostos (antes 20)
  } else {
    textSize(32); // Texto para botones grandes (antes 28)
  }
  text(_cartel,_x,_y);
}

function dibujarBotonesSuperiores(){
  // Función vacía - eliminamos los botones superiores
  // Ahora las 3 funciones se ejecutan simultáneamente
}

function dibujarBotonesDerecha(){
    // Función vacía - eliminamos los botones laterales
}

function dibujarBotonesInferiores(){
//Botones de regiones argentinas

  let anchoBoton = 220;  // Mucho más anchos (antes 180)
  let altoBoton = 60;    // Más altos (antes 50)
  let sep = 310;         // Aumentado mucho más para las imágenes grandes (antes 230)
  
  // Si hay una región seleccionada, NO dibujar el botón (solo mostrar el texto descriptivo)
  if(typeof regionSeleccionada !== 'undefined' && regionSeleccionada !== null) {
    // No dibujar nada cuando hay región seleccionada
    return;
  } else {
    // Dibujar todos los botones si no hay región seleccionada
    dibujarBotonRegion(windowWidth*1/7, windowHeight-altoBoton-sep, anchoBoton, altoBoton, "Patagonia", color(100, 150, 200), color(255), "Patagonia");
    dibujarBotonRegion(windowWidth*2/7, windowHeight-altoBoton-sep, anchoBoton, altoBoton, "Yungas", color(120, 180, 100), color(255), "Yungas");
    dibujarBotonRegion(windowWidth*3/7, windowHeight-altoBoton-sep, anchoBoton, altoBoton, "Monte", color(200, 120, 80), color(255), "Monte");
    dibujarBotonRegion(windowWidth*4/7, windowHeight-altoBoton-sep, anchoBoton, altoBoton, "Paranaense", color(180, 150, 60), color(0), "Paranaense");
    dibujarBotonRegion(windowWidth*5/7, windowHeight-altoBoton-sep, anchoBoton, altoBoton, "Chaco", color(150, 100, 180), color(255), "Chaco");
    dibujarBotonRegion(windowWidth*6/7, windowHeight-altoBoton-sep, anchoBoton, altoBoton, "Espinal", color(200, 80, 120), color(255), "Espinal");
  }
}

function dibujarBotonVolver(){
  // Botón Volver centrado en la parte inferior
  let anchoBoton = 150;
  let altoBoton = 50;
  let x = windowWidth / 2; // Centrado horizontalmente
  let y = windowHeight - altoBoton/2 - 30; // 30px del borde inferior
  
  let colfinal = color(255, 100, 100); // Color rojo claro
  
  // Detectar hover y click
  if(mouseX > x - anchoBoton/2 && mouseX < x + anchoBoton/2 && 
     mouseY > y - altoBoton/2 && mouseY < y + altoBoton/2) {
    colfinal = lerpColor(color(255, 100, 100), color(255, 255, 255), 0.5); // Más claro al hover
    
    if(mouseIsPressed) {
      // Volver a la vista inicial
      regionSeleccionada = null;
      imagenActiva = "bosque";
    }
  }
  
  // Dibujar botón
  fill(colfinal);
  rect(x, y, anchoBoton, altoBoton);
  
  // Dibujar texto
  fill(0); // Texto negro
  textFont('Chewy');
  textSize(28);
  textAlign(CENTER, CENTER);
  text("Volver", x, y);
}
