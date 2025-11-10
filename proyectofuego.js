
let figuraActiva="pájaros";
let imgFondo;
let imagenActiva = "bosque"; // Variable para controlar qué imagen mostrar
let pajaroX = -50;  // Posición horizontal del pájaro
let pajaroY = 400;  // Posición vertical del pájaro
let regionSeleccionada = null; // Variable para controlar qué región está seleccionada
let botonInicio; // Botón para volver al inicio

// Objeto para almacenar todas las imágenes
let imagenes = {};
let imagenesRegiones = {}; // Imágenes pequeñas para los botones

function preload(){
    // Cargar todas las imágenes de las regiones (fondos originales)
    imagenes.bosque = loadImage("bosque.jpg");
    imagenes.patagonia = loadImage("Patagonia1.jpg");
    imagenes.pampa = loadImage("Pampa.jpg");
    imagenes.cuyo = loadImage("Cuyo.jpg");
    imagenes.chaco = loadImage("Chaco1.jpg");
    imagenes.noreste = loadImage("Noreste.jpg");
    imagenes.noroeste = loadImage("Noroeste.jpg");
    
    // Mapear las nuevas regiones a las fotos existentes
    imagenes.yungas = imagenes.noroeste;     // Yungas → Noroeste
    imagenes.monte = imagenes.pampa;         // Monte → Pampa
    imagenes.paranaense = imagenes.noreste;  // Paranaense → Noreste
    imagenes.espinal = imagenes.cuyo;        // Espinal → Cuyo
    
    // Cargar las imágenes pequeñas para mostrar sobre los botones
    imagenesRegiones.patagonia = loadImage("Patagonia.jpg");
    imagenesRegiones.yungas = loadImage("Yungas.jpg");
    imagenesRegiones.monte = loadImage("Monte.jpg");
    imagenesRegiones.paranaense = loadImage("Paranaense.jpg");
    imagenesRegiones.chaco = loadImage("Chaco.jpg");
    imagenesRegiones.espinal = loadImage("Esspinal.jpg");
    
    // Por defecto, usar bosque
    imgFondo = imagenes.bosque;
}

function setup(){
    
  createCanvas(windowWidth, windowHeight);
  background(0);
  rectMode(CENTER,CENTER);
  textAlign(CENTER,CENTER);
  textFont('Chewy'); // Aplicar Chewy como fuente por defecto
  pajaroY = height - 100; // Ajustar posición inicial del pájaro
  
  // Crear botón para volver al inicio (solo visible en vista principal)
  botonInicio = createButton("🏠 Volver al Inicio");
  botonInicio.position(width / 2 - 100, height - 60);
  botonInicio.size(200, 50);
  botonInicio.style('font-family', 'Chewy, cursive');
  botonInicio.style('font-size', '18px');
  botonInicio.style('background-color', '#4facfe');
  botonInicio.style('color', 'white');
  botonInicio.style('border', 'none');
  botonInicio.style('border-radius', '10px');
  botonInicio.style('cursor', 'pointer');
  botonInicio.style('box-shadow', '0 5px 15px rgba(0, 0, 0, 0.5)');
  botonInicio.mousePressed(() => {
    window.location.href = 'index.html';
  });
}

// Función para redimensionar el canvas cuando cambia el tamaño de ventana
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  pajaroY = height - 100;
  // Reposicionar botón
  botonInicio.position(width / 2 - 100, height - 60);
}

function draw(){
   // Actualizar la imagen de fondo según la selección
   imgFondo = imagenes[imagenActiva];
   
   // Mostrar/ocultar botón según si hay región seleccionada
   if(regionSeleccionada !== null) {
       botonInicio.hide(); // Ocultar cuando hay región seleccionada
   } else {
       botonInicio.show(); // Mostrar en vista principal
   }
   
   // Dibujar imagen de fondo cubriendo TODO el canvas
   push();
   tint(255, 150); // Transparencia
   imageMode(CENTER);
   
   // Calcular escala para cubrir todo el canvas (como CSS background-size: cover)
   let escalaX = width / imgFondo.width;
   let escalaY = height / imgFondo.height;
   let escala = max(escalaX, escalaY); // Usar la escala MAYOR para cubrir todo
   
   let nuevoAncho = imgFondo.width * escala;
   let nuevoAlto = imgFondo.height * escala;
   
   image(imgFondo, width/2, height/2, nuevoAncho, nuevoAlto);
   pop();
   
   // Siempre mostrar las animaciones (tanto en vista inicial como en región seleccionada)
   dibujarPajaros(20);
   dibujarHumo();
   fuego(width/2, height/2, color(255, 0, 0), 1000);
   
   // Dibujar título con enlace en la parte superior
   dibujarTituloEnlace();
   
   // Dibujar los botones (si hay región seleccionada, solo ese botón)
   dibujarBotonesDerecha();
   dibujarBotonesInferiores();
   
   // Si hay región seleccionada, mostrar botón Volver y texto descriptivo
   if(regionSeleccionada !== null) {
       dibujarBotonVolver();
       dibujarTextoRegion();
   }

}

