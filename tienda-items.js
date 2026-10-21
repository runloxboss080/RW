console.log("Tienda de ítems cargada correctamente.");

// =====================================================
// OBJETOS DE DEMON SLAYER
// =====================================================

const itemsDemonSlayer = [

    {
        id: "item1",
        nombre: "Katanas de Tanjiro | Inosuke | Zenitsu",
        precio: 2000,
        tipo: "Katana",
        anime: "Demon Slayer",
        descripcion: "Domina tu respiración.",
        imagen: "Imagenes/TIZ.jpg"
    },

    {
        id: "item2",
        nombre: "Katana de Tanjiro",
        precio: 800,
        tipo: "Katana",
        anime: "Demon Slayer",
        descripcion: "Domina tu respiración.",
        imagen: "Imagenes/katana-t.jpg"
    },

    {
        id: "item3",
        nombre: "Katana de Inosuke",
        precio: 800,
        tipo: "Katana",
        anime: "Demon Slayer",
        descripcion: "Domina tu respiración.",
        imagen: "Imagenes/katana-i.jpg"
    },

    {
        id: "item4",
        nombre: "Katana de Zenitsu",
        precio: 800,
        tipo: "Katana",
        anime: "Demon Slayer",
        descripcion: "Domina tu respiración.",
        imagen: "Imagenes/katana-z.jpg"
    }

];


// =====================================================
// OBJETOS DE GHOSTFACE
// =====================================================

const itemsGhostface = [

{
id: "ghostface1",
nombre: "Ghost Face",
precio: 1500,
tipo: "Skin",
anime: "Ghost Face",
descripcion: "La icónica máscara de Ghostface.",
imagen: "/Tienda-Items/Ghost-Face.webp",
video: "/Tienda-Items/Ghost-Face.mp4",
},

{
id: "ghostface2",
nombre: "Ghost Face´s Kit",
precio: 300,
tipo: "Mochila",
anime: "Ghost Face",
descripcion: "El clásico cuchillo de Ghostface.",
imagen: "/Tienda-Items/Ghost-Faces-Kit.webp",
video: "/Tienda-Items/Ghost-Faces-Kit.mp4",
},

{
id: "ghostface3",
nombre: "Ghost Face´s Hunting Knife",
precio: 500,
tipo: "Pico",
anime: "Ghost Face",
descripcion: "El clásico cuchillo de Ghostface.",
imagen: "/Tienda-Items/Ghost-Faces-Hunting-Knife.webp",
video: "/Tienda-Items/Ghost-Faces-Hunting-Knife.mp4",
},

{
id: "ghostface4",
nombre: "Teléfono de Ghostface",
precio: 100,
tipo: "Accesorio",
anime: "Ghostface",
descripcion: "¿Cuál es tu película de terror favorita?",
imagen: "/Tienda-Items/Nana-Nitemare.webp",
Video: "/Tienda-Items/Nana-Nitemare2.mp4",
}

];

// =====================================================
// UNIR TODOS LOS OBJETOS
// =====================================================

const items = [
    ...itemsDemonSlayer,
    ...itemsGhostface
];


// =====================================================
// COPIAS PARA LOS FILTROS
// =====================================================

let itemsDemonSlayerFiltrados = [...itemsDemonSlayer];

let itemsGhostfaceFiltrados = [...itemsGhostface];


// =====================================================
// CREAR TARJETA DE OBJETO
// =====================================================

function crearTarjeta(item) {

    return `
        <div class="item-card">

<img
src="${item.imagen}"
class="item-img"
alt="${item.nombre}"
data-video="${item.video || ''}"
>

            <div class="item-info">

                <h3 class="item-name">
                    ${item.nombre}
                </h3>

                <p class="item-desc">
                    ${item.descripcion}
                </p>

                <p class="item-price">
                    ${item.precio} ResftCoins
                </p>

                <button 
                    class="item-buy-btn" 
                    data-id="${item.id}"
                >
                    Comprar
                </button>

            </div>

        </div>
    `;
}


// =====================================================
// RENDERIZAR TIENDA
// =====================================================

