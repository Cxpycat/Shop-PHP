async function get_products(tag) {
  const track = $(".slider_track");
  document.querySelector(".slider_track").innerHTML = ``;
  track.css({
    transform: `translateX(${0}px)`,
  });
  let link_tmp = `${api_link}/products/`;
  link = link_tmp + tag;

  let res = await fetch(link);
  let products = await res.json();
  products.forEach((product) => {
    document.querySelector(".slider_track").innerHTML += `
      <a href="product_item.php?id=${product.id}"><div class="main_product_item slider_item">
      <div class="main_product_item_photo">
          <img src="${product.img}" alt="">
      </div>
      <a href="" class="main_product_item_cat">${product.category}</a>
      <a href="" class="main_product_item_name">${product.name}, ${product.weight}</a>
      <p>${product.price}₽</p>
  
      <div class="main_product_item_hide">
          <a href="" class="btn">Подробнее</a>
      </div>
  </div></a>
       `;
  });
  var selected = document.querySelector(".shop_icon_item_selected");
  selected.classList.remove("shop_icon_item_selected");
  var new_select = document.querySelector(`#${tag}`);
  new_select.classList.add("shop_icon_item_selected");
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
}
get_products("фрукты");
