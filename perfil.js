// ===============================
// FOTOS DE PERFIL DISPONIBLES
// ===============================

const fotosPerfil = [
    "Imagenes/fotos-de-perfil/aot/eren2.png",
    "Imagenes/fotos-de-perfil/spiderman/spider-gwen.png",
    "Imagenes/spiderman/miles-morales.png",
    "Imagenes/perfil4.png",
    "Imagenes/perfil5.png"
];

// Foto seleccionada
let fotoSeleccionada = localStorage.getItem("fotoPerfil") || "Imagenes/perfil.png";


// ===============================
// MOSTRAR MENÚ DE FOTOS DE PERFIL
// ===============================

function mostrarFotos() {
    const cont = document.getElementById("perfilContenido");
    if (!cont) return;

    cont.innerHTML = `
        <h2>Elige tu foto de perfil</h2>
        <div class="fotos-grid"></div>
    `;

    // Menú de orden (Latest, Sets, A-Z, Series, Season)
    mostrarMenuOrden();

    const grid = cont.querySelector(".fotos-grid");

    // Renderizar todas las fotos utilizando los datos extendidos
    fotosData.forEach(foto => {
        grid.innerHTML += `
            <img src="${foto.ruta}" 
                 class="fotoPerfilItem"
                 onclick="seleccionarFoto('${foto.ruta}')">
        `;
    });
}


// ===============================
// SELECCIONAR FOTO DE PERFIL
// ===============================

function seleccionarFoto(ruta) {
    fotoSeleccionada = ruta;
    localStorage.setItem("fotoPerfil", ruta);

    // Actualizar avatar en la esquina superior derecha
    const avatar = document.getElementById("avatarUsuario");
    if (avatar) avatar.src = ruta;

    alert("Foto de perfil actualizada");
}


// ===============================
// MOSTRAR MÚSICA COMPRADA
// ===============================

function mostrarCanciones() {
  const cont = document.getElementById("perfilContenido");
  if (!cont) return;

  const ownedSongs = JSON.parse(localStorage.getItem("ownedSongs")) || [];
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  // Normalizamos el array de favoritos a minúsculas y sin espacios para comparar sin fallos
  const favoritosNormalizados = favoritos.map(f => f.trim().toLowerCase());

  cont.innerHTML = "<h2>Música comprada</h2><div class='songs-grid'></div>";
  const grid = cont.querySelector(".songs-grid");

  // Carpeta de favoritos como primera tarjeta dentro del grid
  grid.innerHTML = `
    <div class="favoritos-folder" onclick="mostrarFavoritos()">
      <img src="Imagenes/favoritos_icon.png" alt="Favoritos" class="favoritos-icon">
      <h3>Favoritos</h3>
    </div>
  `;

  if (!ownedSongs.length) {
    grid.innerHTML += "<p>No has comprado ninguna canción aún.</p>";
    return;
  }

  ownedSongs.forEach(index => {
    const song = songs[index];
    if (!song) return;

    // Compara los títulos ignorando mayúsculas y espacios
    const esFavorito = favoritosNormalizados.includes(song.title.trim().toLowerCase());

    grid.innerHTML += `
      <div class="songSquare ${esFavorito ? 'favorito' : ''}">
        <!-- Inyecta el corazón rojo si es favorito -->
        ${esFavorito ? '<span class="favorite-icon">❤️</span>' : ''}
        
        <img src="${song.cover}" alt="${song.title}" onclick="usarCancion('${song.file}')">
        <button class="song-menu-btn" onclick="toggleSongMenu('${song.title.replace(/'/g, "\\'")}')">⋯</button>
        <div class="song-menu" id="songMenu_${song.title.trim().toLowerCase().replace(/\s+/g, '')}">
          <button onclick="addToFavorites('${song.title.replace(/'/g, "\\'")}')">
            ${esFavorito ? 'Quitar de favoritos' : 'Añadir a favoritos'} <span class="key-hint">F</span>
          </button>
        </div>
      </div>
    `;
  });
}


// ===============================
// MOSTRAR FAVORITOS
// ===============================

