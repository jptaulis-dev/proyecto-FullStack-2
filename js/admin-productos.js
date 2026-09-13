const CLAVE_PRODUCTOS_ADMIN = "huertohogar_productos_admin";
const cuerpoTabla = document.getElementById("tabla-productos-admin");
const modal = document.getElementById("modal-producto");
const formulario = document.getElementById("form-modal-producto");
let productosAdmin = cargarProductos();
let productoEditandoId = null;

function cargarProductos() {
    const guardados = localStorage.getItem(CLAVE_PRODUCTOS_ADMIN);

    if (guardados !== null) {
        try {
            return JSON.parse(guardados);
        } catch (error) {
            localStorage.removeItem(CLAVE_PRODUCTOS_ADMIN);
        }
    }

    return productos.map(function (producto) {
        return Object.assign({}, producto);
    });
}

function guardarProductos() {
    localStorage.setItem(CLAVE_PRODUCTOS_ADMIN, JSON.stringify(productosAdmin));
}

function escaparHtml(valor) {
    return String(valor).replace(/[&<>'"]/g, function (caracter) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[caracter];
    });
}

function renderizarProductos() {
    cuerpoTabla.innerHTML = "";

    productosAdmin.forEach(function (producto) {
        const fila = document.createElement("tr");
        const estadoStock = producto.stock === 0
            ? "0 (agotado)"
            : tienePocoStock(producto) ? producto.stock + " (poco stock)" : producto.stock;

        fila.innerHTML =
            "<td>" + escaparHtml(producto.codigo) + "</td>" +
            "<td>" + escaparHtml(producto.nombre) + "</td>" +
            "<td>" + escaparHtml(producto.categoria) + "</td>" +
            "<td>$" + producto.precio.toLocaleString("es-CL") + "</td>" +
            "<td>" + estadoStock + "</td>" +
            "<td><button type='button' class='boton btn-editar-producto' data-id='" + producto.id + "'>Editar</button></td>";
        cuerpoTabla.appendChild(fila);
    });
}

function abrirModal(producto) {
    productoEditandoId = producto ? producto.id : null;
    document.getElementById("titulo-modal-producto").textContent = producto ? "Editar producto" : "Nuevo producto";
    document.getElementById("btn-guardar-producto").textContent = producto ? "Guardar cambios" : "Crear producto";
    document.getElementById("modal-codigo").value = producto ? producto.codigo : "";
    document.getElementById("modal-codigo").readOnly = Boolean(producto);
    document.getElementById("modal-nombre").value = producto ? producto.nombre : "";
    document.getElementById("modal-categoria").value = producto ? producto.categoria : "";
    document.getElementById("modal-precio").value = producto ? producto.precio : "";
    document.getElementById("modal-stock").value = producto ? producto.stock : "";
    limpiarErrores();
    modal.hidden = false;
    document.getElementById("modal-nombre").focus();
}

function cerrarModal() {
    modal.hidden = true;
    formulario.reset();
    productoEditandoId = null;
    limpiarErrores();
}

function limpiarErrores() {
    document.querySelectorAll(".modal .mensaje-error").forEach(function (elemento) {
        elemento.textContent = "";
    });
}

function mostrarError(id, mensaje) {
    document.getElementById(id).textContent = mensaje;
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    limpiarErrores();

    const codigo = document.getElementById("modal-codigo").value.trim();
    const nombre = document.getElementById("modal-nombre").value.trim();
    const categoria = document.getElementById("modal-categoria").value;
    const precio = Number(document.getElementById("modal-precio").value);
    const stock = Number(document.getElementById("modal-stock").value);
    let valido = true;

    if (codigo.length < 3) { mostrarError("error-modal-codigo", "El código debe tener al menos 3 caracteres."); valido = false; }
    if (nombre === "") { mostrarError("error-modal-nombre", "El nombre es obligatorio."); valido = false; }
    if (categoria === "") { mostrarError("error-modal-categoria", "Selecciona una categoría."); valido = false; }
    if (!Number.isFinite(precio) || precio < 0) { mostrarError("error-modal-precio", "El precio debe ser 0 o mayor."); valido = false; }
    if (!Number.isInteger(stock) || stock < 0) { mostrarError("error-modal-stock", "El stock debe ser un entero, 0 o mayor."); valido = false; }

    const codigoRepetido = productosAdmin.some(function (producto) {
        return producto.codigo.toLowerCase() === codigo.toLowerCase() && producto.id !== productoEditandoId;
    });
    if (codigoRepetido) { mostrarError("error-modal-codigo", "Ya existe un producto con ese código."); valido = false; }
    if (!valido) return;

    const datos = { codigo: codigo, nombre: nombre, categoria: categoria, precio: precio, stock: stock };
    if (productoEditandoId === null) {
        const nuevoId = productosAdmin.reduce(function (mayor, producto) { return Math.max(mayor, producto.id); }, 0) + 1;
        productosAdmin.push(Object.assign({ id: nuevoId }, datos));
    } else {
        const producto = productosAdmin.find(function (elemento) { return elemento.id === productoEditandoId; });
        Object.assign(producto, datos);
    }

    guardarProductos();
    renderizarProductos();
    cerrarModal();
});

document.getElementById("btn-nuevo-producto").addEventListener("click", function () { abrirModal(null); });
document.getElementById("btn-cerrar-modal").addEventListener("click", cerrarModal);
document.getElementById("btn-cancelar-modal").addEventListener("click", cerrarModal);
cuerpoTabla.addEventListener("click", function (evento) {
    const boton = evento.target.closest(".btn-editar-producto");
    if (!boton) return;
    const producto = productosAdmin.find(function (elemento) { return elemento.id === Number(boton.dataset.id); });
    if (producto) abrirModal(producto);
});
modal.addEventListener("click", function (evento) { if (evento.target === modal) cerrarModal(); });
document.addEventListener("keydown", function (evento) { if (evento.key === "Escape" && !modal.hidden) cerrarModal(); });

renderizarProductos();
