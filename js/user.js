async function addUser() {
  const email_nu = document.getElementById("email_nu").value;
  const password_nu = document.getElementById("password_nu").value;
  const password2_nu = document.getElementById("password2_nu").value;
  const FIO_nu = document.getElementById("FIO_nu").value;
  var phone_nu = document.getElementById("phone_nu").value;

  var formData = new FormData();
  formData.append("email_nu", email_nu);
  formData.append("password_nu", password_nu);
  formData.append("password2_nu", password2_nu);
  formData.append("FIO_nu", FIO_nu);
  formData.append("phone_nu", phone_nu);

  const res = await fetch(`${api_link}/users`, {
    method: "POST",
    body: formData,
  });
  let data = await res.json();
  console.log(data);
  switch (data.error) {
    case "wrong email":
      document.cookie =
        'message_sign_up_error=<p class="alert_danger alert_danger_p">Пользователь с таким email уже существует</p>;max-age=5';
      window.location.href = "sign_up.php";
      break;
    case "wrong pass":
      document.cookie =
        'message_sign_up_error=<p class="alert_danger alert_danger_p">Пароли не совпадают</p>;max-age=5';
      window.location.href = "sign_up.php";
      break;
    case "wrong phone":
      document.cookie =
        'message_sign_up_error=<p class="alert_danger alert_danger_p">Пользователь с таким телефоном уже существует </p>;max-age=5';
      window.location.href = "sign_up.php";
      break;
    default:
      document.cookie =
        "message_sign_up=Вы успешно зарегистрировались;max-age=5";
      document.cookie = "sign_up_succes=modal_show;max-age=5";
      document.cookie = "id_user_succes=123;max-age=60*60*2";
      document.cookie = "sign_up_succes=modal_show;max-age=5";
      window.location.href = "index.php";
      break;
  }
}

async function getUser() {
  const email = document.querySelector("#email").value;
  var password_tmp = document.querySelector("#password").value;

  const password = MD5(password_tmp);
  let count = 0;
  let res = await fetch(`${api_link}/users`);
  let users = await res.json();
  users.forEach((user) => {
    if (count == 0) {
      if (email == user.email && password == user.password) {
        count++;
        const week = 60 * 60 * 24 * 7;
        document.cookie = `id=${user.id};max-age=${week}`;
        document.cookie = `lastname=${user.lastname};max-age=${week}`;
        document.cookie = `firstname=${user.firstname};max-age=${week}`;
        document.cookie = `email=${user.email};max-age=${week}`;
        document.cookie = `phone=${user.phone};max-age=${week}`;
        document.cookie = `user_login_succes=succes;max-age=${week}`;
        document.cookie = `message_login_succes= <p class="modal_alert modal_login modal_show">Добро пожаловать ${user.firstname}</p>;max-age=5`;
        window.location.href = "index.php";
      } else {
        const message_wrong_pass =
          '<p class="alert_danger alert_danger_p">Неверный логин или пароль</p>';
        document.cookie = `message_login=${message_wrong_pass};max-age=5`;
        document.querySelector("#message_wrong_pass").innerHTML =
          message_wrong_pass;
      }
    }
  });
}