function mostrarFavoritos() {
  const cont = document.getElementById("perfilContenido");
  if (!cont) return;

  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  cont.innerHTML = "<h2>Favoritos</h2><div class='songs-grid'></div>";
  const grid = cont.querySelector(".songs-grid");

  if (!favoritos.length) {
    grid.innerHTML = "<p>No tienes canciones en favoritos aún.</p>";
    return;
  }

  favoritos.forEach(title => {
    // Buscamos en el array global ignorando mayúsculas para asegurar que encuentre el objeto
    const song = songs.find(s => s.title.trim().toLowerCase() === title.trim().toLowerCase());
    if (!song) return;

    grid.innerHTML += `
      <div class="songSquare favorito">
        <span class="favorite-icon">❤️</span>
        <img src="${song.cover}" alt="${song.title}" onclick="usarCancion('${song.file}')">
        <div class="song-info">
          <h3>${song.title}</h3>
          <p>${song.artist} • ${song.year}</p>
          <p>${song.duration || "Duración desconocida"}</p>
        </div>
        <button class="song-menu-btn" onclick="toggleSongMenu('${song.title.replace(/'/g, "\\'")}')">⋯</button>
        <div class="song-menu" id="songMenu_${song.title.trim().toLowerCase().replace(/\s+/g, '')}">
          <button onclick="addToFavorites('${song.title.replace(/'/g, "\\'")}')">
            Quitar de favoritos <span class="key-hint">F</span>
          </button>
        </div>
      </div>
    `;
  });
}


// ===============================
// FAVORITOS - AÑADIR / QUITAR
// ===============================

function addToFavorites(title) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  const titleClean = title.trim().toLowerCase();
  
  const existe = favoritos.some(f => f.trim().toLowerCase() === titleClean);

  if (existe) {
      favoritos = favoritos.filter(f => f.trim().toLowerCase() !== titleClean);
      alert(`"${title}" eliminada de favoritos.`);
  } else {
      favoritos.push(title);
      alert(`"${title}" añadida a favoritos.`);
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  
  // Control inteligente de refresco de pantalla
  const tituloActual = document.querySelector("#perfilContenido h2");
  if (tituloActual && tituloActual.textContent === "Favoritos") {
      mostrarFavoritos();
  } else {
      mostrarCanciones();
  }
}


// ===============================
// MENÚ CONTEXTUAL DE CANCIONES
// ===============================

function toggleSongMenu(title) {
  const idLimpio = `songMenu_${title.trim().toLowerCase().replace(/\s+/g, '')}`;
  const menu = document.getElementById(idLimpio);
  if (!menu) return;
  
  const visible = menu.style.display === "flex";
  document.querySelectorAll(".song-menu").forEach(m => m.style.display = "none");
  menu.style.display = visible ? "none" : "flex";
}


// ===============================
// DATOS EXTENDIDOS DE FOTOS
// ===============================

