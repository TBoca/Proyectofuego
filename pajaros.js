// Variables simples para un pájaro
let pajaroX = -50;  // Posición horizontal del pájaro
let pajaroY = 400;  // Posición vertical del pájaro

function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(135, 206, 235); // Fondo azul cielo
    
    // Dibujar el pájaro
    dibujarPajaro(pajaroX, pajaroY);
    
    // Mover el pájaro hacia la derecha y arriba
    pajaroX = pajaroX + 3;  // Mover hacia la derecha
    pajaroY = pajaroY - 2;  // Mover hacia arriba
    
    // Si el pájaro sale del canvas, reiniciarlo
    if (pajaroX > width + 50 || pajaroY < -50) {
        pajaroX = -50;  // Volver al lado izquierdo
        pajaroY = 400;  // Volver al suelo
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