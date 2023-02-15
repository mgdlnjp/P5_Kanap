let basketLocalStorage = JSON.parse(localStorage.getItem("basket"));
console.log(basketLocalStorage);

let resLocalStorage = JSON.parse(localStorage.getItem("res"));
console.log(resLocalStorage);

let positionEmptyCart = document.getElementById("cart__items");
console.log(positionEmptyCart);

function getCart() {
  if (basketLocalStorage === null || basketLocalStorage == 0) {
    positionEmptyCart.innerHTML = `<p>Votre panier est vide</p>`;
  } else {
    afficheCart();
    removeItem();
  }
}

function afficheCart() {
  let product = basketLocalStorage.find((e) => e === basketLocalStorage[0]);
  console.log(product);

  let kanap = resLocalStorage;
  console.log(kanap);

  let m_title = product.title;
  console.log(product.title);

  let m_color = product.colorsValue;
  console.log(product.colorsValue);

  let m_quantity = product.quantityValue;
  console.log(product.quantityValue);

  let m_image = kanap.imageUrl;
  console.log(kanap.imageUrl);

  let m_price = kanap.price;
  console.log(kanap.price);

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

function removeItem() {
  let btnRemove = document.querySelector(".deleteItem");
  console.log(btnRemove);

  btnRemove.addEventListener("click", () => {
    positionEmptyCart.remove();
  });
}

getCart();
