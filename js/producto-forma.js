document.getElementById("form-producto").addEventListener("submit", function(event) {
    event.preventDefault();

    // 1. Atrapamos los valores
    const codigo = document.getElementById("codigo-prod").value.trim();
    const nombre = document.getElementById("nombre-prod").value.trim();
    const descripcion = document.getElementById("descripcion-prod").value.trim();
    const precio = document.getElementById("precio-prod").value.trim();
    const stock = document.getElementById("stock-prod").value.trim();
    const stockCritico = document.getElementById("stock-critico-prod").value.trim();
    const categoria = document.getElementById("categoria-prod").value;

    // 2. Atrapamos las zonas de error
    const errorCodigo = document.getElementById("error-codigo-prod");
    const errorNombre = document.getElementById("error-nombre-prod");
    const errorDescripcion = document.getElementById("error-descripcion-prod");
    const errorPrecio = document.getElementById("error-precio-prod");
    const errorStock = document.getElementById("error-stock-prod");
    const errorStockCritico = document.getElementById("error-stock-critico-prod");
    const errorCategoria = document.getElementById("error-categoria-prod");
    const mensajeExito = document.getElementById("mensaje-exito-prod");

    // Limpiamos errores previos
    errorCodigo.innerHTML = "";
    errorNombre.innerHTML = "";
    errorDescripcion.innerHTML = "";
    errorPrecio.innerHTML = "";
    errorStock.innerHTML = "";
    errorStockCritico.innerHTML = "";
    errorCategoria.innerHTML = "";
    mensajeExito.style.display = "none";

    let hayErrores = false;

    // --- CÓDIGO: requerido, texto, min 3, sin límite máximo ---
    if (codigo === "") {
        errorCodigo.innerHTML = "El código es obligatorio.";
        hayErrores = true;
    } else if (codigo.length < 3) {
        errorCodigo.innerHTML = "El código debe tener al menos 3 caracteres.";
        hayErrores = true;
    }

    // --- NOMBRE: requerido, max 100 ---
    if (nombre === "") {
        errorNombre.innerHTML = "El nombre es obligatorio.";
        hayErrores = true;
    } else if (nombre.length > 100) {
        errorNombre.innerHTML = "El nombre no puede superar los 100 caracteres.";
        hayErrores = true;
    }

    // --- DESCRIPCIÓN: opcional, max 500 ---
    if (descripcion.length > 500) {
        errorDescripcion.innerHTML = "La descripción no puede superar los 500 caracteres.";
        hayErrores = true;
    }

    // --- PRECIO: requerido, min 0, puede ser decimal ---
    if (precio === "") {
        errorPrecio.innerHTML = "El precio es obligatorio.";
        hayErrores = true;
    } else if (isNaN(precio) || Number(precio) < 0) {
        errorPrecio.innerHTML = "El precio debe ser 0 o mayor.";
        hayErrores = true;
    }

    // --- STOCK: requerido, min 0, solo enteros ---
    if (stock === "") {
        errorStock.innerHTML = "El stock es obligatorio.";
        hayErrores = true;
    } else if (isNaN(stock) || Number(stock) < 0 || !Number.isInteger(Number(stock))) {
        errorStock.innerHTML = "El stock debe ser un número entero, 0 o mayor.";
        hayErrores = true;
    }

    // --- STOCK CRÍTICO: opcional, min 0, solo enteros ---
    if (stockCritico !== "") {
        if (isNaN(stockCritico) || Number(stockCritico) < 0 || !Number.isInteger(Number(stockCritico))) {
            errorStockCritico.innerHTML = "El stock crítico debe ser un número entero, 0 o mayor.";
            hayErrores = true;
        }
    }

    // --- CATEGORÍA: requerida ---
    if (categoria === "") {
        errorCategoria.innerHTML = "Selecciona una categoría.";
        hayErrores = true;
    }

    // --- RESULTADO FINAL ---
    if (hayErrores === false) {
        mensajeExito.style.display = "block";
        document.getElementById("form-producto").reset();
    }
});