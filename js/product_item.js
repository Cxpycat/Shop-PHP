let cat_item = "";
window.onload = async function get_product() {
  let get_url = document.location.href;
  let get_id = get_url.split("id=")[1];

  let res = await fetch(`${api_link}/products`);
  let products = await res.json();

  products.forEach((product) => {
    if (get_id == product.id) {
      document.querySelector(".shop_item_insert").innerHTML = `
    <div class="sign_up_head">
            <span>Магазин</span>
            <div class="head_link">
                <a href="/index.php">Главная</a><span> / </span><a href="">Магазин</a><span> / </span><a
                    href="">${product.category}</a><span> / </span><a href="">${
        product.name
      }</a>
            </div>
        </div>


        <div class="sample_shop_item_main slider_item">

            <div class="sample_shop_item_photo">
                <img src="${product.img}" alt="">
            
            </div>

            <div class="sample_shop_item_info">
                <h1>${product.name}, ${product.weight}</h1>
                <div class="sample_shop_item_info_rate">
                </div>
                <div class="sample_shop_item_info_text_price">
                    <span>${product.text_small}</span>

                    <div class="sample_shop_item_info_price">
                        <span>${product.price}₽</span>
                        <p>${product.price}₽</p>
                    </div>
                </div>

                <div class="sample_shop_item_info_full_category">
                    <ul>
                        <li><span>Артикул:</span> <a href="">${
                          product.id
                        }</a></li>
                        <li><span>Категория:</span> <a href="">${
                          product.category
                        }</a></li>                    
                    </ul>
                </div>
            </div>

            <div class="sample_shop_item_btn">
                <div class="sample_shop_item_btn_avalible">
                    <span>Наличие: </span>
                    <p>Есть в наличии</p>
                </div>
                <div id="check_cart">
                <button type="submit" class="btn" onclick="add_cart(${document.cookie
                  .match(/id=(.+?)(;|$)/)[1]
                  .split(",")},${product.id})">Добавить в корзину</button>
                  </div>
                <div class="main_cat_relative">
                    <button type="button" class="btn_whishlist" onclick="add_favorite(${
                      product.id
                    })">Добавить в список желаний</button>
                </div>

                <img src="img/payment.png" alt="">

            </div>
        </div>

        <div class="sample_shop_item_description">
            <ul>
                <li class="sample_shop_item_description_li_selected" id="des_1"><a>Описание </a></li>
                <li id="des_2"><a>Дополнительная информация</a></li>
            </ul>
            <div class="description_text">${product.text}</div>
            <table class="description_table description_hide">
                <tbody>
                    <tr>
                        <td>Бренд</td>
                        <td>Эми, Дейли, Дайя, Гардейн, Рябь</td>
                    </tr>
                    <tr>
                        <td>Цвет</td>
                        <td>Бежевый, Черный, Синий, Коричневый, Голубой, Серый, Красный</td>
                    </tr>
                    <tr>
                        <td>Размер</td>
                        <td>2XL, 3XL, L, M, S, XL</td>
                    </tr>
                    <tr>
                        <td>Масса</td>
                        <td>3,30 фунта, 3,50 фунта, 3,97 фунта, 4,84 фунта</td>
                    </tr>
                </tbody>
                </tr>
            </table>
        </div>

        <div class="main_category_shop">
            <img src="../img/svg/food.svg" alt="">
            <p>Сопутствующие товары</p>
            <h2>${product.category}</h2>
        </div>
    `;
      cat_item = product.category;
    }
  });

  let elem_des1 = document.querySelector("#des_1");
  let elem_des2 = document.querySelector("#des_2");
  elem_des1.addEventListener("click", des1_fun);
  elem_des2.addEventListener("click", des2_fun);

  function des1_fun() {
    elem_des1.classList.add("sample_shop_item_description_li_selected");
    elem_des2.classList.remove("sample_shop_item_description_li_selected");
    document
      .querySelector(".description_text")
      .classList.remove("description_hide");
    document
      .querySelector(".description_table")
      .classList.add("description_hide");
  }
  function des2_fun() {
    elem_des2.classList.add("sample_shop_item_description_li_selected");
    elem_des1.classList.remove("sample_shop_item_description_li_selected");
    document
      .querySelector(".description_text")
      .classList.add("description_hide");
    document
      .querySelector(".description_table")
      .classList.remove("description_hide");
  }

  let res1 = `${api_link}/products/`;
  let res2 = res1 + cat_item;

  let res_cat = await fetch(res2);
  let products_cat = await res_cat.json();

  products_cat.forEach((product_cat) => {
    if (cat_item == product_cat.category) {
      document.querySelector(".product_more_item").innerHTML += `
      <a href="product_item.php?id=${product_cat.id}"><div class="main_product_item slider_item">
      <div class="main_product_item_photo">
          <img src="${product_cat.img}" alt="">
      </div>
      <a href="" class="main_product_item_cat">${product_cat.category}</a>
      <a href="" class="main_product_item_name">${product_cat.name}, ${product_cat.weight}</a>
      <p>${product_cat.price}₽</p>
  
      <div class="main_product_item_hide">
          <a href="http://biolife/product_item.php?id=${product_cat.id}" class="btn">Подробнее</a>
      </div>
  </div></a>
       `;
    }
  });

  $(document).ready(function slide() {
    let position = 0;
    const slidesTOShow = 4;
    const slideToScroll = 2;
    const container = $(".slider_container");
    const track = $(".slider_track");
    const item = $(".slider_item");
    const btnPrev = $(".btn_prev");
    const btnNext = $(".btn_next");
    const itemsCount = item.length;
    var itemWidth = (container.width() - slidesTOShow / 2) / slidesTOShow;
    var movePosition = slideToScroll * itemWidth;

    item.each(function (index, item) {
      $(item).css({
        minWidth: itemWidth,
      });
    });

    btnNext.click(function () {
      const itemLeft =
        itemsCount -
        (Math.abs(position) + slidesTOShow * itemWidth) / itemWidth;
      position -=
        itemLeft >= slideToScroll ? movePosition : itemLeft * itemWidth;
      setPosition();
    });

    btnPrev.click(function () {
      const itemLeft = Math.abs(position) / itemWidth;
      position +=
        itemLeft >= slideToScroll ? movePosition : itemLeft * itemWidth;
      setPosition();
    });

    const setPosition = () => {
      track.css({
        transform: `translateX(${position}px)`,
      });
      checkBtns();
    };

    const checkBtns = () => {
      btnPrev.prop("disabled", position === 0);
      btnNext.prop(
        "disabled",
        position <= -(itemsCount - slidesTOShow) * itemWidth
      );
    };

    checkBtns();
  });
  let full_cookie = document.cookie.match(/id=(.+?)(;|$)/)[1].split(",");
  let cookie_id = full_cookie[0];
  let res3 = await fetch(`${api_link}/products_cart_by_user`);
  let product_cart = await res3.json();

  product_cart.forEach((product) => {
    if (cookie_id == product.id_user && get_id == product.id_product) {
      document.querySelector("#check_cart").innerHTML = `
      <div class="input_couter" style="margin: 0 0 10px 0">
      <button class="number_minus" id="number_minus_${product.id}" type="button" onclick="number_minus(${product.id})">-</button>
      <input id="value_of_count_${product.id}" class="qweqr"type="number" min="1" value="${product.count}">
      <button class="number_plus" id="number_plus_${product.id}" type="button" onclick="number_plus(${product.id})">+</button>
      </div>
        `;
    }
  });
  var get_favorite = document.cookie.match(/favorite_item=(.+?)(;|$)/);
  var favorite_list = results[1].split(",");
  for (let i = 0; i < favorite_list.length; i++) {
    if (get_id == favorite_list[i]) {
      var btn_favorite = document.querySelector(".main_cat_relative");
      btn_favorite.innerHTML = `<button type="button" class="btn_whishlist_done" onclick="remove_favorite(${get_id})">Товар уже в избранном</button>`;
    }
  }
  let count_cart = 0;
  product_cart.forEach((product) => {
    if (cookie_id == product.id_user) {
      count_cart++;
    }
  });
  $(".cart_item").attr("data-text", count_cart);
};

async function number_plus(id) {
  const el = document.querySelector(`#number_plus_${id}`);
  el.previousElementSibling.stepUp(1);
  const value_count_tmp = document.querySelectorAll(`input`);
  value_count = value_count_tmp[3].value;
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
  const value_count_tmp = document.querySelectorAll(`input`);
  value_count = value_count_tmp[3].value;
  var data = {
    id: id,
    count_cart: value_count,
  };
  update_cart(data);

  if (value_count == 1) {
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

async function update_cart(data) {
  const res_link = await fetch(`${api_link}/products_cart_by_user`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

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
