// -----------------------------
// PARAMETER KONSTAN
// -----------------------------
const massa = 1000; // kg
const g = 9.8;

// -----------------------------
// VARIABEL GERAK
// -----------------------------
let posisi = 0;
let kecepatan = 0;
const dt = 0.016; // ~60 FPS
const batasLintasan = 6; // meter

const mobil = document.getElementById("mobil");
const info = document.getElementById("info");

let resultanGaya = 0;

// -----------------------------
// RESET & HITUNG ULANG
// -----------------------------
function resetSimulasi() {
    posisi = 0;
    kecepatan = 0;

    const gayaMesin = parseFloat(document.getElementById("gayaMesin").value);
    const gayaUdara = parseFloat(document.getElementById("gayaUdara").value);
    const koefGesek = parseFloat(document.getElementById("koefGesek").value);

    const gayaNormal = massa * g;
    const gayaGesek = koefGesek * gayaNormal;

    resultanGaya = gayaMesin - (gayaGesek + gayaUdara);
}

// -----------------------------
// LOOP ANIMASI
// -----------------------------
function animate() {
    // Hukum II Newton
    const percepatan = resultanGaya / massa;

    // Update kecepatan & posisi
    kecepatan += percepatan * dt;
    posisi += kecepatan * dt;

    // Batas lintasan
    posisi = Math.max(0, Math.min(posisi, batasLintasan));

    // Meter → pixel
    const px = posisi * 100;
    mobil.style.transform = `translateX(${px}px)`;

    // Status sistem
    let status = "SETIMBANG";
    if (Math.abs(resultanGaya) > 1) {
        status = resultanGaya > 0 ? "MAJU" : "MUNDUR";
    }

    info.innerHTML = `
        <b>Status:</b> ${status}<br>
        <b>Resultan Gaya:</b> ${resultanGaya.toFixed(1)} N<br>
        <b>Percepatan:</b> ${percepatan.toFixed(3)} m/s²<br>
        <b>Kecepatan:</b> ${kecepatan.toFixed(2)} m/s<br>
        <b>Posisi:</b> ${posisi.toFixed(2)} m
    `;

    requestAnimationFrame(animate);
}

// Inisialisasi awal
resetSimulasi();
animate();
