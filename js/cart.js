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
async function remove_cart(id) {
  const res = await fetch(`${api_link}/products_cart_by_user/${id}`, {
    method: "DELETE",
  });
  let data = await res.json();

  window.location.reload();
}

window.onload = async function get_products() {
  let full_cookie = document.cookie.match(/id=(.+?)(;|$)/)[1].split(",");
  let cookie_id = full_cookie[0];
  let res = await fetch(`${api_link}/products_cart_by_user`);
  let product_cart = await res.json();
  let res_info = await fetch(`${api_link}/products`);
  let products_info = await res_info.json();
  product_cart.forEach((product) => {
    if (cookie_id == product.id_user) {
      products_info.forEach((product_info) => {
        if (product.id_product == product_info.id) {
          document.querySelector(".list_item").innerHTML += `
        <div class="cart_list_item">
        <span class="name_cart_item">
            <p class="remove_cart" onclick="remove_cart(${product.id})"></p> <img src="${product_info.img}" alt="http://biolife/product_item.php?id=${product_info.id}"><a href="">${product_info.name}</a>
        </span>
        <span class="price_cart_item">
            <div class="shop_products_list_item_price">
                <span>${product_info.price_sale}₽</span>
                <p>${product_info.price}₽</p>
            </div>
            <div class="input_couter">
      <button class="number_minus" id="number_minus_${product.id}" type="button" onclick="number_minus(${product.id})">-</button>
      <input id="value_of_count_${product.id}" type="number" min="0" value="${product.count}">
      <button class="number_plus" id="number_plus_${product.id}" type="button" onclick="number_plus(${product.id})">+</button>
  </div>
        </span>
    </div> `;
        }
      });
    }
  });
  let count_cart = 0;
  product_cart.forEach((product) => {
    if (cookie_id == product.id_user) {
      count_cart++;
    }
  });
  $(".cart_item").attr("data-text", count_cart);
};
