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
