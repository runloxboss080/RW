// ==========================================
// BASE DE DATOS Y ESTADO DE LAS MISIONES
// ==========================================

const misionesIniciales = [
    {
        id: 1,
        titulo: "El Comienzo del Viaje",
        descripcion: "Personaliza tu identidad en ResftWorld cambiando tu foto de perfil.",
        recompensa: "100 EXP + 🪙 50 Monedas",
        progresoActual: 0,
        progresoTotal: 1,
        completada: false,
        reclamada: false,
        tipo: "foto_perfil",
        categoria: "historia" 
    },
    {
        id: 2,
        titulo: "Melómano Apasionado",
        descripcion: "Añade 3 canciones compradas a tu lista de favoritos.",
        recompensa: "💎 15 Gemas + 150 EXP",
        progresoActual: 0,
        progresoTotal: 3,
        completada: false,
        reclamada: false,
        tipo: "favoritos_musica",
        categoria: "historia" 
    },
    {
        id: 3,
        titulo: "Coleccionista de Ritmos",
        descripcion: "Crea una playlist personalizada en tu biblioteca de música.",
        recompensa: "250 EXP + 🪙 120 Monedas",
        progresoActual: 0,
        progresoTotal: 1,
        completada: false,
        reclamada: false,
        tipo: "crear_playlist",
        categoria: "semana" 
    }
];

// Cargar estado de almacenamiento o usar el inicial de manera correcta
let listaMisiones = JSON.parse(localStorage.getItem('resftworld_misiones')) || misionesIniciales;

// Variable global fija para la pestaña única
let categoriaActiva = "historia";

// Escuchar eventos globales al inicializar el script
document.addEventListener("DOMContentLoaded", () => {
    sincronizarProgresosEspeciales();
    
    const fotoGuardada = localStorage.getItem("fotoPerfil");
    if (fotoGuardada && fotoGuardada !== "Imagenes/perfil.png") {
        actualizarProgresoMision("foto_perfil", 1);
    }
    
    verificarNotificacionesMisiones();
    
    if (document.getElementById("contenedorMisiones") && categoriaActiva === "historia") {
        mostrarMisiones();
    }
});

// ==========================================
// RENDERIZAR INTERFAZ DINÁMICA DE HISTORIA
// ==========================================

function mostrarMisiones() {
    const contenedor = document.getElementById("contenedorMisiones");
    if (!contenedor) return;

    sincronizarProgresosEspeciales();

    const mision1 = listaMisiones.find(m => m.tipo === "foto_perfil");
    const mision2 = listaMisiones.find(m => m.tipo === "favoritos_musica");
    const mision3 = listaMisiones.find(m => m.tipo === "crear_playlist");

    let htmlContenido = "";

    // BLOQUE 1: WRIXEL
    if (mision1) {
        htmlContenido += `
            <div class="fn-bloque-mision">
                <h3 class="fn-bloque-titulo">WRIXEL (ZIGGY): MÁS MANOS A LA OBRA</h3>
                <p class="fn-bloque-progreso-texto">Completa misiones de Wrixel (Ziggy): ${mision1.reclamada ? '1' : '0'}/1</p>
                <div class="fn-rewards-row">
                    <div class="fn-reward-box ${mision1.completada ? 'active' : ''}">
                        <img src="Imagenes/fotos-de-perfil/aot/eren2.png">
                        ${mision1.completada ? '<span class="fn-reward-check">✓</span>' : ''}
                    </div>
                </div>
                ${generarTarjetaMisionFortnite(mision1)}
            </div>
        `;
    }

    // BLOQUE 2: GENO
    if (mision2 || mision3) {
        const totalReclamadasGeno = (mision2 && mision2.reclamada ? 1 : 0) + (mision3 && mision3.reclamada ? 1 : 0);
        
        htmlContenido += `
            <div class="fn-bloque-mision">
                <h3 class="fn-bloque-titulo">GENO: LA REALIDAD DEFINITIVA</h3>
                <p class="fn-bloque-progreso-texto">Completa misiones de Geno: ${totalReclamadasGeno}/2</p>
                <div class="fn-rewards-row">
                    <div class="fn-reward-box ${mision2 && mision2.completada ? 'active' : ''}">
                        <img src="Imagenes/favoritos_icon.png">
                        ${mision2 && mision2.completada ? '<span class="fn-reward-check">✓</span>' : ''}
                    </div>
                    <div class="fn-reward-box ${mision3 && mision3.completada ? 'active' : ''}">
                        <img src="Imagenes/spiderman/miles-morales.png">
                        ${mision3 && mision3.completada ? '<span class="fn-reward-check">✓</span>' : ''}
                    </div>
                </div>
                ${mision2 ? generarTarjetaMisionFortnite(mision2) : ''}
                ${mision3 ? generarTarjetaMisionFortnite(mision3) : ''}
            </div>
        `;
    }

    contenedor.innerHTML = htmlContenido;
}

