async function get_blogs() {
  let res = await fetch(`${api_link}/blogs`);
  let blogs = await res.json();
  let count_blog = 0;
  blogs.forEach((blog) => {
    if (count_blog < 4) {
      count_blog++;
      let data_arr = blog.date_small.split("-");

      switch (data_arr[1]) {
        case "01":
          data_arr[1] = "ЯНВ";
          break;
        case "02":
          data_arr[1] = "ФЕВ";
          break;
        case "03":
          data_arr[1] = "МАР";
          break;
        case "04":
          data_arr[1] = "АПР";
          break;
        case "05":
          data_arr[1] = "МАЙ";
          break;
        case "06":
          data_arr[1] = "ИЮН";
          break;
        case "07":
          data_arr[1] = "ИЮЛ";
          break;
        case "08":
          data_arr[1] = "АВГ";
          break;
        case "09":
          data_arr[1] = "СЕН";
          break;
        case "10":
          data_arr[1] = "ОКТ";
          break;
        case "11":
          data_arr[1] = "НОЯ";
          break;
        case "12":
          data_arr[1] = "ДЕК";
          break;
      }

      document.querySelector(".main_news_slider").innerHTML += `
      <a href="blog_item.php?id=${blog.id}"><div class="main_news_item">
        <div class="main_cat_relative">
            <div class="main_news_item_photo"><img src="${blog.img}" alt=""></div><a href=""
                class="main_news_date">${data_arr[2]}<br>${data_arr[1]}</a>
        </div>
        <h2>${blog.name}</h2>
        <p>Разместил(а): ${blog.creator}</p>
        <div class="main_news_blog_p"><p>${blog.text_small}</p></div>
        <a href="blog_item.php?id=${blog.id}" class="btn_more">Читать дальше</a>
      </div></a>
                `;
    }
  });
}

get_blogs();
