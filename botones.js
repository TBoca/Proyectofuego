


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
  
  // Ajustar tamaño de texto según el ancho del botón y la pantalla
  textFont('Chewy'); // Aplicar tipografía Chewy
  let tamanoTexto;
  if(width < 480) {
    tamanoTexto = 12; // Móviles pequeños
  } else if(width < 768) {
    tamanoTexto = 16; // Tablets
  } else if(_ancho < 150) {
    tamanoTexto = 18; // Texto más pequeño para botones angostos
  } else {
    tamanoTexto = 32; // Texto normal para botones grandes
  }
  textSize(tamanoTexto);
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
  if(_imagen && imagenesRegiones[_imagen.toLowerCase()] && 
     (typeof regionSeleccionada === 'undefined' || regionSeleccionada === null)) {
    let img = imagenesRegiones[_imagen.toLowerCase()];
    
    // Ajustar altura de imagen según el tamaño de pantalla
    let alturaImagen;
    if(width < 480) {
      alturaImagen = 140; // Móviles pequeños - MÁS GRANDE (antes 110)
    } else if(width < 768) {
      alturaImagen = 200; // Tablets - MÁS GRANDE (antes 160)
    } else if(width < 1024) {
      alturaImagen = 280; // Tablets grandes
    } else {
      alturaImagen = 400; // Escritorio
    }
    
    let anchoImagen = (img.width / img.height) * alturaImagen; // Mantener proporción
    
    // Si el ancho calculado es mayor que el disponible, ajustar
    let anchoDisponible = _ancho * (width < 768 ? 2.5 : 2.0); // AÚN MÁS ancho disponible en móviles
    if(anchoImagen > anchoDisponible) {
      anchoImagen = anchoDisponible;
      alturaImagen = (img.height / img.width) * anchoImagen;
    }
    
    let imgY = _y - _alto/2 - alturaImagen/2 - (width < 768 ? 15 : 30); // Separación ajustada
    
    imageMode(CENTER);
    image(img, _x, imgY, anchoImagen, alturaImagen);
  }
  
  // Dibujar botón
  fill(colfinal);
  rect(_x,_y, _ancho, _alto);
  fill(0); // Texto negro para todos los botones
  
  // Ajustar tamaño de texto según el ancho del botón y la pantalla
  textFont('Chewy'); // Aplicar tipografía Chewy
  let tamanoTexto;
  if(width < 480) {
    tamanoTexto = 11; // Móviles pequeños - más pequeño para que quepa
  } else if(width < 768) {
    tamanoTexto = 15; // Tablets
  } else if(_ancho < 150) {
    tamanoTexto = 22; // Texto más pequeño para botones angostos
  } else {
    tamanoTexto = 32; // Texto para botones grandes
  }
  textSize(tamanoTexto);
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

  // Ajustar tamaños según el ancho de pantalla
  let anchoBoton, altoBoton, sep;
  
  if(width < 480) {
    // Móviles pequeños
    anchoBoton = 95;
    altoBoton = 38;
    sep = 175; // MÁS separación para mover todo más arriba (antes 135)
  } else if(width < 768) {
    // Tablets
    anchoBoton = 130;
    altoBoton = 48;
    sep = 240; // MÁS separación para mover todo más arriba (antes 190)
  } else if(width < 1024) {
    // Tablets grandes
    anchoBoton = 180;
    altoBoton = 55;
    sep = 260;
  } else {
    // Escritorio
    anchoBoton = 220;
    altoBoton = 60;
    sep = 310;
  }
  
  // Si hay una región seleccionada, NO dibujar el botón (solo mostrar el texto descriptivo)
  if(typeof regionSeleccionada !== 'undefined' && regionSeleccionada !== null) {
    // No dibujar nada cuando hay región seleccionada
    return;
  } else {
    // Layout diferente para móviles: 3 arriba, 3 abajo
    if(width < 768) {
      let separacionFilas = width < 480 ? 170 : 220; // Mayor separación entre filas para imágenes grandes (antes 135 y 180)
      
      // Primera fila (3 botones)
      dibujarBotonRegion(windowWidth*1/4, windowHeight-altoBoton-sep-separacionFilas, anchoBoton, altoBoton, "Patagonia", color(100, 150, 200), color(255), "Patagonia");
      dibujarBotonRegion(windowWidth*2/4, windowHeight-altoBoton-sep-separacionFilas, anchoBoton, altoBoton, "Yungas", color(120, 180, 100), color(255), "Yungas");
      dibujarBotonRegion(windowWidth*3/4, windowHeight-altoBoton-sep-separacionFilas, anchoBoton, altoBoton, "Monte", color(200, 120, 80), color(255), "Monte");
      
      // Segunda fila (3 botones)
      dibujarBotonRegion(windowWidth*1/4, windowHeight-altoBoton-90, anchoBoton, altoBoton, "Paranaense", color(180, 150, 60), color(0), "Paranaense");
      dibujarBotonRegion(windowWidth*2/4, windowHeight-altoBoton-90, anchoBoton, altoBoton, "Chaco", color(150, 100, 180), color(255), "Chaco");
      dibujarBotonRegion(windowWidth*3/4, windowHeight-altoBoton-90, anchoBoton, altoBoton, "Espinal", color(200, 80, 120), color(255), "Espinal");
    } else {
      // Escritorio: todos en una fila
      dibujarBotonRegion(windowWidth*1/7, windowHeight-altoBoton-sep, anchoBoton, altoBoton, "Patagonia", color(100, 150, 200), color(255), "Patagonia");
      dibujarBotonRegion(windowWidth*2/7, windowHeight-altoBoton-sep, anchoBoton, altoBoton, "Yungas", color(120, 180, 100), color(255), "Yungas");
      dibujarBotonRegion(windowWidth*3/7, windowHeight-altoBoton-sep, anchoBoton, altoBoton, "Monte", color(200, 120, 80), color(255), "Monte");
      dibujarBotonRegion(windowWidth*4/7, windowHeight-altoBoton-sep, anchoBoton, altoBoton, "Paranaense", color(180, 150, 60), color(0), "Paranaense");
      dibujarBotonRegion(windowWidth*5/7, windowHeight-altoBoton-sep, anchoBoton, altoBoton, "Chaco", color(150, 100, 180), color(255), "Chaco");
      dibujarBotonRegion(windowWidth*6/7, windowHeight-altoBoton-sep, anchoBoton, altoBoton, "Espinal", color(200, 80, 120), color(255), "Espinal");
    }
  }
}

