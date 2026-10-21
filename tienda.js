// ===============================
// DATOS DE CANCIONES
// ===============================

const songs = [
    {
    title: "OVERRIDE",
    artist: "HACK HALLOWEEN",
    price: 0,
    cover: "Imagenes/cancion31.jfif", 
    file: "Audio/cancion31.mp3",   
    year: "2026",
    duration: "02:28"
  },
  {
        title: "Paint the Town Blue",
        artist: "Arcane",
        year: 2024,
        duration: "2:43",
        price: 0,
        cover: "Imagenes/cancion1.png",
        file: "Audio/cancion1.mp3"
    },
    {
        title: "Just Your Doll",
        artist: "Snow Strippers",
        year: 2023,
        duration: "3:05",
        price: 0,
        cover: "Imagenes/cancion2.png",
        file: "Audio/cancion2.mp3"
    },
    {
        title: "I Really Want to Stay At Your House",
        artist: "Rosa Walton",
        year: 2020,
        duration: "4:05",
        price: 500,
        cover: "Imagenes/cancion3.png",
        file: "Audio/cancion3.mp3"
    },
    {
        title: "House Of Balloons",
        artist: "The Weeknd",
        year: 2011,
        duration: "6:47",
        price: 500,
        cover: "Imagenes/cancion5.png",
        file: "Audio/cancion5.mp3"
    },
    {
        title: "IRIS OUT",
        artist: "Kenshi Yonezu",
        year: 2026,
        duration: null,
        price: 500,
        cover: "Imagenes/cancion6.png",
        file: "Audio/cancion6.mp3"
    },
    {
        title: "Play Hard",
        artist: "David Guetta",
        year: 2013,
        duration: "3:21",
        price: 500,
        cover: "Imagenes/cancion7.png",
        file: "Audio/cancion7.mp3"
    },
    {
        title: "Otonoke",
        artist: "Creepy Nuts",
        year: 2024,
        duration: null,
        price: 500,
        cover: "Imagenes/cancion8.png",
        file: "Audio/cancion8.mp3"
    },
    {
        title: "#BrooklynBloodPop!",
        artist: "Syko",
        year: 2020,
        duration: "2:25",
        price: 500,
        cover: "Imagenes/cancion9.png",
        file: "Audio/cancion9.mp3"
    },
    {
        title: "LES",
        artist: "Childish Gambino",
        year: 2011,
        duration: "5:08",
        price: 500,
        cover: "Imagenes/cancion10.png",
        file: "Audio/cancion10.mp3"
    },
    {
    title: "A Cruel Angel's Thesis",
    artist: "Yoko Takahashi",
    year: 1995,
    duration: "4:05",
    price: 500,
    cover: "Imagenes/cancion11.jpg",
    file: "Audio/cancion11.mp3"
    },
    {
    title: "Ma Meilleure Ennemie",
    artist: "Stromae & Pomme",
    year: 2023,
    duration: "2:29",
    price: 500,
    cover: "Imagenes/cancion12.jpg",
    file: "Audio/cancion12.mp3"
    },
    {
    title: "To Ashes and Blood",
    artist: "Woodkid",
    year: 2020,
    duration: "4:05",
    price: 500,
    cover: "Imagenes/cancion13.jpg",
    file: "Audio/cancion13.mp3"
    },
    {
    title: "Main Title",
    artist: "Ramin Djawadi",
    year: 2011,
    duration: "1:52",
    price: 500,
    cover: "Imagenes/cancion14.jpg",
    file: "Audio/cancion14.mp3"
    },
    {
    title: "The Rumbling",
    artist: "SiM",
    year: 2022,
    duration: "3:43",
    price: 500,
    cover: "Imagenes/cancion15.jpg",
    file: "Audio/cancion15.mp3"
    },
    {
    title: "The Days",
    artist: "Chrystal",
    year: 2023,
    duration: "3:53",
    price: 500,
    cover: "Imagenes/cancion16.jpg",
    file: "Audio/cancion16.mp3"
    },
    {
    title: "Akaza Theme",
    artist: "Demon Slayer",
    year: 2026,
    duration: "2:35",
    price: 500,
    cover: "Imagenes/cancion17.jpg",
    file: "Audio/cancion17.mp3"
    },
    {
    title: "Infinity Castle Theme",
    artist: "Demon Slayer",
    year: 2026,
    duration: "1:42",
    price: 500,
    cover: "Imagenes/cancion18.jpg",
    file: "Audio/cancion18.mp3"
    },
    {
    title: "Akaza's Love Theme",
    artist: "Demon Slayer",
    year: 2026,
    duration: "4:15",
    price: 500,
    cover: "Imagenes/cancion19.jpg",
    file: "Audio/cancion19.mp3"
    },
    {
    title: "LEGACY",
    artist: "PIXY",
    year: 2024,
    duration: "3:47",
    price: 500,
    cover: "Imagenes/cancion20.jpg",
    file: "Audio/cancion20.mp3"
    },
    {
    title: "Recollect",
    artist: "Konomi Suzuki feat. Ashnikko",
    year: 2026,
    duration: "1:30",
    price: 500,
    cover: "Imagenes/cancion21.jpg",
    file: "Audio/cancion21.mp3"
    },
    {
    title: "Skyfall",
    artist: "Adele",
    year: 2012,
    duration: "4:46",
    price: 500,
    cover: "Imagenes/cancion22.jpg",
    file: "Audio/cancion22.mp3"
    },
    {
    title: "We Are The People",
    artist: "Empire Of The Sun",
    year: 2008,
    duration: "4:27",
    price: 500,
    cover: "Imagenes/cancion23.jpg",
    file: "Audio/cancion23.mp3"
    },
    {
    title: "Golden Brown",
    artist: "The Stranglers",
    year: 1981,
    duration: "3:30",
    price: 500,
    cover: "Imagenes/cancion24.jpg",
    file: "Audio/cancion24.mp3"
    },
    {
    title: "STORIES",
    artist: "Hitomi",
    year: 2006,
    duration: "4:30",
    price: 500,
    cover: "Imagenes/cancion25.png",
    file: "Audio/cancion25.mp3",
  },
  {
    title: "PAPARAZZI [DUBSTEP]",
    artist: "Alximo [SLOWED]",
    year: 2021,
    duration: "3:10",
    price: 500,
    cover: "Imagenes/cancion26.png",
    file: "Audio/cancion26.mp3",
  },
  {
    title: "RED SWAN",
    artist: "Yoshiki",
    year: 2018,
    duration: "4:32",
    price: 500,
    cover: "Imagenes/cancion27.png",
    file: "Audio/cancion27.mp3",
  },
  {
    title: "ALL THE THINGS SHE SAID",
    artist: "t.A.T.u.",
    year: 2002,
    duration: "3:34",
    price: 500,
    cover: "Imagenes/cancion28.png",
    file: "Audio/cancion28.mp3",
  },
  {
    title: "SHINE",
    artist: "NCS",
    year: 2014,
    duration: "3:38",
    price: 500,
    cover: "Imagenes/cancion29.png",
    file: "Audio/cancion29.mp3",
  },
  {
    title: "LEGENDARY LOVERS",
    artist: "Katy Perry",
    year: 2013,
    duration: "3:44",
    price: 500,
    cover: "Imagenes/cancion30.png",
    file: "Audio/cancion30.mp3",
  },
  

  //💎 RUN AWAY ES LA 31 💎

  // 💎 NUEVAS CANCIONES DE LADY GAGA (SE MUESTRAN A PARTIR DEL 20 DE OCTUBRE)
  {
    title: "JUDAS",
    artist: "Lady Gaga",
    year: 2011,
    duration: "4:07",
    price: 500,
    cover: "Imagenes/cancion32.png",
    file: "Audio/cancion32.mp3",
    isNew: true,
    releaseDate: "2026-10-20"  
  },
  {
    title: "BLOODY MARY",
    artist: "Lady Gaga",
    year: 2011,
    duration: "4:04",
    price: 500,
    cover: "Imagenes/cancion33.jpg",
    file: "Audio/cancion33.mp3",
    isNew: true,
    releaseDate: "2026-10-20"
  },
  {
    title: "JUST DANCE",
    artist: "Lady Gaga",
    year: 2008,
    duration: "4:02",
    price: 500,
    cover: "Imagenes/cancion34.jpg",
    file: "Audio/cancion34.mp3",
    isNew: true,
    releaseDate: "2026-10-20"
  },
  {
    title: "BAD ROMANCE",
    artist: "Lady Gaga",
    year: 2009,
    duration: "4:54",
    price: 500,
    cover: "Imagenes/cancion35.jpg",
    file: "Audio/cancion35.mp3",
    isNew: true,
    releaseDate: "2026-10-20"
  },
  {
    title: "POKER FACE",
    artist: "Lady Gaga",
    year: 2008,
    duration: "3:59",
    price: 500,
    cover: "Imagenes/cancion36.jpg",
    file: "Audio/cancion36.mp3",
    isNew: true,
    releaseDate: "2026-10-20"
  },
  {
    title: "STUPID LOVE",
    artist: "Lady Gaga",
    year: 2020,
    duration: "3:12",
    price: 500,
    cover: "Imagenes/cancion37.jpg",
    file: "Audio/cancion37.mp3",
    isNew: true,
    releaseDate: "2026-10-20"
  },
  {
    title: "Who's Ready for Tomorrow",
    artist: "RAT BOY",
    year: 2026,
    duration: "1:56",
    price: 500,
    cover: "Imagenes/cancion38.jpg",
    file: "Audio/cancion38.mp3",
    isNew: true,
    releaseDate: "2026-10-20"
  },
  {
    title: "A Rusty Dream",
    artist: "DOUDOU",
    year: 2026,
    duration: "5:01",
    price: 500,
    cover: "Imagenes/cancion39.jpg",
    file: "Audio/cancion39.mp3",
    isNew: true,
    releaseDate: "2026-10-20"
  },
  {
    title: "Daten",
    artist: "Creepy Nuts",
    year: 2022,
    duration: "1:45",
    price: 500,
    cover: "Imagenes/cancion40.jpg", 
    file: "Audio/cancion40.mp3",   
    isNew: true,
    releaseDate: "2026-10-20"       // Disponible desde hoy
  },
  {
    title: "Mirage",
    artist: "Creepy Nuts",
    year: 2025,
    duration: "2:00",
    price: 500,
    cover: "Imagenes/cancion41.jpg",
    file: "Audio/cancion41.mp3",  
    isNew: true,
    releaseDate: "2026-10-20"       // Disponible desde hoy
  },
  {
    title: "Nazuna Nanakusa Theme",
    artist: "Yoshiaki Dewa",
    year: 2022,
    duration: "2:07",
    price: 500,
    cover: "Imagenes/cancion42.jpg", 
    file: "Audio/cancion42.mp3",  
    isNew: true,
    releaseDate: "2026-10-20"       // Disponible desde hoy
  },
];

