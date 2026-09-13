// js/comun.js
// Este script debe estar en TODAS las páginas de HuertoHogar

// 1. LEER EL CARRITO AL CARGAR LA PÁGINA
const datosCarrito = localStorage.getItem("huertohogar_carrito");
let carrito = [];

if (datosCarrito !== null) {
    carrito = JSON.parse(datosCarrito);
}

// 2. CALCULAR LA CANTIDAD TOTAL DE PRODUCTOS
let cantidadTotal = 0;
for (let i = 0; i < carrito.length; i++) {
    cantidadTotal += carrito[i].cantidad;
}

// 3. ACTUALIZAR EL CONTADOR VISUAL
const contadorHTML = document.getElementById("contador-carrito");
if (contadorHTML !== null) {
    contadorHTML.innerHTML = "🛒 Carrito (" + cantidadTotal + ")";
}

// 4. MANEJO DINÁMICO DE LA SESIÓN VISUAL
const usuarioGuardado = localStorage.getItem("huertohogar_usuario");
const contenedorUsuario = document.getElementById("usuario-nav");
const linkLogin = document.getElementById("link-login");
const linkRegistro = document.getElementById("link-registro");
const linkLogout = document.getElementById("link-logout");

if (usuarioGuardado !== null && contenedorUsuario !== null) {
    // Si el usuario existe en memoria, cambiamos la interfaz
    contenedorUsuario.innerHTML = "👤 Hola, " + usuarioGuardado;
    
    if (linkLogin) linkLogin.style.display = "none"; // Ocultamos "Iniciar sesión"
    if (linkRegistro) linkRegistro.style.display = "none"; // Ocultamos "Registrarse"
    if (linkLogout) linkLogout.style.display = "inline"; // Mostramos "Cerrar sesión"
}

// 5. FUNCIÓN PARA CERRAR SESIÓN
function cerrarSesion() {
    // Eliminamos solo el dato de la sesión activa
    localStorage.removeItem("huertohogar_usuario");
    
    // Recargamos la página para que la barra de navegación vuelva a su estado original
    window.location.reload();
}