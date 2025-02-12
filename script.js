document.addEventListener("DOMContentLoaded", function () {
    // Función para mostrar más texto
    const botones = document.querySelectorAll(".btn-ver-mas");
    botones.forEach((boton) => {
        boton.addEventListener("click", function () {
            const texto = this.previousElementSibling;
            if (texto.style.display === "inline") {
                texto.style.display = "none";
                this.textContent = "Ver más";
            } else {
                texto.style.display = "inline";
                this.textContent = "Ver menos";
            }
        });
    });


 
    
    
});

document.addEventListener("DOMContentLoaded", function () {
    const inputBusqueda = document.getElementById("busqueda");

    inputBusqueda.addEventListener("input", function () {
        let filtro = inputBusqueda.value.toLowerCase().trim(); // Convertir a minúsculas y eliminar espacios
        const libros = document.querySelectorAll(".libro");

        libros.forEach((libro) => {
            let titulo = libro.getAttribute("data-titulo") || ""; // Si no existe, usar un string vacío
            let tags = libro.getAttribute("data-tags") || "";     // Si no existe, usar un string vacío
            let autor = libro.getAttribute("data-autor") || "";     // Si no existe, usar un string vacío

            // Convertir a minúsculas antes de comparar
            titulo = titulo.toLowerCase();
            tags = tags.toLowerCase();
            autor = autor.toLowerCase();

            // Mostrar si el filtro coincide con el título o los tags
            if (titulo.includes(filtro) || tags.includes(filtro) || autor.includes(filtro)) {
                libro.style.display = "block";
            } else {
                libro.style.display = "none";
            }
        });
    });
});


//menu
document.getElementById("toggle-menu").addEventListener("click", function () {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("active");
});




