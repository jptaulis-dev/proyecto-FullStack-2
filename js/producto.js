const productos = [
    { id: 1, codigo: "FR001", nombre: "Manzanas Fuji", categoria: "Frutas Frescas", precio: 1200, unidad: "kilo", stock: 150, descripcion: "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule." },
    { id: 2, codigo: "FR002", nombre: "Naranjas Valencia", categoria: "Frutas Frescas", precio: 1000, unidad: "kilo", stock: 200, descripcion: "Jugosas y ricas en vitamina C, ideales para zumos frescos." },
    { id: 3, codigo: "FR003", nombre: "Plátanos Cavendish", categoria: "Frutas Frescas", precio: 800, unidad: "kilo", stock: 250, descripcion: "Plátanos maduros y dulces, perfectos para el desayuno." },
    { id: 4, codigo: "VR001", nombre: "Zanahorias Orgánicas", categoria: "Verduras Orgánicas", precio: 900, unidad: "kilo", stock: 100, descripcion: "Cultivadas sin pesticidas en la Región de O'Higgins." },
    { id: 5, codigo: "VR002", nombre: "Espinacas Frescas", categoria: "Verduras Orgánicas", precio: 700, unidad: "bolsa de 500g", stock: 80, descripcion: "Frescas y nutritivas, perfectas para ensaladas y batidos verdes." },
    { id: 6, codigo: "VR003", nombre: "Pimientos Tricolores", categoria: "Verduras Orgánicas", precio: 1500, unidad: "kilo", stock: 8, descripcion: "Rojos, amarillos y verdes, ideales para salteados." },
    { id: 7, codigo: "PO001", nombre: "Miel Orgánica", categoria: "Productos Orgánicos", precio: 5000, unidad: "frasco de 500g", stock: 0, descripcion: "Miel pura producida por apicultores locales." },
    { id: 8, codigo: "PO003", nombre: "Quinua Orgánica", categoria: "Productos Orgánicos", precio: 3200, unidad: "bolsa de 500g", stock: 60, descripcion: "Grano andino rico en proteínas." },
    { id: 9, codigo: "PL001", nombre: "Leche Entera", categoria: "Productos Lácteos", precio: 1100, unidad: "litro", stock: 90, descripcion: "Proveniente de granjas locales, rica en calcio." }
];

// funciones y cambios en reglas de negocio para el carrito de compras
function mostrarProductos(lista, idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    let html = "";

    for (let i = 0; i < lista.length; i++) {
        const p = lista[i];

        let botonHtml = "<button class='boton' onclick='agregarAlCarrito(" + p.id + ", 1)'>Agregar al carrito</button>";

        if (p.stock === 0) {
            botonHtml = "<span class='estado-agotado'>Agotado</span>";
        } else if (tienePocoStock(p)) {
            botonHtml = botonHtml + "<small class='estado-poco-stock'>Poco stock</small>";
        }

        html += "<div class='tarjeta-producto'>";
        html += "<div class='imagen' role='img' aria-label='Imagen de " + p.nombre + "'>" + p.nombre.charAt(0) + "</div>";
        html += "<div class='info'>";
        html += "<strong>" + p.nombre + "</strong>";
        html += "<p class='categoria-producto'>" + p.categoria + "</p>";
        html += "<p class='precio'>$" + p.precio.toLocaleString("es-CL") + " / " + p.unidad + "</p>";
        html += "<p class='stock-producto'>Stock: " + p.stock + "</p>";
        html += "<div class='acciones-producto'>";
        html += "<a class='boton boton-detalle' href='producto-detalle.html?id=" + p.id + "'>Ver detalle</a>";
        html += botonHtml;
        html += "</div>";
        html += "</div></div>";
    }

    contenedor.innerHTML = html;
}


function filtrarPorCategoria(categoria) {
    if (categoria == null || categoria === "Todas") {
        return productos.slice();
    }

    return productos.filter(function (producto) {
        return producto.categoria === categoria;
    });
}


function tienePocoStock(producto) {
    return producto != null && producto.stock <= 10;
}


function validarCantidad(idProducto, cantidadPedida) {
    if (!Number.isInteger(cantidadPedida) || cantidadPedida <= 0) {
        return false;
    }

    const producto = productos.find(function (producto) {
        return producto.id === idProducto;
    });

    return producto != null && cantidadPedida <= producto.stock;
}