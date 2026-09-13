// js/contacto.js

document.getElementById("form-contacto").addEventListener("submit", function(event) {
    // 1. Prevenir que la página se recargue automáticamente al enviar el formulario
    event.preventDefault();

    // 2. Atrapar los valores ingresados y quitarles espacios en blanco a los lados (.trim())
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const comentario = document.getElementById("comentario").value.trim();

    // 3. Atrapar los span donde inyectaremos los errores
    const errorNombre = document.getElementById("error-nombre");
    const errorCorreo = document.getElementById("error-correo");
    const errorComentario = document.getElementById("error-comentario");
    const mensajeExito = document.getElementById("mensaje-exito");

    // Limpiamos errores previos en cada nuevo intento
    errorNombre.innerHTML = "";
    errorCorreo.innerHTML = "";
    errorComentario.innerHTML = "";
    mensajeExito.style.display = "none";

    let hayErrores = false;

    // --- REGLAS PARA EL NOMBRE ---
    if (nombre === "") {
        errorNombre.innerHTML = "El nombre es obligatorio.";
        hayErrores = true;
    } else if (nombre.length > 100) {
        errorNombre.innerHTML = "El nombre no puede superar los 100 caracteres.";
        hayErrores = true;
    }

    // --- REGLAS PARA EL CORREO ---
    if (correo === "") {
        errorCorreo.innerHTML = "El correo es obligatorio.";
        hayErrores = true;
    } else if (correo.length > 100) {
        errorCorreo.innerHTML = "El correo no puede superar los 100 caracteres.";
        hayErrores = true;
    } else {
        // Validación de dominios específicos exigida por el caso
        const dominiosValidos = correo.endsWith("@duoc.cl") || 
                                correo.endsWith("@profesor.duoc.cl") || 
                                correo.endsWith("@gmail.com");
        
        if (!dominiosValidos) {
            errorCorreo.innerHTML = "Solo correos terminados en @duoc.cl, @profesor.duoc.cl o @gmail.com";
            hayErrores = true;
        }
    }

    // --- REGLAS PARA EL COMENTARIO ---
    if (comentario === "") {
        errorComentario.innerHTML = "El comentario es obligatorio.";
        hayErrores = true;
    } else if (comentario.length > 500) {
        errorComentario.innerHTML = "El comentario no puede superar los 500 caracteres.";
        hayErrores = true;
    }

    // --- RESULTADO FINAL ---
    if (hayErrores === false) {
        // Si no se activó ningún error, mostramos éxito y limpiamos las casillas
        mensajeExito.style.display = "block";
        document.getElementById("form-contacto").reset();
    }
});