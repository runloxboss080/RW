function cargarCatalogoJS() {
    // Inicialización segura del contador si la función existe en el entorno global
    if (typeof iniciarContadorEvento === "function") {
        iniciarContadorEvento();
    }

    // ===============================
    //   DATOS DEL CATÁLOGO
    // ===============================
    const animeData = [
      {
        title: "Attack on Titan",
        type: "TV Anime",
        genre: "Acción",
        year: 2025,
        status: "Finalizado",
        image: "Imagenes/aot.jpg",
        rating: 9.7,
        popularity: 1000,
        added: 20250610,
        url: "Episodios/aot/aot.html",
      },
      {
        title: "Arcane",
        type: "Especial",
        genre: "Fantasía",
        year: 2025,
        status: "Finalizado",
        image: "Imagenes/arcane.jpeg",
        rating: 9.6,
        popularity: 999,
        added: 20250101,
        url: "Episodios/arcane/arcane.html"
      },
      {
        title: "Jujutsu kaisen",
        type: "TV Anime",
        genre: "Drama",
        year: 2025,
        status: "En emisión",
        image: "Imagenes/jjk.jpg",
        rating: 8.5,
        popularity: 998,
        added: 20250201,
        url: "Episodios/jjk/jjk.html"
      },
      {
        title: "Cyberpunk: Edgerunners",
        type: "TV Anime",
        genre: "Drama",
        year: 2025,
        status: "En emisión",
        image: "Imagenes/cyberpunk.webp",
        rating: 8.3,
        popularity: 997,
        added: 20250112,
        url: "Episodios/cyberpunk/cyberpunk.html"
      },
      {
        title: "Invencible",
        type: "TV Anime",
        genre: "Drama",
        year: 2025,
        status: "En emisión",
        image: "Imagenes/invencible.jpg",
        rating: 8.7,
        popularity: 996,
        added: 20240101,
        url: "Episodios/invencible/invencible.html"
      },
      {
        title: "Re:zero",
        type: "TV Anime",
        genre: "Drama",
        year: 2025,
        status: "Finalizado",
        image: "Imagenes/rezero.webp",
        rating: 8.1,
        popularity: 995,
        added: 20251007,
        url: "Episodios/rezero/rezero.html"
      },
      {
        title: "Call of the night",
        type: "TV Anime",
        genre: "Drama",
        year: 2025,
        status: "Finalizado",
        image: "Imagenes/callofthenight.webp",
        rating: 7.5,
        popularity: 994,
        added: 20250728,
        url: "Episodios/callofthenight/callofthenight.html",
      },
      {
        title: "Dan Da Dan",
        type: "TV Anime",
        genre: "Fantasía",
        year: 2025,
        status: "Finalizado",
        image: "Imagenes/dandadan.jpg",
        rating: 7.8,
        popularity: 993,
        added: 20250728,
        url: "Episodios/dandadan/dandadan.html",
      },
      {
        title: "Death Note",
        type: "TV Anime",
        genre: "Suspenso psicológico",
        year: 2006,
        status: "Finalizado",
        image: "Imagenes/deathnote.jpg",
        rating: 8.6,
        popularity: 992,
        added: 20061004,
        url: "Episodios/deathnote/deathnote.html",
      },
      {
        title: "Chainsaw Man",
        type: "TV Anime",
        genre: "Acción, Fantasía oscura, Comedia de horror",
        year: 2022,
        status: "Finalizado",
        image: "Imagenes/chainsawman.jpg",
        rating: 8.7,
        popularity: 991,
        added: 20251011,
        url: "Episodios/chainsawman/chainsawman.html",
      },
      {
        title: "Takopi's Original Sin",
        type: "TV Anime",
        genre: "Drama, Psicológico, Tragedia",
        year: 2025,
        status: "Finalizado",
        image: "Imagenes/takopi.jpg",
        rating: 8.5,
        popularity: 990,
        added: 20220107,
        url: "Episodios/takopi/takopi.html",
      },
      {
        title: "My Dress-Up Darling",
        type: "TV Anime",
        genre: "Romance, Comedia, Slice of Life",
        year: 2022,
        status: "Finalizado",
        image: "Imagenes/mydressupdarling.jpg",
        rating: 8.2,
        popularity: 989,
        added: 20220109,
        url: "Episodios/mydressupdarling/mydressupdarling.html",
      },
      {
        title: "Spy x Family",
        type: "TV Anime",
        genre: "Acción / Comedia / Espionaje",
        year: 2022,
        status: "En emisión",
        image: "Imagenes/spyxfamily.jpg",
        rating: 9.3,
        popularity: 988,
        added: 20250610,
        url: "Episodios/spyxfamily/spyxfamily.html",
      },
      {
        title: "The Amazing Digital Circus",
        type: "Web Serie / Animación",
        genre: "Comedia / Surrealismo / Misterio",
        year: 2023,
        status: "En emisión",
        image: "Imagenes/digitalcircus.jpg",
        rating: 9.1,
        popularity: 987,
        added: 20250610,
        url: "Episodios/digitalcircus/digitalcircus.html",
      },
      {
        title: "Demon Slayer: Kimetsu no Yaiba",
        type: "Anime / Serie",
        genre: "Acción / Fantasía / Demonios",
        year: 2019,
        status: "En emisión",
        image: "Imagenes/demonslayer.jpg",
        rating: 9.4,
        popularity: 1001,
        added: 20250610,
        url: "Episodios/demonslayer/demonslayer.html",
      },
      {
        title: "Demon Slayer: Castillo Infinito",
        type: "Película",
        genre: "Acción / Fantasía",
        year: 2026,
        status: "Finalizado",
        image: "Imagenes/castilloinfinito.jpg",
        rating: 9.8,
        popularity: 1002,
        added: 20260501,
        url: "Episodios/demonslayer-ci/demonslayer-ci.html",
      },
      {
        title: "Witch Hat Atelier",
        type: "TV Anime",
        genre: "Fantasía / Aventura",
        year: 2025,
        status: "En emisión",
        image: "Imagenes/witchhatatelier.jpg",
        rating: 9.6,
        popularity: 950,
        added: 20260503,
        url: "Episodios/witchhatatelier/witchhatatelier.html",
      },
      {
        title: "Vinland Saga",
        type: "TV Anime",
        genre: "Acción / Aventura / Drama",
        year: 2026,
        status: "En emisión",
        image: "Imagenes/vinlandsaga.jpg",
        rating: 9.2,
        popularity: 1200,
        added: 20260515,
        url: "Episodios/vinlandsaga/vinlandsaga.html",
      },
      {
        title: "Bleach",
        type: "TV Anime",
        genre: "Acción / Fantasía / Shonen",
        year: 2026,
        status: "En emisión",
        image: "Imagenes/bleach.jpg",
        rating: 9.8,
        popularity: 1300,
        added: 20260612,
        url: "Episodios/bleach/bleach.html",
      },
      {
        title: "Neon Genesis Evangelion",
        type: "TV Anime",
        genre: "Mecha / Psicológico / Ciencia Ficción",
        year: 1995,
        status: "Finalizado",
        image: "Imagenes/evangelion.jpg", 
        rating: 9.7,
        popularity: 2500,
        added: 20261020, // Oculto hasta el 25 de octubre de 2026
        url: "Episodios/evangelion/evangelion.html", 
      },
      {
        title: "Monster",
        type: "TV Anime",
        genre: "Suspenso psicológico / Misterio / Drama",
        year: 2004,
        status: "Finalizado",
        image: "Imagenes/monster.jpg", 
        rating: 9.8,
        popularity: 2400,
        added: 20261020, // Disponible desde hoy
        url: "Episodios/monster/monster.html", 
      },
      {
        title: "Gachiakuta",
        type: "TV Anime",
        genre: "Acción / Fantasía oscura / Shonen",
        year: 2025,
        status: "En emisión",
        image: "Imagenes/gachiakuta.jpg", 
        rating: 8.9,
        popularity: 1800,
        added: 20261020, // Disponible desde hoy
        url: "Episodios/gachiakuta/gachiakuta.html", 
      },
      {
        title: "Tokyo Ghoul",
        type: "TV Anime",
        genre: "Acción / Fantasía oscura / Horror",
        year: 2014,
        status: "Finalizado",
        image: "Imagenes/tokyoghoul.jpg", 
        rating: 8.7,
        popularity: 2200,
        added: 20261020, // Disponible desde hoy
        url: "Episodios/tokyoghoul/tokyoghoul.html", 
      },
      {
        title: "Alya Sometimes Hides Her Feelings in Russian",
        type: "TV Anime",
        genre: "Romance / Comedia / Escolar",
        year: 2024,
        status: "Finalizado",
        image: "Imagenes/alya-sometimes-hides-her-feelings-in-russian.jpg", 
        rating: 8.4,
        popularity: 1650,
        added: 20261020, // Disponible desde hoy
        url: "Episodios/alya-sometimes-hides-her-feelings-in-russian/alya-sometimes-hides-her-feelings-in-russian.html",
      },
    ];

    // ===============================
    //   VARIABLES DOM
    // ===============================
    const cardsContainer = document.getElementById("cardsContainer");
    const resultsCount = document.getElementById("resultsCount");
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const typeFilter = document.getElementById("typeFilter");
    const genreFilter = document.getElementById("genreFilter");
    const yearFilter = document.getElementById("yearFilter");
    const statusFilter = document.getElementById("statusFilter");
    const filterBtn = document.getElementById("filterBtn");
    const clearBtn = document.getElementById("clearBtn");
    const sortSelect = document.getElementById("sortSelect");
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");
    const pageInfo = document.getElementById("pageInfo");

    // Formato de fecha del sistema (Hoy: 20261020)
    const hoy = new Date();
    const hoyNum = parseInt(
        `${hoy.getFullYear()}${String(hoy.getMonth() + 1).padStart(2, '0')}${String(hoy.getDate()).padStart(2, '0')}`
    );

    let currentPage = 1;
    const pageSize = 16;
    let filteredData = [];

    // ===============================
    //   LÓGICA DE FILTROS Y ORDEN
    // ===============================
    function applyFilters() {
        const text = searchInput ? searchInput.value.trim().toLowerCase() : "";
        const type = typeFilter ? typeFilter.value : "";
        const genre = genreFilter ? genreFilter.value : "";
        const year = yearFilter ? yearFilter.value : "";
        const status = statusFilter ? statusFilter.value : "";

        filteredData = animeData.filter((item) => {
            // Regla de oro: Si la fecha configurada es mayor a hoy, se bloquea completamente
            if (item.added && hoyNum < item.added) return false;
            
            if (text && !item.title.toLowerCase().includes(text)) return false;
            if (type && item.type !== type) return false;
            if (genre && !item.genre.includes(genre)) return false;
            if (year && String(item.year) !== year) return false;
            if (status && item.status !== status) return false;
            return true;
        });

        currentPage = 1;
        applySorting();
    }

    function applySorting() {
        const sortType = sortSelect ? sortSelect.value : "default";

        if (sortType === "rating") filteredData.sort((a, b) => b.rating - a.rating);
        else if (sortType === "popular") filteredData.sort((a, b) => b.popularity - a.popularity);
        else if (sortType === "title") filteredData.sort((a, b) => a.title.localeCompare(b.title));
        else if (sortType === "added") filteredData.sort((a, b) => b.added - a.added);


        render();
    }

    function clearFilters() {
        if (searchInput) searchInput.value = "";
        if (typeFilter) typeFilter.value = "";
        if (genreFilter) genreFilter.value = "";
        if (yearFilter) yearFilter.value = "";
        if (statusFilter) statusFilter.value = "";
        if (sortSelect) sortSelect.value = "default";
        
        applyFilters();
    }

    // ===============================
    //   RENDERIZADO HTML
    // ===============================
    function render() {
        if (!cardsContainer) return;

        const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
        if (currentPage > totalPages) currentPage = totalPages;

        const start = (currentPage - 1) * pageSize;
        const pageItems = filteredData.slice(start, start + pageSize);

        cardsContainer.innerHTML = pageItems
            .map(
                (item) => `
                <article class="anime-card" onclick="cargarPantallaEpisodios('${item.url}')">
                    <img src="${item.image}">
                    <div class="anime-card-body">
                        <span class="anime-type">${item.type}</span>
                        <h2 class="anime-title">${item.title}</h2>
                        <div class="anime-meta">${item.genre} · ${item.year} · ${item.status}</div>
                    </div>
                </article>
            `
            )
            .join("");

        if (resultsCount) resultsCount.textContent = `${filteredData.length} Resultados`;
        if (pageInfo) pageInfo.textContent = `Página ${currentPage}`;
    }

    // ===============================
    //   ASIGNACIÓN DE EVENTOS
    // ===============================
    if (searchBtn) searchBtn.addEventListener("click", applyFilters);
    if (filterBtn) filterBtn.addEventListener("click", applyFilters);
    if (clearBtn) clearBtn.addEventListener("click", clearFilters);
    if (sortSelect) sortSelect.addEventListener("change", applySorting);

    if (prevPageBtn) {
        prevPageBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                render();
            }
        });
    }

    if (nextPageBtn) {
        nextPageBtn.addEventListener("click", () => {
            const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
            if (currentPage < totalPages) {
                currentPage++;
                render();
            }
        });
    }

    // ===============================
    //   SISTEMA DE NOTICIAS
    // ===============================
    const noticias = [
      {
        media:"Noticias/series2.jpg",
        tipo:"imagen",
        titulo: "Evangelion | Monster | Gachiakuta | Tokyo Ghoul",
        texto:"Enfréntate a tus traumas en un EVA, descubre la verdadera identidad del monstruo, lucha con basura convertida en armas y sobrevive a las oscuras calles de Tokio..."
      },
      {
        media:"Noticias/cyberpunk2music.jpg",
        tipo:"imagen",
        titulo: "Cyberpunk: Edgerunners | 2 Canciones nuevas ya disponibles |",
        texto:"Siente el ritmo frenético de Night City «A Rusty Dream» y «Who's Ready for Tomorrow», redefiniendo el sonido de la distopía cyberpunk."
      },
      {
        media:"Noticias/ladygagamusic1.jpg",
        tipo:"imagen",
        titulo:"Lady Gaga: Grandes éxitos | 6 Canciones disponibles nuevas disponibles el 20/10/2026 |",
        texto:"El icono del pop regresa a las listas con una selección exclusiva que reúne canciones memorables como «Bad Romance», «Poker Face Bars» y «Judas», redefiniendo el sonido de su carrera musical."
      },
      {
        media:"Noticias/CP2-Trailer.mp4",
        tipo:"video",
        titulo:"Cyberpunk: Edgerunners 2 | Tráiler oficial |",
        texto:"El anime del año regresa con «Cyberpunk: Edgerunners 2», una historia nueva e independiente de 10 episodios basada en el mundo de «Cyberpunk 2077». Disponible el 20 de octubre"
      },
      {
        media:"Noticias/bleach.jpg",
        tipo:"imagen",
        titulo:"Bleach X ResftWorld",
        texto:"¿Shinigamis y huecos? No lo se..."
      },
      {
        media:"Noticias/musica3.jpg",
        tipo:"imagen",
        titulo:"NUEVAS 6 CANCIONES YA DISPONIBLES EN LA TIENDA",
        texto:"¡Siente el ritmo con las nuevas canciones!"
      },
      {
        media:"Noticias/RZseason4-trailer.mp4",
        tipo:"video",
        titulo:"SEASON 4 DE RE:ZERO YA DISPONIBLE",
        texto:"Cada miércoles un episodio nuevo"
      },
    ];

    let noticiaIndex = 0;
    const noticiaActual = document.getElementById("noticiaActual");
    const noticiaGrande = document.getElementById("noticiaGrande");
    const tituloNoticia = document.getElementById("tituloNoticia");
    const textoNoticia = document.getElementById("textoNoticia");

    function mostrarNoticiaPreview() {
        if (!noticiaActual) return;
        const noticia = noticias[noticiaIndex];

        if (noticia.tipo === "video") {
            noticiaActual.innerHTML = `
                <video autoplay muted loop playsinline>
                    <source src="${noticia.media}" type="video/mp4">
                </video>
            `;
        } else {
            noticiaActual.innerHTML = `<img src="${noticia.media}">`;
        }
    }

    const intervaloNoticias = setInterval(() => {
        if (!noticiaActual) {
            clearInterval(intervaloNoticias);
            return;
        }
        noticiaIndex = (noticiaIndex + 1) % noticias.length;
        mostrarNoticiaPreview();
    }, 4000);

    mostrarNoticiaPreview();

    function actualizarModal() {
        if (!noticiaGrande) return;
        const noticia = noticias[noticiaIndex];

        if (noticia.tipo === "video") {
            noticiaGrande.innerHTML = `
                <video controls autoplay>
                    <source src="${noticia.media}" type="video/mp4">
                </video>
            `;
        } else {
            noticiaGrande.innerHTML = `<img src="${noticia.media}">`;
        }

        if (tituloNoticia) tituloNoticia.textContent = noticia.titulo;
        if (textoNoticia) textoNoticia.textContent = noticia.texto;
    }

    const noticiasBox = document.getElementById("noticiasBox");
    if (noticiasBox) {
        noticiasBox.onclick = () => {
            actualizarModal();
            const modal = document.getElementById("noticiasModal");
            if (modal) modal.style.display = "flex";
        };
    }

    const cerrarNoticias = document.getElementById("cerrarNoticias");
    if (cerrarNoticias) {
        cerrarNoticias.onclick = () => {
            const modal = document.getElementById("noticiasModal");
            if (modal) {
                modal.style.display = "none";
                const videos = modal.querySelectorAll("video");
                videos.forEach(video => {
                    video.pause();
                    video.currentTime = 0;
                });
            }
        };
    }

    const noticiaSiguiente = document.getElementById("noticiaSiguiente");
    if (noticiaSiguiente) {
        noticiaSiguiente.onclick = () => {
            noticiaIndex = (noticiaIndex + 1) % noticias.length;
            actualizarModal();
        };
    }

    const noticiaAnterior = document.getElementById("noticiaAnterior");
    if (noticiaAnterior) {
        noticiaAnterior.onclick = () => {
            noticiaIndex = (noticiaIndex - 1 + noticias.length) % noticias.length;
            actualizarModal();
        };
    }

    // CARGA INICIAL DE DATOS FILTRADOS
    applyFilters();
}
