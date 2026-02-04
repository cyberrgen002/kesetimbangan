// -------------------------------
// VARIABEL FISIKA
// -------------------------------
let posisi = 0;
let kecepatan = 0;
let percepatan = 0;
let dt = 0.1;

let tiltAngle = 0;
let tiltHistory = [];

// Input user
let inputForce = 0;
let cogX = 0;
let cogY = 0;

// Grafik
let chart;

// -------------------------------
// SETUP P5
// -------------------------------
function setup() {
    let c = createCanvas(600, 350);
    c.parent("canvas-container");

    setupChart();
}

// -------------------------------
// DRAW LOOP
// -------------------------------
function draw() {
    background(220);

    // Ambil input user
    inputForce = parseFloat(document.getElementById("force").value);
    cogX = parseFloat(document.getElementById("cogX").value);
    cogY = parseFloat(document.getElementById("cogY").value);

    // -------------------------------
    // LOGIKA FISIKA (DIADAPTASI DARI PYTHON)
    // -------------------------------
    percepatan = inputForce;
    kecepatan += percepatan * dt;
    kecepatan *= 0.98;
    posisi += kecepatan * dt;

    // Jungkat-jungkit (momen gaya)
    let torsi = (inputForce * 40) + (cogX * 0.8) + (cogY * 0.6);
    tiltAngle = lerp(tiltAngle, torsi, 0.1);

    // -------------------------------
    // GAMBAR JUNGKAT-JUNGKIT
    // -------------------------------
    translate(width / 2, height / 2 + 40);

    stroke(0);
    strokeWeight(4);
    fill(120);

    rotate(radians(constrain(tiltAngle, -30, 30)));
    rect(-200, -10, 400, 20);

    // Titik tumpu
    resetMatrix();
    fill(80);
    triangle(width/2 - 20, height/2 + 50,
             width/2 + 20, height/2 + 50,
             width/2, height/2 + 10);

    // -------------------------------
    // SIMPAN DATA UNTUK GRAFIK
    // -------------------------------
    tiltHistory.push(tiltAngle);
    if (tiltHistory.length > 60) tiltHistory.shift();

    updateChart();
}

// -------------------------------
// SETUP GRAFIK
// -------------------------------
function setupChart() {
    const ctx = document.getElementById("tiltChart").getContext("2d");

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: Array(60).fill(""),
            datasets: [{
                label: "Sudut Kemiringan (°)",
                data: [],
                borderColor: "blue",
                borderWidth: 2,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            animation: false,
            scales: {
                y: {
                    min: -40,
                    max: 40
                }
            }
        }
    });
}

// -------------------------------
// UPDATE GRAFIK
// -------------------------------
function updateChart() {
    chart.data.datasets[0].data = tiltHistory;
    chart.update();
}
