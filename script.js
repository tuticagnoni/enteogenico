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

    // Función de búsqueda
    const inputBusqueda = document.getElementById("busqueda");
    inputBusqueda.addEventListener("input", function () {
        let filtro = inputBusqueda.value.toLowerCase();
        const libros = document.querySelectorAll(".libro");

        libros.forEach((libro) => {
            let titulo = libro.getAttribute("data-titulo").toLowerCase();
            if (titulo.includes(filtro)) {
                libro.style.display = "block";
            } else {
                libro.style.display = "none";
            }
        });
    });
});
