let api_link = "http://biolife/api.cxpycat";
const week = 60 * 60 * 24 * 7;
if (
  document.cookie.indexOf("favorite_item") == -1 ||
  document.cookie.indexOf("favorite_item") == 0
) {
  document.cookie = `favorite_item=0;max-age=${week}`;
}
if (
  document.cookie.indexOf("cart_item") == -1 ||
  document.cookie.indexOf("cart_item") == 0
) {
  document.cookie = `cart_item=0;max-age=${week}`;
}
if (
  document.cookie.indexOf("cart_item_count") == -1 ||
  document.cookie.indexOf("cart_item_count") == 0
) {
  document.cookie = `cart_item_count=0;max-age=${week}`;
}
if (document.cookie.indexOf("id") == -1 || document.cookie.indexOf("id") == 0) {
  document.cookie = `id=0;max-age=${week}`;
}
var results = document.cookie.match(/favorite_item=(.+?)(;|$)/);
var favorite_list = results[1].split(",");
let cout = favorite_list.length;
for (let i = 0; i < favorite_list.length; i++) {
  if (favorite_list[i] != 0) {
    $(".favorite_item").attr("data-text", cout);
    // document.querySelector(".favorite_item").setAttribute('data-text', favorite_list.length);
  }
}
let full_cookie = document.cookie.match(/id=(.+?)(;|$)/)[1].split(",");
let cookie_id = full_cookie[0];
get_name_header();
window.onload = async function get_products() {
  let res = await fetch(`${api_link}/products_cart_by_user`);
  let product_cart = await res.json();
  let count_cart = 0;
  product_cart.forEach((product) => {
    if (cookie_id == product.id_user) {
      count_cart++;
    }
  });
  $(".cart_item").attr("data-text", count_cart);

  if (cookie_id == 0) {
    var link = document.querySelector(".btn_login_header_no_login");
    link.addEventListener("click", function (evt_btn_login_header) {
      var login_popup = document.querySelector(".modal_auth");
      var close_win = document.querySelector(".close_win");
      var login = document.querySelector("[name=email]");
      evt_btn_login_header.preventDefault();
      login_popup.classList.add("modal_show");
      close_win.classList.add("modal_show");
      login.focus();
    });

    var link = document.querySelector(".modal_close_btn");
    link.addEventListener("click", function (evt_btn_login_header) {
      var login_popup = document.querySelector(".modal_auth");
      evt_btn_login_header.preventDefault();
      login_popup.classList.remove("modal_show");
    });
  }
};

async function get_name_header() {
  if (cookie_id != 0) {
    const check_name = await fetch(`${api_link}/users/${cookie_id}`);
    const name_user = await check_name.json();
    const get_li = document.querySelector("#btn_login_succes");
    get_li.innerHTML = `${name_user.firstname}`;
  }
}
