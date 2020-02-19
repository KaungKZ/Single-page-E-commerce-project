// global variables

const cartOpenBtn = document.querySelector(".cart");
const cart = document.querySelector(".cart-items");
const cartCloseBtn = document.querySelectorAll(".cart-close");
const addToCartBtn = document.querySelectorAll(".items .add-to-cart");
const rowItems = document.querySelector(".cart-items  .row-items");
const items = document.querySelectorAll(".items .item");
const removeAllDiv = document.querySelector(".remove-all");
const purchaseBtn = document.querySelector(".purchase-btn");
const cartForPh = document.querySelector(".cart-for-smallsizes");
const alertForCart = cartForPh.querySelector(".alert");
const header = document.querySelector("header");

let counterForCartNumbers = 0;
let isFirstTime = true;
// ====================== open and close cart toggle =====================
function openCart() {
  cart.classList.add("cart-active");
  // check();
}
function closeCart() {
  cart.classList.remove("cart-active");
}

// =============== adding items to cart ===========================

function addToCart() {
  let title = this.parentElement.parentElement;
  let dataSet = title.dataset.first;
  purchaseBtn.disabled = false;
  if (dataSet === "false") {
    Swal.fire({
      toast: true,
      width: "20rem",
      position: "top",
      icon: "warning",
      title:
        "<p class = 'warningTitleClass'>This item is already in the list</p>",
      showConfirmButton: false,
      timer: 2000
    });
    return;
  }
  if (dataSet === "true") {
    alertForCart.classList.add("alert-active");
    Swal.fire({
      toast: true,
      width: "20rem",
      position: "top",
      icon: "success",
      title: "Item added to the cart",
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        title: "successTitleClass"
      }
    });
    if (isFirstTime === true) {
      const alertForCart = document.createElement("div");
      alertForCart.className = "item-numbers";
      alertForCart.textContent = 0;
      cartOpenBtn.appendChild(alertForCart);

      const removeBtn = document.createElement("button");
      removeBtn.className = "remove-all-btn";
      removeBtn.innerHTML = `Remove All`;
      removeAllDiv.appendChild(removeBtn);

      isFirstTime = false;
    }
    const removeAllBtn = removeAllDiv.querySelector(".remove-all-btn");
    const dataSet = this.parentElement.parentElement;
    const cartItemNumber = cartOpenBtn.querySelector(".item-numbers");

    removeAllBtn.style.display = "block";
    counterForCartNumbers++;
    if (counterForCartNumbers !== 0) cartItemNumber.style.display = "flex";
    cartItemNumber.textContent = counterForCartNumbers;
    this.parentElement.parentElement.dataset.first = "false";

    htmlForCart(title, dataSet);
  }
}
function htmlForCart(title, dataSet) {
  const itemName = title.querySelector("h2").innerHTML;

  const priceFromMenu = title.querySelector(".info .price").innerHTML;
  let itemPrice = priceFromMenu.split(">").pop();
  const rowForItem = document.createElement("div");
  rowForItem.className = "cart-item";
  rowForItem.innerHTML = `
  
  <div class="name">
    ${itemName}
  </div>
  <div class="qty">
    <label for="amount">Qty</label>
    <input id="amount" type="number" value="1" class='cart-input' autocomplete='off'/>
  </div>
  <div class="price">
    ${itemPrice}
  </div>
  <div class="remove-btn">
    <img src="images/remove.svg" alt="" />
  </div>
`;
  const removeBtn = rowForItem.querySelectorAll(".remove-btn");

  itemRemoved(removeBtn, dataSet);
  rowItems.appendChild(rowForItem);
  displayPrice(rowForItem);
}

// =========================== remove items from the cart =================================

function itemRemoved(removeBtn, dataSet) {
  const removeAll = removeAllDiv.querySelector(".remove-all-btn");
  removeBtn.forEach(btn =>
    btn.addEventListener("click", () => {
      btn.parentElement.remove();
      counterForCartNumbers--;
      dataSet.dataset.first = "true";

      forRemoveFunctions();
      updateTotalPrice();
    })
  );

  removeAll.addEventListener("click", removeAllItems);
}

