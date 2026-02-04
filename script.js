// Variabel fisika
let massa, koefGesek, gayaMesin, gayaUdara;
let gayaGesek, resultanGaya;

// Variabel gerak (SAMA DENGAN PYTHON)
let posisi = 0;
let kecepatan = 0;
const g = 9.8;
const dt = 0.1;

// Canvas
const canvas = document.getElementById("grafik");
const ctx = canvas.getContext("2d");

let frame = 0;

// Reset & ambil input user
function resetSimulasi() {
    massa = parseFloat(document.getElementById("massa").value);
    koefGesek = parseFloat(document.getElementById("gesek").value);
    gayaMesin = parseFloat(document.getElementById("gayaMesin").value);
    gayaUdara = parseFloat(document.getElementById("gayaUdara").value);

    gayaGesek = koefGesek * massa * g;
    resultanGaya = gayaMesin - (gayaGesek + gayaUdara);

    posisi = 0;
    kecepatan = 0;
    frame = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Loop animasi (pengganti FuncAnimation)
function animate() {
    // a = F/m (IDENTIK)
    const percepatan = resultanGaya / massa;

    // Update gerak (IDENTIK)
    kecepatan += percepatan * dt;
    posisi += kecepatan * dt;

    // -----------------------------
    // GRAFIK (SETARA MATPLOTLIB)
    // -----------------------------
    const xPixel = 20 + frame * 3;
    const yPixel = canvas.height - 20;

    ctx.fillStyle = "blue";
    ctx.fillRect(xPixel, yPixel - posisi * 3, 4, 4);

    // -----------------------------
    // JUNGKAT-JUNGKIT (INDIKATOR)
    // -----------------------------
    let angle = resultanGaya * 0.05;
    angle = Math.max(Math.min(angle, 15), -15);

    document.getElementById("papan").style.transform =
        `rotate(${angle}deg)`;

    document.getElementById("info").innerHTML = `
        Resultan Gaya: ${resultanGaya.toFixed(1)} N<br>
        Percepatan: ${percepatan.toFixed(3)} m/s²<br>
        Kecepatan: ${kecepatan.toFixed(2)} m/s<br>
        Posisi: ${posisi.toFixed(2)} m
    `;

    frame++;
    requestAnimationFrame(animate);
}

resetSimulasi();
animate();
