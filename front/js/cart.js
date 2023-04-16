let basketLocalStorage = JSON.parse(localStorage.getItem("basket"));
let formLocalStorage = JSON.parse(localStorage.getItem("form"));
let positionEmptyCart = document.getElementById("cart__items");

/* fonction panier vide */
function getCart() {
  if (basketLocalStorage === null || basketLocalStorage === 0) {
    positionEmptyCart.innerHTML = `<p>Votre panier est vide</p>`;
  } else {
    afficheCart();
  }
}

/* fonction asynchrone de l'affichage du panier */
async function afficheCart() {
  let product = basketLocalStorage.find((e) => e === basketLocalStorage[0]);
  let sum = 0;

  /* boucle produit en récupérant l'id et les autres propriétés (prix couleur quantité etc) */
  for (let product of basketLocalStorage) {
    let m_title = product.title;
    let m_color = product.colorsValue;
    let m_quantity = product.quantityValue;
    let m_image = product.imageUrl;
    let m_id = product.id;

    /* Variable servant à récuperer la fonction asynchrone de récupération du prix */
    const article = await fetchPrice(m_id);

    let m_price = article.price;
    let priceProduct = m_quantity * m_price;

    /* Calcul du total panier */
    let totalPrice = document.querySelector("#totalPrice");
    sum = sum + priceProduct;

    /* Affichage de la boucle dans la page HTML */
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

  /* Affichage du total panier */
  totalPrice.innerHTML = sum;

  removeItem(product);
  modifyItem(product);
  postForm();
}

/* Fonction asynchrone de récupération du prix */
async function fetchPrice(id) {
  return fetch(`http://localhost:3000/api/products/` + id)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    });
}

/* Fonction suppression du produit afficher dans le panier */
function removeItem() {
  let deleteItem = document.querySelectorAll(".deleteItem");

  deleteItem.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      let myTitle = e.target.getAttribute("id");
      let myColor = e.target.getAttribute("value");

      /* Variable qui récupere toutes les données du canapé qui va être supprimer */
      let kanap = basketLocalStorage.find(
        (p) => p.title == myTitle && p.colorsValue == myColor
      );

      const ligne = basketLocalStorage.indexOf(kanap);

      /* Utilisation de la méthode splice pour supprimer la ligne produit selectionner par la variable kanap  */
      basketLocalStorage.splice(ligne, 1);
      localStorage.setItem("basket", JSON.stringify(basketLocalStorage));
      location.reload();
    });
  });
}

/* Fonction modification quantité du produit afficher dans le panier */
function modifyItem() {
  let itemQuantity = document.querySelectorAll(".itemQuantity");

  for (let p = 0; p < itemQuantity.length; p++) {
    itemQuantity[p].addEventListener("change", (event) => {
      event.preventDefault();

      let quantityModify = basketLocalStorage[p].quantityValue;
      let itemQuantityValue = itemQuantity[p].valueAsNumber;

      let myTitle = event.target.getAttribute("data-id");
      let myColor = event.target.getAttribute("data-color");

      const resultFind = basketLocalStorage.find(
        (e) => e.title == myTitle && e.colorsValue == myColor
      );

      /* Update de la quantité dans le panier */
      resultFind.quantityValue = itemQuantityValue;
      quantityModify = resultFind.quantityValue;

      localStorage.setItem("basket", JSON.stringify(basketLocalStorage));

      if (itemQuantityValue == "0") {
        alert("Veuillez saisir une quantité supérieur à zéro");
      }

      location.reload();
    });
  }
}

/* Fonction pour valider le formulaire et la commande */
function postForm() {
  /* Variables des régles de vérification des champs du formulaire (regex) */
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp("[A-Za-z0-9s'À-ÖØ-öø-ÿ]*$");
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );

  let champs = "Veuillez renseigner ";
  const orderBtn = document.querySelector("#order");

  orderBtn.addEventListener("click", (event) => {
    event.preventDefault();

    /* Variables des valeurs du formulaire */
    const firstNameInput = document.querySelector("#firstName").value;
    const lastNameInput = document.querySelector("#lastName").value;
    const addressInput = document.querySelector("#address").value;
    const cityInput = document.querySelector("#city").value;
    const emailInput = document.querySelector("#email").value;

    /* Fonction qui permet de valider les champs (valeur booléenne) */
    function validateInput(
      input,
      /* input = le champ que je veux traiter */
      regex,
      /* regex = l'expression réguliere que je veux comparer au champ input */
      errorMessage,
      /* errorMessage = le message d'erreur que je veux afficher */
      baliseError
      /* baliseError = l'id de la base du front que je veux remplacer pour afficher le message */
    ) {
      let errorMsg = document.getElementById(baliseError);
      if (regex.test(input)) {
        errorMsg.innerHTML = "";
        return true;
      } else {
        errorMsg.innerHTML = errorMessage;
        return false;
      }
    }

    /* Variable booléenne qui contrôle tous les champs du formulaire par la fonction validateInput */
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


    /* 1 - Si isFormValid = true... */
    if ((isFormValid)) {
      const formData = {
        firstName: firstNameInput,
        lastName: lastNameInput,
        address: addressInput,
        city: cityInput,
        email: emailInput,
      };

      let prodId = [];
      basketLocalStorage.forEach((objet) => {
        prodId.push(objet.id);
      });

      let sendData = {
        contact: formData,
        products: prodId,
      };

      /* ...Toutes les données sont envoyées dans le localstorage... */
      localStorage.setItem("formData", JSON.stringify(sendData));


      /* ...Et utilisées par la methode "POST"... */
      const options = {
        method: "POST",
        body: JSON.stringify(sendData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      /* ...Pour  être récupérer dans l'API (JSON) et résumer sous la forme d'une ID par la méthode FETCH */
      fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
          document.location.href = "confirmation.html?id=" + data.orderId;
        })
        .catch((err) => {
          alert("Problème avec fetch : " + err.message);
        });
    } else {
      /* 2 - Si isFormValid = false... */
      alert(
        "Le formulaire n'est pas renseigné correctement. Veuillez vérifier votre saisie!" /* ...On lance une alerte pour l'utilisateur */
      );
    }
  });
}

getCart();