function removeAllItems() {
  const cartItemsContainer = document.querySelector(".cart-items .row-items");
  cart.classList.remove("cart-active");
  items.forEach(item => (item.dataset.first = "true"));

  while (cartItemsContainer.firstChild) {
    cartItemsContainer.removeChild(cartItemsContainer.firstChild);
  }

  counterForCartNumbers = 0;
  forRemoveFunctions();
  updateTotalPrice();
}

function forRemoveFunctions() {
  const cartItemNumber = cartOpenBtn.querySelector(".item-numbers");
  if (counterForCartNumbers === 0) {
    alertForCart.classList.remove("alert-active");
    cartItemNumber.style.display = "none";
    const removeAllBtn = removeAllDiv.querySelector(".remove-all-btn");
    removeAllBtn.style.display = "none";
  }
  cartItemNumber.textContent = counterForCartNumbers;
}

// ========================== display price in html ==============================

function displayPrice(rowForItem) {
  const inputValue = rowForItem.querySelectorAll(".cart-input");
  let cartItemPrice = rowForItem.querySelector(".price");
  const cartItemFinalPrice = parseFloat(
    cartItemPrice.innerText.replace("$", "")
  );

  inputValue.forEach(one => {
    one.addEventListener("change", () => {
      if (one.value <= 0 || isNaN(one.value)) {
        one.value = 1;
      }
      let total = 0;
      total = Math.round(total + one.value * cartItemFinalPrice);
      cartItemPrice.innerText = `$${total}`;
      updateTotalPrice(total);
    });
  });
  updateTotalPrice();
}

// ========================= display total price ==================================

function updateTotalPrice() {
  const totalPrice = document.querySelector(".cart-items .total-price");
  const cartItems = document.querySelectorAll(".cart-item");
  let totalForCart = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const updatedCart = cartItems[i];
    let cartItemPrice = updatedCart.querySelector(".price");
    const cartItemFinalPrice = parseFloat(
      cartItemPrice.innerText.replace("$", "")
    );
    totalForCart = Math.round(totalForCart + cartItemFinalPrice);
  }
  totalPrice.innerText = `$${totalForCart}`;
}
// =============================== display colors for items ================================
function displayColors() {
  const colorOptions = document.querySelectorAll(".items .colors .option");
  const colors = {
    grey: "#c5c5c5",
    darkgreen: "#004F11",
    darkblue: "#28324C",
    black: "#000000",
    white: "#ffffff",
    red: "#DD2829",
    yellow: "#FAFF00"
  };
  colorOptions.forEach(option => {
    option.style.background = changeColor(option.dataset.color);
  });

  function changeColor(color) {
    return color === "grey"
      ? colors.grey
      : color === "darkgreen"
      ? colors.darkgreen
      : color === "darkblue"
      ? colors.darkblue
      : color === "black"
      ? colors.black
      : color === "white"
      ? colors.white
      : color === "red"
      ? colors.red
      : colors.yellow;
  }
}

window.onload = displayColors();

// ======================= purchase button function ===========================

function purchaseClicked() {
  const cartItems = document.querySelectorAll(".cart-item");
  if (cartItems.length === 0) {
    purchaseBtn.disabled = true;
    alertForCart.classList.remove("alert-active");
    return;
  }
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Thank you for purchasing !",
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      title: "successTitleClass"
    }
  });
  removeAllItems();
  updateTotalPrice();
}

// cart btn for small sizes

const options = {
  rootMargin: "0px 0px 0px 0px"
};
const observer = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      cartForPh.classList.add("active-cart");
    } else {
      cartForPh.classList.remove("active-cart");
    }
  });
}, options);

observer.observe(header);

// =========================== event listeners ====================================
cartOpenBtn.addEventListener("click", openCart);
cartForPh.addEventListener("click", openCart);
cartCloseBtn.forEach(btn => btn.addEventListener("click", closeCart));
addToCartBtn.forEach(elm => elm.addEventListener("click", addToCart));
purchaseBtn.addEventListener("click", purchaseClicked);
