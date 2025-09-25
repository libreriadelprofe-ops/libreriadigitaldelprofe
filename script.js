const books = [
  { id: 1, title: "Cuentos para Iniciar", author: "Carlos Ruiz", price: 12.5, image: "https://picsum.photos/seed/book2/260/360" },
  { id: 2, title: "Emprende Ya", author: "María Flores", price: 29.9, image: "https://picsum.photos/seed/book3/260/360" },
  { id: 3, title: "Matemáticas Preuniversitarias", author: "Lucía Pérez", price: 18.0, image: "https://picsum.photos/seed/book4/260/360" },
];

let cart = [];

function renderBooks(filter = "") {
  const list = document.getElementById("bookList");
  list.innerHTML = "";
  books.filter(b => b.title.toLowerCase().includes(filter.toLowerCase()) || b.author.toLowerCase().includes(filter.toLowerCase()))
    .forEach(book => {
      const item = document.createElement("div");
      item.className = "bg-white rounded-xl p-4 shadow hover:shadow-md transition";
      item.innerHTML = `
        <img src="${book.image}" alt="${book.title}" class="w-full h-48 object-cover rounded" />
        <div class="mt-3">
          <div class="font-semibold">${book.title}</div>
          <div class="text-sm text-gray-600">${book.author}</div>
          <div class="mt-2 flex items-center justify-between">
            <div class="text-lg font-bold">Bs ${book.price.toFixed(2)}</div>
            <button onclick="addToCart(${book.id})" class="px-3 py-1 rounded bg-yellow-500 text-white text-sm">Agregar</button>
          </div>
        </div>`;
      list.appendChild(item);
    });
}

function addToCart(id) {
  const book = books.find(b => b.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...book, qty: 1 });
  }
  updateCart();
}

function updateCart() {
  document.getElementById("cartCount").innerText = cart.reduce((a, b) => a + b.qty, 0);
  const items = document.getElementById("cartItems");
  items.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "flex justify-between items-center border-b pb-1";
    div.innerHTML = `
      <span>${item.title} (x${item.qty})</span>
      <span>Bs ${(item.price * item.qty).toFixed(2)}</span>`;
    items.appendChild(div);
  });
  document.getElementById("cartTotal").innerText = `Bs ${total.toFixed(2)}`;
}

function toggleCart() {
  document.getElementById("cartModal").classList.toggle("hidden");
}

document.getElementById("searchInput").addEventListener("input", e => renderBooks(e.target.value));

renderBooks();
