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
  const itemWidth = (container.width() - slidesTOShow / 2) / slidesTOShow;
  const movePosition = slideToScroll * itemWidth;

  item.each(function (index, item) {
    $(item).css({
      minWidth: itemWidth,
    });
  });

  btnNext.click(function () {
    const itemLeft =
      itemsCount - (Math.abs(position) + slidesTOShow * itemWidth) / itemWidth;
    position -= itemLeft >= slideToScroll ? movePosition : itemLeft * itemWidth;
    setPosition();
  });

  btnPrev.click(function () {
    const itemLeft = Math.abs(position) / itemWidth;
    position += itemLeft >= slideToScroll ? movePosition : itemLeft * itemWidth;
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