async function updateUser(id) {
  let data_user = await fetch(`${api_link}/users/${id}`);
  let user = await data_user.json();
  let code_pass = -1;
  const first_name = document.querySelector("#_first_name").value;
  const last_name = document.querySelector("#_last_name").value;
  const email = document.querySelector("#_email").value;
  const img = document.querySelector("#_img").value;
  const phone = document.querySelector("#_phone").value;

  const current_pas = document.querySelector("#_current_pas").value;
  let current_pas_md5 = MD5(current_pas);

  const password = document.querySelector("#_password").value;
  let password_md5 = MD5(password);

  const password2 = document.querySelector("#_password2").value;

  if (password != password2) {
    alert("Пароли не совпадают");
    code_pass = 0;
  } else if (current_pas_md5 != user.password && current_pas != "") {
    alert("Неверный текущий пароль");
    code_pass = 1;
  } else if (current_pas == "") {
    alert("Введите пароль");
    code_pass = 2;
  } else if (
    password == "" &&
    password == password2 &&
    current_pas_md5 == user.password &&
    current_pas != "" &&
    code_pass != 0 &&
    code_pass != 1 &&
    code_pass != 2
  ) {
    alert("Данные обновлены");
    code_pass = 3;
  } else if (
    password != "" &&
    password == password2 &&
    current_pas_md5 == user.password &&
    current_pas != "" &&
    code_pass != 0 &&
    code_pass != 1 &&
    code_pass != 2
  ) {
    alert("Пароль изменен");
    code_pass = 4;
  }

  if (code_pass == 3) {
    if (img == "") {
      var data = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        img: user.img,
        password: user.password,
      };
    } else if (img != "") {
      var data = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        img: img,
        password: user.password,
      };
    }
  }

  if (code_pass == 4) {
    if (img == "") {
      var data = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        password: password_md5,
        img: user.img,
      };
    } else if (img != "") {
      var data = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        img: img,
        password: password_md5,
      };
    }
  }
  save();
  if (current_pas != "") {
    let res = await fetch(`${api_link}/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    let res_data = await res.json();

    if (res_data.status === true) {
      alert("Изменения сохранены");
      sleep(1000);
      window.location = "/profile.php";
    }
  }
}
function sleep(millis) {
  var t = new Date().getTime();
  var i = 0;
  while (new Date().getTime() - t < millis) {
    i++;
  }
}
function save() {
  let f = document.getElementById("_img").files[0];
  let i = document.getElementById("img_change_profile");
  if (f) {
    i.src = URL.createObjectURL(f);
    localStorage.setItem("myImage", i.src);
  }
}

var MD5 = function (d) {
  d = unescape(encodeURIComponent(d));
  result = M(V(Y(X(d), 8 * d.length)));
  return result.toLowerCase();
};

function M(d) {
  for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)
    (_ = d.charCodeAt(r)), (f += m.charAt((_ >>> 4) & 15) + m.charAt(15 & _));
  return f;
}

function X(d) {
  for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++) _[m] = 0;
  for (m = 0; m < 8 * d.length; m += 8)
    _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32;
  return _;
}

function V(d) {
  for (var _ = "", m = 0; m < 32 * d.length; m += 8)
    _ += String.fromCharCode((d[m >> 5] >>> m % 32) & 255);
  return _;
}

function Y(d, _) {
  (d[_ >> 5] |= 128 << _ % 32), (d[14 + (((_ + 64) >>> 9) << 4)] = _);
  for (
    var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0;
    n < d.length;
    n += 16
  ) {
    var h = m,
      t = f,
      g = r,
      e = i;
    (f = md5_ii(
      (f = md5_ii(
        (f = md5_ii(
          (f = md5_ii(
            (f = md5_hh(
              (f = md5_hh(
                (f = md5_hh(
                  (f = md5_hh(
                    (f = md5_gg(
                      (f = md5_gg(
                        (f = md5_gg(
                          (f = md5_gg(
                            (f = md5_ff(
                              (f = md5_ff(
                                (f = md5_ff(
                                  (f = md5_ff(
                                    f,
                                    (r = md5_ff(
                                      r,
                                      (i = md5_ff(
                                        i,
                                        (m = md5_ff(
                                          m,
                                          f,
                                          r,
                                          i,
                                          d[n + 0],
                                          7,
                                          -680876936
                                        )),
                                        f,
                                        r,
                                        d[n + 1],
                                        12,
                                        -389564586
                                      )),
                                      m,
                                      f,
                                      d[n + 2],
                                      17,
                                      606105819
                                    )),
                                    i,
                                    m,
                                    d[n + 3],
                                    22,
                                    -1044525330
                                  )),
                                  (r = md5_ff(
                                    r,
                                    (i = md5_ff(
                                      i,
                                      (m = md5_ff(
                                        m,
                                        f,
                                        r,
                                        i,
                                        d[n + 4],
                                        7,
                                        -176418897
                                      )),
                                      f,
                                      r,
                                      d[n + 5],
                                      12,
                                      1200080426
                                    )),
                                    m,
                                    f,
                                    d[n + 6],
                                    17,
                                    -1473231341
                                  )),
                                  i,
                                  m,
                                  d[n + 7],
                                  22,
                                  -45705983
                                )),
                                (r = md5_ff(
                                  r,
                                  (i = md5_ff(
                                    i,
                                    (m = md5_ff(
                                      m,
                                      f,
                                      r,
                                      i,
                                      d[n + 8],
                                      7,
                                      1770035416
                                    )),
                                    f,
                                    r,
                                    d[n + 9],
                                    12,
                                    -1958414417
                                  )),
                                  m,
                                  f,
                                  d[n + 10],
                                  17,
                                  -42063
                                )),
                                i,
                                m,
                                d[n + 11],
                                22,
                                -1990404162
                              )),
                              (r = md5_ff(
                                r,
                                (i = md5_ff(
                                  i,
                                  (m = md5_ff(
                                    m,
                                    f,
                                    r,
                                    i,
                                    d[n + 12],
                                    7,
                                    1804603682
                                  )),
                                  f,
                                  r,
                                  d[n + 13],
                                  12,
                                  -40341101
                                )),
                                m,
                                f,
                                d[n + 14],
                                17,
                                -1502002290
                              )),
                              i,
                              m,
                              d[n + 15],
                              22,
                              1236535329
                            )),
                            (r = md5_gg(
                              r,
                              (i = md5_gg(
                                i,
                                (m = md5_gg(
                                  m,
                                  f,
                                  r,
                                  i,
                                  d[n + 1],
                                  5,
                                  -165796510
                                )),
                                f,
                                r,
                                d[n + 6],
                                9,
                                -1069501632
                              )),
                              m,
                              f,
                              d[n + 11],
                              14,
                              643717713
                            )),
                            i,
                            m,
                            d[n + 0],
                            20,
                            -373897302
                          )),
                          (r = md5_gg(
                            r,
                            (i = md5_gg(
                              i,
                              (m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691)),
                              f,
                              r,
                              d[n + 10],
                              9,
                              38016083
                            )),
                            m,
                            f,
                            d[n + 15],
                            14,
                            -660478335
                          )),
                          i,
                          m,
                          d[n + 4],
                          20,
                          -405537848
                        )),
                        (r = md5_gg(
                          r,
                          (i = md5_gg(
                            i,
                            (m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438)),
                            f,
                            r,
                            d[n + 14],
                            9,
                            -1019803690
                          )),
                          m,
                          f,
                          d[n + 3],
                          14,
                          -187363961
                        )),
                        i,
                        m,
                        d[n + 8],
                        20,
                        1163531501
                      )),
                      (r = md5_gg(
                        r,
                        (i = md5_gg(
                          i,
                          (m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467)),
                          f,
                          r,
                          d[n + 2],
                          9,
                          -51403784
                        )),
                        m,
                        f,
                        d[n + 7],
                        14,
                        1735328473
                      )),
                      i,
                      m,
                      d[n + 12],
                      20,
                      -1926607734
                    )),
                    (r = md5_hh(
                      r,
                      (i = md5_hh(
                        i,
                        (m = md5_hh(m, f, r, i, d[n + 5], 4, -378558)),
                        f,
                        r,
                        d[n + 8],
                        11,
                        -2022574463
                      )),
                      m,
                      f,
                      d[n + 11],
                      16,
                      1839030562
                    )),
                    i,
                    m,
                    d[n + 14],
                    23,
                    -35309556
                  )),
                  (r = md5_hh(
                    r,
                    (i = md5_hh(
                      i,
                      (m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060)),
                      f,
                      r,
                      d[n + 4],
                      11,
                      1272893353
                    )),
                    m,
                    f,
                    d[n + 7],
                    16,
                    -155497632
                  )),
                  i,
                  m,
                  d[n + 10],
                  23,
                  -1094730640
                )),
                (r = md5_hh(
                  r,
                  (i = md5_hh(
                    i,
                    (m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174)),
                    f,
                    r,
                    d[n + 0],
                    11,
                    -358537222
                  )),
                  m,
                  f,
                  d[n + 3],
                  16,
                  -722521979
                )),
                i,
                m,
                d[n + 6],
                23,
                76029189
              )),
              (r = md5_hh(
                r,
                (i = md5_hh(
                  i,
                  (m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487)),
                  f,
                  r,
                  d[n + 12],
                  11,
                  -421815835
                )),
                m,
                f,
                d[n + 15],
                16,
                530742520
              )),
              i,
              m,
              d[n + 2],
              23,
              -995338651
            )),
            (r = md5_ii(
              r,
              (i = md5_ii(
                i,
                (m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844)),
                f,
                r,
                d[n + 7],
                10,
                1126891415
              )),
              m,
              f,
              d[n + 14],
              15,
              -1416354905
            )),
            i,
            m,
            d[n + 5],
            21,
            -57434055
          )),
          (r = md5_ii(
            r,
            (i = md5_ii(
              i,
              (m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571)),
              f,
              r,
              d[n + 3],
              10,
              -1894986606
            )),
            m,
            f,
            d[n + 10],
            15,
            -1051523
          )),
          i,
          m,
          d[n + 1],
          21,
          -2054922799
        )),
        (r = md5_ii(
          r,
          (i = md5_ii(
            i,
            (m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359)),
            f,
            r,
            d[n + 15],
            10,
            -30611744
          )),
          m,
          f,
          d[n + 6],
          15,
          -1560198380
        )),
        i,
        m,
        d[n + 13],
        21,
        1309151649
      )),
      (r = md5_ii(
        r,
        (i = md5_ii(
          i,
          (m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070)),
          f,
          r,
          d[n + 11],
          10,
          -1120210379
        )),
        m,
        f,
        d[n + 2],
        15,
        718787259
      )),
      i,
      m,
      d[n + 9],
      21,
      -343485551
    )),
      (m = safe_add(m, h)),
      (f = safe_add(f, t)),
      (r = safe_add(r, g)),
      (i = safe_add(i, e));
  }
  return Array(m, f, r, i);
}

function md5_cmn(d, _, m, f, r, i) {
  return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m);
}

function md5_ff(d, _, m, f, r, i, n) {
  return md5_cmn((_ & m) | (~_ & f), d, _, r, i, n);
}

function md5_gg(d, _, m, f, r, i, n) {
  return md5_cmn((_ & f) | (m & ~f), d, _, r, i, n);
}

function md5_hh(d, _, m, f, r, i, n) {
  return md5_cmn(_ ^ m ^ f, d, _, r, i, n);
}

function md5_ii(d, _, m, f, r, i, n) {
  return md5_cmn(m ^ (_ | ~f), d, _, r, i, n);
}

function safe_add(d, _) {
  var m = (65535 & d) + (65535 & _);
  return (((d >> 16) + (_ >> 16) + (m >> 16)) << 16) | (65535 & m);
}

function bit_rol(d, _) {
  return (d << _) | (d >>> (32 - _));
}
