// ==========================================================================
// 1. VARIABLES GLOBALES Y CONTROL DE LA API DE YOUTUBE (CORREGIDO)
// ==========================================================================
let ytPlayer = null;      
let genoYtPlayer = null;  

// Esta función la ejecuta automáticamente YouTube al descargar su librería externa
function onYouTubeIframeAPIReady() {
    // Forzamos a la API a esperar a que el DOM y el núcleo de YouTube estén 100% listos
    YT.ready(function() {
        // Inicialización del Reproductor 1: Tráiler/Evento ("ResftWeen")
        const eventEl = document.getElementById('eventVideoPlayer');
        if (eventEl) {
            ytPlayer = new YT.Player('eventVideoPlayer', {
                height: '100%',
                width: '100%',
                videoId: 'dQw4w9WgXcQ', 
                playerVars: {
                    'autoplay': 0,
                    'controls': 1,
                    'rel': 0,
                    'modestbranding': 1
                }
            });
        }

        // Inicialización del Reproductor 2: Efecto Glitch de fondo negro ("geno")
        const genoEl = document.getElementById('genoYoutubePlayer');
        if (genoEl) {
            genoYtPlayer = new YT.Player('genoYoutubePlayer', {
                height: '100%',
                width: '100%',
                videoId: 'yZaJUkosJ9A', 
                playerVars: {
                    'autoplay': 0,
                    'controls': 0,       // Escondemos controles para simular un hackeo real
                    'rel': 0,
                    'disablekb': 1,      
                    'modestbranding': 1,
                    'mute': 1            // Silenciado obligatorio para burlar la protección del navegador
                }
            });
        }
    });
}

// Inyección dinámica de la librería asíncrona de Iframe API de YouTube
if (!document.querySelector('script[src="https://youtube.com"]')) {
    const tag = document.createElement('script');
    tag.src = "https://youtube.com";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
        document.head.appendChild(tag);
    }
}

// ==========================================================================
// 2. SPA: CARGAR PANTALLAS
// ==========================================================================
// ==========================================================================
// 2. SPA: CARGAR PANTALLAS (ACTUALIZADO PARA MISIONES)
// ==========================================================================
function cargarPantalla(nombre) {
    fetch(`pantallas/${nombre}.html`)
        .then(r => r.text())
        .then(html => {
            document.getElementById("app").innerHTML = html;

            if (nombre === "catalogo") {
                if (typeof cargarCatalogoJS === "function") cargarCatalogoJS();
            }
            if (nombre === "tienda") {
                if (typeof cargarTiendaJS === "function") cargarTiendaJS();
            }
            if (nombre === "perfil") {
                if (typeof cargarPerfilJS === "function") cargarPerfilJS();
            }
            if (nombre === "tienda-items") {
                cargarTiendaItemsJS();
            }
            
            // 🔥 CONTROL DE ACCESO A MISIONES
            if (nombre === "misiones" || nombre === "perfil") {
                // Verificar si el script de misiones ya existe en la página
                if (!document.querySelector('script[src="misiones.js"]')) {
                    const scriptMisiones = document.createElement("script");
                    scriptMisiones.src = "misiones.js";
                    scriptMisiones.onload = () => {
                        // Una vez cargado el archivo JS, pintamos las misiones en pantalla
                        if (typeof mostrarMisiones === "function") mostrarMisiones();
                    };
                    document.body.appendChild(scriptMisiones);
                } else {
                    // Si el script ya existía, simplemente ejecutamos la función
                    if (typeof mostrarMisiones === "function") mostrarMisiones();
                }
            }
        })
        .catch(err => console.error("ERROR cargando pantalla:", err));
}

// ==========================================================================
// 3. CARGAR EPISODIOS
// ==========================================================================
function cargarPantallaEpisodios(url) {
    fetch(url)
        .then(r => r.text())
        .then(html => {
            document.getElementById("app").innerHTML = html;
        })
        .catch(err => console.error("ERROR cargando episodios:", err));
}

