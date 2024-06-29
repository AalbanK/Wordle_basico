let intentos = 6;
let diccionario = ['ALBAN', 'COSAS', 'TECHO', 'GENTE','SUCIO', 'SANDIA', 'LUNAR']
const palabraSecreta = diccionario[Math.floor(Math.random() * diccionario.length)];

window.addEventListener('load', init)

function init() {
    const button = document.getElementById("guess-button");
    button.addEventListener("click", intentar);
}

function intentar() {
    const intento = leerIntento();

    if (intento===null){
        return;
    }

    const grid = document.getElementById("grid");
    const row = document.createElement('div');
    row.className = 'row';

    if (intento === palabraSecreta) {
        terminar("<h1>GANASTE!😀</h1>")
        return
    }

    for (let i in palabraSecreta) {
        const span = document.createElement('span');
        span.className = 'letter';

        if (intento[i] === palabraSecreta[i]) {
            console.log(intento[i], "VERDE")
            span.innerHTML = intento[i];
            span.style.backgroundColor = '#79b851';
        } else if (palabraSecreta.includes(intento[i])) {
            console.log(intento[i], "AMARILLO")
            span.innerHTML = intento[i];
            span.style.backgroundColor = '#f3c237';
        } else {
            console.log(intento[i], "GRIS")
            span.innerHTML = intento[i];
            span.style.backgroundColor = '#ccc';
        }

        row.appendChild(span)

    }

    grid.appendChild(row)
    intentos--

    if (intentos == 0) {
        terminar("<h1>PERDISTE!😖</h1>")
    }
}

function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase();

    if (intento.length !== 5) {
        mostrarError("La palabra debe tener exactamente 5 letras.");
        return null;
    }

    limpiarError();
    return intento;
}

function terminar(mensaje) {
    const input = document.getElementById("guess-input");
    const boton = document.getElementById("guess-button");
    input.disabled = true;
    boton.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

function mostrarError(mensaje) {
    let mensajeError = document.getElementById('error');
    if (!mensajeError) {
        mensajeError = document.createElement('p');
        mensajeError.id = 'error';
        mensajeError.className = 'error';
        document.body.insertBefore(mensajeError, document.getElementById('grid'));
    }
    mensajeError.innerHTML = mensaje;
}

function limpiarError() {
    let mensajeError = document.getElementById('error');
    if (mensajeError) {
        mensajeError.innerHTML = '';
    }
}