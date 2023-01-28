let item_per_page = 5;
let selectCount_pages = document.getElementById("count_pages");
selectCount_pages.addEventListener("change", (e) => {
  let value_item_per_page = e.target.value;
  item_per_page = value_item_per_page;
  release_page(1);
  get_products_all();
});

async function release_page(page_number) {
  let counter = 0;
  document.querySelector(".list_products").innerHTML = ``;
  let res = await fetch(`${api_link}/products`);
  let products = await res.json();
  products.forEach((product) => {
    counter++;
    if (
      counter > (page_number - 1) * item_per_page &&
      counter < page_number * item_per_page
    ) {
      document.querySelector(".list_products").innerHTML += `
    <div class="shop_products_list_item" id="${product.id}">
            <div class="shop_products_list_item_photo">
                <img src="${product.img}" alt="">
            </div>
            <div class="shop_products_list_item_text">
                <a href="">${product.category}</a>
                <a href="product_item.php?id=${product.id}">${product.name}</a>
                <span>
                    ${product.text}
                </span>
                <div class="shop_products_list_item_price">
                    <span>${product.price_sale}₽</span>
                    <p>${product.price}₽</p>
                </div>
                <div class="shop_products_list_item_btn">
                <div id="cart_btn_${product.id}">
                    <button type="submit" class="btn" onclick="add_cart(${document.cookie
                      .match(/id=(.+?)(;|$)/)[1]
                      .split(",")},${product.id})">Добавить в корзину</button>
                      </div>
                    <spand id="productt_${product.id}" class="sup_btn" >
                    <button type="submit" class="btn_third" onclick="add_favorite(${
                      product.id
                    })">                
                    <div class="svg_favorite">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 507.168 507.168"
                            style="enable-background:new 0 0 507.168 507.168;" xml:space="preserve">
                            <g>
                                <g>
                                    <path
                                        d="M368.804,38.31c-46.848,0-89.452,23.064-115.212,62.008C227.836,61.374,185.22,38.31,138.384,38.31			C62.08,38.31,0,100.402,0,176.738c0,69.304,43.66,141.764,126.264,209.576c62.048,50.924,124.96,81.84,125.592,82.144			c0.544,0.268,1.14,0.4,1.732,0.4s1.188-0.128,1.736-0.4c0.628-0.304,63.544-31.22,125.584-82.144			c82.604-67.808,126.26-140.268,126.26-209.576C507.172,100.402,445.1,38.31,368.804,38.31z" />
                                </g>
                            </g>
                        </svg>
                        </div>
                       
                    </button>
                    </spand>
                </>
                
        </div>
        </div>
     `;
      product_get_cart(product.id);
    }
  });
  product_get_fav();
}

async function get_products_all() {
  document.querySelector(".btns_page").innerHTML = ``;
  let res = await fetch(`${api_link}/products`);
  let products = await res.json();
  let count = 1;
  products.forEach((product) => {
    count++;
  });

  let count_page = count / item_per_page;
  for (let i = 1; i < count_page; i++) {
    let page = i;
    document.querySelector(".btns_page").innerHTML += `
    <button type="button" onclick="release_page(${page})">${page}</button>
  `;
  }
  if (item_per_page > count) {
    document.querySelector("#shop_products_list_menu").innerHTML = `
    Показано ${count} из ${count} товаров`;
  } else {
    document.querySelector("#shop_products_list_menu").innerHTML = `
  Показано ${item_per_page} из ${count} товаров`;
  }
}

release_page(1);
get_products_all();

async function product_get_fav() {
  var results = document.cookie.match(/favorite_item=(.+?)(;|$)/);
  var favorite_list = results[1].split(",");
  if (favorite_list != 0) {
    for (let i = 0; i < favorite_list.length; i++) {
      let ell = document.getElementById(`productt_${favorite_list[i]}`);
      //classList.add("svg_favorite_pick");
      ell.innerHTML = `
    <button type="submit" class="svg_favorite_pick" onclick="remove_favorite(${favorite_list[i]})">  
      </div>
    <div class="svg_favorite">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 507.168 507.168"
            style="enable-background:new 0 0 507.168 507.168;" xml:space="preserve">
            <g>
                <g>
                    <path
                        d="M368.804,38.31c-46.848,0-89.452,23.064-115.212,62.008C227.836,61.374,185.22,38.31,138.384,38.31			C62.08,38.31,0,100.402,0,176.738c0,69.304,43.66,141.764,126.264,209.576c62.048,50.924,124.96,81.84,125.592,82.144			c0.544,0.268,1.14,0.4,1.732,0.4s1.188-0.128,1.736-0.4c0.628-0.304,63.544-31.22,125.584-82.144			c82.604-67.808,126.26-140.268,126.26-209.576C507.172,100.402,445.1,38.31,368.804,38.31z" />
                </g>
            </g>
        </svg>
        </div>
    </button>            `;
    }
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

async function update_cart(data) {
  const res_link = await fetch(`${api_link}/products_cart_by_user`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