function generarTarjetaMisionFortnite(mision) {
    if (!mision) return '';

    let previewIcon = "Imagenes/favoritos_icon.png";
    if (mision.tipo === "foto_perfil") previewIcon = "Imagenes/fotos-de-perfil/aot/eren2.png";
    if (mision.tipo === "crear_playlist") previewIcon = "Imagenes/spiderman/miles-morales.png";

    const esReclamable = mision.completada && !mision.reclamada;
    
    return `
        <div class="fn-mision-item ${mision.completada ? 'completada' : ''}">
            <div class="fn-mision-left-group">
                <div class="fn-mision-icon-square">
                    <img src="${previewIcon}">
                </div>
                <div class="fn-mision-details">
                    <span class="fn-mision-text">${mision.descripcion}</span>
                    <span class="fn-mision-subnum">${mision.progresoActual} / ${mision.progresoTotal}</span>
                    
                    ${esReclamable ? 
                        `<button class="btn-reclamar" style="margin-top: 8px; padding: 6px 14px; font-size: 0.85rem; width: auto;" onclick="reclamarRecompensaMision(${mision.id})">🎁 Reclamar Recompensa</button>` 
                        : `<span style="font-size: 0.85rem; color: #a0a0b5; margin-top: 4px; display: block;">${mision.reclamada ? 'Reclamado ✓' : 'En progreso...'}</span>`
                    }
                </div>
            </div>
            <div class="fn-mision-xp-box">
                <span class="fn-xp-title">XP</span>
                <span class="fn-xp-value">10 k</span>
            </div>
        </div>
    `;
}

// ==========================================================================
// FUNCIÓN PARA ALTERNAR ENTRE MISIONES Y PERSONAJES (CORREGIDA VISTAS)
// ==========================================================================
window.alternarVistaFortnite = function(vistaDestino, botonPresionado) {
    const boxMisiones = document.getElementById("vista-misiones-fortnite");
    const boxPersonajes = document.getElementById("vista-personajes-fortnite");
    
    if (!boxMisiones || !boxPersonajes) return;

    document.querySelectorAll(".fn-category-links button").forEach(btn => {
        btn.classList.remove("active");
    });

    if (botonPresionado) {
        botonPresionado.classList.add("active");
    }

    if (vistaDestino === "misiones") {
        boxMisiones.classList.remove("fn-hidden-view");
        boxPersonajes.classList.add("fn-hidden-view");
        categoriaActiva = "historia";
        mostrarMisiones();
    } else if (vistaDestino === "personajes") {
        boxMisiones.classList.add("fn-hidden-view");
        boxPersonajes.classList.remove("fn-hidden-view");
        categoriaActiva = "personajes"; 
    }
};

// ==========================================
// CONTROL DEL MODAL DE DIÁLOGOS CON RESPUESTAS INTERNAS
// ==========================================

window.abrirDialogoPersonaje = function(nombre, rutaImg, textoDialogo, opcionesArray) {
    const modal = document.getElementById("fnDialogoModal");
    const imgElement = document.getElementById("fnDialogoImg");
    const nombreElement = document.getElementById("fnDialogoNombre");
    const textoElement = document.getElementById("fnDialogoTexto");
    const opcionesContenedor = document.getElementById("fnDialogoOpciones");

    if (!modal || !imgElement || !textoElement || !opcionesContenedor) return;

    // 1. Asignar los datos del personaje al abrir
    imgElement.src = rutaImg;
    if (nombreElement) nombreElement.textContent = nombre;
    textoElement.textContent = textoDialogo;

    // 2. Inyectar las 3 opciones de respuesta iniciales
    opcionesContenedor.innerHTML = "";
    if (opcionesArray && opcionesArray.length > 0) {
        opcionesArray.forEach(opcionTexto => {
            const btn = document.createElement("button");
            btn.className = "fn-option-btn";
            btn.textContent = opcionTexto;
            
            // Al hacer clic, procesamos la respuesta interna sin alertas flotantes
            btn.onclick = (e) => {
                e.stopPropagation();
                procesarRespuestaPersonaje(nombre, opcionTexto);
            };
            
            opcionesContenedor.appendChild(btn);
        });
    }

    modal.style.setProperty("display", "flex", "important");
};

