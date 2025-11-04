let products = document.querySelector('.productContainer');
let cartQuantity = 0;
let cartItems = [];
let subtotal = 0;
let discount = 0;
let delivery = 0;
let shipping = 0;
let total = 0;
let balance = 1000;

document.querySelector('.cart-quantity').textContent = cartQuantity;

// Fetch Products
fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then((data) => {
    products.innerHTML = "";
    data.forEach(product => {
      products.innerHTML += `
        <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
          <img src="${product.image}" alt="${product.title}" class="h-40 w-full object-contain mb-4"/>
          <h3 class="font-semibold text-lg mb-2">${product.title}</h3>
          <p class="text-[#FF6F3C] font-bold mb-2">${(product.price * 120).toFixed(2)} BDT</p>
          <div class="flex flex-col justify-between gap-3 text-lg items-center">
            <div><strong>Category:</strong> ${product.category}</div>
            <div><strong>Rating:</strong> ${product.rating.rate}</div>
            <button 
              class="add-to-cart bg-gradient-to-r from-[#FF6F3C] to-orange-500 text-white px-4 py-2 rounded-md font-semibold hover:opacity-90 cursor-pointer js-add-to-cart"
              data-title="${product.title}"
              data-price="${(product.price * 120).toFixed(2)}"
            >
              Add to Cart
            </button>
          </div>
        </div>
      `;
    });

    document.querySelectorAll('.js-add-to-cart').forEach(button => {
      button.addEventListener('click', () => {
        const title = button.getAttribute('data-title');
        const price = parseFloat(button.getAttribute('data-price'));

        cartItems.push({ title, price });
        subtotal += price;
        cartQuantity++;
        document.querySelector('.cart-quantity').textContent = cartQuantity;
      });
    });
  });

const modal = document.getElementById("my_modal_1");
const modalBox = modal.querySelector(".modal-box");


document.getElementById("cartBtn").addEventListener("click", () => {
  updateCartModal();
});


function updateCartModal() {
  modal.showModal();
  discount = 0;
  delivery = subtotal > 0 ? 100 : 0;
  shipping = subtotal > 0 ? 50 : 0;
  total = subtotal + delivery + shipping - discount;

  let itemsHTML = "";
  cartItems.forEach(item => {
    itemsHTML += `
      <div class="flex justify-between items-center border-b pb-2 mb-2">
        <p>${item.title}</p>
        <p class="text-[#FF6F3C] font-semibold">${item.price.toFixed(2)} BDT</p>
      </div>
    `;
  });

  // Build modal HTML
  modalBox.innerHTML = `
    <h3 class="text-xl font-bold mb-4">🛒 Shopping Cart</h3>
    <button class="absolute top-2 right-3 text-gray-500 hover:text-[#FF6F3C] text-2xl" id="close-modal">×</button>

    <div class="mb-4">
      <p class="font-semibold mb-2">Your Balance: <span id="balance-display">${balance.toFixed(2)}</span> BDT</p>
      <div class="flex gap-2">
        <button id="add-balance" class="bg-[#FF6F3C] text-white px-3 py-1 rounded cursor-pointer hover:scale-105 transition-all">Add 1000 BDT</button>
        <button id="reset-balance" class="bg-[#FF6F3C] text-white px-3 py-1 rounded cursor-pointer hover:scale-105 transition-all">Reset Balance</button>
      </div>
    </div>

    <div class="max-h-60 overflow-y-auto mb-4 border p-3 rounded-lg">
      ${itemsHTML || `<p class="text-gray-500 text-center">Your cart is empty.</p>`}
    </div>

    <div class="space-y-1 text-sm mb-4">
      <p>Subtotal: ${subtotal.toFixed(2)} BDT</p>
      <p>Delivery: ${delivery.toFixed(2)} BDT</p>
      <p>Shipping: ${shipping.toFixed(2)} BDT</p>
      <p>Discount: ${discount.toFixed(2)} BDT</p>
      <p class="font-semibold text-lg mt-2">Total: ${total.toFixed(2)} BDT</p>
    </div>

    <div class="flex gap-2 mb-4">
      <input id="coupon-input" type="text" placeholder="Coupon Code" class="border border-gray-300 px-3 py-2 w-full rounded-md" />
      <button id="apply-coupon" class="bg-[#FF6F3C] text-white px-4 py-2 rounded-md">Apply</button>
    </div>
  `;


  document.getElementById("close-modal").addEventListener("click", () => {
    modal.close();
  });

  document.getElementById("add-balance").addEventListener("click", () => {
    balance += 1000;
    updateCartModal();
  });

  document.getElementById("reset-balance").addEventListener("click", () => {
    balance = 1000;
    updateCartModal();
  });

  document.getElementById("apply-coupon").addEventListener("click", () => {
    const coupon = document.getElementById("coupon-input").value.trim();
    if (coupon === "SMART10" && subtotal > 0) {
      discount = subtotal * 0.1;
      total = subtotal + delivery + shipping - discount;
      updateCartModal();
    } else {
      alert("Invalid coupon.");
    }
  });
}

