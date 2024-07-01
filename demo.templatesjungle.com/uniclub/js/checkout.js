$(document).ready(function () {
  var token = localStorage.getItem("token");

  let address;
  let phone;
  let total ;


  function fetchData() {
    $.ajax({
      url: `http://localhost:8080/cart`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
      success: function (data) {
        listProductOfCart = data.data;
        console.log(listProductOfCart);
        renderCartTotal(listProductOfCart);
      },
      error: function (error) {
        console.error("Error fetching all products:", error);
      },
    });
  }
  fetchData();

  function renderCartTotal(listProductOfCart) {
    if (listProductOfCart.length >= 0) {
        var totalPrice = 0;
        if(listProductOfCart.length > 0){
            for (i = 0; i < listProductOfCart.length; i++) {
                totalPrice +=
                  listProductOfCart[i].quantity * listProductOfCart[i].price;
              }
        
              $("#subTotal")
                .empty()
                .append(`<span class="price-currency-symbol">$</span>${totalPrice}`);
              $("#total")
                .empty()
                .append(`<span class="price-currency-symbol">$</span>${totalPrice}`);
        }else{
            $("#subTotal")
            .empty()
            .append(`<span class="price-currency-symbol"></span>`);
          $("#total")
            .empty()
            .append(`<span class="price-currency-symbol"></span>`);
        }
      
    }
    total = totalPrice;
  }

  // Insert Order

  function insertOrder(address, phone, totalPrice) {
    $.ajax({
      url: `http://localhost:8080/order`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "POST",
      contentType: "application/json",
      data:JSON.stringify({
        address: address,
        phone:phone,
        total:totalPrice
      }),
      success: function (data) {
        if(data.statusCode == 200){
            address = $("#faddress").val("");
            phone = $("#fphone").val("");
            fetchData();
        }
        
      },
      error: function (error) {
        console.error("Error insert order", error);
      },
    });
  }

  // Handle click button

  $('button[name="submit"]').on('click', function(e){
    e.preventDefault();
    address = $("#faddress").val();
    phone = $("#fphone").val();
    if(total == 0){
        alert(" Vui lòng thêm sản phẩm vào giỏ hàng")
        return true;
    };
    if(address && phone && total){
        insertOrder(address,phone,total);
        alert("Order successful")
    }else{
        alert("Vui Lòng nhập Thông tin address và phone")
    }
    

  })





});
