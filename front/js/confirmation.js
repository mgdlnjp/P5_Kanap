let orderId = document.querySelector("#orderId");

/* Affichage du numéro de commande */
orderId.innerHTML = localStorage.getItem("orderId");

/* Suppression des datas de la commande dans le localStorage */
localStorage.clear();
          