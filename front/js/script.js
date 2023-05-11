let myURL = "http://localhost:3000/api/products";

/* Recuperation des données produits dans l'URL*/
GetKanaps(myURL);

function GetKanaps(url) {
  fetch(url)
    .then(function (res) {
      if (res.ok) {
        return res.json(); 
        //Valide la réponse du JSON et la retourne pour l'affichage de la boucle products dans la fonction afficheProducts
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
  let doc = document.getElementById("items");

  for (let article in articles) {
    if (article) {
      /* variable caracteristique produit */
      let m_id = res[article]._id;
      let m_name = res[article].name;
      let m_description = res[article].description;
      let m_image = res[article].imageUrl;
      let m_alt = res[article].altTxt;

      /* création des éléments HTML */
      let link = document.createElement("a");
      let articleElem = document.createElement("article");
      let imgElem = document.createElement("img");
      let Elem1 = document.createElement("h3");
      let Elem2 = document.createElement("p");

      /* configuration des éléments HTML */
      link.href = `./product.html?id=${m_id}`;
      imgElem.src = m_image;
      imgElem.alt = m_alt;
      Elem1.classList.add("productName");
      Elem1.textContent = m_name;
      Elem2.classList.add("productDescription");
      Elem2.textContent = m_description;

      /* insertion des éléments HTML */
      articleElem.appendChild(imgElem);
      articleElem.appendChild(Elem1);
      articleElem.appendChild(Elem2);
      link.appendChild(articleElem);
      doc.appendChild(link);
    } else {
      alert("pas de produit disponible");
    }
  }
}