// 🔥 FUNCIÓN DE RESPUESTAS CORREGIDA (Estructura de llaves corregida)
function procesarRespuestaPersonaje(nombrePersonaje, opcionSeleccionada) {
    const textoElement = document.getElementById("fnDialogoTexto");
    const opcionesContenedor = document.getElementById("fnDialogoOpciones");
    
    if (!textoElement || !opcionesContenedor) return;

    // --- CONFIGURACIÓN MANUAL DE RESPUESTAS ---
    let respuestaModificada = "Entendido...";

    // Pasamos a minúsculas para evitar fallos de mayúsculas accidentales
    const nombreClean = nombrePersonaje.toLowerCase();

    // ==========================================
    // BLOQUE DE RESPUESTAS DE OSCAR
    // ==========================================
    if (nombreClean.includes("oscar")) {
        if (opcionSeleccionada === "Geno") {
            respuestaModificada = "Geno actualmente es el ser más peligroso, tiene a todas las realidades en su poder gracias al punto cero.";
        } else if (opcionSeleccionada === "Anastasia") {
            respuestaModificada = "Cuando me tenían encerrado en aquel sueño pude conocerla y la verdad me sorprendió, tanto así que ahora es una miembro oficial de los 7. Estoy orgulloso de ella.";
        } else if (opcionSeleccionada === "Futuro") {
            respuestaModificada = "¿Me preguntas sobre el futuro? La verdad creo que puede haber una posibilidad minúscula de que funcione... pero no creo que a los demás les guste la idea.";
        }
    } 
    // ==========================================
    // BLOQUE DE RESPUESTAS DE ANASTASIA (¡YA INDEPENDIENTE!)
    // ==========================================
    else if (nombreClean.includes("anastasia")) {
        if (opcionSeleccionada === "Visiones") {
            respuestaModificada = "Mejor no hablemos de eso...";
        } else if (opcionSeleccionada === "Oscar") {
            respuestaModificada = "Cuando lo conocí lo quería asesinar debido a una confusión, estaba perdida sin rumbo por múltiples realidades intentando encontrarme a mi misma y Oscar fue... Mi salvación.";
        } else if (opcionSeleccionada === "La Élite") {
            respuestaModificada = "Oscar me hablo de que está reclutando a mucha gente que el ve poderosa, ellos tienen una base organizada en alguna realidad, nunca los e visto pero hay algunos aquí, en está realidad, supongo que es por ¿Precaución?.";
        }
        
    }
    // ==========================================
    // BLOQUE DE RESPUESTAS DE ANDREA COMÚN (Cambio a comparación exacta)
    // ==========================================
    else if (nombreClean === "andrea" || nombreClean === "andrea-m") {
        if (opcionSeleccionada === "Los Siete") {
            respuestaModificada = 'Es dificil llamarlo "Los Siete" ya que la mitad de los miembros han ido cayendo poco a poco, pero creeme que los siete actuales son muy fuertes. Pero contra Geno... Sin duda esto es un gran desafío.';
        } else if (opcionSeleccionada === "Socio") {
            respuestaModificada = "Oscar, mi socio, El y yo ya nos conociamos en el pasado pero él... Estaba... Distante. Después el me contactó para pedirme ayuda y derrotar al Viajero Oscuro pero el plan fracaso.";
        } else if (opcionSeleccionada === "Pasado") {
            respuestaModificada = "¿Tienes dudas sobre mi pasado? Me parece raro pero la verdad mi pasado es un poco triste, Desde que inicié en PSJ nunca imaginé llegar a donde estamos ahora y muchas de las personas que conocí en aquel entonces ahora están en distintas realidades.";
        }
    }
    // ==========================================
    // BLOQUE DE RESPUESTAS DE SIERRA (¡YA INDEPENDIENTE!)
    // ==========================================
    else if (nombreClean.includes("sierra")) {
        if (opcionSeleccionada === "Oscar") {
            respuestaModificada = 'Cuando lo conocí era una persona más, no tenía nada, solo habilidades en pelea pero ahora es la persona más fuerte que conozco. Yo le inculqué una disciplina indestructible y él la uso a su favor.';
        } else if (opcionSeleccionada === "La Élite") {
            respuestaModificada = "Oscar y yo fundamos La Élite, El porque es facil de entender, queremos hacer posible todo lo que la Orden Imaginada no pudo, proteger el punto cero junto a todas las realidades existentes. Estamos tratando de mejorar a La Élite cada día.";
        } else if (opcionSeleccionada === "N1") {
            respuestaModificada = "Me metí al Número 1 para poder saber más acerca del punto cero y de la Orden Imaginada ya que era lo único que me importaba y Oscar fue la clave, desde el primer día los dos buscabamos lo mismo así que creamos a La Élite.";
        }
    }
    // ==========================================
    // BLOQUE DE RESPUESTAS DE NATALIA_ELITE (¡YA INDEPENDIENTE!)
    // ==========================================
    else if (nombreClean.includes("natalia_elite")) {
        if (opcionSeleccionada === "Sierra") {
            respuestaModificada = 'Sierra es mi pareja, lo conocí hace mucho en una noche lluviosa, es muy gracioso y tenemos muchas cosas en común aunque a veces es algo pesado.';
        } else if (opcionSeleccionada === "La Élite") {
            respuestaModificada = "Sierra me hablo sobre La Élite y me pareció buena idea colaborar pero con una condición y es que yo me encargaría de los heridos, pero igualemnte esoty entrenando por si algo pasase.";
        } else if (opcionSeleccionada === "Entrenos") {
            respuestaModificada = "Los entrenamientos no me gusta nada, te agota demasiado y más si son los entrenos de Sierra.";
        }
    }
    // ==========================================
    // BLOQUE DE RESPUESTAS DE ANDREA_ELITE
    // ==========================================
    else if (nombreClean === "andrea_elite") {
        if (opcionSeleccionada === "Sierra") {
            respuestaModificada = 'Él es mi hermano, fue la persona que más me cuido cuando era pequeña.';
        } else if (opcionSeleccionada === "La Élite") {
            respuestaModificada = "Mi hermano me insistió en que entrase en la Élite y acepté porque creo que se lo debía por cuidarme todos estos años.";
        } else if (opcionSeleccionada === "Entrenos") {
            respuestaModificada = "Los entrenos son divertidos cuando toca pierna todo lo demás me aburre.";
        }
    }
    // ==========================================
    // BLOQUE DE RESPUESTAS DE SERGIO_ELITE
    // ==========================================
    else if (nombreClean === "sergio_elite") {
        if (opcionSeleccionada === "Sierra") {
            respuestaModificada = 'Sierra y yo somos amigos desde hace mucho ya.';
        } else if (opcionSeleccionada === "La Élite") {
            respuestaModificada = "Sierra me invitó a unirme a la Élite pero yo solo acepte porque quería ser un heroe o algo así.";
        } else if (opcionSeleccionada === "Entrenos") {
            respuestaModificada = "Me gusta entrenar pero desde que me ascendieron a los entrenos  exteriores la verdad que no es lo mismo.";
        }
    }
    // ==========================================
    // BLOQUE DE RESPUESTAS DE SERGIO_ELITE
    // ==========================================
    else if (nombreClean === "alex") {
        if (opcionSeleccionada === "Oscar") {
            respuestaModificada = 'Él fue mi mejor amigo... Pero actualmente él ya no quiere saber nada de mí... Embuclado ¿tu alguna vez lo habías visto así de distante? Creo que está muy obsesionado con la supuesta Élite que se ha montado y sobretodo con Geno.';
        } else if (opcionSeleccionada === "Los Siete") {
            respuestaModificada = "Los siete actuales no son nada comparado con lo que una vez fuímos. Anastasia... Ella no es bienvenida en este grupo. Embuclado es facil de entender, para que álguien sea miembro oficial de los siete primero tiene que ser aceptado por cada uno de los integrantes pero al parecer a Oscar se le olvidó eso.";
        } else if (opcionSeleccionada === "Futuro") {
            respuestaModificada = 'Mi futuro no importa pero el futuro actual está en manos de Geno y solo queda esperar a que él logre conseguir su preciado "Mundo perfecto". Dudo que Oscar y sus esclavos puedan hacer algo al respecto.';
        }
    }
    // ==========================================
    // BLOQUE DE RESPUESTAS DE SERGIO_ELITE
    // ==========================================
    else if (nombreClean === "enol") {
        if (opcionSeleccionada === "Oscar") {
            respuestaModificada = "Es un falso y un traidor no se le puede confiar nada, le tengo aprecio porque vivimos muchas cosas juntos pero actualmente... Está perdido."
        } else if (opcionSeleccionada === "Los Siete") {
            respuestaModificada = "¿Todavía preguntas por Los Siete? la verdad que nuestros supuestos remplazos dejan mucho que desear, nose como se le pasó por la cabeza a Oscar que esa gente eran buenos candidatos, en fin, igualmente estoy creando un grupo igual o más de poderoso que los siete y provienen de distintas realidades. Oscar intentó aprovecharse de esa gente y convencerlos para que se unieran a La Élite pero no le funcionó.";
        } else if (opcionSeleccionada === "La Élite") {
            respuestaModificada = "Es basura no hay más, el día que Oscar me dejó verles no entendí el porque de mi remplazo ni el porque ellos deberían ser útiles para derrotar a Geno.";
        }
    }
    // ==========================================
    // BLOQUE DE RESPUESTAS DE SERGIO_ELITE
    // ==========================================
    else if (nombreClean === "sofia") {
        if (opcionSeleccionada === "Oscar") {
            respuestaModificada = "Es mi mejor amigo, me trata taaan bien y me siento muy tranquila a su lado."
        } else if (opcionSeleccionada === "Realidad") {
            respuestaModificada = "Soy de una realidad alterna a la tuya. Oscar nunca quiso venir a mi realidad dice que no puede porque tiene algo estropeado pero es mentira, igualmente estoy tranquila porque él me prometió que nos veremos algún día.";
        } else if (opcionSeleccionada === "Ayuda") {
            respuestaModificada = "Lo siento embuclado, no puedo ir a vuestra realidad, Oscar no me deja y aparte no sabría como ír hasta allí.";
        }
    }

    // 1. Cambiar el texto del cuadro gris por tu respuesta configurada
    textoElement.textContent = respuestaModificada;

    // 2. Limpiar las opciones viejas y poner el botón clásico de "Continuar" para cerrar
    opcionesContenedor.innerHTML = "";
    const btnContinuar = document.createElement("button");
    btnContinuar.className = "fn-option-btn";
    btnContinuar.textContent = "Continuar";
    btnContinuar.style.backgroundColor = "#ffffff";
    btnContinuar.style.color = "#111119";

    btnContinuar.onclick = (e) => {
        e.stopPropagation();
        const modal = document.getElementById("fnDialogoModal");
        if (modal) modal.style.setProperty("display", "none", "important");
    };

    opcionesContenedor.appendChild(btnContinuar);
}