function renderTienda() {

    const grid = document.getElementById("tiendaGrid");

    grid.innerHTML = "";

    // =================================================
    // SECCIÓN DEMON SLAYER
    // =================================================

    if (itemsDemonSlayerFiltrados.length > 0) {

        grid.innerHTML += `
            <section class="tienda-seccion">

                <h2 class="seccion-titulo demon-titulo">
                    Demon Slayer
                </h2>

                <div class="items-grid">
                    ${itemsDemonSlayerFiltrados
                        .map(item => crearTarjeta(item))
                        .join("")
                    }
                </div>

            </section>
        `;
    }


    // =================================================
    // SECCIÓN GHOSTFACE
    // =================================================

    if (itemsGhostfaceFiltrados.length > 0) {

        grid.innerHTML += `
            <section class="tienda-seccion">

                <h2 class="seccion-titulo ghostface-titulo">
                    Ghostface
                </h2>

                <div class="items-grid">
                    ${itemsGhostfaceFiltrados
                        .map(item => crearTarjeta(item))
                        .join("")
                    }
                </div>

            </section>
        `;
    }


    // =================================================
    // SI NO HAY RESULTADOS
    // =================================================

    if (
        itemsDemonSlayerFiltrados.length === 0 &&
        itemsGhostfaceFiltrados.length === 0
    ) {

        grid.innerHTML = `
            <p class="sin-resultados">
                No se encontraron objetos.
            </p>
        `;
    }

}


// =====================================================
// FILTROS
// =====================================================

function aplicarFiltros() {

    const anime =
        document.getElementById("filtroAnime").value;

    const tipo =
        document.getElementById("filtroTipo").value;

    const orden =
        document.getElementById("ordenPrecio").value;


    // =================================================
    // FILTRAR DEMON SLAYER
    // =================================================

    itemsDemonSlayerFiltrados =
        itemsDemonSlayer.filter(item => {

            return (
                (anime === "" || item.anime === anime) &&
                (tipo === "" || item.tipo === tipo)
            );

        });


    // =================================================
    // FILTRAR GHOSTFACE
    // =================================================

    itemsGhostfaceFiltrados =
        itemsGhostface.filter(item => {

            return (
                (anime === "" || item.anime === anime) &&
                (tipo === "" || item.tipo === tipo)
            );

        });


    // =================================================
    // ORDENAR DEMON SLAYER
    // =================================================

    if (orden === "alto") {

        itemsDemonSlayerFiltrados.sort(
            (a, b) => b.precio - a.precio
        );

        itemsGhostfaceFiltrados.sort(
            (a, b) => b.precio - a.precio
        );

    }


    // =================================================
    // ORDENAR DE MENOR A MAYOR
    // =================================================

    if (orden === "bajo") {

        itemsDemonSlayerFiltrados.sort(
            (a, b) => a.precio - b.precio
        );

        itemsGhostfaceFiltrados.sort(
            (a, b) => a.precio - b.precio
        );

    }


    renderTienda();
}


// =====================================================
// EVENTOS DE LOS FILTROS
// =====================================================

document.addEventListener("change", event => {

    if (
        event.target.id === "filtroAnime" ||
        event.target.id === "filtroTipo" ||
        event.target.id === "ordenPrecio"
    ) {

        aplicarFiltros();

    }

});


// =====================================================
// COMPRA
// =====================================================

document.addEventListener("click", event => {
 
if (!event.target.classList.contains("item-img")) return;
 
const video = event.target.dataset.video;
 
if (video) {
 
const modalVideo =
document.getElementById("modalVideo");
 
const reproductor =
document.getElementById("videoAmpliado");
 
reproductor.src = video;
 
modalVideo.style.display = "flex";
 
reproductor.play();
 
} else {
 
const modal =
document.getElementById("modalImagen");
 
const imgAmpliada =
document.getElementById("imagenAmpliada");
 
imgAmpliada.src = event.target.src;
 
modal.style.display = "flex";
}
});


// =====================================================
// MODAL DE IMAGEN
// =====================================================

document.addEventListener("click", event => {

    if (
        event.target.classList.contains("item-img")
    ) {

        const modal =
            document.getElementById("modalImagen");

        const imgAmpliada =
            document.getElementById("imagenAmpliada");

        imgAmpliada.src = event.target.src;

        modal.style.display = "flex";

    }

});


// =====================================================
// CERRAR MODAL
// =====================================================

document
    .getElementById("cerrarModal")
    .addEventListener("click", () => {

        document.getElementById(
            "modalImagen"
        ).style.display = "none";

    });


// =====================================================
// CERRAR MODAL AL HACER CLICK FUERA
// =====================================================

document
.getElementById("modalVideo")
.addEventListener("click", event => {
 
if (event.target.id === "modalVideo") {
 
const video =
document.getElementById("videoAmpliado");
 
video.pause();
video.currentTime = 0;
 
event.target.style.display = "none";
}
 
});

    

// =====================================================
// INICIAR TIENDA
// =====================================================

renderTienda();