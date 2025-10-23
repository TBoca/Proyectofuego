


function dibujarBotonGlobal(_x,_y,_ancho,_alto,_cartel,_colboton,_colcartel){
   let colfinal = _colboton;
  if(mouseX>_x-_ancho/2 && mouseX<_x+_ancho/2 && mouseY>_y-_alto/2 && mouseY<_y+_alto/2){
        colfinal = lerpColor(_colboton,color(255),0.75);
        if(mouseIsPressed){
             figuraActiva = _cartel.toLowerCase();
             background(0);
        }
    }
  fill(colfinal);
  rect(_x,_y, _ancho, _alto);
  fill(_colcartel)
  
  // Ajustar tamaño de texto según el ancho del botón
  if(_ancho < 150) {
    textSize(18); // Texto más pequeño para botones angostos
  } else {
    textSize(32); // Texto normal para botones grandes
  }
  text(_cartel,_x,_y);
}

// Función específica para botones de regiones que cambian la imagen de fondo
function dibujarBotonRegion(_x,_y,_ancho,_alto,_cartel,_colboton,_colcartel){
   let colfinal = _colboton;
  if(mouseX>_x-_ancho/2 && mouseX<_x+_ancho/2 && mouseY>_y-_alto/2 && mouseY<_y+_alto/2){
        colfinal = lerpColor(_colboton,color(255),0.75);
        if(mouseIsPressed){
             cambiarImagenFondo(_cartel);
             background(0);
        }
    }
  fill(colfinal);
  rect(_x,_y, _ancho, _alto);
  fill(_colcartel)
  
  // Ajustar tamaño de texto según el ancho del botón
  if(_ancho < 150) {
    textSize(18); // Texto más pequeño para botones angostos
  } else {
    textSize(32); // Texto normal para botones grandes
  }
  text(_cartel,_x,_y);
}

function dibujarBotonesSuperiores(){
//Botones superiores

  
 let anchoBoton=200;
 let altoBoton=50;

  

  dibujarBotonGlobal(windowWidth*1/4,altoBoton/2+20, anchoBoton, altoBoton,"Pájaros",color(255,0,0),color(0));
  dibujarBotonGlobal(windowWidth*2/4,altoBoton/2+20, anchoBoton, altoBoton,"Humo",color(255,255,0),color(0));
  dibujarBotonGlobal(windowWidth*3/4,altoBoton/2+20, anchoBoton, altoBoton,"Fuego",color(255,100,0),color(0));

}

function dibujarBotonesDerecha(){
    // Función vacía - eliminamos los botones laterales
}

function dibujarBotonesInferiores(){
//Botones de regiones argentinas

  let anchoBoton = 140;  // Más angostos
  let altoBoton = 35;    // Más bajos
  let sep = 25;
  
  // Todos los botones en una sola fila - ahora cambian la imagen de fondo
  dibujarBotonRegion(windowWidth*1/7, windowHeight-altoBoton-sep, anchoBoton, altoBoton, "Patagonia", color(100, 150, 200), color(255));
  dibujarBotonRegion(windowWidth*2/7, windowHeight-altoBoton-sep, anchoBoton, altoBoton, "Pampa", color(120, 180, 100), color(255));
  dibujarBotonRegion(windowWidth*3/7, windowHeight-altoBoton-sep, anchoBoton, altoBoton, "Cuyo", color(200, 120, 80), color(255));
  dibujarBotonRegion(windowWidth*4/7, windowHeight-altoBoton-sep, anchoBoton, altoBoton, "Chaco", color(180, 150, 60), color(0));
  dibujarBotonRegion(windowWidth*5/7, windowHeight-altoBoton-sep, anchoBoton, altoBoton, "Noreste", color(150, 100, 180), color(255));
  dibujarBotonRegion(windowWidth*6/7, windowHeight-altoBoton-sep, anchoBoton, altoBoton, "Noroeste", color(200, 80, 120), color(255));
}
