let orderId = document.querySelector("#orderId");
console.log(orderId);
let key = localStorage.key(2);
console.log(key);
let orderNumber = localStorage.getItem("orderId");
console.log(orderNumber);

function orderConfirmation() {
  const url = new URL(window.location.href);
  url.searchParams.set(key, orderNumber);
  window.history.pushState({ path: url.href }, "", url.href);
  orderId.innerHTML = orderNumber;
  localStorage.clear();
}

orderConfirmation();
