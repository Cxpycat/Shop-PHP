async function products_promo() {
  let res = await fetch(`${api_link}/products/promo`);
  let products = await res.json();

  products.forEach((product) => {
    document.querySelector(".slider_track").innerHTML += `
    <a href="product_item.php?id=${product.id}"><div class="shop_products_hot_item slider_item">
    <div class="shop_products_hot_item_photo"><img src="${product.img}" alt=""></div>
    <a href="">${product.category}</a>
    <a href="">${product.name}</a>
    <div class="shop_products_hot_item_text">
    <span>${product.price_sale}₽</span>
    <p>${product.price}₽</p>
    </div>
    </div></a>
    `;
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
    const itemWidth =
      (container.width() - slidesTOShow / 2) / slidesTOShow - slideToScroll;
    const movePosition = slideToScroll * itemWidth + slidesTOShow;

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
products_promo();
