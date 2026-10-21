// ===============================
// SISTEMA DE XP Y NIVELES
// ===============================

let playerXP = 0;
const XP_PER_LEVEL = 80000;

function getPlayerLevel() {
    return Math.floor(playerXP / XP_PER_LEVEL);
}

// ===============================
// COSMÉTICOS POR PERSONAJE (10 CADA UNO)
// ===============================

const bpShowcase = [
    {
        id: "iceking",
        cosmetics: [
            { name: "Ice King (Skin)", video: "Imagenes/battlepass/iceking-full.mp4" },
            { name: "Exalted Mantle (Mochila)", video: "Imagenes/battlepass/ExaltedMantle.mp4" },
            { name: "Frostmare Chariot (Ala Delta)", video: "Imagenes/battlepass/FrostmareChariot.mp4" },
            { name: "ResftCoin (Moneda)", image: "Imagenes/battlepass/rw-coin.png" },
            { name: "Icy Arrival (Estela de caida)", video: "Imagenes/battlepass/IcyArrival.mp4" },
            { name: "Icebound Wrap", video: "Videos/battlepass/iceking_wrap.mp4" },
            { name: "Ice King's Frostwalkers (Zapatos)", video: "Imagenes/battlepass/IceKing'sFrostwalkers.mp4" },
            { name: "ResftCoin (Moneda)", image: "Imagenes/battlepass/rw-coin.png" },
            { name: "Ice Prince", video: "Imagenes/battlepass/IcePrince.mp4" },
            { name: "Ice King Loading Screen", image: "Imagenes/mydressupdarling.png" }
        ]
    },

    {
        id: "hooded",
        cosmetics: [
            { name: "Hooded Warrior (Skin)", video: "Videos/battlepass/hooded.mp4" },
            { name: "Silent Edge (Pickaxe)", video: "Videos/battlepass/hooded_pickaxe.mp4" },
            { name: "Shadow Cloak (Backbling)", video: "Videos/battlepass/hooded_backbling.mp4" },
            { name: "Nightfall Wings (Glider)", video: "Videos/battlepass/hooded_glider.mp4" },
            { name: "Shadow Step (Emote)", video: "Videos/battlepass/hooded_emote.mp4" },
            { name: "Darksteel Wrap", video: "Videos/battlepass/hooded_wrap.mp4" },
            { name: "Smoke Trail (Contrail)", video: "Videos/battlepass/hooded_contrail.mp4" },
            { name: "Cloaked Mark (Banner)", image: "Imagenes/spyxfamily.jpg" },
            { name: "Shadow Rune (Spray)", image: "Imagenes/takopi.jpg" },
            { name: "Hooded Loading Screen", image: "Imagenes/mydressupdarling.png" }
        ]
    }
];

// ===============================
// VARIABLES DEL VISOR
// ===============================

let currentCharacter = null;
let currentCosmeticIndex = 0;
let videoFrame = null; // <- para cortar el render del video anterior