window.cerrarDialogoPersonaje = function(event) {
    const modal = document.getElementById("fnDialogoModal");
    if (modal) {
        modal.style.setProperty("display", "none", "important");
    }
};

// Función para buscar las tarjetas e inyectar el evento click de forma manual y segura
function inicializarClicsPersonajesFortnite() {
    const tarjetas = document.querySelectorAll(".fn-char-card[data-character]");
    
    tarjetas.forEach(tarjeta => {
        tarjeta.removeAttribute("onclick");
        
        // Clonar el nodo para asegurar que no se dupliquen listeners viejos del interval
        const nuevaTarjeta = tarjeta.cloneNode(true);
        tarjeta.parentNode.replaceChild(nuevaTarjeta, tarjeta);
        
        nuevaTarjeta.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation(); 
            
            const tipoPersonaje = this.getAttribute("data-character").toLowerCase(); // Pasado a minúsculas
            const imagenRuta = this.getAttribute("data-img");

            if (tipoPersonaje === "Oscar" || tipoPersonaje === "oscar") {
                window.abrirDialogoPersonaje(
                    'Oscar', 
                    imagenRuta, 
                    'Embuclado... Siempre te he dado buenas noticias pero nunca vi algo tan dificil como esto... Sin embargo hay que seguir adelante.', 
                    ['Geno', 'Anastasia', 'Futuro']
                );
            } else if (tipoPersonaje === "Anastasia"|| tipoPersonaje === "anastasia") {
                window.abrirDialogoPersonaje(
                    'Anastasia', 
                    imagenRuta, 
                    '¡Soy una nuevo miembro de los 7! Me llaman "La Profecía", ¿no creés que suena bien? jajaja.', 
                    ['Visiones', 'Oscar', 'La Élite']
                );
            } else if (tipoPersonaje === "Andrea"|| tipoPersonaje === "andrea") {
                window.abrirDialogoPersonaje(
                    'Andrea', 
                    imagenRuta, 
                    '¡Hola embuclado! Soy Andrea, ¿Que quieres saber? Te responderé sin mentiras', 
                    ['Los Siete', 'Socio', 'Pasado']
                );
            } else if (tipoPersonaje === "Sierra"|| tipoPersonaje === "sierra") {
                window.abrirDialogoPersonaje(
                    'Sierra', 
                    imagenRuta, 
                    '¿Que tal estás embuclado? Espero que estés entrenando lo suficiente, en cualquier momento podría aparecer algún peligro con el que luchar.', 
                    ['Oscar', 'La Élite', 'N1']
                );
            } else if (tipoPersonaje === "Natalia_Elite"|| tipoPersonaje === "natalia_elite") {
                window.abrirDialogoPersonaje(
                    'Natalia_Elite', 
                    imagenRuta, 
                    '¿Que tal estás embuclado? Espero que estés entrenando lo suficiente, en cualquier momento podría aparecer algún peligro con el que luchar.', 
                    ['Sierra', 'La Élite', 'Entrenos']
                );
            } else if (tipoPersonaje === "Andrea_Elite"|| tipoPersonaje === "andrea_elite") {
                window.abrirDialogoPersonaje(
                    'Andrea_Elite', 
                    imagenRuta, 
                    '¿Que tal estás embuclado? Espero que estés entrenando lo suficiente, en cualquier momento podría aparecer algún peligro con el que luchar.', 
                    ['Sierra', 'La Élite', 'Entrenos']
                );
            } else if (tipoPersonaje === "Sergio_Elite"|| tipoPersonaje === "sergio_elite") {
                window.abrirDialogoPersonaje(
                    'Sergio_Elite', 
                    imagenRuta, 
                    '¿Que tal estás embuclado? Espero que estés entrenando lo suficiente, en cualquier momento podría aparecer algún peligro con el que luchar.', 
                    ['Sierra', 'La Élite', 'Entrenos']
                );
            } else if (tipoPersonaje === "Alex"|| tipoPersonaje === "alex") {
                window.abrirDialogoPersonaje(
                    'Alex', 
                    imagenRuta, 
                    '¡Hombre embuclado! Ya te extrañaba. Vienes a hablar de la situación actual supongo.', 
                    ['Oscar', 'Los Siete', 'Futuro']
                );
            } else if (tipoPersonaje === "Enol"|| tipoPersonaje === "enol") {
                window.abrirDialogoPersonaje(
                    'Enol', 
                    imagenRuta, 
                    '¿Que necesitas embuclado? Estoy algo liado', 
                    ['Oscar', 'Los Siete', 'La Élite']
                );
            } else if (tipoPersonaje === "Sofia"|| tipoPersonaje === "sofia") {
                window.abrirDialogoPersonaje(
                    'Sofia', 
                    imagenRuta, 
                    '¡Asi que tu eres el famoso embuclado! Un gusto conocerte', 
                    ['Oscar', 'Realidad', 'Ayuda']
                );
            }
        });
    });
}

