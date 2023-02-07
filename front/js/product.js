let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");
let prep = "";

/* let bas = ["ttl", "qt", "col"];
 */
GetProduct(url);

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

  /* Variable produits du JSON */
  let m_image = product.imageUrl;
  let m_name = product.name;
  let m_price = product.price;
  let m_description = product.description;

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
    addProduct(product);
}

/* Ajouter produit dans le panier */

function saveBasket(getBas){
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

function addProduct() {
  const btn_envoyerPanier = document.getElementById("addToCart");
  let getBas = getBasket();
  let localBas = localStorage.setItem("basket", JSON.stringify(getBas));
  
  btn_envoyerPanier.addEventListener("click", () => {
    let title = document.getElementById("title");
    let colorsValue = document.getElementById("colors");
    let quantityValue = document.getElementById("quantity");
    
    let ttl = title.textContent;
    console.log(ttl);
    let col = colorsValue.value;
    console.log(col);
    let qt = quantityValue.value;
    console.log(qt);
    
    let monArticle = { title: ttl, quantityValue: qt, colorsValue: col };
    

/*     getBas.push(monArticle);
 */
/*     console.log(bas);
 */    
    let foundBas = getBas.find((p) => p.id == monArticle.id);
    if (foundBas === undefined) {
      foundBas.id++;
/*       localBas;
      getBas;
      console.log(localBas);
      console.log(getBas);
      console.log(foundBas); */
    } else {
      monArticle;
      getBas.push(monArticle);
    }
    saveBasket(getBas);
  });
}

/*     bas = [ttl, qt, col];
 */

/*     saveColor(col);
    saveQuantity(qt); */
/*  saveBasket(bas); */

/*    if (foundProduct != undefined) {
     foundProduct.quantity++;
    } else {
      product.quantity = 1;
      basket.push(product);
    } */

/*    let foundProduct = basket.find((p) => p.id == product.id);
 */

/*    let choixQuantite = quantityPicked;
   console.log(choixQuantite); */
/*    quantityValue.value = localStorage.getItem("quantity");
 */
/*   let input = document.createElement("input");
 */

/*     localStorage.ge
tItem("colors");
localStorage.getItem("quantity"); */

/*     if(typeof localStorage!='undefined') {
  if('quantity' in localStorage) {
    alert("Message récupéré");
  }
} else {
  alert("localStorage n'est pas supporté");
} */
/*     for(let quantityValue in localStorage) {
  alert(quantityValue); // affiche getItem, setItem et d'autres éléments intégrés
} */

/*   if (quantityPicked.value > 0 && quantityPicked.value <=100 && quantityPicked.value != 0){
       


        let basket = getProduct();
        console.log(localStorage.setItem); */
//Recupération du choix de la couleur
/*  let choixCouleur = colorsValue.value; */

//Recupération du choix de la quantité

//Récupération des options de l'article à ajouter au panier
/*   let optionsProduit = {
  idProduit: idProduct,
  couleurProduit: choixCouleur,
  quantiteProduit: Number(choixQuantite),
  nomProduit: article.name,
  prixProduit: article.price,
  descriptionProduit: article.description,
  imgProduit: article.imageUrl,
  altImgProduit: article.altTxt
} */

/*     if (foundProduct != undefined) {
    foundProduct.quantity++; */
/*         getProduct();
 */
/* else {
      quantityPicked.value = 1;
      basket.push(product);
  } */
/*     function getProduct() {
    localStorage.getItem("colors");
    localStorage.getItem("quantity");
  } */
/*   function saveBasket(bas) {
  localStorage.setItem("basket", JSON.stringify(bas));
} */
/*   function saveColor(col) {
  localStorage.setItem("color", JSON.stringify(col));
}
function saveQuantity(qt) {
  localStorage.setItem("quantity", JSON.stringify(qt));
} */

/* function getProduct() {
    let basket = localStorage.getItem("product");
    if (basket == null) {
        return [];
    } else {
        return JSON.parse(basket);
    }
} */

/* function removeFromBasket(product) {
  let basket = getBasket();
  basket = basket.filter((p) => p.id != product.id);
  saveBasket(basket);
}

function changeQuantity(product, quantity) {
  let basket = getBasket();
  let foundProduct = basket.find((p) => p.id == product.id);
  if (foundProduct != undefined) {
    foundProduct.quantity += quantity;
    if (foundProduct.quantity <= 0) {
      removeFromBasket(product);
    } else {
      saveBasket(basket);
    }
  }
}

function getNumberProduct() {
  let basket = getBasket();
  let number = 0;
  for (let product of basket) {
    nummber += product.quantity;
  }
  return number;
}

function getTotalPrice() {
  let basket = getBasket();
  let total = 0;
  for (let product of basket) {
    total += product.quantity * product.price;
  }
  return total;
} */

/* function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function getBasket() {
  let basket = localStorage.getItem("basket");
  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}

function addBasket(product) {
  let basket = getBasket();
  let foundProduct = basket.find((p) => p.id == product.id);
  if (foundProduct != undefined) {
    foundProduct.quantity++;
  } else {
    product.quantity = 1;
    basket.push(product);
  }
  saveBasket(basket);
}

function removeFromBasket(product) {
  let basket = getBasket();
  basket = basket.filter((p) => p.id != product.id);
  saveBasket(basket);
}

function changeQuantity(product, quantity) {
  let basket = getBasket();
  let foundProduct = basket.find((p) => p.id == product.id);
  if (foundProduct != undefined) {
    foundProduct.quantity += quantity;
    if (foundProduct.quantity <= 0) {
      removeFromBasket(product);
    } else {
      saveBasket(basket);
    }
  }
}

function getNumberProduct(){
    let basket = getBasket();
    let number = 0;
    for (let product of basket){
        nummber += product.quantity;
    }
    return number;
}

function getTotalPrice() { 
    let basket = getBasket();
    let total = 0;
    for (let product of basket){
        total += product.quantity * product.price;
    }
    return total;
 } */

/* function addToCart(article) {
    const btn_envoyerPanier = document.querySelector("#addToCart");

    //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
    btn_envoyerPanier.addEventListener("click", (event)=>{
        if (quantityPicked.value > 0 && quantityPicked.value <=100 && quantityPicked.value != 0){

    //Recupération du choix de la couleur
    let choixCouleur = colorPicked.value;
                
    //Recupération du choix de la quantité
    let choixQuantite = quantityPicked.value;

    //Récupération des options de l'article à ajouter au panier
    let optionsProduit = {
        idProduit: idProduct,
        couleurProduit: choixCouleur,
        quantiteProduit: Number(choixQuantite),
        nomProduit: article.name,
        prixProduit: article.price,
        descriptionProduit: article.description,
        imgProduit: article.imageUrl,
        altImgProduit: article.altTxt
    };

    //Initialisation du local storage
    let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

    //fenêtre pop-up
    const popupConfirmation =() =>{
        if(window.confirm(`Votre commande de ${choixQuantite} ${article.name} ${choixCouleur} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)){
            window.location.href ="cart.html";
        }
    }

    //Importation dans le local storage
    //Si le panier comporte déjà au moins 1 article
    if (produitLocalStorage) {
    const resultFind = produitLocalStorage.find(
        (el) => el.idProduit === idProduct && el.couleurProduit === choixCouleur);
        //Si le produit commandé est déjà dans le panier
        if (resultFind) {
            let newQuantite =
            parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
            resultFind.quantiteProduit = newQuantite;
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            popupConfirmation();
        //Si le produit commandé n'est pas dans le panier
        } else {
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            popupConfirmation();
        }
    //Si le panier est vide
    } else {
        produitLocalStorage =[];
        produitLocalStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        console.table(produitLocalStorage);
        popupConfirmation();
    }}
    });
} */
