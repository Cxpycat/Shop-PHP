window.onload = async function get_products() {
  var results = document.cookie.match(/favorite_item=(.+?)(;|$)/);
  var favorite_list = results[1].split(",");
  console.log(favorite_list);
  let link = `${api_link}/products`;

  let res = await fetch(link);
  let products = await res.json();
  products.forEach((product) => {
    for (let i = 0; i < favorite_list.length; i++) {
      if (favorite_list[i] == product.id) {
        document.querySelector(".list_item").innerHTML += `
        <div class="favorite_list_item">
        <span class="name_favorite_item">
            <p class="remove_favorite" onclick="remove_favorite(${
              product.id
            })"></p> <img src="${
          product.img
        }" alt="http://biolife/product_item.php?id=${product.id}"><a href="">${
          product.name
        }</a>
        </span>
        <span class="price_favorite_item">
            <div class="shop_products_list_item_price">
                <span>${product.price_sale}₽</span>
                <p>${product.price}₽</p>
            </div>
            <div id="cart_btn_${product.id}">
            <button type="submit" class="btn" onclick="add_cart(${document.cookie
              .match(/id=(.+?)(;|$)/)[1]
              .split(",")},${product.id})">Добавить в корзину</button>
              </div>
        </span>
    </div>`;
        product_get_cart(product.id);
      }
    }
  });
  let full_cookie = document.cookie.match(/id=(.+?)(;|$)/)[1].split(",");
  let cookie_id = full_cookie[0];
  let res_cart = await fetch(`${api_link}/products_cart_by_user`);
  let product_cart = await res_cart.json();
  let count_cart = 0;
  product_cart.forEach((product) => {
    if (cookie_id == product.id_user) {
      count_cart++;
    }
  });
  $(".cart_item").attr("data-text", count_cart);
};

async function add_cart(id, id_product) {
  var login_check_get = document.cookie.match(/user_login_succes=(.+?)(;|$)/);
  if (login_check_get != null) {
    var results = document.cookie.match(/cart_item=(.+?)(;|$)/);
    var cart_list = results[1].split(",");
    let name = "cart_item";
    if (cart_list == 0) {
      document.cookie = name + "=" + id;
    } else {
      let value = cart_list + "," + id;
      document.cookie = name + "=" + value;
    }

    var formData = new FormData();
    formData.append("id_product_cart", id_product);
    formData.append("id_user_cart", id);
    formData.append("count_cart", 1);

    const res = await fetch(`${api_link}/products_cart_by_user`, {
      method: "POST",
      body: formData,
    });
    let data = await res.json();

    window.location.reload();
  } else {
    alert("Сначала авторизуйтесь");
  }
}

async function product_get_cart(product_id) {
  let full_cookie = document.cookie.match(/id=(.+?)(;|$)/)[1].split(",");
  let cookie_id = full_cookie[0];
  let res = await fetch(`${api_link}/products_cart_by_user`);
  let product_cart = await res.json();
  product_cart.forEach((product) => {
    if (cookie_id == product.id_user && product_id == product.id_product) {
      document.querySelector(
        `#cart_btn_${product_id}`
      ).innerHTML = `<div class="input_couter">
      <button class="number_minus" id="number_minus_${product.id}" type="button" onclick="number_minus(${product.id})">-</button>
      <input id="value_of_count_${product.id}" type="number" min="0" value="${product.count}">
      <button class="number_plus" id="number_plus_${product.id}" type="button" onclick="number_plus(${product.id})">+</button>
  </div>
  `;
    }
  });
}

async function number_plus(id) {
  const el = document.querySelector(`#number_plus_${id}`);
  el.previousElementSibling.stepUp(1);
  const value_count = document.querySelector(`#value_of_count_${id}`).value;

  var data = {
    id: id,
    count_cart: value_count,
  };
  let res = await fetch(`${api_link}/products_cart_by_user`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  let res_data = await res.json();
}

async function number_minus(id) {
  const el = document.querySelector(`#number_minus_${id}`);
  el.nextElementSibling.stepDown(1);
  const value_count = document.querySelector(`#value_of_count_${id}`).value;

  var data = {
    id: id,
    count_cart: value_count,
  };
  update_cart(data);

  if (value_count == 0) {
    let modal_alert = document.querySelector(".alet_delete_product");
    modal_alert.style.display = "block";

    const btn_yes = document.querySelector("#btn_yes_product");
    const btn_no = document.querySelector("#btn_no_product");
    btn_yes.addEventListener("click", () => {
      remove_cart(id);
      modal_alert.style.display = "none";
    });

    btn_no.addEventListener("click", () => {
      modal_alert.style.display = "none";
      document.querySelector(`#value_of_count_${id}`).value = 1;
      var data = {
        id: id,
        count_cart: 1,
      };
      update_cart(data);
    });
  }
}
async function remove_cart(id) {
  const res = await fetch(`${api_link}/products_cart_by_user/${id}`, {
    method: "DELETE",
  });
  let data = await res.json();

  window.location.reload();
}

async function update_cart(data) {
  const res_link = await fetch(`${api_link}/products_cart_by_user`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
