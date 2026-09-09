// productos.js
// catálogo de HuertoHogar + funciones para mostrarlo

const productos = [
    { id: 1, codigo: "FR001", nombre: "Manzanas Fuji", categoria: "Frutas Frescas", precio: 1200, unidad: "kilo", stock: 150, descripcion: "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule." },
    { id: 2, codigo: "FR002", nombre: "Naranjas Valencia", categoria: "Frutas Frescas", precio: 1000, unidad: "kilo", stock: 200, descripcion: "Jugosas y ricas en vitamina C, ideales para zumos frescos." },
    { id: 3, codigo: "FR003", nombre: "Plátanos Cavendish", categoria: "Frutas Frescas", precio: 800, unidad: "kilo", stock: 250, descripcion: "Plátanos maduros y dulces, perfectos para el desayuno." },
    { id: 4, codigo: "VR001", nombre: "Zanahorias Orgánicas", categoria: "Verduras Orgánicas", precio: 900, unidad: "kilo", stock: 100, descripcion: "Cultivadas sin pesticidas en la Región de O'Higgins." },
    { id: 5, codigo: "VR002", nombre: "Espinacas Frescas", categoria: "Verduras Orgánicas", precio: 700, unidad: "bolsa de 500g", stock: 80, descripcion: "Frescas y nutritivas, perfectas para ensaladas y batidos verdes." },
    { id: 6, codigo: "VR003", nombre: "Pimientos Tricolores", categoria: "Verduras Orgánicas", precio: 1500, unidad: "kilo", stock: 120, descripcion: "Rojos, amarillos y verdes, ideales para salteados." },
    { id: 7, codigo: "PO001", nombre: "Miel Orgánica", categoria: "Productos Orgánicos", precio: 5000, unidad: "frasco de 500g", stock: 50, descripcion: "Miel pura producida por apicultores locales." },
    { id: 8, codigo: "PO003", nombre: "Quinua Orgánica", categoria: "Productos Orgánicos", precio: 3200, unidad: "bolsa de 500g", stock: 60, descripcion: "Grano andino rico en proteínas." },
    { id: 9, codigo: "PL001", nombre: "Leche Entera", categoria: "Productos Lácteos", precio: 1100, unidad: "litro", stock: 90, descripcion: "Proveniente de granjas locales, rica en calcio." }
];


function mostrarProductos(lista, idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    let html = "";

    for (let i = 0; i < lista.length; i++) {
        const p = lista[i];

    


        html += "<div class='tarjeta-producto'>";
        html += "<a href='producto-detalle.html?id=" + p.id + "'><div class='imagen'></div></a>";
        html += "<div class='info'>";
        html += "<a href='producto-detalle.html?id=" + p.id + "'><strong>" + p.nombre + "</strong></a>";
        html += "<p style='color:#666666; font-size:14px; margin:4px 0;'>" + p.categoria + "</p>";
        html += "<p class='precio'>$" + p.precio.toLocaleString("es-CL") + " / " + p.unidad + "</p>";
        html += "<button class='boton' onclick='agregarAlCarrito(" + p.id + ", 1)'>Añadir</button>";
        html += "</div></div>";
    }

    if (lista == null) {
        alert("producto no encontrado")
    }

    let esta = false;


    contenedor.innerHTML = html;
}


// TODO: función para filtrar productos por categoría.
// La usarías, por ejemplo, si agregas un <select> de categorías en productos.html
// y quieres volver a llamar mostrarProductos() solo con los que coincidan.
function filtrarPorCategoria(categoria) {
    // pista: recorre "productos" con un for, arma un arreglo nuevo
    // solo con los que tengan p.categoria === categoria,
    // y al final llama mostrarProductos(arregloFiltrado, "lista-productos")
}


// TODO: función para saber si un producto tiene poco stock.
// La idea es usarla en el detalle del producto o en el admin,
// para avisar "⚠️ quedan pocas unidades" cuando el stock esté bajo.
function tienePocoStock(producto) {
    // pista: define tú un número que consideres "poco stock"
    // (ej: 10 unidades) y devuelve true/false comparando con producto.stock
}


// TODO: función para validar la cantidad antes de agregar al carrito.
// Debe evitar que alguien pida más cantidad de la que hay en stock,
// o que ingrese 0 o un número negativo.
function validarCantidad(idProducto, cantidadPedida) {
    // pista: busca el producto por id (como en mostrarProductos),
    // compara cantidadPedida contra producto.stock,
    // y devuelve true si es válida, false si no.
}