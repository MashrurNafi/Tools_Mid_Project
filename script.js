let products = document.querySelector('.productContainer');

let cartQuantity = 0;

// Fetching Products from Fake Store API
fetch('https://fakestoreapi.com/products')
  .then(res=>res.json())            
    .then((data)=>{
        products.innerHTML = "";
        data.forEach(product=>{
            products.innerHTML += `
              <div class="product w-[250px]  bg-white-400 border border-gray-200 rounded-lg shadow-lg key=${product.id}">
                <img src="${product.image}" alt="${product.title}" class="p-10 w-full h-[250px] object-contain">
                <div class="content flex flex-col p-4 justify-between h-[250px]">
                    <span class="font-xl text-gray-400">${product.category}</span>
                    <h3 class="font-bold">${product.title}</h3>
                    <span class="price">$${product.price}</span>
                    <button class="js-add-to-cart bg-yellow-400 border rounded w-30 ml-12 hover:cursor-pointer">Add To Cart</button>
                </div>
            </div>
            `
        })

          document.querySelectorAll('.js-add-to-cart').forEach(button => {
          button.addEventListener('click', () => {

              cartQuantity++;
              document.querySelector('.cart-quantity').textContent = cartQuantity;
              document.querySelector('.cart-quantity').classList.add('bg-red-500', 'text-white', 'text-sm' ,'rounded-full', 'w-6', 'h-6', 'pl-1')
          });
      });
    });

    

    