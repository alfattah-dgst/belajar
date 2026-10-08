let keranjang = JSON.parse(localStorage.getItem("keranjangKasir")) || [];
let edit = -1;

function tampil() {
    let kotakHTML = document.getElementById("barang");
    let totalHTML = document.getElementById("total");
    kotakHTML.innerHTML = "";
    let total = 0;

    for (let i = 0; i < keranjang.length; i++) {
        total += keranjang[i].harga;

        let li = document.createElement("li");
        li.textContent = keranjang[i].nama + " - Rp " + keranjang[i].harga + " ";

        let tomboledit = document.createElement("button");
        tomboledit.textContent = "edit";
        tomboledit.addEventListener("click", () => editbarang(i));

        let tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.addEventListener("click", () => hapusBarang(i));

        li.appendChild(tomboledit);
        kotakHTML.appendChild(li);

        li.appendChild(tombolHapus);
        kotakHTML.appendChild(li);
    }
    totalHTML.textContent = "total barang: " + total;
}

async function muatProdukDemo() {
    tampilkanSkeleton();

    try {
        let respon = await fetch("produk.json");
        let data = await respon.json();

        data.forEach(item => {
            keranjang.push({
                nama: item.nama,
                harga: item.harga
            });
        });

        tampil();
    } catch (error) {
        console.log("Detail error:", error);
        alert(" Gagal mengambil data produk dari server. Pastikan koneksi internet Anda terhubung!");
    }
}

function tambah() {
    let inputB = document.getElementById("nama-barang").value;
    let inputH = Number(document.getElementById("harga-barang").value);

    if (inputB === "" && inputH === 0) {
        alert("Masukkan nama barang dan harga yang benar!");
    }

    if (edit === -1) {
        keranjang.push({ nama: inputB, harga: inputH });
        localStorage.setItem("keranjangKasir", JSON.stringify(keranjang));
    } else {
        keranjang[edit].nama = inputB;
        keranjang[edit].harga = inputH;

        edit = -1;
    }
    document.getElementById("nama-barang").value = "";
    document.getElementById("harga-barang").value = "";
    tampil();
}

function hapussemua() {
    keranjang = [];
    localStorage.setItem("keranjangKasir", JSON.stringify(keranjang));

    tampil();
}

function editbarang(i) {
    document.getElementById("nama-barang").value = keranjang[i].nama;
    document.getElementById("harga-barang").value = keranjang[i].harga;
    edit = i;
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

        let sekarang = new Date();
        let waktu = sekarang.toLocaleString("id-ID");
        document.getElementById("waktu").textContent = "waktu transaksi: " + waktu;


        document.getElementById("input-bayar").value = "";
    }

}

function resetkembalian() {
    document.getElementById("uang masuk").textContent = "";
    document.getElementById("kembalian").textContent = "";
    document.getElementById("waktu").textContent = "";
}

let tombolTambah = document.getElementById("Btambah");
document.getElementById("Btambah").addEventListener("click", tambah);
tampil();

let tombolhapussemua = document.getElementById("BhapusSemua");
tombolhapussemua.addEventListener("click", hapussemua);
tampil();

let tombolbayar = document.getElementById("pembayaran");
tombolbayar.addEventListener("click", bayar);
tampil();

let tombolreset = document.getElementById("reset");
tombolreset.addEventListener("click", resetkembalian);
tampil()

muatProdukDemo();