const productos = [
    { id: 1, codigo: "FR001", nombre: "Manzanas Fuji", categoria: "Frutas Frescas", precio: 1200, unidad: "kilo", stock: 150, descripcion: "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres. Estas manzanas son conocidas por su textura firme y su sabor equilibrado entre dulce y ácido.", imagen: "imagenes/manzanas-fuji.png" },
    { id: 2, codigo: "FR002", nombre: "Naranjas Valencia", categoria: "Frutas Frescas", precio: 1000, unidad: "kilo", stock: 200, descripcion: "Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes. Cultivadas en condiciones climáticas óptimas que aseguran su dulzura y jugosidad.", imagen: "imagenes/naranjas-valencia.png" },
    { id: 3, codigo: "FR003", nombre: "Plátanos Cavendish", categoria: "Frutas Frescas", precio: 800, unidad: "kilo", stock: 250, descripcion: "Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Estos plátanos son ricos en potasio y vitaminas, ideales para mantener una dieta equilibrada.", imagen: "imagenes/platanos-cavendish.jpg" },
    { id: 4, codigo: "VR001", nombre: "Zanahorias Orgánicas", categoria: "Verduras Orgánicas", precio: 900, unidad: "kilo", stock: 100, descripcion: "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins. Excelente fuente de vitamina A y fibra, ideales para ensaladas, jugos o como snack saludable.", imagen: "imagenes/zanahorias-organicas.jpg" },
    { id: 5, codigo: "VR002", nombre: "Espinacas Frescas", categoria: "Verduras Orgánicas", precio: 700, unidad: "bolsa de 500g", stock: 80, descripcion: "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Estas espinacas son cultivadas bajo prácticas orgánicas que garantizan su calidad y valor nutricional.", imagen: "imagenes/espinacas-frescas.png" },
    { id: 6, codigo: "VR003", nombre: "Pimientos Tricolores", categoria: "Verduras Orgánicas", precio: 1500, unidad: "kilo", stock: 120, descripcion: "Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas, estos pimientos añaden un toque vibrante y saludable a cualquier receta.", imagen: "imagenes/pimientos-tricolores.jpg" },
    { id: 7, codigo: "PO001", nombre: "Miel Orgánica", categoria: "Productos Orgánicos", precio: 5000, unidad: "frasco de 500g", stock: 50, descripcion: "Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable, perfecta para endulzar de manera natural tus comidas y bebidas.", imagen: "imagenes/miel-organica.jpg" },
    { id: 8, codigo: "PO003", nombre: "Quinua Orgánica", categoria: "Productos Orgánicos", precio: 3200, unidad: "bolsa de 500g", stock: 60, descripcion: "Grano andino rico en proteínas." , imagen: "imagenes/quinua-organica.jpg"},
    { id: 9, codigo: "PL001", nombre: "Leche Entera", categoria: "Productos Lácteos", precio: 1100, unidad: "litro", stock: 90, descripcion: "Proveniente de granjas locales, rica en calcio.", imagen: "imagenes/leche-entera.jpg" }
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
        html += "<div class='imagen'><img src='" + p.imagen + "' alt='" + p.nombre + "'></div>";
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