// ==========================================================================
// 4. CARGA DE JS DE TIENDA DE ÍTEMS
// ==========================================================================
function cargarTiendaItemsJS() {
    const script = document.createElement("script");
    script.src = "tienda-items.js";
    document.body.appendChild(script);
}

// ==========================================================================
// 5. REPRODUCTOR GLOBAL DE MÚSICA
// ==========================================================================
const player = document.getElementById("musicPlayer");
const musicControlBtn = document.getElementById("musicControlBtn");

function playSong(file) {
    if (player) {
        player.src = file;
        player.play();
    }
}

if (musicControlBtn && player) {
    musicControlBtn.addEventListener("click", () => {
        if (player.paused) {
            player.play();
            musicControlBtn.textContent = "⏸ Pausar música";
        } else {
            player.pause();
            musicControlBtn.textContent = "▶ Reanudar música";
        }
    });
}

// ==========================================================================
// 6. EVENTOS DE INTERFAZ Y MANEJO DE MODALES
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {

    // --- Inyección Automática Segura del Icono de Misiones ---
    if (typeof inyectarIconoMisionesBarraSuperior === "function") {
        inyectarIconoMisionesBarraSuperior();
    }

    // --- Botones de Navegación del Catálogo SPA ---
    const itemsBtn = document.getElementById("itemsStoreBtn");
    if (itemsBtn) {
        itemsBtn.addEventListener("click", () => {
            cargarPantalla("tienda-items");
        });
    }

    const storeBtn = document.getElementById("storeBtn");
    if (storeBtn) {
        storeBtn.addEventListener("click", () => {
            cargarPantalla("tienda");
        });
    }

    const avatar = document.getElementById("avatarUsuario");
    if (avatar) {
        avatar.addEventListener("click", () => {
            cargarPantalla("perfil");
        });
        
        // Cargar foto guardada en el avatar si existe
        const fotoGuardada = localStorage.getItem("fotoPerfil");
        if (fotoGuardada) {
            avatar.src = fotoGuardada;
        }
    }

    const homeBtn = document.getElementById("homeBtn");
    if (homeBtn) {
        homeBtn.addEventListener("click", () => {
            cargarPantalla("catalogo");
        });
    }

    // 🔥 EVENTO PARA EL BOTÓN DE MISIONES ARRIBA A LA DERECHA
    const misionesBtn = document.getElementById("btn-misiones-nav");
    if (misionesBtn) {
        misionesBtn.addEventListener("click", () => {
            cargarPantalla("misiones");
        });
    }

    const iconos = document.querySelectorAll('.icono');
    iconos.forEach(icono => {
        icono.addEventListener('click', () => {
            iconos.forEach(i => i.classList.remove('active'));
            icono.classList.add('active');
        });
    });
    // ==========================================================================
    // CONTROLADORES DE INTERFAZ DEL MENÚ SOCIAL (CORRECCIÓN INTEGRAL)
    // ==========================================================================
    const socialMenuBtn = document.getElementById("socialMenuBtn");
    const socialSidebarModal = document.getElementById("socialSidebarModal");
    const closeSocialSidebarBtn = document.getElementById("closeSocialSidebarBtn");
    const socialSidebarOwnAvatar = document.getElementById("socialSidebarOwnAvatar");

    // Abrir el menú social modificando directamente la propiedad inline
    if (socialMenuBtn && socialSidebarModal) {
        socialMenuBtn.addEventListener("click", () => {
            socialSidebarModal.style.setProperty("display", "block", "important");
            
            // Sincronizar el avatar local del panel con el del usuario
            const fotoGuardada = localStorage.getItem("fotoPerfil");
            if (fotoGuardada && socialSidebarOwnAvatar) {
                socialSidebarOwnAvatar.src = fotoGuardada;
            }
        });
    }

    // Ocultar de nuevo el menú social usando inline css (Botón X)
    if (closeSocialSidebarBtn && socialSidebarModal) {
        closeSocialSidebarBtn.addEventListener("click", () => {
            socialSidebarModal.style.setProperty("display", "none", "important");
        });
    }

    // Ocultar al hacer clic en el fondo exterior difuminado
    if (socialSidebarModal) {
        socialSidebarModal.addEventListener("click", (e) => {
            if (e.target === socialSidebarModal) {
                socialSidebarModal.style.setProperty("display", "none", "important");
            }
        });
    }


    // --- Selectores del Panel de Códigos y Eventos ---
    const codesPanel = document.getElementById("codesPanel");
    const openBtn = document.getElementById("openCodesPanelBtn");
    const closeBtn = document.getElementById("closeCodesPanelBtn");
    const codeInput = document.getElementById("codeInput");
    const codeMessage = document.getElementById("codeMessage");
    
    const videoModal = document.getElementById("videoEventModal");
    const closeVideoBtn = document.getElementById("closeVideoEventBtn");

    // Abrir Panel de Códigos
    if (openBtn && codesPanel) {
        openBtn.addEventListener("click", () => {
            codesPanel.style.setProperty("display", "flex", "important");
            codesPanel.classList.add("active");
            openBtn.setAttribute("aria-expanded", "true");
            if (codeInput) {
                codeInput.value = "";
                codeInput.focus();
            }
            if (codeMessage) {
                codeMessage.textContent = "";
                codeMessage.className = "code-message";
            }
        });
    }

    // Cerrar Panel de Códigos
    const closeModal = () => {
        if (codesPanel) {
            codesPanel.style.setProperty("display", "none", "important");
            codesPanel.classList.remove("active");
        }
        if (openBtn) {
            openBtn.setAttribute("aria-expanded", "false");
        }
    };

    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    // Procesar y Validar Códigos del Sistema (Botón Enviar)
    const redeemBtn = document.getElementById("redeemCodeBtn");
    if (redeemBtn) {
        redeemBtn.addEventListener("click", () => {
            if (!codeInput) return;
            const codeValue = codeInput.value.trim();

            if (codeValue === "") {
                if (codeMessage) {
                    codeMessage.className = "code-message error";
                    codeMessage.textContent = "Error: El campo de código está vacío.";
                }
                return;
            }

            // [SISTEMA] CÓDIGO 1: "ResftWeen" (VIDEO EVENTO TRAILER YOUTUBE)
            if (codeValue === "ResftWeen") {
                if (codeMessage) {
                    codeMessage.className = "code-message success";
                    codeMessage.textContent = "¡Código de sala aceptado! Iniciando transmisión...";
                }

                setTimeout(() => {
                    closeModal();

                    // Pausar música global de fondo para escuchar el video limpiamente
                    if (player && !player.paused) {
                        player.pause();
                        if (musicControlBtn) musicControlBtn.textContent = "▶ Reanudar música";
                    }

                    // Lanzar ventana de cine y reproducir video de YouTube
                    if (videoModal) {
                        videoModal.classList.add("active");
                        videoModal.setAttribute("aria-hidden", "false");
                        
                        if (typeof ytPlayer !== 'undefined' && ytPlayer && typeof ytPlayer.playVideo === 'function') {
                            ytPlayer.seekTo(0);
                            ytPlayer.playVideo();
                        }
                        if (typeof ytPlayer !== 'undefined' && ytPlayer && typeof ytPlayer.playVideo === 'function') {
                            ytPlayer.seekTo(0);
                            ytPlayer.playVideo();
                        }
                    }
                }, 1000);

            } 
            // [SISTEMA] CÓDIGO 2: "geno" (SINCRONIZADO AL REPRODUCTOR HTML + 5 ETAPAS PROGRESIVAS)
            else if (codeValue === "geno") {
                if (codeMessage) {
                    codeMessage.className = "code-message success";
                    codeMessage.textContent = "SISTEMA COMPROMETIDO: Ejecutando geno.exe...";
                }

                setTimeout(() => {
                    closeModal(); // Cierra la terminal lila morada

                    // 1. Pausar música ambiental de fondo
                    if (player && !player.paused) {
                        player.pause();
                        if (musicControlBtn) musicControlBtn.textContent = "▶ Reanudar música";
                    }

                    // 2. Controlar el reproductor nativo del HTML
                    const genoAudio = document.getElementById("genoAudioPlayer");
                    
                    if (genoAudio) {
                        genoAudio.currentTime = 0; // Reinicia el audio desde el principio
                        
                        // OBLIGATORIO: Forzamos la carga para asegurarnos de capturar la duración exacta del .mp3
                        genoAudio.load();
                        
                        // Una vez que el navegador lee el archivo y sabe cuánto dura, arranca el evento sincronizado
                        genoAudio.addEventListener('loadedmetadata', function iniciarSecuenciaSincronizada() {
                            // Removemos el detector para que no se duplique en futuros canjes
                            genoAudio.removeEventListener('loadedmetadata', iniciarSecuenciaSincronizada);
                            
                            const duracionTotalMp3 = genoAudio.duration * 1000; // Pasamos los segundos totales a milisegundos
                            const duracionPorEtapa = duracionTotalMp3 / 5;      // Dividimos el audio en 5 fases idénticas

                            // Arrancamos el sonido del hackeo
                            genoAudio.play().catch(err => console.error("Error al reproducir audio de geno:", err));

                            // 3. Activar el overlay gráfico analógico CRT
                            const glitchOverlay = document.getElementById("genoGlitchOverlay");
                            if (glitchOverlay) {
                                glitchOverlay.classList.add("effect-active");
                                glitchOverlay.setAttribute("aria-hidden", "false");
                            }

                            // === SECUENCIA CRONOMETRADA DE CAOS PROGRESIVO ===
                            
                            // ETAPA 1 (0% del tiempo): Inicio sutil
                            document.body.classList.add("web-glitch-step-1");

                            // ETAPA 2 (20% del tiempo): Incremento medio
                            setTimeout(() => {
                                document.body.classList.remove("web-glitch-step-1");
                                document.body.classList.add("web-glitch-step-2");
                            }, duracionPorEtapa);

                            // ETAPA 3 (40% del tiempo): Distorsión severa
                            setTimeout(() => {
                                document.body.classList.remove("web-glitch-step-2");
                                document.body.classList.add("web-glitch-step-3");
                            }, duracionPorEtapa * 2);

                            // ETAPA 4 (60% del tiempo): Caos crítico
                            setTimeout(() => {
                                document.body.classList.remove("web-glitch-step-3");
                                document.body.classList.add("web-glitch-step-4");
                            }, duracionPorEtapa * 3);

                            // ETAPA 5 (80% del tiempo): ¡COLAPSO Y CAOS APOCALÍPTICO MÁXIMO!
                            setTimeout(() => {
                                document.body.classList.remove("web-glitch-step-4");
                                document.body.classList.add("web-glitch-step-5");
                            }, duracionPorEtapa * 4);

                            // TERMINA EL AUDIO (100% del tiempo): Apagar todo y pasar a pantalla negra por 5 segundos
                            setTimeout(() => {
                                // Limpieza radical de todas las fases aplicadas en el body de la web
                                document.body.classList.remove("web-glitch-step-1", "web-glitch-step-2", "web-glitch-step-3", "web-glitch-step-4", "web-glitch-step-5");
                                
                                if (glitchOverlay) {
                                    glitchOverlay.classList.remove("effect-active");
                                    glitchOverlay.classList.add("blackout-active"); // Pantallazo negro instantáneo
                                }
                                
                                genoAudio.pause(); // Cierre de seguridad del track

                                // TRAS 5 SEGUNDOS DE OSCURIDAD: Restaurar la normalidad de tu catálogo de animes
                                setTimeout(() => {
                                    if (glitchOverlay) {
                                        glitchOverlay.classList.remove("blackout-active");
                                        glitchOverlay.setAttribute("aria-hidden", "true");
                                    }

                                    // Devolvemos la música ambiental normal a tu página
                                    if (player) {
                                        player.play();
                                        if (musicControlBtn) musicControlBtn.textContent = "⏸ Pausar música";
                                    }
                                }, 5000); // Duración fija de la pantalla negra

                            }, duracionTotalMp3);
                        });
                    }
                }, 1000);
            }
            // [SISTEMA] CÓDIGO 3: "override" (DESBLOQUEAR RECOMPENSA Y GUARDAR EN TAQUILLA DE MÚSICA)
            else if (codeValue === "override") {
                if (codeMessage) {
                    codeMessage.className = "code-message success";
                    codeMessage.textContent = "¡CÓDIGO DE DESBLOQUEO ACEPTADO! Obteniendo recompensa...";
                }

                setTimeout(() => {
                    closeModal(); // Cierra el panel de administración morado

                    // Desplegamos el panel azul tridimensional de recompensas estilo Fortnite
                    const rewardModal = document.getElementById("rewardModal");
                    if (rewardModal) {
                        rewardModal.classList.add("active");
                        rewardModal.setAttribute("aria-hidden", "false");
                    }

                    // FUNCIÓN DE PERSISTENCIA: Registra la canción en la taquilla de música comprada
                    const procesarPremioTaquilla = (equiparMusicaInmediata) => {
                        if (rewardModal) {
                            rewardModal.classList.remove("active");
                            rewardModal.setAttribute("aria-hidden", "true");
                        }

                        // === CONFIGURACIÓN DEL ÍNDICE DE TU ARRAY 'songs' ===
                        const indiceCancionOverride = 7; 

                        // Extraemos los índices comprados actuales del localStorage
                        let ownedSongs = JSON.parse(localStorage.getItem("ownedSongs")) || [];

                        // Inyectamos de forma permanente a la colección del usuario en su perfil
                        if (!ownedSongs.includes(indiceCancionOverride)) {
                            ownedSongs.push(indiceCancionOverride);
                            localStorage.setItem("ownedSongs", JSON.stringify(ownedSongs));
                        }

                        // Configuración del audio de fondo del reproductor de la web
                        if (player) {
                            player.src = "Backend/override-music.mp3";
                            
                            if (equiparMusicaInmediata) {
                                player.play();
                                if (musicControlBtn) musicControlBtn.textContent = "⏸ Pausar música";
                            } else {
                                player.pause();
                                if (musicControlBtn) musicControlBtn.textContent = "▶ Reanudar música";
                            }
                        }

                        // Actualizado visual en vivo: si el usuario está mirando su taquilla, se refresca
                        if (typeof mostrarCanciones === "function" && document.getElementById("perfilContenido")) {
                            const tituloSeccion = document.querySelector("#perfilContenido h2");
                            if (tituloSeccion && tituloSeccion.textContent === "Música comprada") {
                                mostrarCanciones(); 
                            }
                        }
                    };

                    // ENLACE INTERACTIVO: Botón Equipar
                    const equipBtn = document.getElementById("rewardEquipBtn");
                    if (equipBtn) {
                        const newEquipBtn = equipBtn.cloneNode(true);
                        equipBtn.parentNode.replaceChild(newEquipBtn, equipBtn);
                        newEquipBtn.addEventListener("click", () => {
                            procesarPremioTaquilla(true); 
                        });
                    }

                    // ENLACE INTERACTIVO: Botón Recoger Todo
                    const collectBtn = document.getElementById("rewardCollectBtn");
                    if (collectBtn) {
                        const newCollectBtn = collectBtn.cloneNode(true);
                        collectBtn.parentNode.replaceChild(newCollectBtn, collectBtn);
                        newCollectBtn.addEventListener("click", () => {
                            procesarPremioTaquilla(false); 
                        });
                    }

                }, 1000);
            }
            // CUALQUIER OTRO CÓDIGO INTERPRETADO COMO EQUIVOCADO
            else {
                if (codeMessage) {
                    codeMessage.className = "code-message error";
                    codeMessage.textContent = "Código de sala inválido o expirado.";
                }
            }
        });
    }

    // Función para cerrar el Reproductor de Video Cinematográfico ("ResftWeen")
    const closeVideoModal = () => {
        if (videoModal) {
            if (typeof ytPlayer !== 'undefined' && ytPlayer && typeof ytPlayer.stopVideo === 'function') {
                ytPlayer.stopVideo();
            }
            videoModal.classList.remove("active");
            videoModal.setAttribute("aria-hidden", "true");
            
            // Reanudar la música de la web automáticamente al salir del cine
            if (player) {
                player.play();
                if (musicControlBtn) musicControlBtn.textContent = "⏸ Pausar música";
            }
        }
    };

    if (closeVideoBtn) {
        closeVideoBtn.addEventListener("click", closeVideoModal);
    }

    // Cerrar modales abiertos usando la tecla física ESC del teclado
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (videoModal && videoModal.classList.contains("active")) {
                closeVideoModal();
            } else if (codesPanel && codesPanel.classList.contains("active")) {
                closeModal();
            }
        }
    });
});