// Función para dibujar texto descriptivo de cada región
function dibujarTextoRegion(){
    let textos = {
        "patagonia": "Bosque caducifolio/perennifolio dominado por Nothofagus en la cordillera sur; la ganadería, los incendios y la extracción selectiva han reducido su integridad. Entre octubre 2024 y marzo 2025 se quemaron ~31 722 ha en la región.",
        "espinal": "Llanuras y serranías bajas dominadas por algarrobos, ñandubay y caldén; bosque abierto de porte reducido, que sufrió desmontes, fuego e incendios —se identificaron miles de hectáreas quemadas en temporadas recientes",
        "yungas": "Selva nublada montana con gran altitud, lianas, epífitas y estrato arbóreo denso; la explotación maderera, la agricultura intensiva y la ganadería provocaron su pérdida, y los incendios recientes han agravado la degradación",
        "monte": "Estepa arbustiva de jarilla y bosques de algarrobos en valles intermontanos semiáridos; la tala indiscriminada, el sobrepastoreo y los incendios han dejado sistemas muy degradados y de muy baja productividad.",
        "paranaense": "Bosque subtropical con maderas de ley (cedrela, lapacho, etc) y alto valor genético; la conversión a cultivos, plantaciones y la explotación histórica han generado fuerte pérdida, y los incendios también están presentes aunque con menor magnitud registrada."
    };
    
    let texto = textos[regionSeleccionada];
    
    if(texto) {
        push();
        fill(0); // Texto negro
        stroke(255); // Borde blanco
        strokeWeight(4);
        textFont('Chewy');
        textSize(50);
        textAlign(CENTER, TOP);
        
        // Posicionar el texto más abajo
        let x = width / 2;
        let y = 200; // Más abajo (antes 120)
        let anchoMaximo = width * 0.8; // 80% del ancho del canvas
        
        text(texto, x, y, anchoMaximo);
        pop();
    }
}



// Función para cambiar la imagen de fondo
function cambiarImagenFondo(region){
    imagenActiva = region.toLowerCase();
    regionSeleccionada = region.toLowerCase(); // Guardar la región seleccionada
}

// Función para dibujar el título como enlace
function dibujarTituloEnlace(){
    let titulo = "Las regiones forestales argentinas";
    let x = width/2;
    let y = 40; // Posición desde arriba
    
    // Configurar texto
    push();
    textFont('Chewy');
    textSize(48);
    textAlign(CENTER, TOP);
    
    // Calcular dimensiones aproximadas del texto para área de click
    let anchoTexto = textWidth(titulo);
    let altoTexto = 60;
    
    // Detectar hover y cambiar color
    let sobreTitulo = mouseX > x - anchoTexto/2 && mouseX < x + anchoTexto/2 && 
                      mouseY > y && mouseY < y + altoTexto;
    
    if(sobreTitulo) {
        fill(0); // Negro también en hover
        cursor(HAND); // Cambiar cursor a manita
        
        // Dibujar subrayado para indicar que es clickeable
        stroke(0);
        strokeWeight(3);
        line(x - anchoTexto/2, y + altoTexto - 5, x + anchoTexto/2, y + altoTexto - 5);
        
        // Si hace click, abrir enlace
        if(mouseIsPressed) {
            window.open('https://www.teseopress.com/elbiencomungeneticoforestalenlarepublicaargentina/chapter/el-estado-de-conservacion-de-los-bosques/', '_blank');
        }
    } else {
        fill(0); // Negro normal
        cursor(ARROW); // Cursor normal
        noStroke();
    }
    
    // Borde blanco para mejor legibilidad
    stroke(255);
    strokeWeight(3);
    
    // Dibujar el texto
    text(titulo, x, y);
    pop();
}

