document.getElementById("form-login").addEventListener("submit", function(event) {
    event.preventDefault();

    // 1. Atrapamos los valores ingresados
    const correo = document.getElementById("correo-login").value.trim();
    const pass = document.getElementById("pass-login").value.trim();

    // 2. Atrapamos las zonas de error
    const errorCorreo = document.getElementById("error-correo-login");
    const errorPass = document.getElementById("error-pass-login");
    const mensajeGeneral = document.getElementById("mensaje-general-login");

    // Limpiamos errores previos
    errorCorreo.innerHTML = "";
    errorPass.innerHTML = "";
    mensajeGeneral.innerHTML = "";

    let hayErrores = false;

    // --- VALIDACIÓN DE CAMPOS VACÍOS ---
    if (correo === "") {
        errorCorreo.innerHTML = "Por favor, ingresa tu correo.";
        hayErrores = true;
    }
    
    if (pass === "") {
        errorPass.innerHTML = "Por favor, ingresa tu contraseña.";
        hayErrores = true;
    }

    // --- VALIDACIÓN CONTRA LA BASE DE DATOS (LOCALSTORAGE) ---
    if (hayErrores === false) {
        // Traemos la cuenta que se guardó en el registro
        const cuentaGuardadaStr = localStorage.getItem("huertohogar_cuenta");

        if (cuentaGuardadaStr === null) {
            mensajeGeneral.innerHTML = "No existe ninguna cuenta registrada en este navegador.";
            return; // Detenemos la ejecución
        }

        // Convertimos el texto guardado de vuelta a un objeto JavaScript
        const cuentaGuardada = JSON.parse(cuentaGuardadaStr);

        // Comparamos credenciales
        if (correo === cuentaGuardada.correo && pass === cuentaGuardada.password) {
            // ¡ÉXITO! Guardamos la sesión activa con el nombre del usuario
            localStorage.setItem("huertohogar_usuario", cuentaGuardada.nombre);
            
            alert("¡Bienvenido de vuelta, " + cuentaGuardada.nombre + "!");
            // Redirigimos al Home
            window.location.href = "index.html";
        } else {
            // Falló la comparación
            mensajeGeneral.innerHTML = "Correo o contraseña incorrectos. Inténtalo de nuevo.";
        }
    }
});