const fotosData = [
  // Attack on Titan
  {
    ruta: "Imagenes/fotos-de-perfil/aot/eren2.png",
    nombre: "Eren",
    serie: "Attack on Titan",
    seasonCode: "C1T1P1",
    added: 20240101
  },
  // Spiderman
  {
    ruta: "Imagenes/fotos-de-perfil/spiderman/spider-gwen.png",
    nombre: "Spider-Gwen",
    serie: "Spiderman",
    seasonCode: "C4T2P3",
    added: 20241001
  },
  {
    ruta: "Imagenes/fotos-de-perfil/spiderman/miles-morales.png",
    nombre: "Miles Morales",
    serie: "Spiderman",
    seasonCode: "C4T2P3",
    added: 20241001
  },
  // Digital circus
  {
    ruta: "Imagenes/fotos-de-perfil/digitalcircus/ponmi.png",
    nombre: "Ponmi",
    serie: "Digital Circus",
    seasonCode: "C5T1P3",
    added: 20260325
  },
  {
    ruta: "Imagenes/fotos-de-perfil/digitalcircus/jax.png",
    nombre: "Jax",
    serie: "Digital Circus",
    seasonCode: "C5T1P3",
    added: 20260325
  },
  {
    ruta: "Imagenes/fotos-de-perfil/digitalcircus/ragatha.png",
    nombre: "Ragatha",
    serie: "Digital Circus",
    seasonCode: "C5T1P3",
    added: 20260325
  },
  {
    ruta: "Imagenes/fotos-de-perfil/digitalcircus/zooble.png",
    nombre: "Zooble",
    serie: "Digital Circus",
    seasonCode: "C5T1P3",
    added: 20260325
  },
  {
    ruta: "Imagenes/fotos-de-perfil/digitalcircus/gangle.png",
    nombre: "Gangle",
    serie: "Digital Circus",
    seasonCode: "C5T1P3",
    added: 20260325
  },
  {
    ruta: "Imagenes/fotos-de-perfil/digitalcircus/kinger.png",
    nombre: "Kinger",
    serie: "Digital Circus",
    seasonCode: "C5T1P3",
    added: 20260325
  },
  // Arcane
  {
    ruta: "Imagenes/fotos-de-perfil/arcane/Jinx.jpg",
    nombre: "Jinx",
    serie: "Arcane",
    seasonCode: "C3T1P1",
    added: 20250101
  },
  {
    ruta: "Imagenes/fotos-de-perfil/arcane/Vi.jpg",
    nombre: "Vi",
    serie: "Arcane",
    seasonCode: "C3T1P1",
    added: 20250101
  },
  {
    ruta: "Imagenes/fotos-de-perfil/arcane/Caitlyn.jpg",
    nombre: "Caitlyn",
    serie: "Arcane",
    seasonCode: "C3T1P1",
    added: 20250101
  },
  {
    ruta: "Imagenes/fotos-de-perfil/arcane/Ekko.jpg",
    nombre: "Ekko",
    serie: "Arcane",
    seasonCode: "C3T1P1",
    added: 20250101
  },
  {
    ruta: "Imagenes/fotos-de-perfil/arcane/Jayce.jpg",
    nombre: "Jayce",
    serie: "Arcane",
    seasonCode: "C3T1P1",
    added: 20250101
  },
  {
    ruta: "Imagenes/fotos-de-perfil/arcane/Viktor.jpg",
    nombre: "Viktor",
    serie: "Arcane",
    seasonCode: "C3T1P1",
    added: 20250101
  },
  {
    ruta: "Imagenes/fotos-de-perfil/arcane/Vander.jpg",
    nombre: "Vander",
    serie: "Arcane",
    seasonCode: "C3T1P1",
    added: 20250101
  },
  {
    ruta: "Imagenes/fotos-de-perfil/arcane/Mel.jpg",
    nombre: "Mel Medarda",
    serie: "Arcane",
    seasonCode: "C3T1P1",
    added: 20250101
  },
  {
    ruta: "Imagenes/fotos-de-perfil/arcane/Silco.jpg",
    nombre: "Silco",
    serie: "Arcane",
    seasonCode: "C3T1P1",
    added: 20250101
  },
  {
    ruta: "Imagenes/fotos-de-perfil/arcane/Sevika.jpg",
    nombre: "Sevika",
    serie: "Arcane",
    seasonCode: "C3T1P1",
    added: 20250101
  },
  {
    ruta: "Imagenes/fotos-de-perfil/arcane/Hemier.jpg",
    nombre: "Heimerdinger",
    serie: "Arcane",
    seasonCode: "C3T1P1",
    added: 20250101
  },
  {
    ruta: "Imagenes/fotos-de-perfil/arcane/Mascota.jpg",
    nombre: "Poro",
    serie: "Arcane",
    seasonCode: "C3T1P1",
    added: 20250101
  },
  // Demon Slayer
  {
    ruta: "Imagenes/fotos-de-perfil/demonslayer/tanjiro.jpg",
    nombre: "Tanjiro",
    serie: "Demon Slayer",
    seasonCode: "C5T1P3",
    added: 20250101
  },
  {
    ruta: "Imagenes/fotos-de-perfil/demonslayer/zenitsu.png",
    nombre: "Zenitsu",
    serie: "Demon Slayer",
    seasonCode: "C5T1P3",
    added: 20250101
  },
  {
    ruta: "Imagenes/fotos-de-perfil/demonslayer/muichirotokito.jpg",
    nombre: "Muichiro Tokito",
    serie: "Demon Slayer",
    seasonCode: "C5T1P3",
    added: 20250101
  },
  {
    ruta: "Imagenes/fotos-de-perfil/demonslayer/obanaiiguro.jpg",
    nombre: "Obanai Iguro",
    serie: "Demon Slayer",
    seasonCode: "C5T1P3",
    added: 20250101
  },
  {
    ruta: "Imagenes/fotos-de-perfil/demonslayer/tanjirokamado.png",
    nombre: "Tanjiro Kamado",
    serie: "Demon Slayer",
    seasonCode: "C5T1P3",
    added: 20250101
  },
  {
    ruta: "Imagenes/fotos-de-perfil/demonslayer/tengenuzui.png",
    nombre: "Tengen Uzui",
    serie: "Demon Slayer",
    seasonCode: "C5T1P3",
    added: 20250101
  },
  {
    ruta: "Imagenes/fotos-de-perfil/demonslayer/sanemishinazugawa.png",
    nombre: "Sanemishi Nazugawa",
    serie: "Demon Slayer",
    seasonCode: "C5T1P3",
    added: 20250101
  },
  {
    ruta: "Imagenes/fotos-de-perfil/demonslayer/kanaotsuyuri.jpg",
    nombre: "Kanao Tsuyuri",
    serie: "Demon Slayer",
    seasonCode: "C5T1P3",
    added: 20250101
  },
  {
    ruta: "Imagenes/fotos-de-perfil/demonslayer/giyuutomioka.jpg",
    nombre: "Giyuu Tomioka",
    serie: "Demon Slayer",
    seasonCode: "C5T1P3",
    added: 20250101
  },
 // Chainsawman
  {
    ruta: "Imagenes/fotos-de-perfil/chainsawman/Denji.jpg",
    nombre: "Denji",
    serie: "Chainsaw Man",
    seasonCode: "C5T1P3",
    added: 20250101
  },
  {
    ruta: "Imagenes/fotos-de-perfil/chainsawman/Power.jpg",
    nombre: "Power",
    serie: "Chainsaw Man",
    seasonCode: "C5T1P3",
    added: 20250101
  },
  {
    ruta: "Imagenes/fotos-de-perfil/chainsawman/Aki.jpg",
    nombre: "Aki",
    serie: "Chainsaw Man",
    seasonCode: "C5T1P3",
    added: 20250101
  },
  {
    ruta: "Imagenes/fotos-de-perfil/chainsawman/Kobeni.jpg",
    nombre: "Kobeni",
    serie: "Chainsaw Man",
    seasonCode: "C5T1P3",
    added: 20250101
  },
  {
    ruta: "Imagenes/fotos-de-perfil/chainsawman/Reze.jpg",
    nombre: "Reze",
    serie: "Chainsaw Man",
    seasonCode: "C5T1P3",
    added: 20250101
  },
 // Cyberpunk: Edgerunners
   {
    ruta: "Imagenes/fotos-de-perfil/cyberpunkedgerunners/David.png",
    nombre: "David",
    serie: "Cyberpunk: Edgerunners",
    seasonCode: "C5T1P3",
    added: 20250101
  },
   {
    ruta: "Imagenes/fotos-de-perfil/cyberpunkedgerunners/Lucy.png",
    nombre: "Lucy",
    serie: "Cyberpunk: Edgerunners",
    seasonCode: "C5T1P3",
    added: 20250101
  },
   {
    ruta: "Imagenes/fotos-de-perfil/cyberpunkedgerunners/Rebecca.png",
    nombre: "Rebecca",
    serie: "Cyberpunk: Edgerunners",
    seasonCode: "C5T1P3",
    added: 20250101
  },
   {
    ruta: "Imagenes/fotos-de-perfil/cyberpunkedgerunners/Adam-Smasher.png",
    nombre: "Adam Smasher",
    serie: "Cyberpunk: Edgerunners",
    seasonCode: "C5T1P3",
    added: 20250101
  },
 // Neon Genesis Evangelion
    {
    ruta: "Imagenes/fotos-de-perfil/Evangelion/Shinji.jpg",
    nombre: "Shinji",
    serie: "Neon Genesis Evangelion",
    seasonCode: "C5T1P3",
    added: 20261025
  },
    {
    ruta: "Imagenes/fotos-de-perfil/Evangelion/Rei-Ayanami.jpg",
    nombre: "Rei Ayanami",
    serie: "Neon Genesis Evangelion",
    seasonCode: "C5T1P3",
    added: 20261025
  },
    {
    ruta: "Imagenes/fotos-de-perfil/Evangelion/Asuka.jpg",
    nombre: "Asuka",
    serie: "Neon Genesis Evangelion",
    seasonCode: "C5T1P3",
    added: 20261025
  },
    {
    ruta: "Imagenes/fotos-de-perfil/Evangelion/Misato-Katsuragi.jpg",
    nombre: "Misato Katsuragi",
    serie: "Neon Genesis Evangelion",
    seasonCode: "C5T1P3",
    added: 20261025
  },
 // Monster
    {
    ruta: "Imagenes/fotos-de-perfil/monster/Johan-Liebert.jpg",
    nombre: "Johan Liebert",
    serie: "Monster",
    seasonCode: "C5T1P3",
    added: 20261025
  },
    {
    ruta: "Imagenes/fotos-de-perfil/monster/Tenma.jpg",
    nombre: "Tenma",
    serie: "Monster",
    seasonCode: "C5T1P3",
    added: 20261025
  },
 // Gachiakuta
    {
    ruta: "Imagenes/fotos-de-perfil/gachiakuta/Rudo.jpg",
    nombre: "Rudo",
    serie: "Gachiakuta",
    seasonCode: "C5T1P3",
    added: 20261025
  },
    {
    ruta: "Imagenes/fotos-de-perfil/gachiakuta/Riyo-Reaper.jpg",
    nombre: "Riyo Reaper",
    serie: "Gachiakuta",
    seasonCode: "C5T1P3",
    added: 20261025
  },
    {
    ruta: "Imagenes/fotos-de-perfil/gachiakuta/Enjin.jpg",
    nombre: "Enjin",
    serie: "Gachiakuta",
    seasonCode: "C5T1P3",
    added: 20261025
  },
    {
    ruta: "Imagenes/fotos-de-perfil/gachiakuta/Guita-Hebby.jpg",
    nombre: "Guita-Hebby",
    serie: "Gachiakuta",
    seasonCode: "C5T1P3",
    added: 20261025
  },
 // Tokyo Ghoul
    {
    ruta: "Imagenes/fotos-de-perfil/tokyoghoul/Kaneki-Normal.jpg",
    nombre: "Kaneki Normal",
    serie: "Tokyo Ghoul",
    seasonCode: "C5T1P3",
    added: 20261025
  },
    {
    ruta: "Imagenes/fotos-de-perfil/tokyoghoul/Kaneki.jpg",
    nombre: "Kaneki",
    serie: "Tokyo Ghoul",
    seasonCode: "C5T1P3",
    added: 20261025
  },
    {
    ruta: "Imagenes/fotos-de-perfil/tokyoghoul/Rize-Normal.jpg",
    nombre: "Rize-Normal",
    serie: "Tokyo Ghoul",
    seasonCode: "C5T1P3",
    added: 20261025
  },
    {
    ruta: "Imagenes/fotos-de-perfil/tokyoghoul/Rize.jpg",
    nombre: "Rize",
    serie: "Tokyo Ghoul",
    seasonCode: "C5T1P3",
    added: 20261025
  },
// Call of the night
    {
    ruta: "Imagenes/fotos-de-perfil/callofthenight/Kou-Yamori.jpg",
    nombre: "Kou Yamori",
    serie: "Call of the night",
    seasonCode: "C5T1P3",
    added: 20261025
  },
    {
    ruta: "Imagenes/fotos-de-perfil/callofthenight/Nazuna.jpg",
    nombre: "Nazuna",
    serie: "Call of the night",
    seasonCode: "C5T1P3",
    added: 20261025
  },
    {
    ruta: "Imagenes/fotos-de-perfil/callofthenight/Kou-Yamori-Pepo.jpg",
    nombre: "Kou Yamori Pepo",
    serie: "Call of the night",
    seasonCode: "C5T1P3",
    added: 20261025
  },
    {
    ruta: "Imagenes/fotos-de-perfil/callofthenight/Nazuna-Pepo.jpg",
    nombre: "Nazuna-Pepo",
    serie: "Call of the night",
    seasonCode: "C5T1P3",
    added: 20261025
  },
];


