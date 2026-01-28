function hitung() {
    let m1 = parseFloat(document.getElementById("m1").value);
    let d1 = parseFloat(document.getElementById("d1").value);
    let m2 = parseFloat(document.getElementById("m2").value);

    // Στ = 0 → m1 * d1 = m2 * d2
    let d2 = (m1 * d1) / m2;

    document.getElementById("hasil").innerHTML =
        `Agar setimbang, jarak 2 harus <b>${d2.toFixed(2)} meter</b>`;

    // Visualisasi papan
    let papan = document.getElementById("papan");

    if (m1 * d1 > m2 * d2) {
        papan.style.transform = "rotate(-5deg)";
    } else if (m1 * d1 < m2 * d2) {
        papan.style.transform = "rotate(5deg)";
    } else {
        papan.style.transform = "rotate(0deg)";
    }
}
