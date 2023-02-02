let myURL = "http://localhost:3000/api/products";

/* Recuperation des données produits dans l'URL*/
GetKanaps(myURL);

function GetKanaps(url) {
  fetch(url)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })

    .then(function (res) {
      afficheProducts(res);
    })

    .catch(function (err) {});
}

/* Affichage des données produits */
function afficheProducts(res) {

  /* variable différentes données produits */
  const articles = res;

  let prep = "";

  for (let article in articles) {

    if (1 === 1) {

      /* variable caracteristique produit */
      let m_id = res[article]._id;
      let m_name = res[article].name;
      let m_description = res[article].description;
      let m_image = res[article].imageUrl;
      let m_alt = res[article].altTxt;


      /* insertion caracteristique produit */
      prep += `<a href="./product.html?id=${m_id}">
      <article>
      <img src="${m_image}" alt="${m_alt}">
      <h3 class="productName">${m_name}</h3>
      <p class="productDescription">${m_description}</p>
      </article>
      </a>`;
    }

    if (1 === 2) {
      // Insertion de l'élément "a"
      let productLink = document.createElement("a");
      document.querySelector(".items").appendChild(productLink);
      productLink.href = `product.html?id=${m_id}`;

      // Insertion de l'élément "article"
      let productArticle = document.createElement("article");
      productLink.appendChild(productArticle);

      // Insertion de l'image
      let productImg = document.createElement("img");
      productArticle.appendChild(productImg);
      productImg.src = res[article].imageUrl;
      productImg.alt = res[article].altTxt;

      // Insertion du titre "h3"
      let productName = document.createElement("h3");
      productArticle.appendChild(productName);
      productName.classList.add("productName");
      productName.innerHTML = res[article].name;

      // Insertion de la description "p"
      let productDescription = document.createElement("p");
      productArticle.appendChild(productDescription);
      productDescription.classList.add("productName");
      productDescription.innerHTML = res[article].description;
    }
  }

  let doc = document.getElementById("items");
  doc.innerHTML = prep;
}
