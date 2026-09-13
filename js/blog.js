// blog.js
// artículos del blog de HuertoHogar (alimentación saludable y sostenibilidad)

const articulosBlog = [
    {
        id: 1,
        titulo: "¿Por qué conviene comer frutas y verduras de temporada?",
        resumen: "Comer de temporada no es solo una moda: trae beneficios reales para tu salud, tu bolsillo y el planeta.",
        contenido: "Cuando compramos frutas y verduras fuera de su temporada, muchas veces vienen de lugares lejanos o llevan tiempo guardadas en cámaras de frío. Esto no solo les quita sabor, sino que también significa más transporte y más emisiones de CO2 al ambiente. Comer de temporada tiene varias ventajas: primero, el sabor y la textura son mejores porque la fruta madura en su punto justo, al sol, sin apuros. Segundo, conservan más vitaminas y minerales, ya que no pasan tanto tiempo almacenadas. Tercero, suelen ser más baratas, porque hay más oferta y no se necesita importarlas. Y por último, ayudan al medioambiente, porque se necesita menos agua, energía y transporte para producirlas. En HuertoHogar trabajamos directamente con productores locales para que nuestras frutas y verduras lleguen frescas, en su mejor momento, y directo del campo a tu mesa.",
        imagen: "imagenes/manzanas-fuji.png"
    },
    {
        id: 2,
        titulo: "Agricultura sostenible: el corazón de HuertoHogar",
        resumen: "Te contamos qué significa la agricultura sostenible y por qué es parte de nuestra misión como empresa.",
        contenido: "La agricultura sostenible busca producir alimentos cuidando el medioambiente, sin agotar los recursos naturales para las próximas generaciones. Esto incluye usar el agua de forma responsable, evitar pesticidas agresivos, cuidar la tierra para que se mantenga fértil, y apoyar a los agricultores locales en vez de depender solo de grandes cadenas de importación. Nuestra misión en HuertoHogar es justamente esa: conectar a las familias chilenas con el campo, promoviendo una alimentación saludable y apoyando prácticas agrícolas sostenibles. Cada vez que compras en nuestra tienda, estás apoyando directamente a productores que trabajan la tierra de forma responsable, y ayudando a que este modelo de negocio crezca en Chile.",
        imagen: "imagenes/Huertos_746x419_Huerto.jpg"
    }
];

// dibuja las tarjetas resumen del blog dentro del contenedor indicado
function mostrarArticulosBlog(idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    let html = "";

    for (let i = 0; i < articulosBlog.length; i++) {
        const articulo = articulosBlog[i];

        html += "<article class='tarjeta-producto' style='display:flex; flex-direction:row; align-items:stretch; margin-bottom:20px;'>";
        html += "<img src='" + articulo.imagen + "' alt='" + articulo.titulo + "' style='width:220px; object-fit:cover; flex-shrink:0;'>";
        html += "<div class='info' style='flex:1;'>";
        html += "<h2 style='margin-top:0;'>" + articulo.titulo + "</h2>";
        html += "<p style='color:#666666;'>" + articulo.resumen + "</p>";
        html += "<a href='blog_detalle.html?id=" + articulo.id + "' class='boton'>Leer artículo</a>";
        html += "</div>";
        html += "</article>";
    }

    contenedor.innerHTML = html;
}