// ===============================
// PARSEAR SEASON CODE
// ===============================

function parseSeasonCode(code){
    // Captura de forma segura tanto códigos con 'P' (Parte) como con 'E' (Episodio)
    const match = code.match(/C(\d+)T(\d+)[PE](\d+)/);
    if (!match) return { c: 0, t: 0, e: 0 };
    return {
        c: parseInt(match[1]),
        t: parseInt(match[2]),
        e: parseInt(match[3])
    };
}

function sortBySeason(a, b){
    const A = parseSeasonCode(a.seasonCode);
    const B = parseSeasonCode(b.seasonCode);

    if (B.c !== A.c) return B.c - A.c;
    if (B.t !== A.t) return B.t - A.t;
    return B.e - A.e;
}


// ===============================
// MENU DE ORDEN
// ===============================

function mostrarMenuOrden(){
    const cont = document.getElementById("perfilContenido");
    if (!cont) return;

    // Evitar que se dupliquen los botones de orden en la interfaz
    const menuViejo = cont.querySelector(".sort-menu");
    if (menuViejo) menuViejo.remove();

    const menu = document.createElement("div");
    menu.className = "sort-menu";

    menu.innerHTML = `
        <h3>Sort by:</h3>
        <button onclick="ordenarFotos('latest')">Latest Acquired</button>
        <button onclick="ordenarFotos('sets')">Sets</button>
        <button onclick="ordenarFotos('az')">A-Z</button>
        <button onclick="ordenarFotos('series')">Series</button>
        <button onclick="ordenarFotos('season')">Season</button>
    `;

    cont.prepend(menu);
}


