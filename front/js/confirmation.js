let orderId = document.querySelector("#orderId");

/* Creation et Affichage du numéro de commande */
let orderNumber = Math.floor(Math.random() * 1000000) + 1;
console.log(orderNumber);
orderId.innerHTML = orderNumber;

/* Suppression des datas de la commande dans le localStorage */
localStorage.clear();
