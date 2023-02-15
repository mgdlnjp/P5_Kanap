let basketLocalStorage = JSON.parse(localStorage.getItem("basket"));
console.log(basketLocalStorage);

let positionEmptyCart = document.getElementById("cart__items");
console.log(positionEmptyCart);

let str = window.location.href;
console.log(str);
let url = new URL(str);
console.log(url);
let idProduct = url.searchParams.get("id");
console.log(idProduct);

let imageUrl = `http://localhost:3000/images/` + idProduct;
console.log(imageUrl);

getCart();

function getCart() {
  if (basketLocalStorage === null || basketLocalStorage == 0) {
    positionEmptyCart.innerHTML = `<p>Votre panier est vide</p>`;
  } else {
    afficheCart();
  }
}

function afficheCart() {


  let product = basketLocalStorage.find(e => e === basketLocalStorage[0]);
  console.log(product);
  
  
  let m_title = product.title;
  console.log(product.title);
  
  let m_color = product.colorsValue;
  console.log(product.colorsValue);
  
  let m_image = product.imageUrl;
  console.log(product.imageUrl);

  let m_price = product.priceValue;
  console.log(product.priceValue);
  
  let m_quantity = product.quantityValue;
  console.log(product.quantityValue);

  positionEmptyCart.innerHTML = `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src=${m_image} alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${m_title}</h2>
        <p>${m_color}</p>
        <p>${m_price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${m_quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
}