// DISPARADOR DE EMERGENCIA PARA SISTEMAS SPA (OPTIMIZADO VISTAS)
if (!window.misionesIntervalSet) {
    window.misionesIntervalSet = true;
    setInterval(() => {
        const contenedor = document.getElementById("contenedorMisiones");
        
        // 1. Cargar datos si estamos en historia y el contenedor está vacío
        if (contenedor && contenedor.querySelector(".misiones-cargando") && categoriaActiva === "historia") {
            if (typeof mostrarMisiones === "function") mostrarMisiones();
        }
        
        // 2. Mapear clics sólo si la rejilla de personajes está montada en el DOM
        if (document.querySelector(".fn-characters-grid") && !document.querySelector(".fn-characters-grid").classList.contains("clics-listos")) {
            document.querySelector(".fn-characters-grid").classList.add("clics-listos");
            inicializarClicsPersonajesFortnite();
        }
        
        // Si el usuario cambia a Historia, remover marca de clics listos por seguridad para futuros mapeos
        if (!document.querySelector(".fn-characters-grid") && document.querySelector(".clics-listos")) {
            document.querySelectorAll(".clics-listos").forEach(el => el.classList.remove("clics-listos"));
        }
    }, 200);
}


// ==========================================
// LÓGICA DE PROGRESO Y RECLAMOS
// ==========================================

