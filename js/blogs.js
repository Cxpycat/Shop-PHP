async function get_blogs() {
  let res = await fetch(`${api_link}/blogs`);
  let blogs = await res.json();

  blogs.forEach((blog) => {
    document.querySelector(".blog_list").innerHTML += `
    <a href="blog_item.php?id=${blog.id}">
        <div class="blog_list_item">
            <div class="blog_list_item_item_photo"><img src="${blog.img}" alt=""></div>

            <div class="blog_list_item_dis">
                <a href="blog_item.php?id=${blog.id}">${blog.name}</a>
                <div class="blog_list_item_dis_name">
                    <div>
                        <a href="">ОРГАНИЧЕСКИЙ / </a>
                        <a href="">${blog.date}</a>
                    </div>
                    <span>Разместил(а): ${blog.creator}</span>
                </div>

                <div class="blog_list_item_dis_full">
                    <span>
                        ${blog.text}
                    </span>
                </div>
                <div class="blog_list_item_dis_btn">
                    <a class="btn" href="blog_item.php?id=${blog.id}">Подробнее</a>
                    <span>
                        <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                            fill="none">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 8h10M7 11h10M7 14h4m-8 4V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7.667a2 2 0 0 0-1.2.4L3 21v-3z" />
                        </svg>

                    </span>
                </div>
            </div>
        </div>
    </a>
        `;
  });
}
get_blogs();
