document.addEventListener("DOMContentLoaded", async function () {
    const listaLibros = document.querySelector(".lista-libros ul");

    // Cargar datos del JSON
    const response = await fetch("libros.json");
    const libros = await response.json();

    // Generar la lista
    libros.forEach((libro) => {
        const li = document.createElement("li");
        li.classList.add("libro");
        li.innerHTML = `<a href="#${libro.id}">${libro.titulo} • ${libro.autor}</a>`;
        listaLibros.appendChild(li);
    });
});

//test libros desde json
document.addEventListener("DOMContentLoaded", async function () {
    const container = document.querySelector(".detalle-libros");

    // Cargar datos del archivo JSON
    const response = await fetch("libros.json");
    const libros = await response.json();

    // Generar HTML dinámicamente
    libros.forEach((libro) => {
        const div = document.createElement("div");
        div.classList.add("libro");
        div.setAttribute("id", libro.id);
        div.setAttribute("data-titulo", libro.titulo);
        div.setAttribute("data-tags", libro.tags.join(", "));

        div.innerHTML = `
            <img src="${libro.imagen}" alt="${libro.titulo}" height="200px">
            <h3>${libro.titulo}</h3>
            <p><strong>${libro.autor}</strong> - ${libro.paginas} páginas</p>
            <p class="resumen">${libro.resumen}</p>
            <div class="tags">${libro.tags.map(tag => `<span>#${tag}</span>`).join(" ")}</div>
        `;
        container.appendChild(div);
    });
});