// ===============================
// ORDENAR FOTOS
// ===============================

function ordenarFotos(tipo){
    let data = [...fotosData];

    if(tipo === "latest"){
        data.sort((a,b)=> b.added - a.added);
    }
    if(tipo === "az"){
        data.sort((a,b)=> a.nombre.localeCompare(b.nombre));
    }
    if(tipo === "series"){
        data.sort((a,b)=> a.serie.localeCompare(b.serie));
    }
    if(tipo === "season"){
        data.sort(sortBySeason);
    }
    if(tipo === "sets"){
        renderSetsFotos();
        return;
    }

    renderFotosOrdenadas(data);

    // Activar estilo visual del botón seleccionado
    if (window.event && window.event.target) {
        document.querySelectorAll(".sort-menu button").forEach(btn => btn.classList.remove("active"));
        window.event.target.classList.add("active");
    }
}


// ===============================
// RENDER NORMAL
// ===============================

function renderFotosOrdenadas(data){
    const cont = document.getElementById("perfilContenido");
    if (!cont) return;

    cont.innerHTML = `
        <h2>Elige tu foto de perfil</h2>
        <div class="fotos-grid"></div>
    `;

    mostrarMenuOrden();

    const grid = cont.querySelector(".fotos-grid");
    data.forEach(foto=>{
        grid.innerHTML += `
            <img src="${foto.ruta}" class="fotoPerfilItem"
                 onclick="seleccionarFoto('${foto.ruta}')">
        `;
    });
}


