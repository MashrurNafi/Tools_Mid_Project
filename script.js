let products = document.querySelector('.productContainer');

let cartQuantity = 0;
document.querySelector('.cart-quantity').textContent = cartQuantity;

// Fetching Products from Fake Store API
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
            <div class="flex flex-col justify-between gap-3 text-lg items-center ">
            <div>
            <strong>Category:</strong> : ${product.category}
            </div>
            <div>
            <strong>Rating:</strong> : ${product.rating.rate}
            </div>
            <button 
                class="add-to-cart bg-gradient-to-r from-[#FF6F3C] to-orange-500 text-white px-4 py-2 rounded-md font-semibold hover:opacity-90 cursor-pointer js-add-to-cart"
            >
                Add to Cart
            </button>
        </div>
            `
    })

    document.querySelectorAll('.js-add-to-cart').forEach(button => {
      button.addEventListener('click', () => {

        cartQuantity++;
        document.querySelector('.cart-quantity').textContent = cartQuantity;
       
      });
    });
  });



