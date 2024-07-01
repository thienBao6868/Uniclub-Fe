$(document).ready(function () {
  var token = localStorage.getItem("token");
  let listProductOfCart = [];

  if (!token) {
    window.location.href =
      "http://127.0.0.1:5500/demo.templatesjungle.com/uniclub/account.html";
  }

  function fetchData() {
    $.ajax({
      url: `http://localhost:8080/cart`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
      success: function (data) {
        listProductOfCart = data.data;
        renderCarts(listProductOfCart);
        renderCartTotal(listProductOfCart);
      },
      error: function (error) {
        console.error("Error fetching all products:", error);
      },
    });
  }
  fetchData();

  function renderCarts(listProductOfCart) {
    if (listProductOfCart.length > 0) {
      var html = "";
      for (i = 0; i < listProductOfCart.length; i++) {
        var item = listProductOfCart[i];
        html += `<tr id-product=${item.id} id-color=${item.idColor} id-size=${
          item.idSize
        }>
        <td scope="row" class="py-4">
          <div class="cart-info d-flex flex-wrap align-items-center ">
            <div class="col-lg-3">
              <div class="card-image">
                <img src="${item.images[0]}" alt="cloth" class="img-fluid">
              </div>
            </div>
            <div class="col-lg-9">
              <div class="card-detail ps-3">
                <h6 class="card-title">
                  <a href="#" class="text-decoration-none">${
                    item.productName
                  }</a>
                </h6>
              </div>
            </div>
          </div>
        </td>
        <td class="py-4 align-middle">
          <div class="input-group product-qty align-items-center w-55>
            <span class="input-group-btn">
              <button type="button" class="quantity-left-minus p-1 btn btn-light btn-number" data-type="minus" data-cart-id="${
                item.id
              }">
                <svg width="16" height="16">
                  <use xlink:href="#minus"></use>
                </svg>
              </button>
            </span>
            <input type="text" id="quantity-${item.id}" name="quantity"
              class="form-control input-number text-center p-2 mx-1" value="${
                item.quantity
              }">
            <span class="input-group-btn">
              <button type="button" class="quantity-right-plus p-1 btn btn-light btn-number" data-type="plus" data-cart-id="${
                item.id
              }"
                data-field="">
                <svg width="16" height="16">
                  <use xlink:href="#plus"></use>
                </svg>
              </button>
            </span>
          </div>
        </td>
        <td class="py-4 align-middle">
          <div class="total-price">
            <span class="secondary-font fw-medium">${
              item.quantity * item.price
            }</span>
          </div>
        </td>
        <td class="py-4 align-middle">
          <div class="cart-remove">
            <button class="select-deleted" data-val=${item.id}>
              <svg width="24" height="24">
                <use xlink:href="#trash"></use>
              </svg>
            </button>
          </div>
        </td>
      </tr>`;
      }
    }

    $("#cart-body").empty().append(html);
  }

  function renderCartTotal(listProductOfCart) {
    if (listProductOfCart.length > 0) {
      var totalPrice = 0;
      for (i = 0; i < listProductOfCart.length; i++) {
        totalPrice +=
          listProductOfCart[i].quantity * listProductOfCart[i].price;
      }

      $("#subtotal").empty().append(`<em>$ ${totalPrice}</em>`)
      $("#total").empty().append(`<em>$ ${totalPrice}</em>`)
    }
  }

  // function deleted cart

  function deleteProductCart(idCart) {
    if (token) {
      $.ajax({
        url: `http://localhost:8080/cart/${idCart}`,
        method: "DELETE",
        contentType: "application/json",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        success: function (data) {
          if (data.statusCode == 200) {
            fetchData();
          }
        },
        error: function (error) {
          console.error("Error delete product incart :", error);
        },
      });
    } else {
      window.location.href =
        "http://127.0.0.1:5500/demo.templatesjungle.com/uniclub/account.html";
    }
  }

  // Document already

  // delete Product

  $(document).on("click", ".select-deleted", function () {
    const idCart = $(this).data("val");
    deleteProductCart(idCart);
  });

  // handle click update quantity of cart

  $(document).on("click", ".quantity-right-plus", function () {
    var cartId = $(this).data("cart-id");
    var inputQuantity = $(`#quantity-${cartId}`);
    var currentQuantity = parseInt(inputQuantity.val());
    inputQuantity.val(currentQuantity + 1);
    updateCartQuantity(cartId, currentQuantity + 1);
  });

  $(document).on("click", ".quantity-left-minus", function () {
    var cartId = $(this).data("cart-id");
    var inputQuantity = $(`#quantity-${cartId}`);
    var currentQuantity = parseInt(inputQuantity.val());
    if (currentQuantity > 1) {
      inputQuantity.val(currentQuantity - 1);
      updateCartQuantity(cartId, currentQuantity - 1);
    }
  });

  // function update cart

  // Hàm cập nhật số lượng sản phẩm trong giỏ hàng
  function updateCartQuantity(idCart, quantity) {
    // Gọi API cập nhật số lượng sản phẩm

    $.ajax({
      url: `http://localhost:8080/cart/update-quantity`,
      method: "PUT",
      contentType: "application/json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify({
        idCart: idCart,
        quantity: quantity,
      }),
      success: function (data) {
        // Cập nhật lại tổng giá trị, hiển thị số lượng,...
        console.log("Quantity updated successfully:", data);
        // Cập nhật lại tổng giá trị giỏ hàng,...
        fetchData();
      },
      error: function (error) {
        console.error("Error updating product quantity:", error);
      },
    });
  }
});
