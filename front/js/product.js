let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");
let prep = "";

GetProduct();

/* Pour appeler tous les produits sur le JSON */
function GetProduct() {
  fetch(`http://localhost:3000/api/products/` + idProduct)
    .then((res) => {
      return res.json();
    })

    .then(function (res) {
      afficheKanap(res);
    })

    .then(function (res) {
      addProduct(res);
    })

    .catch(function (err) {});
}

/* Pour afficher les produits du JSON dans la page */
function afficheKanap(res) {
  const product = res;

  let m_image = product.imageUrl;
  let m_name = product.name;
  let m_price = product.price;
  let m_description = product.description;

  /* Variable produits du JSON */
  preptitle = '<h1 id="title">' + m_name + "</h1>";
  prepprice = `<span id="price">${m_price}</span>`;
  prepdescription = `<p id="description">${m_description}</p>`;
  prepitem__img = `<div class="item__img"> <img src=${m_image}> </div>`;

  /* Insertion des variables */
  let title = document.getElementById("title");
  let price = document.getElementById("price");
  let description = document.getElementById("description");
  let item__img = document.getElementsByClassName("item__img");

  title.innerHTML = preptitle;
  price.innerHTML = prepprice;
  description.innerHTML = prepdescription;
  item__img[0].innerHTML = prepitem__img;

  /* Insertion de la couleur */
  for (let colors of product.colors) {
    let colorsValue = document.getElementById("colors");
    colorsValue.innerHTML += `<option value="${colors}">${colors}</option>`;
  }
  addProduct(res);
}

/* ------------ Il faut sauver le produit dans le localstorage au moment de l'ajout ------------*/

function saveBasket(getBas) {
  localStorage.setItem("basket", JSON.stringify(getBas));
}
function getBasket() {
  let getBas = localStorage.getItem("basket");
  if (getBas == null) {
    return [];
  } else {
    return JSON.parse(getBas);
  }
}

/* ------------------------------------------------------------------------------------------- */

/* Fonction qui ajoute le produit dans le panier */
function addProduct(res) {
  const btn_addPanier = document.getElementById("addToCart");

  let getBas = getBasket();
  let productIMG = res;
  let imgRes = productIMG.imageUrl;

  btn_addPanier.addEventListener("click", () => {
    let title = document.getElementById("title");
    let colorsValue = document.getElementById("colors");
    let quantityValue = document.getElementById("quantity");

    let ttl = title.textContent;
    let col = colorsValue.value;
    let qt = quantityValue.value;

    let imgurl = imgRes;

    /* Variables qui recupére les données de l'article */
    let monArticle = {
      id: idProduct,
      title: ttl,
      quantityValue: qt,
      colorsValue: col,
      imageUrl: imgurl,
    };

    let header = document.querySelectorAll("limitedWidthBlock");

    let foundBas = getBas.find(
      (p) =>
        p.title == monArticle.title &&
        p.colorsValue == monArticle.colorsValue &&
        p.imgURL == monArticle.imgURL &&
        p.id == monArticle.id
    );

    /* Différentes conditions pour l'ajout des options */
    if (monArticle.quantityValue === "0") {
      alert("Veuillez ajouter une quantité");
    } else {
      if (parseInt(monArticle.quantityValue) > 100) {
        alert("Nombre max de canapé atteint");
      } else {
        if (monArticle.colorsValue === "") {
          alert("Veuillez ajouter une couleur");
        } else {
          if (foundBas) {
            foundBas.quantityValue =
              parseInt(foundBas.quantityValue) +
              parseInt(monArticle.quantityValue);
          } else {
            getBas.push(monArticle);
            header.innerHTML = "quantité";
          }
          saveBasket(getBas);
        }
      }
    }
  });
}
