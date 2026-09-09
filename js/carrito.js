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

    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === idProducto) {
            producto = productos[i];
        }
    }

    if (producto == null) {
        alert("ese producto no existe");
        return;
    }

    let yaEsta = false;

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
            carrito[i].cantidad = carrito[i].cantidad + cantidad;
            yaEsta = true;
        }
    }

    if (yaEsta == false) {
        carrito.push({ id: idProducto, cantidad: cantidad });
    }

    guardarCarrito(carrito);
    alert(producto.nombre + " agregado ✅");
}

function cambiarCantidad(idProducto, delta) {
    const carrito = obtenerCarrito();

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
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
        htmlCarrito += "<span>$" + precioProd.toLocaleString("es-CL") + " c/u</span>";
        htmlCarrito += "<div>";
        htmlCarrito += "<button class='boton' onclick='cambiarCantidad(" + carrito[i].id + ", -1)'>-</button> ";
        htmlCarrito += carrito[i].cantidad;
        htmlCarrito += " <button class='boton' onclick='cambiarCantidad(" + carrito[i].id + ", 1)'>+</button>";
        htmlCarrito += "</div>";
        htmlCarrito += "<button class='boton' style='background-color:#b3261e;' onclick='quitarDelCarrito(" + carrito[i].id + ")'>Quitar</button>";
        htmlCarrito += "</div>";
    }

    contenedor.innerHTML = htmlCarrito;
    document.getElementById("total-carrito").innerHTML = "$" + total.toLocaleString("es-CL");
}