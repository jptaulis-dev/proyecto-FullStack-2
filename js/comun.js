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

// 4. PREPARACIÓN PARA EL LOGIN (Lo usaremos en el siguiente paso)
const usuarioGuardado = localStorage.getItem("huertohogar_usuario");
const contenedorUsuario = document.getElementById("usuario-nav"); // Necesitaremos agregar este ID en tu header pronto

if (usuarioGuardado !== null && contenedorUsuario !== null) {
    contenedorUsuario.innerHTML = "👤 Hola, " + usuarioGuardado;
}