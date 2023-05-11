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

  /* Préparation des Variables produits du JSON */
  preptitle = document.createElement("h1"); //En utilisant la méthode createElement
  preptitle.setAttribute("id", "title"); //En ajoutant les attibuts des balise créees
  preptitle.innerText = m_name; //Et la propriéte innerText

  prepprice = document.createElement("span");
  prepprice.setAttribute("id", "price");
  prepprice.innerText = m_price;

  prepdescription = document.createElement("p");
  prepdescription.setAttribute("id", "description");
  prepdescription.innerText = m_description;

  prepitem__img = document.createElement("div");
  prepitem__img.setAttribute("class", "item__img");
  const img = document.createElement("img");
  img.setAttribute("src", m_image);
  prepitem__img.appendChild(img);

  /* Insertion des variables */
  let title = document.getElementById("title");
  title.parentNode.replaceChild(preptitle, title);

  let price = document.getElementById("price");
  price.parentNode.replaceChild(prepprice, price);

  let description = document.getElementById("description");
  description.parentNode.replaceChild(prepdescription, description);

  let item__img = document.getElementsByClassName("item__img");
  item__img[0].parentNode.replaceChild(prepitem__img, item__img[0]);

  /* Insertion de la sélection des couleurs */
  const colorsValue = document.getElementById("colors");
  for (let colors of product.colors) {
    const option = document.createElement("option");
    option.setAttribute("value", colors);
    option.innerText = colors;
    colorsValue.appendChild(option);
  }
  addProduct(res);
}

/* ------------ Il faut sauver le produit dans le localStorage au moment de l'ajout ------------*/

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

/* Ajout des produit dans le panier */
function addProduct(res) {
  const btn_addPanier = document.getElementById("addToCart");
  let getBas = getBasket();

  let productIMG = res;

  let imgRes = productIMG.imageUrl;

  btn_addPanier.addEventListener("click", () => {
    let title = document.getElementById("title");
    let price = document.getElementById("price");
    let colorsValue = document.getElementById("colors");
    let quantityValue = document.getElementById("quantity");
    let id = idProduct;

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


    //Condition à valider avant l'ajout dans le localstorage et Panier
    let onContinu = false;
    if (foundBas) {
      if (
        parseInt(foundBas.quantityValue) + parseInt(monArticle.quantityValue) >
        100
      ) {
        alert("Nombre max de canapé atteint"); //Quantité limitée à 100 canapés total
        onContinu = false;
      } else {
        onContinu = true;
      }
    } else {
      onContinu = true;
    }

    /* Différentes conditions pour l'ajout des options */
    if (onContinu) {
      if (monArticle.quantityValue === "0") { //Quantité de 1 à 100canapé total
        alert("Veuillez ajouter une quantité");
      } else {
        if (parseInt(monArticle.quantityValue) < 0) { //Pour éviter les quantités négatives
          alert("Pas de quantité négative");
        } else {
          if (parseInt(monArticle.quantityValue) > 100) { //Quantité limitée à 100 canapés total
            alert("Nombre max de canapé atteint");
          } else {
            if (monArticle.colorsValue === "") {//Couleur obligatoire
              alert("Veuillez ajouter une couleur");
            } else {
              if (!/^\d+$/.test(monArticle.quantityValue)) { //Pour éviter les quantités décimales
                alert("La quantité doit être un nombre entier");
              } else {
                //Une fois les conditions valides : ajout dans le localstorage et Panier
                if (foundBas) {
                  foundBas.quantityValue =
                    parseInt(foundBas.quantityValue) +
                    parseInt(monArticle.quantityValue);
                } else {
                  getBas.push(monArticle);
                  header.innerHTML = "quantité";
                }
                document.location.href = "cart.html"; //Et affichage des produits dans le Panier
                saveBasket(getBas);
                alert("Canapé ajouté au panier");
              }
            }
          }
        }
      }
    }
  });
}
