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
    if (article) {
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
    } else {
      alert("Pas de produit disponible");
    }
  }

  let doc = document.getElementById("items");
  doc.innerHTML = prep;
}
