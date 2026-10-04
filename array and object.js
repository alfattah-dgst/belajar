let keranjang = [
    { nama: "kopi", harga: 15000 },
    { nama: "gula", harga: 12000 }
];

let kotakHTML = document.getElementById("barang");
let total = 0;

kotakHTML.innerHTML = "";

for (let i = 0; i < keranjang.length; i++) {
    kotakHTML.innerHTML += "<li>barang: " + keranjang[i].nama + " harga: " + keranjang[i].harga + "</li>";
    total += keranjang[i].harga;
}

function tambah() {
    keranjang.push({ nama: "teh", harga: 5000 });

    total = 0;
    kotakHTML.innerHTML = "";

    for (let i = 0; i < keranjang.length; i++) {
        kotakHTML.innerHTML += "<li>barang: " + keranjang[i].nama + " harga: " + keranjang[i].harga + "</li>";
        total += keranjang[i].harga;

        document.getElementById("total").textContent = "total belanja: " + total;
    }


}

document.getElementById("total").textContent = "total belanja: " + total;