function actualizarProgresoMision(tipoMision, cantidad = 1) {
    let huboCambios = false;

    listaMisiones.forEach(mision => {
        if (mision.tipo === tipoMision && !mision.completada) {
            mision.progresoActual = Math.min(mision.progresoTotal, mision.progresoActual + cantidad);
            if (mision.progresoActual >= mision.progresoTotal) {
                mision.completada = true;
            }
            huboCambios = true;
        }
    });

    if (huboCambios) {
        localStorage.setItem('resftworld_misiones', JSON.stringify(listaMisiones));
        verificarNotificacionesMisiones();
        if (document.getElementById("contenedorMisiones") && categoriaActiva === "historia") mostrarMisiones();
    }
}

function sincronizarProgresosEspeciales() {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const playlistsGuardadas = JSON.parse(localStorage.getItem("playlists")) || [];

    listaMisiones.forEach(mision => {
        if (!mision.completada) {
            if (mision.tipo === "favoritos_musica") {
                mision.progresoActual = Math.min(mision.progresoTotal, favoritos.length);
            }
            if (mision.tipo === "crear_playlist") {
                mision.progresoActual = Math.min(mision.progresoTotal, playlistsGuardadas.length);
            }
            if (mision.progresoActual >= mision.progresoTotal) {
                mision.completada = true;
            }
        }
    });
    localStorage.setItem('resftworld_misiones', JSON.stringify(listaMisiones));
}

