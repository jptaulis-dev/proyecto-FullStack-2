// regiones y comunas de Chile (misma lista que usamos en registro.js)
const regionesComunas = {
    "Región de Arica y Parinacota": ["Arica", "Putre"],
    "Región de Tarapacá": ["Iquique", "Alto Hospicio"],
    "Región de Antofagasta": ["Antofagasta", "Calama", "Tocopilla"],
    "Región de Atacama": ["Copiapó", "Vallenar", "Chañaral"],
    "Región de Coquimbo": ["La Serena", "Coquimbo", "Ovalle"],
    "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "San Antonio"],
    "Región Metropolitana de Santiago": ["Santiago", "Maipú", "Puente Alto", "Las Condes"],
    "Región del Libertador Bernardo O'Higgins": ["Rancagua", "San Fernando", "Rengo"],
    "Región del Maule": ["Talca", "Curicó", "Linares"],
    "Región de Ñuble": ["Chillán", "San Carlos"],
    "Región del Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "Nacimiento"],
    "Región de la Araucanía": ["Temuco", "Villarica", "Angol"],
    "Región de Los Ríos": ["Valdivia", "La Unión"],
    "Región de Los Lagos": ["Puerto Montt", "Osorno", "Castro"],
    "Región de Aysén": ["Coyhaique", "Puerto Aysén"],
    "Región de Magallanes y la Antártica Chilena": ["Punta Arenas", "Puerto Natales"]
};

function cargarRegiones() {
    const selectRegion = document.getElementById("region-usr");
    if (selectRegion == null) return;

    for (const nombreRegion in regionesComunas) {
        const opcion = document.createElement("option");
        opcion.value = nombreRegion;
        opcion.textContent = nombreRegion;
        selectRegion.appendChild(opcion);
    }
}

cargarRegiones();

const selectRegionUsr = document.getElementById("region-usr");
if (selectRegionUsr != null) {
    selectRegionUsr.addEventListener("change", function () {
        const selectComuna = document.getElementById("comuna-usr");
        const regionElegida = selectRegionUsr.value;

        selectComuna.innerHTML = "";

        if (regionElegida === "") {
            selectComuna.innerHTML = "<option value=''>-- Primero selecciona una región --</option>";
            return;
        }

        const comunasDisponibles = regionesComunas[regionElegida];
        const opcionVacia = document.createElement("option");
        opcionVacia.value = "";
        opcionVacia.textContent = "-- Selecciona tu comuna --";
        selectComuna.appendChild(opcionVacia);

        for (let i = 0; i < comunasDisponibles.length; i++) {
            const opcion = document.createElement("option");
            opcion.value = comunasDisponibles[i];
            opcion.textContent = comunasDisponibles[i];
            selectComuna.appendChild(opcion);
        }
    });
}

function runEsValido(run) {
    if (run.length < 7 || run.length > 9) return false;
    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1).toUpperCase();
    if (!/^\d+$/.test(cuerpo)) return false;

    let suma = 0;
    let multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += Number(cuerpo[i]) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const resto = 11 - (suma % 11);
    let dvEsperado = String(resto);
    if (resto === 11) dvEsperado = "0";
    if (resto === 10) dvEsperado = "K";

    return dv === dvEsperado;
}

document.getElementById("form-usuario").addEventListener("submit", function(event) {
    event.preventDefault();

    const run = document.getElementById("run-usr").value.trim();
    const nombre = document.getElementById("nombre-usr").value.trim();
    const apellidos = document.getElementById("apellidos-usr").value.trim();
    const correo = document.getElementById("correo-usr").value.trim();
    const tipoUsuario = document.getElementById("tipo-usr").value;
    const region = document.getElementById("region-usr").value;
    const comuna = document.getElementById("comuna-usr").value;
    const direccion = document.getElementById("direccion-usr").value.trim();

    const errorRun = document.getElementById("error-run-usr");
    const errorNombre = document.getElementById("error-nombre-usr");
    const errorApellidos = document.getElementById("error-apellidos-usr");
    const errorCorreo = document.getElementById("error-correo-usr");
    const errorTipo = document.getElementById("error-tipo-usr");
    const errorRegion = document.getElementById("error-region-usr");
    const errorComuna = document.getElementById("error-comuna-usr");
    const errorDireccion = document.getElementById("error-direccion-usr");
    const mensajeExito = document.getElementById("mensaje-exito-usr");

    errorRun.innerHTML = "";
    errorNombre.innerHTML = "";
    errorApellidos.innerHTML = "";
    errorCorreo.innerHTML = "";
    errorTipo.innerHTML = "";
    errorRegion.innerHTML = "";
    errorComuna.innerHTML = "";
    errorDireccion.innerHTML = "";
    mensajeExito.style.display = "none";

    let hayErrores = false;

    if (run === "") {
        errorRun.innerHTML = "El RUN es obligatorio.";
        hayErrores = true;
    } else if (!runEsValido(run)) {
        errorRun.innerHTML = "El RUN no es válido (sin puntos ni guion).";
        hayErrores = true;
    }

    if (nombre === "") {
        errorNombre.innerHTML = "El nombre es obligatorio.";
        hayErrores = true;
    } else if (nombre.length > 50) {
        errorNombre.innerHTML = "El nombre no puede superar los 50 caracteres.";
        hayErrores = true;
    }

    if (apellidos === "") {
        errorApellidos.innerHTML = "Los apellidos son obligatorios.";
        hayErrores = true;
    } else if (apellidos.length > 100) {
        errorApellidos.innerHTML = "Los apellidos no pueden superar los 100 caracteres.";
        hayErrores = true;
    }

    if (correo === "") {
        errorCorreo.innerHTML = "El correo es obligatorio.";
        hayErrores = true;
    } else if (correo.length > 100) {
        errorCorreo.innerHTML = "El correo no puede superar los 100 caracteres.";
        hayErrores = true;
    } else {
        const dominiosValidos = correo.endsWith("@duoc.cl") ||
                                correo.endsWith("@profesor.duoc.cl") ||
                                correo.endsWith("@gmail.com");
        if (!dominiosValidos) {
            errorCorreo.innerHTML = "Usa un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com).";
            hayErrores = true;
        }
    }

    if (tipoUsuario === "") {
        errorTipo.innerHTML = "Selecciona el tipo de usuario.";
        hayErrores = true;
    }

    if (region === "") {
        errorRegion.innerHTML = "Selecciona la región.";
        hayErrores = true;
    }

    if (comuna === "") {
        errorComuna.innerHTML = "Selecciona la comuna.";
        hayErrores = true;
    }

    if (direccion === "") {
        errorDireccion.innerHTML = "La dirección es obligatoria.";
        hayErrores = true;
    } else if (direccion.length > 300) {
        errorDireccion.innerHTML = "La dirección no puede superar los 300 caracteres.";
        hayErrores = true;
    }

    if (hayErrores === false) {
        mensajeExito.style.display = "block";
        document.getElementById("form-usuario").reset();
    }
});