function ubahTema() {
    document.body.classList.toggle("dark-mode");
}

document.querySelector(".dark-mode").addEventListener("change", ubahTema);

function tampilkanSkeleton() {
    let kotakHTML = document.getElementById("barang");

    kotakHTML.innerHTML = `
    <li class="skeleton-item"><div class="skeleton"></div></li>
    <li class="skeleton-item"><div class="skeleton"></div></li>
    <li class="skeleton-item"><div class="skeleton"></div></li>
  `;
}