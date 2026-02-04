// ===== VAR =====
let carX = 300, carY = 260;
let tiltAngle = 0;
let accel = 0;

let cogX = 0;
let cogY = 10;

// ===== GRAPH =====
let chart;
let time = 0;

// ===== SETUP =====
function setup() {
    let c = createCanvas(600, 350);
    c.parent("canvas-container");
    setupChart();
}

// ===== DRAW LOOP =====
function draw() {
    background(20, 24, 82);

    // === INPUT USER ===
    accel = parseFloat(document.getElementById("force").value);
    cogX = parseFloat(document.getElementById("cogx").value);
    cogY = parseFloat(document.getElementById("cogy").value);

    // === FISIKA JUNGKAT JUNGKIT ===
    let heightFactor = (cogY - 15) * -2;
    let stabilityFactor = heightFactor + (accel > 0 ? -cogX : cogX);
    let torque = accel * stabilityFactor;

    tiltAngle = lerp(tiltAngle, torque, 0.08);

    // === VISUAL MOBIL ===
    push();
    translate(carX, carY);
    rotate(radians(constrain(tiltAngle, -40, 40)));

    fill(0, 140, 255);
    rect(-60, -20, 120, 40, 8);

    fill("yellow");
    ellipse(cogX, cogY, 10);
    pop();

    // === UPDATE GRAPH ===
    updateGraph(tiltAngle);
}
