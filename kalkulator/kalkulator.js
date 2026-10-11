let layar = document.getElementById("layar");

function tambah(karakter) {

    layar.value += karakter;
}

function hapus() {
    layar.value = "";
}

function hitung() {
    try {
        layar.value = eval(layar.value);
    } catch (error) {
        layar.value = "error";
    }
}