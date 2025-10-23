
let figuraActiva="pájaros";
let imgFondo;
let imagenActiva = "bosque"; // Variable para controlar qué imagen mostrar
let pajaroX = -50;  // Posición horizontal del pájaro
let pajaroY = 400;  // Posición vertical del pájaro

// Objeto para almacenar todas las imágenes
let imagenes = {};

function preload(){
    // Cargar todas las imágenes de las regiones
    imagenes.bosque = loadImage("bosque.jpg");
    imagenes.patagonia = loadImage("Patagonia.jpg");
    imagenes.pampa = loadImage("Pampa.jpg");
    imagenes.cuyo = loadImage("Cuyo.jpg");
    imagenes.chaco = loadImage("Chaco.jpg");
    imagenes.noreste = loadImage("Noreste.jpg");
    imagenes.noroeste = loadImage("Noroeste.jpg");
    
    // Por defecto, usar bosque
    imgFondo = imagenes.bosque;
}

function setup(){
    
  createCanvas(windowWidth-20, windowHeight-20);
  background(0);
  rectMode(CENTER,CENTER);
  textAlign(CENTER,CENTER);
  pajaroY = height - 100; // Ajustar posición inicial del pájaro
}

function draw(){
   // Actualizar la imagen de fondo según la selección
   imgFondo = imagenes[imagenActiva];
   
   // Dibujar la imagen de fondo con transparencia y proporción correcta
   tint(255, 150); // El segundo valor controla la transparencia (0-255)
   image(imgFondo, 0, 0, width, height);
   noTint(); // Resetear el tint para que no afecte otros elementos
   
   dibujarBotonesSuperiores();
   dibujarBotonesDerecha();
   dibujarBotonesInferiores()

    dibujarFiguras(figuraActiva);

}

function dibujarFiguras(_dibujo){ 
    

    if(_dibujo=="pájaros"){
        // Dibujar múltiples pájaros (puedes cambiar el número aquí)
        dibujarPajaros(20); // Empezamos con 3 pájaros para probar
    }
    if(_dibujo=="humo"){
        fill(1000);
        dibujarHumo()
    }
    if(_dibujo=="fuego"){
        fill(255);
        fuego(width/2, height/2, color(255, 0, 0), 1000); // usa paleta interna de fuego
    }

}

// Función para cambiar la imagen de fondo
function cambiarImagenFondo(region){
    imagenActiva = region.toLowerCase();
}