// ===============================
// RENDER SETS
// ===============================

function renderSetsFotos(){
    const cont = document.getElementById("perfilContenido");
    if (!cont) return;

    cont.innerHTML = `<h2>Fotos por serie</h2>`;
    mostrarMenuOrden();

    const grupos = {};
    fotosData.forEach(f=>{
        if(!grupos[f.serie]){
            grupos[f.serie] = [];
        }
        grupos[f.serie].push(f);
    });

    for(let serie in grupos){
        const bloque = document.createElement("div");
        bloque.className = "serie-bloque";
        bloque.innerHTML = `<h3>${serie}</h3><div class="fotos-grid"></div>`;

        const grid = bloque.querySelector(".fotos-grid");
        grupos[serie].forEach(foto=>{
            grid.innerHTML += `
                <img src="${foto.ruta}" class="fotoPerfilItem"
                     onclick="seleccionarFoto('${foto.ruta}')">
            `;
        });
        cont.appendChild(bloque);
    }
}


// ===============================
// REPRODUCTOR DE AUDIO (NATIVO)
// ===============================

let reproductorAudio = null; 

function usarCancion(rutaArchivo) {
    try {
        // Pausar la pista previa si existe
        if (reproductorAudio) {
            reproductorAudio.pause();
        }

        reproductorAudio = new Audio(rutaArchivo);
        
        reproductorAudio.play()
            .then(() => {
                console.log("Audio iniciado: " + rutaArchivo);
            })
            .catch(error => {
                console.error("Fallo al reproducir el archivo:", error);
                alert("No se pudo iniciar la música. Revisa si el archivo está en la ruta local correspondiente.");
            });

    } catch (e) {
        console.error("Fallo en la instancia de Audio nativa:", e);
    }
}


