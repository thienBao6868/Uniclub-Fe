$(document).ready(function () {
  var token = localStorage.getItem("token");

  let address;
  let phone;
  var totalPrice = 0;


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
    if (listProductOfCart.length > 0) {
      
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
    }
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

    if(address && phone && totalPrice){
        insertOrder(address,phone,totalPrice);
    }else{
        alert("Vui Lòng nhập Thông tin address và phone")
    }
    

  })





});
