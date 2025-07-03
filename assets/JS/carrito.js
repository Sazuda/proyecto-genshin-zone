// carrito.js

// Array para almacenar los productos en el carrito
let carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
        existe.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

// Función para mostrar el carrito en el DOM
function actualizarCarrito() {
    const contenedor = document.getElementById('cart-items');
    contenedor.innerHTML = '';
    carrito.forEach(item => {
        const div = document.createElement('div');
        div.className = 'carrito-item';
        div.innerHTML = `
            <span>${item.nombre} x${item.cantidad}</span>
            <span>$${item.precio * item.cantidad}</span>
            <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        `;
        contenedor.appendChild(div);
    });
    document.getElementById('carrito-total').innerText = 
        'Total: $' + carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
}

// Ejemplo de cómo agregar productos (debes adaptar esto a tu lógica)
window.agregarAlCarrito = agregarAlCarrito;
window.eliminarDelCarrito = eliminarDelCarrito;
window.vaciarCarrito = vaciarCarrito;

// Ejemplo de productos (puedes eliminar esto y cargar tus productos dinámicamente)
const productos = [
    { id: 1, nombre: 'Espada', precio: 100 },
    { id: 2, nombre: 'Arco', precio: 150 }
];

// Ejemplo de botones para agregar productos (puedes adaptar esto)
document.addEventListener('DOMContentLoaded', () => {
    const productosContenedor = document.getElementById('productos-contenedor');
    if (productosContenedor) {
        productos.forEach(prod => {
            const btn = document.createElement('button');
            btn.innerText = `Agregar ${prod.nombre}`;
            btn.onclick = () => agregarAlCarrito(prod);
            productosContenedor.appendChild(btn);
        });
    }
    actualizarCarrito();
});