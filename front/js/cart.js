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

    //Creation de la section cart__items
    const articleHTML = document.createElement("article"); //En utilisant la méthode createElement
    articleHTML.classList.add("cart__item"); //En ajoutant les class ou id
    articleHTML.setAttribute("data-id", product.id); //Et les attibuts de ces derniers
    articleHTML.setAttribute("data-color", m_color);

    const divImg = document.createElement("div");
    divImg.classList.add("cart__item__img");
    divImg.setAttribute("id", m_image);

    const img = document.createElement("img");
    img.setAttribute("src", m_image);
    img.setAttribute("alt", "Photographie d'un canapé");

    divImg.appendChild(img);

    const divContent = document.createElement("div");
    divContent.classList.add("cart__item__content");
    divContent.setAttribute("id", m_title);

    const divDescription = document.createElement("div");
    divDescription.classList.add("cart__item__content__description");
    divDescription.setAttribute("id", m_color);

    const h2 = document.createElement("h2");
    h2.innerText = m_title; //Ou en ajoutant simplement du texte dans certaines balises

    const p1 = document.createElement("p");
    p1.innerText = m_color;

    const p2 = document.createElement("p");
    p2.innerText = `${m_price}€`;

    divDescription.appendChild(h2); //Affichage de la boucle dans la page HTML avec la méthode appendchild
    divDescription.appendChild(p1);
    divDescription.appendChild(p2);

    const divSettings = document.createElement("div");
    divSettings.classList.add("cart__item__content__settings");

    const divQuantity = document.createElement("div");
    divQuantity.classList.add("cart__item__content__settings__quantity");

    const p3 = document.createElement("p");
    p3.innerText = "Qté : ";

    const input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("data-id", m_title);
    input.setAttribute("data-color", m_color);
    input.classList.add("itemQuantity");
    input.setAttribute("name", "itemQuantity");
    input.setAttribute("min", "1");
    input.setAttribute("max", "100");
    input.setAttribute("value", m_quantity);

    divQuantity.appendChild(p3);
    divQuantity.appendChild(input);

    const divDelete = document.createElement("div");
    divDelete.classList.add("cart__item__content__settings__delete");

    const p4 = document.createElement("p");
    p4.classList.add("deleteItem");
    p4.setAttribute("id", m_title);
    p4.setAttribute("value", m_color);
    p4.innerText = "Supprimer";

    divDelete.appendChild(p4);

    divSettings.appendChild(divQuantity);
    divSettings.appendChild(divDelete);

    divContent.appendChild(divDescription);
    divContent.appendChild(divSettings);

    articleHTML.appendChild(divImg);
    articleHTML.appendChild(divContent);

    positionEmptyCart.appendChild(articleHTML);
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

      /* Utilisation de la méthode indexOf pour récupérer la ligne à supp */
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
  let onContinu = true;
  let itemQuantity = document.querySelectorAll(".itemQuantity");

  for (let p = 0; p < itemQuantity.length; p++) {
    itemQuantity[p].addEventListener("change", (event) => {
      event.preventDefault();

      let quantityModify = basketLocalStorage[p].quantityValue;
      let itemQuantityValue = itemQuantity[p].valueAsNumber;

      //Condition mise en place pour éviter la saisie de :
      if (!Number.isInteger(itemQuantityValue)) {
        //quantité décimal
        alert("Veuillez saisir un nombre entier");
        onContinu = false;
      } else if (itemQuantityValue <= 0 || itemQuantityValue > 100) {
        //quantité négative
        alert(
          "Veuillez saisir une quantité supérieure à zéro ou inférieure à 100"
        );
        onContinu = false;
        itemQuantity.value = 1; // en remettant la valeur initiale une fois l'alerte envoyée
      } else {
        onContinu = true;
      }

      //Condition une fois que les données sont bonnes pour modifier les produits
      if (onContinu) {
        let myTitle = event.target.getAttribute("data-id");
        let myColor = event.target.getAttribute("data-color");

        const resultFind = basketLocalStorage.find(
          (e) => e.title == myTitle && e.colorsValue == myColor
        );

        resultFind.quantityValue = itemQuantityValue;
        basketLocalStorage[p].quantityValue = resultFind.quantityValue;
        localStorage.setItem("basket", JSON.stringify(basketLocalStorage));
      }
      location.reload();
    });
  }
}

/* Fonction pour valider le formulaire et la commande */
function postForm() {
  //Préparation des regles pour verifier les champs du formulaire
  let addressRegExp = /^[a-z'sÀ-ÖØ-öø-ÿ\s]+$/;
  //Variable possible : let addressRegExp = /^[0-9a-z'sÀ-ÖØ-öø-ÿ\s]+$/; (Ce regex autorise les chiffres en début de ligne)
  let charRegExp = /^[a-zA-Z ,.\-\s]+$/;
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
    );
    
  //début du message à afficher en cas d'erreur
  let champs = "Veuillez renseigner ";

  const orderBtn = document.querySelector("#order");

  // tout ce qui se passe au moment de la validation du formulaire
  orderBtn.addEventListener("click", (event) => {
    event.preventDefault(); // evenement par défaut au moment de la validation du formulaire

    // Récupération des valeurs du formaulaire
    const firstNameInput = document.querySelector("#firstName").value;
    const lastNameInput = document.querySelector("#lastName").value;
    const addressInput = document.querySelector("#address").value;
    const cityInput = document.querySelector("#city").value;
    const emailInput = document.querySelector("#email").value;

    /* Fonction qui permet de valider les champs (valeur booléenne) */
    function validateInput(
      input,
      //input = le champ que je veux traiter
      regex,
      //regex = l'expression réguliere que je veux comparer au champ input
      errorMessage,
      //errorMessage = le message d'erreur que je veux afficher
      baliseError
      //baliseError = l'id de la base du front que je veux remplacer pour afficher le message
    ) {
      //Conditions prise en compte pour l'affichage du message d'erreur en cas de non validation du regex
      let errorMsg = document.getElementById(baliseError);
      if (regex.test(input)) {
        errorMsg.innerHTML = "";
        return true;
      } else {
        errorMsg.innerHTML =
          errorMessage +
          " (Merci de ne mettre : ni chiffres, ni majuscules, ni apostrophes ou symbole égal mathématique)";
        setTimeout(() => {
          location.reload();
        }, 6000); // rechargement après 6 secondes le temps de lire le message d'erreur
        return false;
      }
    }

    /* Variable booléenne qui contrôle tous les champs du formulaire par la fonction validateInput */
    let isFormValid = //Lorsque toutes les validateInput seront à true...
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

    //... la commande pourra être passée ...
    if (isFormValid) {
      //... si isFormValid est égal à true, alors tous les champs du formulaire sont valides
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

      console.log(sendData);

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
          console.log(data);

          localStorage.setItem("orderId", data.orderId);

          document.location.href = "confirmation.html?id=" + data.orderId;
        })
        .catch((err) => {
          alert("Problème avec fetch : " + err.message);
        });
    } else {
      return false;
    }
  });
}

getCart();
