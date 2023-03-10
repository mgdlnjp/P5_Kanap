let basketLocalStorage = JSON.parse(localStorage.getItem("basket"));
console.log(basketLocalStorage);

let formLocalStorage = JSON.parse(localStorage.getItem("form"));
console.log(formLocalStorage);

/* let resLocalStorage = JSON.parse(localStorage.getItem("res"));
console.log(resLocalStorage); */

let positionEmptyCart = document.getElementById("cart__items");
console.log(positionEmptyCart);

function getCart() {
  if (basketLocalStorage === null || basketLocalStorage === 0) {
    positionEmptyCart.innerHTML = `<p>Votre panier est vide</p>`;
  } else {
    afficheCart();
  }
}

async function afficheCart() {
  let product = basketLocalStorage.find((e) => e === basketLocalStorage[0]);
  console.log(product);

  let sum = 0;
  console.log(sum);

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

    let m_id = product.id;
    /*     console.log(m_id);
     */
    const article = await fetchPrice(m_id);
    console.log(article);

    let m_price = article.price;
    /*     console.log(m_price);
     */

    let priceProduct = m_quantity * m_price;
    console.log(priceProduct);

    let totalPrice = document.querySelector("#totalPrice");
    console.log(totalPrice);

    sum = sum + priceProduct;
    console.log(sum);

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
          <input type="number"  data-id="${m_title}" data-color="${m_color}" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${m_quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" id="${m_title}" value="${m_color}" >Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
  }

  totalPrice.innerHTML = sum;

  removeItem(product);
  modifyItem(product);
  fillForm();
  postForm();
}

async function fetchPrice(id) {
  return fetch(`http://localhost:3000/api/products/` + id)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    });
}

function removeItem() {
  let deleteItem = document.querySelectorAll(".deleteItem");
  console.log(deleteItem);

  deleteItem.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      let myTitle = e.target.getAttribute("id");
      console.log(myTitle);

      let myColor = e.target.getAttribute("value");
      console.log(myColor);

      let kanap = basketLocalStorage.find(
        (p) => p.title == myTitle && p.colorsValue == myColor
      );

      /* regarder indexOF */
      const ligne = basketLocalStorage.indexOf(kanap);
      console.log(ligne);

      console.log(kanap);

      /* regarder splice */
      basketLocalStorage.splice(ligne, 1);
      console.log(basketLocalStorage);

      localStorage.setItem("basket", JSON.stringify(basketLocalStorage));

      location.reload();
    });
  });
}

function modifyItem() {
  let itemQuantity = document.querySelectorAll(".itemQuantity");

  for (let p = 0; p < itemQuantity.length; p++) {
    itemQuantity[p].addEventListener("change", (event) => {
      event.preventDefault();

      let quantityModify = basketLocalStorage[p].quantityValue;
      console.log(quantityModify);
      let itemQuantityValue = itemQuantity[p].valueAsNumber;
      console.log(itemQuantityValue);

      let myTitle = event.target.getAttribute("data-id");
      console.log(myTitle);

      let myColor = event.target.getAttribute("data-color");
      console.log(myColor);

      const resultFind = basketLocalStorage.find(
        (e) => e.title == myTitle && e.colorsValue == myColor
      );
      console.log(resultFind);

      resultFind.quantityValue = itemQuantityValue;
      basketLocalStorage[p].quantityValue = resultFind.quantityValue;

      localStorage.setItem("basket", JSON.stringify(basketLocalStorage));

      if (itemQuantityValue == "0") {
        alert("Veuillez saisir une quantité supérieur à zéro");
      }

      location.reload();
    });
  }
}


function fillForm() {
  let form = document.querySelector(".cart__order__form");

  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );

  let champs = "Veuillez renseigner ";

  const fields = [
    { input: form.firstName, validate: validFirstName },
    { input: form.lastName, validate: validLastName },
    { input: form.address, validate: validAddress },
    { input: form.city, validate: validCity },
    { input: form.email, validate: validEmail },
  ];

  fields.forEach((field) => {
    field.input.addEventListener("change", function () {
      field.validate(this);
    });
  });
  
  function validateInput(input, regex, errorMessage) {
    let errorMsg = input.nextElementSibling;
    if (regex.test(input.value)) {
      errorMsg.innerHTML = "";
    } else {
      errorMsg.innerHTML = errorMessage;
    }
  }
  
  function validFirstName(inputFirstName) {
    validateInput(inputFirstName, charRegExp, champs + "votre Nom.");
  }

  function validLastName(inputLastName) {
    validateInput(inputLastName, charRegExp, champs + "votre Prénom.");
  }

  function validAddress(inputAddress) {
    validateInput(inputAddress, addressRegExp, champs + " l'Adresse.");
  }
  
  function validCity(inputCity) {
    validateInput(inputCity, charRegExp, champs + "la ville.");
  }
  
  function validEmail(inputEmail) {
    validateInput(inputEmail, emailRegExp, champs + "votre email.");
  }
}

function postForm() {
  // Get all input elements
  const firstNameInput = document.querySelector("#firstName").value;
  console.log(firstNameInput);
  const lastNameInput = document.querySelector("#lastName").value;
  console.log(lastNameInput);
  const addressInput = document.querySelector("#address").value;
  console.log(addressInput);
  const cityInput = document.querySelector("#city").value;
  console.log(cityInput);
  const emailInput = document.querySelector("#email").value;
  console.log(emailInput);

  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let champs = "Veuillez renseigner ";

  // Get the submit button
  const orderBtn = document.querySelector("#order");
  console.log(orderBtn);

  // Listen to click event on submit button
  orderBtn.addEventListener("click", (event) => {

    alert("sans erreur")
    event.preventDefault(); // prevent form from submitting
    
    function validateInput(input, regex, errorMessage, balise) {
      let errorMsg = input.nextElementSibling;
      console.log(balise)
      if (regex.test(input.value)) {
/*         errorMsg.innerHTML = "";
 */      
balise.innerHTML = "";
} else {
        errorMsg.innerHTML = errorMessage;
      }
    }



    function validFirstName(inputFirstName) {
      alert(
       validateInput(inputFirstName, charRegExp, champs + "votre Nom." , "firstNameErrorMsg"));
    }

    validFirstName(firstNameInput);

    // Validate all input fields
    if (
/*       validateInput(
        firstNameInput,
        charRegExp,
        "Veuillez renseigner ce champ."
      ) && */
/*       validateInput(
        lastNameInput,
        charRegExp,
        "Veuillez renseigner ce champ."
      ) && */
/*       validateInput(
        addressInput,
        addressRegExp,
        "Veuillez renseigner ce champ."
      ) && */
      /* validateInput(cityInput, charRegExp, "Veuillez renseigner ce champ.") && */
      /* validateInput(emailInput, emailRegExp, "Veuillez renseigner votre email.") */
      1==1
    ) {

      alert(firstNameInput);
      // Store form data in an object
      const formData = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        address: addressInput.value,
        city: cityInput.value,
        email: emailInput.value,
      };

      console.log(formData);

      // Store form data in localStorage
      localStorage.setItem("formData", JSON.stringify(formData));

      // Create a random order number
      const orderNumber = Math.floor(Math.random() * 1000000) + 1;
      console.log(orderNumber);

      // Store order number in localStorage
      localStorage.setItem("orderNumber", orderNumber);

      // Redirect user to confirmation page
      window.location.href = "confirmation.html";
    }
  });
}



getCart();
