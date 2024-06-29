$(document).ready(function () {
  console.log("check")
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/product/all?pageIndex=1&pageSize=8",
  }).done(function (result) {
    console.log(result)
    console.log("check 1")
    if (result.data.length > 0) {
      console.log("check 2")
      var htmlContent = "";
      for (i = 0; i < result.data.length; i++) {
        htmlContent += `<div class="col-md-6 col-lg-3 my-4">
          <div class="product-item">
            <div class="image-holder" style="width: 100%; height: 100%;">
              <img src="${
                result.data[i].image.length > 0 ? result.data[i].image[0] : ""
              }" alt="Books" class="product-image img-fluid">
            </div>
            <div class="cart-concern">
              <div class="cart-button d-flex justify-content-between align-items-center">
                <a href="single-product.html" class="btn-wrap cart-link d-flex align-items-center text-capitalize fs-6 ">add to cart <i
                    class="icon icon-arrow-io pe-1"></i>
                </a>
                <a href="single-product.html?id=${result.data[i].id}" class="view-btn">
                  <i class="icon icon-screen-full"></i>
                </a>
                <a href="#" class="wishlist-btn">
                  <i class="icon icon-heart"></i>
                </a>
              </div>
            </div>
            <div class="product-detail d-flex justify-content-between align-items-center mt-4">
              <h4 class="product-title mb-0">
                <a href="single-product.html">${result.data[i].name}</a>
              </h4>
              <p class="m-0 fs-5 fw-normal">$ ${result.data[i].price}</p>
            </div>
          </div>
        </div>`;
      }
    }
    $("#product-content").append(htmlContent);
  });

  $("#link-to-shop").on("click", function(){
    window.location.href = "http://127.0.0.1:5500/demo.templatesjungle.com/uniclub/shop.html"
  })


  });