function reclamarRecompensaMision(id) {
    const mision = listaMisiones.find(m => m.id === id);
    if (!mision || !mision.completada || mision.reclamada) return;

    mision.reclamada = true;
    localStorage.setItem('resftworld_misiones', JSON.stringify(listaMisiones));

    // 🔥 Corregido: Comillas invertidas para procesar correctamente las variables y saltos de línea
    alert(`🎉 ¡Excelente! Recibiste tu recompensa:\n${mision.recompensa}`);
    
    mostrarMisiones();
    verificarNotificacionesMisiones();
}

function verificarNotificacionesMisiones() {
    const pendientes = listaMisiones.some(m => m.completada && !m.reclamada);
    const botonNav = document.getElementById("btn-misiones-nav");
    
    if (botonNav) {
        if (pendientes) {
            botonNav.classList.add("notificacion-activa");
        } else {
            botonNav.classList.remove("notificacion-activa");
        }
    }
}

// DISPARADOR DE EMERGENCIA PARA SISTEMAS SPA (OPTIMIZADO VISTAS)
if (!window.misionesIntervalSet) {
    window.misionesIntervalSet = true;
    setInterval(() => {
        const contenedor = document.getElementById("contenedorMisiones");
        
        // 1. Cargar datos si estamos en historia y el contenedor está vacío
        if (contenedor && contenedor.querySelector(".misiones-cargando") && categoriaActiva === "historia") {
            if (typeof mostrarMisiones === "function") mostrarMisiones();
        }
        
        // 2. Mapear clics sólo si la rejilla de personajes está montada en el DOM
        if (document.querySelector(".fn-characters-grid") && !document.querySelector(".fn-characters-grid").classList.contains("clics-listos")) {
            document.querySelector(".fn-characters-grid").classList.add("clics-listos");
            inicializarClicsPersonajesFortnite();
        }
        
        // Si el usuario cambia a Historia, remover marca de clics listos por seguridad para futuros mapeos
        if (!document.querySelector(".fn-characters-grid") && document.querySelector(".clics-listos")) {
            document.querySelectorAll(".clics-listos").forEach(el => el.classList.remove("clics-listos"));
        }
    }, 200);
}

