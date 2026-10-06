let keranjang = JSON.parse(localStorage.getItem("keranjangKasir")) || [];

function tampil() {
    let kotakHTML = document.getElementById("barang");
    let totalHTML = document.getElementById("total");
    kotakHTML.innerHTML = "";
    let total = 0;

    for (let i = 0; i < keranjang.length; i++) {
        total += keranjang[i].harga;

        let li = document.createElement("li");
        li.textContent = keranjang[i].nama + " - Rp " + keranjang[i].harga + " ";

        let tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.addEventListener("click", () => hapusBarang(i));

        li.appendChild(tombolHapus);
        kotakHTML.appendChild(li);
    }
    totalHTML.textContent = "total barang: " + total;
}

function tambah() {
    let inputB = document.getElementById("nama-barang").value;
    let inputH = Number(document.getElementById("harga-barang").value);

    if (inputB !== "" && inputH !== 0) {
        keranjang.push({ nama: inputB, harga: inputH });
        localStorage.setItem("keranjangKasir", JSON.stringify(keranjang));
        tampil();

        document.getElementById("nama-barang").value = "";
        document.getElementById("harga-barang").value = "";
    } else {
        alert("Masukkan nama barang dan harga yang benar!");
    }
}

function hapusBarang(i) {
    keranjang.splice(i, 1);
    localStorage.setItem("keranjangKasir", JSON.stringify(keranjang));
    tampil();
}

function bayar() {
    let bayar = parseInt(document.getElementById("input-bayar").value);
    let uangmasuk = document.getElementById("uang masuk");
    let pesankembalian = document.getElementById("kembalian");

    let total = 0;
    for (let i = 0; i < keranjang.length; i++) {
        total += keranjang[i].harga;
    }

    if (isNaN(bayar)) {
        alert("masukan dengan benar")
    } else if (bayar < total) {
        alert("uang anda tidak cukup!");
        pesankembalian.textContent = "";
    } else {
        let kembalian = total - bayar;
        uangmasuk.textContent = "uang masuk: Rp " + bayar
        pesankembalian.textContent = "Kembalian: Rp " + kembalian;

        document.getElementById("input-bayar").value = "";
    }

}

function resetkembalian() {
    document.getElementById("uang masuk").textContent = "";
    document.getElementById("kembalian").textContent = "";
}

let tombolTambah = document.getElementById("Btambah");
document.getElementById("Btambah").addEventListener("click", tambah);
tampil();

let tombolbayar = document.getElementById("pembayaran");
tombolbayar.addEventListener("click", bayar);
tampil();

let tombolreset = document.getElementById("reset");
tombolreset.addEventListener("click", resetkembalian);
tampil()