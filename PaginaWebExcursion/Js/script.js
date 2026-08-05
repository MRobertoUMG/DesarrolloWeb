const botonContacto = document.getElementById('contactFab');
const modalContacto = document.getElementById('contactModal');
const cerrarContacto = document.getElementById('contactClose');

const visorImagen = document.getElementById('imageModal');
const imagenVisor = document.getElementById('imageModalImg');
const tituloVisor = document.getElementById('imageModalTitle');
const cerrarVisor = document.getElementById('imageModalClose');
const imagenesGaleria = document.querySelectorAll('.carrusel__diapositiva img');

function abrirModalContacto(event) {
    event.preventDefault();
    modalContacto.classList.add('modal-contacto--abierto');
    modalContacto.setAttribute('aria-hidden', 'false');
}

function cerrarModalContacto() {
    modalContacto.classList.remove('modal-contacto--abierto');
    modalContacto.setAttribute('aria-hidden', 'true');
}

//Modal de imagenes
function abrirVisorImagen(event) {
    const imagen = event.currentTarget;
    imagenVisor.src = imagen.src;
    imagenVisor.alt = imagen.alt;
    tituloVisor.textContent = imagen.dataset.title || imagen.alt;
    visorImagen.classList.add('visor-imagen--abierto');
    visorImagen.setAttribute('aria-hidden', 'false');
}

function cerrarVisorImagen() {
    visorImagen.classList.remove('visor-imagen--abierto');
    visorImagen.setAttribute('aria-hidden', 'true');
    imagenVisor.src = '';
    imagenVisor.alt = '';
    tituloVisor.textContent = '';
}

botonContacto.addEventListener('click', abrirModalContacto);
cerrarContacto.addEventListener('click', cerrarModalContacto);
modalContacto.addEventListener('click', (event) => {
    if (event.target === modalContacto) {
        cerrarModalContacto();
    }
});

cerrarVisor.addEventListener('click', cerrarVisorImagen);
visorImagen.addEventListener('click', (event) => {
    if (event.target === visorImagen) {
        cerrarVisorImagen();
    }
});
imagenesGaleria.forEach((imagen) => {
    imagen.addEventListener('click', abrirVisorImagen);
});

// Cotizador 
const formularioCotizacion = document.getElementById('quotationForm');
const resultadoCotizacion = document.getElementById('quotationResult');

function formatoMoneda(cantidad) {
    return `Q${cantidad.toFixed(2)}`;
}

function calcularCotizacion(event) {
    event.preventDefault();

    const asistentes = Number(document.getElementById('attendees').value) || 0;
    const extraPaquete = Number(document.getElementById('package').value) || 0;
    const extrasSeleccionados = Array.from(document.querySelectorAll('input[name="extras"]:checked'));
    const totalExtras = extrasSeleccionados.reduce((suma, input) => suma + Number(input.value), 0);

    if (asistentes < 1) {
        resultadoCotizacion.textContent = 'Por favor ingresa al menos 1 asistente.';
        return;
    }

    const precioBase = 100;
    const precioPorPersona = precioBase + extraPaquete + totalExtras;
    const precioTotal = asistentes * precioPorPersona;

    resultadoCotizacion.textContent = `Total estimado: ${formatoMoneda(precioTotal)} (${asistentes} asistentes × ${formatoMoneda(precioPorPersona)} por persona).`;
}

formularioCotizacion.addEventListener('submit', calcularCotizacion);

const formularioReserva = document.getElementById('formularioReserva');
const resultadoConfirmacion = document.getElementById('resultadoConfirmacion');
const nombreContacto = document.getElementById('nombreContacto');
const correoContacto = document.getElementById('correoContacto');
const personasReserva = document.getElementById('personasReserva');

function validarYConfirmarReserva(event) {
    event.preventDefault();

    const nombre = nombreContacto.value.trim();
    const correo = correoContacto.value.trim();
    const personas = Number(personasReserva.value) || 0;

    if (!nombre || !correo || personas < 1) {
        resultadoConfirmacion.textContent = 'Por favor completa todos los campos correctamente antes de enviar.';
        resultadoConfirmacion.style.color = '#c62828';
        return;
    }

    resultadoConfirmacion.textContent = `¡Gracias ${nombre}! Tu solicitud para ${personas} persona${personas === 1 ? '' : 's'} ha sido registrada.`;
    resultadoConfirmacion.style.color = '#154239';
    formularioReserva.reset();
    personasReserva.value = 1;
}

formularioReserva.addEventListener('submit', validarYConfirmarReserva);

//Buscador de Actividades
const buscadorActividades = document.getElementById('buscadorActividades');
const listaActividades = document.querySelectorAll('.lista-actividades li');

function filtrarActividades(event) {
    const textoBusqueda = event.target.value.toLowerCase();

    listaActividades.forEach((actividad) => {
        const textoActividad = actividad.textContent.toLowerCase();
        actividad.style.display = textoActividad.includes(textoBusqueda) ? 'list-item' : 'none';
    });
}

buscadorActividades.addEventListener('input', filtrarActividades);

//Testimonios
    const nombresVisitantes = [
        'Ana Gómez',
        'Carlos López',
        'María Pérez',
        'Jorge Castillo',
        'Lucía Martínez'
    ];

    const testimoniosVisitantes = [
        'Una experiencia inolvidable: el paisaje es espectacular y la guía fue muy atenta.',
        'Semuc Champey superó mis expectativas. El agua turquesa y la caminata fueron perfectas.',
        'Me encantó la organización y la atención. Volvería sin dudarlo.',
        'Un tour muy completo, natural y seguro. Ideal para viajar en familia.',
        'La aventura fue increíble. Recomiendo este paquete a todos los amantes de la naturaleza.'
    ];

    const contenedorTestimonios = document.getElementById('contenedorTestimonios');

    function crearTarjetasTestimonios() {
        contenedorTestimonios.innerHTML = '';
        const indices = nombresVisitantes.map((_, index) => index);
        indices.sort(() => Math.random() - 0.5);

        indices.forEach((indice) => {
            const tarjeta = document.createElement('article');
            tarjeta.className = 'tarjeta-testimonio';
            tarjeta.innerHTML = `
                <p class="texto-testimonio">${testimoniosVisitantes[indice]}</p>
                <p class="autor-testimonio">- ${nombresVisitantes[indice]}</p>
            `;
            contenedorTestimonios.appendChild(tarjeta);
        });
    }

    crearTarjetasTestimonios();

   