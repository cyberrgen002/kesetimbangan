function updateSimulasi() {
    const m1 = parseFloat(document.getElementById("m1").value);
    const d1 = parseFloat(document.getElementById("d1").value);
    const m2 = parseFloat(document.getElementById("m2").value);
    const d2 = parseFloat(document.getElementById("d2").value);

    if ([m1, d1, m2, d2].some(v => v <= 0)) {
        alert("Semua nilai harus lebih dari 0");
        return;
    }

    // Hitung torsi
    const tauKiri = m1 * d1;
    const tauKanan = m2 * d2;

    const deltaTau = tauKiri - tauKanan;

    // Konversi torsi → sudut (dinamis)
    const sensitivity = 2; // sensitivitas visual
    let angle = deltaTau * sensitivity;

    // Batasi sudut rotasi
    angle = Math.max(Math.min(angle, 25), -25);

    document.getElementById("papan").style.transform =
        `rotate(${angle}deg)`;

    // Output teks
    let status;
    if (Math.abs(deltaTau) < 0.5) {
        status = "✅ Sistem setimbang (Στ = 0)";
    } else if (deltaTau > 0) {
        status = "⬅️ Beban kiri lebih berat";
    } else {
        status = "➡️ Beban kanan lebih berat";
    }

    document.getElementById("hasil").innerHTML = `
        Torsi Kiri = ${tauKiri.toFixed(2)} Nm<br>
        Torsi Kanan = ${tauKanan.toFixed(2)} Nm<br>
        <b>${status}</b>
    `;
}
