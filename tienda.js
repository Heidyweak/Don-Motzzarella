const productos = [
  { id: 1, nombre: "Pepperoni", precio: 8, imagen: "img/p1.jpg" },
  { id: 2, nombre: "Vegetariana", precio: 10 , imagen: "img/p2.jpg"},
  { id: 3, nombre: "Hawaiana", precio: 9 , imagen: "img/p3.jpg"},
  { id: 4, nombre: "Cuatro quesos", precio: 7, imagen: "img/p4.jpg" },
  { id: 5, nombre: "Sencilla", precio: 6, imagen: "img/p6.jpg"},
  { id: 6, nombre: "BBQ Pollo", precio: 12, imagen: "img/p5.jpg" },
];

const pedido = [];

const container = document.getElementById("productos-container");
const resumen = document.getElementById("resumen-pedido");
const finalizarBtn = document.getElementById("finalizar-btn");

productos.forEach(producto => {
  const div = document.createElement("div");
  div.className = "producto";
  div.innerHTML = `
  <img src="${producto.imagen}" alt="${producto.nombre}">
    <h3>${producto.nombre}</h3>
    <p>Precio: $${producto.precio}</p>
    <label for="cantidad-${producto.id}">Cantidad:</label>
    <select id="cantidad-${producto.id}">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <div>
      <label>
        <input type="checkbox" id="cebolla-${producto.id}"> Con cebolla
      </label>
    </div>
    <div>
      <label>
        <input type="checkbox" id="bebida-${producto.id}"> Agregar bebida
      </label>
    </div>
    <button onclick="agregarAlPedido(${producto.id})">Agregar al pedido</button>
  `;
  container.appendChild(div);
});

function agregarAlPedido(id) {
  const producto = productos.find(p => p.id === id);
  const cantidad = parseInt(document.getElementById(`cantidad-${id}`).value);
  const conCebolla = document.getElementById(`cebolla-${id}`).checked;
  const conBebida = document.getElementById(`bebida-${id}`).checked;

  pedido.push({
    nombre: producto.nombre,
    precio: producto.precio,
    cantidad,
    conCebolla,
    conBebida
  });

  actualizarResumen();
}

function actualizarResumen() {
  resumen.innerHTML = "";
  if(pedido.length === 0){
    resumen.innerHTML = "<li>Aún no hay productos</li>";
    return;
  }
  pedido.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.cantidad} x ${item.nombre} ${item.conCebolla ? "(con cebolla)" : "(sin cebolla)"} ${item.conBebida ? "+ bebida" : ""} - $${item.precio * item.cantidad}`;
    resumen.appendChild(li);
  });
}

function finalizarPedido() {
  if(pedido.length === 0){
    alert("No hay productos en el pedido!");
    return;
  }
  let total = pedido.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  alert(`Pedido finalizado! Total a pagar: $${total}`);
  pedido.length = 0;
  actualizarResumen();
}

finalizarBtn.addEventListener("click", finalizarPedido);