// ===============================
// CARGA DEL BATTLEPASS
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const bpBtn = document.getElementById("battlepassBtn");
    const app = document.getElementById("app");

    if (bpBtn) {
        bpBtn.addEventListener("click", () => {
            cargarPaseDeBatalla();
        });
    }

    function cargarPaseDeBatalla() {
        app.innerHTML = `
            <section id="battlepass" style="margin-top:120px; padding:20px;">
                <div class="bp-header">
                    <h1>BATTLE PASS — CHAPTER 7 SEASON 2</h1>
                    <div class="bp-level-box" id="bpLevelBox">LVL 0</div>
                </div>

                <div class="bp-track">
                    ${bpShowcase.map(r => `
                        <div class="bp-character" data-id="${r.id}">
                            <img src="Imagenes/battlepass/${r.id}.png">
                            <div class="bp-lock"></div>
                        </div>
                    `).join("")}
                </div>

                <div id="bpModal" class="bp-modal hidden">
                    <div class="bp-modal-content">

                        <button class="bp-close">X</button>

                        <div class="bp-arrows">
                            <div id="bpPrev" class="bp-arrow">◀</div>
                            <div id="bpNext" class="bp-arrow">▶</div>
                        </div>

                        <canvas id="bpCanvas"></canvas>

                        <h1 id="bpTitle"></h1>
                        <div id="bpCounter" class="bp-counter"></div>

                        <video id="bpModalVideo" autoplay loop muted playsinline style="display:none;"></video>

                    </div>
                </div>
            </section>
        `;

        activarEventosBattlePass();
        actualizarNivelUI();
    }

    function actualizarNivelUI() {
        const levelBox = document.getElementById("bpLevelBox");
        if (levelBox) {
            levelBox.textContent = "LVL " + getPlayerLevel();
        }
    }

    // ===============================
    // MOSTRAR COSMÉTICO
    // ===============================

    function mostrarCosmetico() {
        const data = currentCharacter.cosmetics[currentCosmeticIndex];

        const video = document.getElementById("bpModalVideo");
        const canvas = document.getElementById("bpCanvas");
        const ctx = canvas.getContext("2d");

        document.getElementById("bpTitle").textContent = data.name;
        document.getElementById("bpCounter").textContent =
            `${currentCosmeticIndex + 1} / ${currentCharacter.cosmetics.length}`;

        // cortar render anterior si lo había
        if (videoFrame) {
            cancelAnimationFrame(videoFrame);
            videoFrame = null;
        }

        // ===============================
        // SI ES VIDEO
        // ===============================
        if (data.video) {
            video.style.display = "block";
            video.src = data.video;
            video.load();
            video.play();

            setTimeout(() => {

                const modal = document.querySelector(".bp-modal-content");

                canvas.width = modal.clientWidth;
                canvas.height = modal.clientHeight;

                function render() {
                    if (!video.paused && !video.ended) {

                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                        const cropHeight = video.videoHeight * 0.70;

                        let scale = Math.min(
                            canvas.width / video.videoWidth,
                            canvas.height / cropHeight
                        );

                        let x = (canvas.width / 2) - (video.videoWidth * scale / 2);
                        let y = (canvas.height / 2) - (cropHeight * scale / 2);

                        ctx.drawImage(
                            video,
                            0, 0,
                            video.videoWidth, cropHeight,
                            x, y,
                            video.videoWidth * scale,
                            cropHeight * scale
                        );

                        let frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        let d = frame.data;

                        for (let i = 0; i < d.length; i += 4) {
                            let r = d[i];
                            let g = d[i + 1];
                            let b = d[i + 2];

                            if (g > 120 && r < 100 && b < 100) {
                                d[i + 3] = 0;
                            }
                        }

                        ctx.putImageData(frame, 0, 0);
                        videoFrame = requestAnimationFrame(render);
                    }
                }

                render();
            }, 80);
        }

        // ===============================
        // SI ES IMAGEN
        // ===============================
        else if (data.image) {

            video.pause();
            video.style.display = "none";

            const img = new Image();
            img.src = data.image;

            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
            };
        }
    }

    // ===============================
    // ACTIVAR FLECHAS
    // ===============================

    function activarNavegacion() {
        document.getElementById("bpPrev").onclick = () => {
            currentCosmeticIndex--;
            if (currentCosmeticIndex < 0)
                currentCosmeticIndex = currentCharacter.cosmetics.length - 1;
            mostrarCosmetico();
        };

        document.getElementById("bpNext").onclick = () => {
            currentCosmeticIndex++;
            if (currentCosmeticIndex >= currentCharacter.cosmetics.length)
                currentCosmeticIndex = 0;
            mostrarCosmetico();
        };
    }

    // ===============================
    // EVENTOS DEL BATTLEPASS
    // ===============================

    function activarEventosBattlePass() {
        document.querySelectorAll(".bp-character").forEach(card => {
            card.addEventListener("click", () => {

                const id = card.dataset.id;
                currentCharacter = bpShowcase.find(x => x.id === id);
                currentCosmeticIndex = 0;

                document.getElementById("bpModal").classList.remove("hidden");

                mostrarCosmetico();
                activarNavegacion();
            });
        });

        document.addEventListener("click", e => {
            if (e.target.classList.contains("bp-close")) {
                document.getElementById("bpModal").classList.add("hidden");
                const video = document.getElementById("bpModalVideo");
                video.pause();
                if (videoFrame) {
                    cancelAnimationFrame(videoFrame);
                    videoFrame = null;
                }
            }
        });
    }

});
