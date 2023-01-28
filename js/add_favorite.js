function add_favorite(id) {
  var results = document.cookie.match(/favorite_item=(.+?)(;|$)/);
  var favorite_list = results[1].split(",");
  let name = "favorite_item";
  if (favorite_list == 0) {
    document.cookie = name + "=" + id;
  } else {
    let value = favorite_list + "," + id;
    document.cookie = name + "=" + value;
  }
  window.location.reload();
}

function remove_favorite(id) {
  var results = document.cookie.match(/favorite_item=(.+?)(;|$)/);
  var favorite_list = results[1].split(",");
  let favorite_new_list = new Array();
  for (let i = 0; i < favorite_list.length; i++) {
    if (favorite_list[i] != id) {
      favorite_new_list[i] = favorite_list[i];
    }
  }

  favorite_new_list = favorite_new_list.filter(function (e) {
    return e;
  });
  let name = "favorite_item";
  let value = favorite_new_list;
  document.cookie = name + "=" + value;
  window.location.reload();
}