// ===============================
// SISTEMA DE PLAYLISTS (SINCRONIZADO)
// ===============================

const playlistNameInput = document.getElementById("playlistNameInput");
const createPlaylistBtn = document.getElementById("createPlaylistBtn");
const playlistList = document.getElementById("playlistList");

let playlists = JSON.parse(localStorage.getItem("playlists")) || [];

function renderPlaylists() {
  if (!playlistList) return;
  playlistList.innerHTML = playlists.map((pl, index) => `
    <div class="playlist-card">
      <h3>${pl.name}</h3>
      <ul>
        ${pl.songs.map(song => `<li>\${song.title}</li>`).join("")}
      </ul>
      <button class="add-to-playlist-btn" onclick="addSongToPlaylist(${index})">Añadir canción</button>
    </div>
  `).join("");
}

if (createPlaylistBtn) {
  createPlaylistBtn.addEventListener("click", () => {
    const name = playlistNameInput.value.trim();
    if (!name) return alert("Escribe un nombre para la playlist.");

    playlists.push({ name, songs: [] });
    localStorage.setItem("playlists", JSON.stringify(playlists));
    playlistNameInput.value = "";
    renderPlaylists();
  });
}

function addSongToPlaylist(index) {
  // Sincronización estricta utilizando los índices almacenados en ownedSongs
  const ownedSongs = JSON.parse(localStorage.getItem("ownedSongs")) || [];
  if (ownedSongs.length === 0) return alert("No tienes canciones compradas todavía.");

  // Comprobación de existencia del catálogo global 'songs'
  if (typeof songs === "undefined") return alert("Error del sistema: El catálogo general de música no está cargado.");
  const cancionesCompradas = ownedSongs.map(idx => songs[idx]).filter(Boolean);

  const songTitles = cancionesCompradas.map(s => s.title).join("\n");
  const choice = prompt(`Canciones disponibles:\n\n${songTitles}\n\nEscribe el título exacto de la canción que quieres añadir:`);

  if (!choice) return;

  const selected = cancionesCompradas.find(s => s.title.trim().toLowerCase() === choice.trim().toLowerCase());
  if (!selected) return alert("Canción no encontrada. Recuerda escribir el nombre tal como aparece.");

  // Control de duplicados en la lista actual
  const yaExiste = playlists[index].songs.some(s => s.title.toLowerCase() === selected.title.toLowerCase());
  if (yaExiste) return alert("Esta canción ya forma parte de esta playlist.");

  playlists[index].songs.push(selected);
  localStorage.setItem("playlists", JSON.stringify(playlists));
  renderPlaylists();
}


// ==========================================
// INICIALIZACIÓN Y CARGA DE CONTENIDOS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  renderPlaylists();

  const avatar = document.getElementById("avatarUsuario");
  const guardada = localStorage.getItem("fotoPerfil");

  if (avatar && guardada) {
    avatar.src = guardada;
  }
});

function cargarPerfilJS() {
  const cont = document.getElementById("perfilContenido");
  if (!cont) return console.warn("perfilContenido no existe todavía");
  mostrarFotos();
}
