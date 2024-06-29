$(document).ready(function(){
    $('.btn-login').click(function(){
        var email = $('#lg-email').val().toLowerCase()
        var password = $('#lg-password').val()

        $.ajax({
            method: "POST",
            url: "http://localhost:8080/auth/signin",
            data: { email: email, password: password }
          })
            .done(function( result ) {
                if(result && result.statusCode == 200){
                    localStorage.setItem("token", result.data)
                    window.location.href = "http://127.0.0.1:5500/demo.templatesjungle.com/uniclub/index-2.html"
                }
            });
    })
})