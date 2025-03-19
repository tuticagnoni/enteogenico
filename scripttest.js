document.addEventListener("DOMContentLoaded", async function () {
  // Seleccionar las secciones del HTML donde se llenarán los libros
  const listaOriginales = document.querySelector(
    ".lista-libros h2:nth-of-type(1) + ul"
  );
  const listaOtros = document.querySelector(
    ".lista-libros h2:nth-of-type(2) + ul"
  );
  const container = document.querySelector(".detalle-libros");

  // Crear el buscador dinámicamente
  const buscador = document.createElement("input");
  buscador.type = "text";
  buscador.id = "busqueda";
  buscador.classList.add("buscador-personalizado");
  buscador.placeholder = "Buscar un libro...";
  container.parentNode.insertBefore(buscador, container);

  // Cargar datos del archivo JSON
  const response = await fetch("libros.json");
  const libros = await response.json();

  // Generar listas y tarjetas
  libros.forEach((libro) => {
    // Añadir a la lista de títulos
    const li = document.createElement("li");
    li.classList.add("libro");
    li.innerHTML = `<a href="#${libro.id}">${libro.titulo} • ${libro.autor}</a>`;

    if (libro.categoria === "Títulos Originales") {
      listaOriginales.appendChild(li);
    } else if (libro.categoria === "Otros") {
      listaOtros.appendChild(li);
    }

    // Crear tarjeta en la sección de detalles
    const div = document.createElement("div");
    div.classList.add("libro");
    div.setAttribute("id", libro.id);
    div.setAttribute("data-titulo", libro.titulo.toLowerCase());
    div.setAttribute("data-autor", libro.autor.toLowerCase());
    div.setAttribute("data-tags", libro.tags.join(", ").toLowerCase());

    const paginasYAnio = `${libro.paginas} páginas • ${libro.añoPublicacion}`;

    // Verificar si el texto corto y completo son iguales o si no hay resumenCompleto
    if (!libro.resumenCompleto || libro.resumenCorto === libro.resumenCompleto) {
      div.innerHTML = `
                <img src="${libro.imagen}" alt="${libro.titulo}" height="250px">
                <h3>${libro.titulo}</h3>
                <p><strong>${libro.autor}</strong> - ${paginasYAnio}</p>
                <p class="resumen">
                    <span>${libro.resumenCorto}</span>
                </p>
                <div class="tags">${libro.tags.map((tag) => `<span>#${tag}</span>`).join(" ")}</div>
            `;
    } else {
      div.innerHTML = `
                <img src="${libro.imagen}" alt="${libro.titulo}" height="250px">
                <h3>${libro.titulo}</h3>
                <p><strong>${libro.autor}</strong> - ${paginasYAnio}</p>
                <p class="resumen">
                    <span class="resumen-corto">${libro.resumenCorto}</span>
                    <span class="resumen-completo" style="display: none;">${libro.resumenCompleto}</span>
                    <button class="btn-ver-mas">Ver más</button>
                </p>
                <div class="tags">${libro.tags.map((tag) => `<span>#${tag}</span>`).join(" ")}</div>
            `;
    }

    container.appendChild(div);
  });

  // Funcionalidad del botón "Ver más"
  document.querySelectorAll(".btn-ver-mas").forEach((boton) => {
    boton.addEventListener("click", function () {
      const resumenCorto = this.previousElementSibling.previousElementSibling;
      const resumenCompleto = this.previousElementSibling;

      if (resumenCompleto.style.display === "none") {
        resumenCorto.style.display = "none";
        resumenCompleto.style.display = "inline";
        this.textContent = "Ver menos";
      } else {
        resumenCorto.style.display = "inline";
        resumenCompleto.style.display = "none";
        this.textContent = "Ver más";
      }
    });
  });

  // Funcionalidad del buscador
  buscador.addEventListener("input", function () {
    const filtro = normalizeText(buscador.value.toLowerCase().trim());
    document.querySelectorAll(".detalle-libros .libro").forEach((libro) => {
      const titulo = normalizeText(libro.getAttribute("data-titulo"));
      const autor = normalizeText(libro.getAttribute("data-autor"));
      const tags = normalizeText(libro.getAttribute("data-tags"));

      if (
        titulo.includes(filtro) ||
        autor.includes(filtro) ||
        tags.split(", ").some((tag) => tag.includes(filtro))
      ) {
        libro.style.display = "block";
      } else {
        libro.style.display = "none";
      }
    });
  });

  // Función para normalizar texto eliminando tildes
  function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
});




//imagenes pantalla completa
let currentIndex = 0;
const images = ["img/animalesdroga.jpg", "img/ensayos.jpg", "img/redoculta.jpg"];

function openLightbox(index) {
    currentIndex = index;
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightbox-img").src = images[currentIndex];
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

function changeImage(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = images.length - 1;
    if (currentIndex >= images.length) currentIndex = 0;
    document.getElementById("lightbox-img").src = images[currentIndex];
}