// ==========================================================================
// 7. INYECTAR ICONO DE MISIONES ARRIBA A LA DERECHA
// ==========================================================================
function inyectarIconoMisionesBarraSuperior() {
    const avatar = document.getElementById("avatarUsuario");
    
    // Si encontramos el avatar del usuario arriba a la derecha y el icono no ha sido creado ya
    if (avatar && !document.getElementById("btn-misiones-nav")) {
        const btnMisiones = document.createElement("div");
        btnMisiones.id = "btn-misiones-nav";
        btnMisiones.className = "misiones-nav-circle";
        btnMisiones.title = "Ver Misiones";
        btnMisiones.innerHTML = "🎯"; 
        
        // Acción al hacer clic: cambiar a la pestaña de perfil y renderizar el panel de misiones
        btnMisiones.onclick = () => {
            // 1. Cargamos el contenedor HTML del perfil por medio de tu SPA
            fetch(`pantallas/perfil.html`)
                .then(r => r.text())
                .then(html => {
                    document.getElementById("app").innerHTML = html;
                    
                    // 2. Si el archivo de lógica misiones.js está cargado, pintamos su interfaz en #perfilContenido
                    if (typeof mostrarMisiones === "function") {
                        mostrarMisiones();
                    } else {
                        console.warn("La función mostrarMisiones() no se encuentra definida en tu archivo misiones.js");
                    }
                })
                .catch(err => console.error("Error abriendo misiones desde barra superior:", err));
        };

        // Lo insertamos en la barra de navegación justo al lado izquierdo de tu avatar circular
        avatar.parentNode.insertBefore(btnMisiones, avatar);
    }
}
// ==========================================================================
// 9. LÓGICA DEL BUSCADOR DE AGREGAR AMIGOS (VENTANA SOCIAL)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const addFriendInput = document.getElementById("addFriendInput");
    const addFriendBtn = document.getElementById("addFriendBtn");
    // ==========================================================================
    // LISTA DE 10 AMIGOS FIJOS PARA EL MENÚ SOCIAL (ESTILO FORTNITE)
    // ==========================================================================
    const friendsContainer = document.getElementById("socialFriendsContainer");

    if (friendsContainer) {
        // Definición de datos 100% fijos (Nombres, Avatares locales y Estados permanentes)
        const listaAmigosFijos = [
            {
                nombre: "Kaneki_King_37",
                foto: "Imagenes/fotos-de-perfil/aot/eren2.png",
                estado: "En el catálogo"
            },
            {
                nombre: "xX_SamaSasuke_Xx",
                foto: "Imagenes/fotos-de-perfil/spiderman/spider-gwen.png",
                estado: "Viendo Chainsaw Man"
            },
            {
                nombre: "RLX6535",
                foto: "Imagenes/fotos-de-perfil/spiderman/miles-morales.png",
                estado: "Viendo Jujutsu Kaisen"
            },
            {
                nombre: "Nefta_Hylian",
                foto: "Imagenes/fotos-de-perfil/chainsawman/power.jpg",
                estado: "En el catálogo"
            },
            {
                nombre: "BestiaN1",
                foto: "Imagenes/fotos-de-perfil/digitalcircus/jax.png",
                estado: "Viendo The Amazing Digital Circus"
            },
            {
                nombre: "Rebepro",
                foto: "Imagenes/fotos-de-perfil/arcane/Jinx.jpg",
                estado: "En el catálogo"
            },
            {
                nombre: "JinxFAN",
                foto: "Imagenes/fotos-de-perfil/arcane/Jinx.jpg",
                estado: "Viendo Arcane"
            },
            {
                nombre: "Shibuya_Outsider",
                foto: "Imagenes/fotos-de-perfil/chainsawman/reze.jpg",
                estado: "Viendo Attack on Titan"
            },
            {
                nombre: "SpeedMaster",
                foto: "Imagenes/fotos-de-perfil/demonslayer/zenitsu.png",
                estado: "Viendo Demon Slayer"
            },
            {
                nombre: "RockLider9832",
                foto: "Imagenes/fotos-de-perfil/demonslayer/muichirotokito.jpg",
                estado: "En el catálogo"
            }
        ];

        let htmlAmigos = "";

        // Construir la estructura visual fija
        listaAmigosFijos.forEach(amigo => {
            htmlAmigos += `
                <div class="social-list-item">
                    <img src="${amigo.foto}" class="item-avatar" alt="${amigo.nombre}">
                    <div class="item-info">
                        <p class="item-name">${amigo.nombre}</p>
                        <p class="item-subtext-blue" style="color: #00ff88 !important; font-size: 0.8rem; margin: 4px 0 0 0;">${amigo.estado}</p>
                    </div>
                </div>
            `;
        });

        // Inyectar el resultado en el contenedor de la barra lateral
        friendsContainer.innerHTML = htmlAmigos;
    }

    if (addFriendBtn && addFriendInput) {
        // Evento al hacer clic en el botón celeste "Agregar"
        addFriendBtn.addEventListener("click", () => {
            const nombreUsuario = addFriendInput.value.trim();

            // Validación: Si el campo está vacío, detenemos la ejecución
            if (nombreUsuario === "") {
                alert("Por favor, introduce un nombre de usuario válido para enviar la solicitud.");
                return;
            }

            // Simulación de envío con éxito (Estilo Fortnite)
            alert(`¡Solicitud de amistad enviada con éxito a: ${nombreUsuario}!`);
            
            // Limpiamos el cuadro de texto para dejarlo listo para la siguiente búsqueda
            addFriendInput.value = ""; 
        });

        // Evento para permitir el envío directo pulsando la tecla 'Enter' del teclado
        addFriendInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault(); // Evita que la página intente recargarse
                addFriendBtn.click(); // Ejecuta el clic del botón de arriba
            }
        });
    }
});
// ==========================================================================
// INTERCEPTOR GLOBAL PARA REPRODUCIR EPISODIOS EN SISTEMAS SPA (FETCH)
// ==========================================================================
document.addEventListener("click", (e) => {
    // 1. Detectar si el usuario pulsó en la tarjeta del Episodio 1
    const tarjeta = e.target.closest("#btnEpisodio1, [data-video]");
    
    if (tarjeta) {
        const rutaVideo = tarjeta.getAttribute("data-video");
        const modal = document.getElementById("animeVideoModal");
        const video = document.getElementById("animeVideoPlayer");
        const musica = document.getElementById("musicPlayer");

        if (modal && video && rutaVideo) {
            // Pausar música de fondo si existe y está sonando
            if (musica && !musica.paused) {
                musica.pause();
            }

            // Inyectar el mp4 y levantar el reproductor flotante al frente
            video.src = rutaVideo;
            modal.style.setProperty("display", "flex", "important");
            video.load();
            video.play().catch(err => console.log("Auto-play retenido:", err));
        }
    }

    // 2. Detectar si el usuario pulsa el botón de cerrar
    if (e.target.id === "closeAnimeVideoBtn" || e.target.closest("#closeAnimeVideoBtn")) {
        const modal = document.getElementById("animeVideoModal");
        const video = document.getElementById("animeVideoPlayer");

        if (modal && video) {
            video.pause();
            video.src = ""; // Vaciar buffer del archivo de la memoria del navegador
            modal.style.setProperty("display", "none", "important");
        }
    }
});

// ==========================================================================
// 8. CARGAR PANTALLA INICIAL AL ENTRAR A LA WEB
// ==========================================================================
cargarPantalla("catalogo");