function dibujarBotonVolver(){
  // Botón Volver centrado en la parte inferior - responsive
  let anchoBoton, altoBoton, margenInferior;
  
  if(width < 480) {
    // Móviles pequeños
    anchoBoton = 120;
    altoBoton = 40;
    margenInferior = 20;
  } else if(width < 768) {
    // Tablets
    anchoBoton = 140;
    altoBoton = 45;
    margenInferior = 25;
  } else {
    // Escritorio
    anchoBoton = 150;
    altoBoton = 50;
    margenInferior = 30;
  }
  
  let x = windowWidth / 2; // Centrado horizontalmente
  let y = windowHeight - altoBoton/2 - margenInferior;
  
  let colfinal = color(255, 150, 100); // Color naranja claro
  
  // Detectar hover
  let sobreBoton = mouseX > x - anchoBoton/2 && mouseX < x + anchoBoton/2 && 
                   mouseY > y - altoBoton/2 && mouseY < y + altoBoton/2;
  
  if(sobreBoton) {
    colfinal = lerpColor(color(255, 150, 100), color(255, 255, 255), 0.5); // Más claro al hover
  }
  
  // Dibujar botón
  fill(colfinal);
  rect(x, y, anchoBoton, altoBoton);
  
  // Dibujar texto
  fill(0); // Texto negro
  textFont('Chewy');
  
  // Ajustar tamaño de texto según pantalla
  let tamanoTexto = width < 480 ? 18 : (width < 768 ? 22 : 28);
  textSize(tamanoTexto);
  textAlign(CENTER, CENTER);
  text("Volver", x, y);
}
