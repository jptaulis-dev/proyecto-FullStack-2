const CLAVE_CARRITO = "huertohogar_carrito";

function obtenerCarrito() {
    const datos = localStorage.getItem(CLAVE_CARRITO);
    if (datos == null) {
        return [];
    }
    return JSON.parse(datos);
}

function guardarCarrito(carrito) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

function agregarAlCarrito(idProducto, cantidad) {
    const carrito = obtenerCarrito();
    let producto = null;

    // Buscamos si el producto existe en el catálogo
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === idProducto) {
            producto = productos[i];
        }
    }

    if (producto == null) {
        alert("Ese producto no existe");
        return;
    }

    let yaEsta = false;

    // Verificamos si ya está en el carrito
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
            // REGLA DE NEGOCIO: Validamos que no supere las 5 unidades
            if (carrito[i].cantidad + cantidad > 5) {
                alert("Máximo 5 unidades por producto");
                return; // Detenemos la ejecución aquí, no se agrega nada
            }
            
            // Si pasa la validación, sumamos la cantidad
            carrito[i].cantidad = carrito[i].cantidad + cantidad;
            yaEsta = true;
        }
    }

    // Si no estaba en el carrito, lo agregamos como nuevo
    if (yaEsta == false) {
        // También validamos por si alguien intenta agregar más de 5 de golpe
        if (cantidad > 5) {
            alert("Máximo 5 unidades por producto");
            return;
        }
        carrito.push({ id: idProducto, cantidad: cantidad });
    }

    // Guardamos en localStorage
    guardarCarrito(carrito);
    alert(producto.nombre + " agregado ✅");

    // Actualizamos el número en la barra de navegación al instante
    actualizarContadorCarrito();
}

// Función auxiliar para actualizar el numerito del <nav> sin recargar la página
function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    let cantidadTotal = 0;
    
    for (let i = 0; i < carrito.length; i++) {
        cantidadTotal += carrito[i].cantidad;
    }
    
    // Buscamos el ID que pusimos en el HTML
    const contadorHTML = document.getElementById("contador-carrito");
    if (contadorHTML != null) {
        contadorHTML.innerHTML = " 🛒 Carrito (" + cantidadTotal + ")";
    }
}

function cambiarCantidad(idProducto, delta) {
    const carrito = obtenerCarrito();

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
            // REGLA DE NEGOCIO: Evitar que al presionar el botón '+' supere las 5 unidades
            if (delta > 0 && carrito[i].cantidad >= 5) {
                alert("Máximo 5 unidades por producto");
                return;
            }

            carrito[i].cantidad += delta;

            if (carrito[i].cantidad <= 0) {
                carrito.splice(i, 1); // se elimina si llega a 0
            }
        }
    }

    guardarCarrito(carrito);
    mostrarCarrito();
}

function quitarDelCarrito(idProducto) {
    const carrito = obtenerCarrito();
    const carritoNuevo = [];

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id !== idProducto) {
            carritoNuevo.push(carrito[i]);
        }
    }

    guardarCarrito(carritoNuevo);
    mostrarCarrito();
}

// arma el html del carrito y lo mete en la página
function mostrarCarrito() {
    const carrito = obtenerCarrito();
    const contenedor = document.getElementById("items-carrito");

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>El carrito está vacío. <a href='productos.html'>Ir a productos</a></p>";
        document.getElementById("total-carrito").innerHTML = "$0";
        return;
    }

    let total = 0;
    let htmlCarrito = "";

    for (let i = 0; i < carrito.length; i++) {
        let nombreProd = "";
        let precioProd = 0;

        // busco el producto que corresponde a este item del carrito
        for (let j = 0; j < productos.length; j++) {
            if (productos[j].id === carrito[i].id) {
                nombreProd = productos[j].nombre;
                precioProd = productos[j].precio;
            }
        }

        const subtotal = precioProd * carrito[i].cantidad;
        total = total + subtotal;

            htmlCarrito += "<div class='fila-carrito'>";
            htmlCarrito += "<strong>" + nombreProd + "</strong>";
            htmlCarrito += "<span class='precio-unitario'>$" + precioProd.toLocaleString("es-CL") + " c/u</span>";
            htmlCarrito += "<div class='control-cantidad'>";
            htmlCarrito += "<button class='boton boton-cantidad' onclick='cambiarCantidad(" + carrito[i].id + ", -1)'>-</button>";
            htmlCarrito += "<span class='cantidad-numero'>" + carrito[i].cantidad + "</span>";
            htmlCarrito += "<button class='boton boton-cantidad' onclick='cambiarCantidad(" + carrito[i].id + ", 1)'>+</button>";
            htmlCarrito += "</div>";
            htmlCarrito += "<button class='boton boton-quitar' onclick='quitarDelCarrito(" + carrito[i].id + ")'>Quitar</button>";
            htmlCarrito += "</div>";
    }

    contenedor.innerHTML = htmlCarrito;
    document.getElementById("total-carrito").innerHTML = "$" + total.toLocaleString("es-CL");
}


// funcion de pago, que se ejecuta al presionar el botón "Pagar"
// funcion de pago, que se ejecuta al presionar el botón "Pagar"
function pagar() {
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        alert("El carrito está vacío. No hay nada que pagar.");
        return;
    }

    let resumen = "Resumen de la compra:\n\n";
    let total = 0;

    for (let i = 0; i < carrito.length; i++) {
        let nombreProd = "";
        let precioProd = 0;

        for (let j = 0; j < productos.length; j++) {
            if (productos[j].id === carrito[i].id) {
                nombreProd = productos[j].nombre;
                precioProd = productos[j].precio;
            }
        }

        const subtotal = precioProd * carrito[i].cantidad;
        total = total + subtotal;

        resumen += nombreProd + " x " + carrito[i].cantidad + " = $" + subtotal.toLocaleString("es-CL") + "\n";
    }

    alert(resumen + "\nTotal a pagar: $" + total.toLocaleString("es-CL") + "\n\n¡Gracias por tu compra!");

    guardarCarrito([]); // vaciamos el carrito
    mostrarCarrito(); // mostamos el nuevo carrito
    actualizarContadorCarrito(); // actualizamos el contador en el navegador
}