// ===============================
// VARIABLES Y LOCALSTORAGE
// ===============================

let coins = parseInt(localStorage.getItem("coins")) || 1000;
let ownedSongs = JSON.parse(localStorage.getItem("ownedSongs")) || [];

function guardarCompras() {
    localStorage.setItem("ownedSongs", JSON.stringify(ownedSongs));
    localStorage.setItem("coins", coins);
}

// ==========================================================================
// CARGAR TIENDA (VERSIÓN LIMPIA DE LLAVES Y CONTROL DE ERRORES)
// ==========================================================================
function cargarTiendaJS() {
    const list = document.getElementById("songList");
    const preview = document.getElementById("preview");
    const coinsBox = document.getElementById("coins");

    if (!list || !coinsBox) return;

    coinsBox.textContent = coins;
    list.innerHTML = "";

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const songsWithIndex = songs.map((song, index) => ({ ...song, originalIndex: index }));

    const cancionesVisibles = songsWithIndex.filter((song) => {
        if (!song.releaseDate) return true; 
        const partes = song.releaseDate.split("-");
        const anio = parseInt(partes[0], 10);
        const mes = parseInt(partes[1], 10) - 1; 
        const dia = parseInt(partes[2], 10);
        const fechaLanzamiento = new Date(anio, mes, dia);
        return hoy >= fechaLanzamiento;
    });

    cancionesVisibles.sort((a, b) => (b.isNew || false) - (a.isNew || false));

    cancionesVisibles.forEach((song) => {
        const item = document.createElement("div");
        item.className = "store-item";

        const precioTexto = ownedSongs.includes(song.originalIndex)
            ? "Comprada"
            : `${song.price} RC`;

        const cartelNovedad = song.isNew ? `<div class="badge-novedad">NOVEDAD</div>` : "";

        item.innerHTML = `
            <img src="${song.cover}" class="store-thumb">
            <div class="store-info">
                <h3>${song.title}</h3>
                <p>${song.artist} • ${song.year}</p>
                <p>${song.duration || "--:--"} • ${precioTexto}</p>
            </div>
            ${cartelNovedad}
        `;

        item.onclick = () => {
            const previewPlayer = document.getElementById("previewPlayer");
            if (previewPlayer) {
                previewPlayer.src = song.file;
                previewPlayer.play().catch(() => console.log("Reproducción de preview retenida"));
            }

            const globalPlayer = document.getElementById("musicPlayer");
            if (globalPlayer) globalPlayer.pause();

            if (preview) {
                preview.innerHTML = `
                    <img src="${song.cover}">
                    <h2>${song.title}</h2>
                    <p>${song.artist} • ${song.year}</p>
                    <p>${song.duration || "--:--"}</p>
                    <p>Precio: ${precioTexto}</p>
                    <div id="storeActionContainer"></div>
                `;

                // Renderizado seguro por DOM nativo para esquivar fallos de comillas de escape
                const container = document.getElementById("storeActionContainer");
                if (container) {
                    const boton = document.createElement("button");
                    boton.className = "store-btn";

                    if (ownedSongs.includes(song.originalIndex)) {
                        boton.textContent = "Usar canción";
                        boton.onclick = () => {
                            if (typeof usarCancion === "function") {
                                usarCancion(song.file);
                            } else {
                                alert("Canción seleccionada para tu reproductor principal.");
                            }
                        };
                    } else {
                        boton.textContent = "Comprar";
                        boton.onclick = () => comprarCancion(song.originalIndex);
                    }
                    container.appendChild(boton);
                }
            }
        };

        list.appendChild(item);
    });
}

