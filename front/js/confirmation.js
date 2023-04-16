let orderId = document.querySelector("#orderId");

/* Affichage du numéro de commande récupérer dans l'url */

function orderConfirmation() {
  const url = new URL(window.location.href);
  orderId.innerHTML = url.searchParams.get("id");
  
  localStorage.clear(); /* On vide le localstorage une fois la commande passée par sécurité */
}

orderConfirmation();