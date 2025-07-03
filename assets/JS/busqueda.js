// Datos de ejemplo
const posts = Array.from(document.querySelectorAll('.post-title')).map(post => post.textContent);

// Referencias a los elementos del DOM
const input = document.getElementById('buscador');
const ulPosts = document.getElementById('lista-posts');

// Función para mostrar resultados

function mostrarResultados(filtro) {
    ulPosts.innerHTML = '';

    const resultadosPosts = posts.filter(post =>
        post.toLowerCase().includes(filtro.toLowerCase())
    );

    resultadosPosts.forEach(post => {
        const li = document.createElement('li');
        li.textContent = post;
        ulPosts.appendChild(li);
    });
    // Si no hay resultados, mostrar mensaje
    if (resultadosPosts.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No se encontraron resultados';
        ulPosts.appendChild(li);
    } else {
        // Hacer los elementos seleccionables
        ulPosts.querySelectorAll('li').forEach(li => {
            li.tabIndex = 0;
            li.classList.add('seleccionable');
            li.addEventListener('click', () => {
                ulPosts.querySelectorAll('li').forEach(el => el.classList.remove('seleccionado'));
                li.classList.add('seleccionado');
            });
            li.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    li.click();
                }
            });
        });
    }
}

// Mostrar todos al inicio
mostrarResultados('');

// Evento para buscar mientras se escribe
// input.addEventListener('input', (e) => {
//     mostrarResultados(e.target.value);
// });

// Evento para buscar al presionar Enter
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Evita el comportamiento por defecto del Enter
        mostrarResultados(e.target.value);
    }
});

// Evento para buscar al hacer clic en el botón de búsqueda
document.getElementById('buscar-btn').addEventListener('click', () => {
    mostrarResultados(input.value);
});