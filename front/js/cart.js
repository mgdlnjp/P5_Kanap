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

function postForm() {
  //Préparation des regles pour verifier les champs du formulaire
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp("[A-Za-z0-9s'À-ÖØ-öø-ÿ]*$"); //Ce regex autorise les chiffres en début de ligne
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );

  //début du message à afficher en cas d'erreur
  let champs = "Veuillez renseigner ";

  // Get the submit button
  const orderBtn = document.querySelector("#order");
  //console.log(orderBtn);

  // Listen to click event on submit button
  orderBtn.addEventListener("click", (event) => {
    event.preventDefault(); // prevent form from submitting

    // Récupération des valeurs du formaulaire
    const firstNameInput = document.querySelector("#firstName").value;
    const lastNameInput = document.querySelector("#lastName").value;
    const addressInput = document.querySelector("#address").value;
    const cityInput = document.querySelector("#city").value;
    const emailInput = document.querySelector("#email").value;

    //La fonction suivante permet de valider les champs que je lui passe en parametre. Elle retourne true ou false
    //input = le champ que je veux traiter
    //regex = l'expression réguliere que je veux comparer au champ input
    //errorMessage = le message d'erreur que je veux afficher
    //baliseError = l'id de la base du front que je veux remplacer pour afficher le message
    function validateInput(input, regex, errorMessage, baliseError) {
      let errorMsg = document.getElementById(baliseError);
      if (regex.test(input)) {
        errorMsg.innerHTML = ""; //Ici le message d'erreur est remit à blanc
        return true;
      } else {
        errorMsg.innerHTML = errorMessage;
        return false;
      }
    }

    //Controler tous les champs.
    //Lorsque toutes les validations seront à true, la commande pourra être passée
    let isFormValid =
      validateInput(
        firstNameInput,
        charRegExp,
        champs + "votre Prénom.",
        "firstNameErrorMsg"
      ) &&
      validateInput(
        lastNameInput,
        charRegExp,
        champs + "votre Nom.",
        "lastNameErrorMsg"
      ) &&
      validateInput(
        addressInput,
        addressRegExp,
        champs + "votre Adresse.",
        "addressErrorMsg"
      ) &&
      validateInput(
        cityInput,
        charRegExp,
        champs + "votre Ville.",
        "addressErrorMsg"
      ) &&
      validateInput(
        emailInput,
        emailRegExp,
        champs + "votre Email.",
        "addressErrorMsg"
      );

    if ((isFormValid = true)) {
      //si isFormValid est égal à true, alors tous les champs du formulaire sont valides

      const formData = {
        firstName: firstNameInput,
        lastName: lastNameInput,
        address: addressInput,
        city: cityInput,
        email: emailInput,
      };

      let sendData = {contact: formData, products: basketLocalStorage,
      }

      console.log(basketLocalStorage);
      console.log(formData);


      const options = {
        method: "POST",
        body: JSON.stringify(sendData),
        headers: {
          'Accept': "application/json",
          "Content-Type": "application/json",
        },
      };

      fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
          console.log(data);
/*           localStorage.clear();
 */          
/* localStorage.setItem("orderId", data.orderId);
 */
/*           document.location.href = "confirmation.html";
 */      })
      .catch((err) => {
          alert ("Problème avec fetch : " + err.message);
      });

      /*       console.log(formData); */

      // si tous les champs sont valides, on stocke formData dans localStorage et on redirige vers confirmation
      /* localStorage.setItem("formData", JSON.stringify(formData)); */
/*       window.location.href = "confirmation.html";
 */    } else {
      //si isFormValid est égal à false, envoi d'un message d'erreur
      alert(
        "Le formulaire n'est pas renseigné correctement. Veuillez vérifier votre saisie!"
      );
    }
  });
}

getCart();
