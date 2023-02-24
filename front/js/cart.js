let basketLocalStorage = JSON.parse(localStorage.getItem("basket"));
console.log(basketLocalStorage);

/* let resLocalStorage = JSON.parse(localStorage.getItem("res"));
console.log(resLocalStorage); */

let positionEmptyCart = document.getElementById("cart__items");
console.log(positionEmptyCart);

function getCart() {
  if (basketLocalStorage === null || basketLocalStorage === 0) {
    positionEmptyCart.innerHTML = `<p>Votre panier est vide</p>`;
  } else {
    afficheCart();
    removeItem();
  }
}

function afficheCart() {
  let product = basketLocalStorage.find((e) => e === basketLocalStorage[0]);
  console.log(product);

  for (let product of basketLocalStorage) {
    /*     let kanap = resLocalStorage;
    console.log(kanap); */

    let m_title = product.title;
    console.log(product.title);

    let m_color = product.colorsValue;
    console.log(product.colorsValue);

    let m_quantity = product.quantityValue;
    console.log(product.quantityValue);

    let m_image = product.imgURL;
    console.log(product.imgURL);

    let m_price = product.price;
    console.log(product.price);

    positionEmptyCart.innerHTML += `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img" id="${m_image}">
      <img src="${m_image}"  alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content" id="${m_title}">
      <div class="cart__item__content__description" id="${m_color}">
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
          <p class="deleteItem" id="${m_title}" value="${m_color}" >Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
  }
}

function removeItem() {
  /*   let btnRemove = document.getElementsByClassName("deleteItem");
   */
  let btnRemove = document.querySelectorAll(".deleteItem");
  console.log(btnRemove);
/*   let imgCart = document.querySelectorAll(".cart__item__img");
  console.log(imgCart);
  let contDescribe = document.querySelectorAll(
    ".cart__item__content__description"
  );
  console.log(contDescribe);
  let contCart = document.querySelectorAll(".cart__item__content");
  console.log(contCart); */

  btnRemove.forEach((element) => {
    /*     console.log("toto");
     */
    element.addEventListener("click", (e) => {
      let myTitle = e.target.getAttribute("id");
      console.log(myTitle);

      let myColor = e.target.getAttribute("value");
      console.log(myColor);

      let kanap = basketLocalStorage.find(
        (p) => p.title == myTitle && p.colorsValue == myColor
      );

      const ligne = basketLocalStorage.indexOf(kanap);
      console.log(ligne);

      console.log(kanap);

      basketLocalStorage.splice(ligne);
      console.log(basketLocalStorage);

      localStorage.setItem("basket",JSON.stringify(basketLocalStorage));
      location.reload();

/*       kanap.remove(); */


    });
  });

  /*   contCart.forEach((element) => {

    element.addEventListener("click", (e) => {
  
      element.remove(0);
  
      
    })
  })
  imgCart.forEach((element) => {

    element.addEventListener("click", (e) => {

      element.remove(0);

    })
  }) */

  /*   btnRemove.addEventListener("click", (e) => {
   */

  /*     basketLocalStorage.find(
          );
          positionEmptyCart.remove(); */
  /* }); */
}

getCart();
