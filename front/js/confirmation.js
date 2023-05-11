let orderId = document.querySelector("#orderId");
let orderNumber = localStorage.getItem("orderId");

/* Affichage du numéro de commande récupérer dans l'url */
function orderConfirmation() {
  const url = new URL(window.location.href);
  url.searchParams.get("id");
  orderId.innerHTML = orderNumber;
  localStorage.clear();/* On vide le localstorage une fois la commande passée par mesure de sécurité */
}

orderConfirmation();