// ==========================================================================
// FUNCIÓN DE COMPRA COMPLETA (CON DESCUENTO DE COINS Y GUARDADO REAL)
// ==========================================================================
function comprarCancion(index) {
    const song = songs[index];
    if (!song) return alert("Error: Canción no encontrada.");

    if (ownedSongs.includes(index)) {
        alert("Ya posees esta pista musical.");
        return;
    }

    if (coins >= song.price) {
        coins -= song.price; // Descontar saldo
        ownedSongs.push(index); // Guardar canción
        
        guardarCompras(); // Sincronizar LocalStorage permanentemente
        
        alert(`¡Has comprado con éxito: ${song.title}!\nSaldo restante: ${coins} RC.`);
        
        // Actualizar visualmente la tienda completa y el balance de monedas
        cargarTiendaJS();
        
        // Forzar actualización del panel derecho al estado de comprada inmediatamente
        const preview = document.getElementById("preview");
        if (preview) {
            preview.innerHTML = `
                <img src="${song.cover}">
                <h2>${song.title}</h2>
                <p>${song.artist} • ${song.year}</p>
                <p>${song.duration || "--:--"}</p>
                <p>Precio: Comprada</p>
                <div id="storeActionContainer"></div>
            `;
            const container = document.getElementById("storeActionContainer");
            if (container) {
                const boton = document.createElement("button");
                boton.className = "store-btn";
                boton.textContent = "Usar canción";
                boton.onclick = () => {
                    if (typeof usarCancion === "function") usarCancion(song.file);
                };
                container.appendChild(boton);
            }
        }
    } else {
        alert(`Saldo insuficiente. Tienes ${coins} RC y la canción cuesta ${song.price} RC.`);
    }
}