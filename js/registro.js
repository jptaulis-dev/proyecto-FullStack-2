document.getElementById("form-registro").addEventListener("submit", function(event) {
    event.preventDefault();

    // 1. Atrapamos los valores
    const nombre = document.getElementById("nombre-reg").value.trim();
    const correo = document.getElementById("correo-reg").value.trim();
    const pass = document.getElementById("pass-reg").value.trim();
    const passConf = document.getElementById("pass-conf").value.trim();

    // 2. Atrapamos las zonas de error
    const errorNombre = document.getElementById("error-nombre-reg");
    const errorCorreo = document.getElementById("error-correo-reg");
    const errorPass = document.getElementById("error-pass-reg");
    const errorPassConf = document.getElementById("error-pass-conf");

    // Limpiamos errores previos
    errorNombre.innerHTML = "";
    errorCorreo.innerHTML = "";
    errorPass.innerHTML = "";
    errorPassConf.innerHTML = "";

    let hayErrores = false;

    // --- VALIDACIÓN DE NOMBRE ---
    if (nombre === "") {
        errorNombre.innerHTML = "Por favor, ingresa tu nombre.";
        hayErrores = true;
    }

    // --- VALIDACIÓN DE CORREO (Estilo Duoc) ---
    if (correo === "") {
        errorCorreo.innerHTML = "El correo es obligatorio.";
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

    // --- VALIDACIÓN DE CONTRASEÑA ---
    if (pass === "") {
        errorPass.innerHTML = "La contraseña es obligatoria.";
        hayErrores = true;
    } else if (pass.length < 6) {
        errorPass.innerHTML = "La contraseña debe tener al menos 6 caracteres.";
        hayErrores = true;
    }

    // --- VALIDACIÓN DE CONFIRMAR CONTRASEÑA ---
    if (passConf !== pass) {
        errorPassConf.innerHTML = "Las contraseñas no coinciden.";
        hayErrores = true;
    } else if (passConf === "") {
        errorPassConf.innerHTML = "Debes confirmar tu contraseña.";
        hayErrores = true;
    }

    // --- RESULTADO FINAL (GUARDAR EN LOCALSTORAGE) ---
    if (hayErrores === false) {
        // Creamos un "objeto" con los datos del usuario
        const nuevaCuenta = {
            nombre: nombre,
            correo: correo,
            password: pass
        };

        // Guardamos la cuenta completa para que el Login la pueda revisar después
        localStorage.setItem("huertohogar_cuenta", JSON.stringify(nuevaCuenta));
        
        // Mensaje de éxito y redirección automática al Login
        alert("¡Cuenta creada con éxito, " + nombre + "! Ahora por favor inicia sesión.");
        window.location.href = "login.html";
    }
});