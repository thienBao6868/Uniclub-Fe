$(document).ready(function () {
  $(".btn-login").click(function (event) {
    var email = $("#lg-email").val().toLowerCase();
    var password = $("#lg-password").val();

    event.preventDefault();

    $.ajax({
      method: "POST",
      url: "http://localhost:8080/auth/signin",
      data: { email: email, password: password },
    }).done(function (result) {
      if (result && result.statusCode == 200) {
        localStorage.setItem("token", result.data);
        window.location.href =
          "http://127.0.0.1:5500/demo.templatesjungle.com/uniclub/index-2.html";
      }
    });
  });

  $(".btn-signup").click(function (event) {

    event.preventDefault();

    var newEmail = $("#exampleInputEmail1").val().toLowerCase();
    var newPassword = $("#inputPassword1").val();

    $.ajax({
      method: "POST",
      url: `http://localhost:8080/auth/signup?email=${newEmail}&password=${newPassword}`,
    }).done(function (result) {
      
      if(result && result.statusCode == 200){
          alert("Create New User successful, Vui Lòng Login với Tài khoản vừa đăng ký")
      }else{
        alert("Tạo tài khoản mới chưa thành công, vui lòng kiểm tra email hoặc mật khẩu")
      }
    });
  });
});
