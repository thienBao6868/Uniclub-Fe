$(document).ready(function () {
 

  let allProducts = [];
  let allCategory = [];
  let allTag = [];
  let priceList = [
    {
      lowPrice: 0,
      highPrice: 300,
    },
    {
      lowPrice: 300,
      highPrice: 600,
    },
    {
      lowPrice: 600,
      highPrice: 2000,
    },
  ];
  let pageIndex;
  let pageSize;
  
  let idCategory = Number(getQueryParam("idCategory"));
  let idTag = Number(getQueryParam("idTag"));
  let lowPrice = Number(getQueryParam("lowPrice"));
  let highPrice = Number(getQueryParam("highPrice"));

  let nameProduct = getQueryParam("name");

  console.log(idCategory);
  // Fetch dữ liệu từ API all products
  function fetchAllProducts(pageIndex = 1, pageSize = 9, idCategory, idTag, lowPrice, highPrice, nameProduct) {
    let rootUrl = `http://localhost:8080/product/all?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    let rootData = {};
    let rootMethod = "GET";
    contentType = "application/json; charset=UTF-8";

    if (idCategory) {
      rootUrl = `http://localhost:8080/product/by-category`;
      
      rootData = JSON.stringify({
        idCategory: idCategory,
        pageIndex: pageIndex,
        pageSize: pageSize,
      });
      rootMethod ="POST"
    }
    if(idTag){
      rootUrl = `http://localhost:8080/product/by-tag`;
      
      rootData = JSON.stringify({
        idTag: idTag,
        pageIndex: pageIndex,
        pageSize: pageSize,
      });
      rootMethod ="POST"
    }

    if(lowPrice >= 0 && highPrice){
      rootUrl = `http://localhost:8080/product/by-price`;
      
      rootData = JSON.stringify({
        lowPrice:lowPrice,
        highPrice:highPrice,
        pageIndex: pageIndex,
        pageSize: pageSize,
      });
      
      rootMethod ="POST"
    }

    if(nameProduct){
      rootUrl = `http://localhost:8080/product/by-name`;
      
      rootData = JSON.stringify({
        name:nameProduct,
        pageIndex: pageIndex,
        pageSize: pageSize,
      });
      
      rootMethod ="POST"
    }


    $.ajax({
      url: rootUrl,
      method: rootMethod,
      data: rootData,
      contentType: contentType,
      success: function (data) {
        allProducts = data.data;
        console.log(allProducts);
        renderProducts(allProducts);
      },
      error: function (error) {
        console.error("Error fetching all products:", error);
      },
    });
  }
  fetchAllProducts(pageIndex, pageSize,idCategory, idTag, lowPrice, highPrice,nameProduct);

  // Hàm render sản phẩm ra giao diện
  function renderProducts(products) {
    if (products.length > 0) {
      var htmlContent = "";
      for (i = 0; i < products.length; i++) {
        htmlContent += `<div class="col-md-6 col-lg-4 my-4">
              <div class="product-item">
                <div class="image-holder" style="width: 100%; height: 100%;">
                  <img src="${products[i].image[0]}" alt="Books" class="product-image img-fluid">
                </div>
                <div class="cart-concern">
                  <div class="cart-button d-flex justify-content-between align-items-center">
                    <a href="single-product.html?id=${products[i].id}" class="btn-wrap cart-link d-flex align-items-center text-capitalize fs-6 ">add to cart
                      <i class="icon icon-arrow-io pe-1"></i>
                    </a>
                    <a href="single-product.html?id=${products[i].id}" class="view-btn">
                      <i class="icon icon-screen-full"></i>
                    </a>
                    <a href="#" class="wishlist-btn">
                      <i class="icon icon-heart"></i>
                    </a>
                  </div>
                </div>
                <div class="product-detail d-flex justify-content-between align-items-center mt-4">
                  <h4 class="product-title mb-0">
                    <a href="single-product.html">${products[i].name}</a>
                  </h4>
                  <p class="m-0 fs-5 fw-normal">${products[i].price}</p>
                </div>
              </div>
            </div>`;
      }
    }else{
      var htmlContent = ` <div class="center-box">
        Không Tìm thấy sản phẩm
    </div>`
    }

    $("#product-store").empty().append(htmlContent);
  }

  // Get category and render
  $.ajax({
    url: "http://localhost:8080/category/all",
    method: "GET",
    success: function (data) {
      allCategory = data.data;
      console.log(allCategory);
      renderCategory(allCategory);
    },
    error: function (error) {
      console.error("Error fetching all category:", error);
    },
  });

  function renderCategory(category) {
    var htmlCategory = "";

    if (category.length > 0) {
      for (i = 0; i < category.length; i++) {
        htmlCategory += ` <li class="cat-item">
                  <a href="shop.html?idCategory=${category[i].id}" class="nav-link fw-semibold">${category[i].name}</a>
                </li>`;
      }
    }
    $(".product-categories").empty().append(htmlCategory);
  }

  // Get Tags and render

  $.ajax({
    url: "http://localhost:8080/tag/all",
    method: "GET",
    success: function (data) {
      allTag = data.data;
      console.log(allTag);
      renderTags(allTag);
    },
    error: function (error) {
      console.error("Error fetching all category:", error);
    },
  });

  function renderTags(tags) {
    var htmlTags = "";
    if (tags.length > 0) {
      for (i = 0; i < tags.length; i++) {
        htmlTags += `<li class="tags-item">
                    <a href="shop.html?idTag=${tags[i].id}" class="nav-link fw-semibold">${tags[i].name}</a>
                  </li>`;
      }
    }
    $(".product-tags").empty().append(htmlTags);
  }

  function renderFilterByPrice(priceList) {
    var htmlFilterByPrice = "";

    priceList.forEach((item) => {
      htmlFilterByPrice += `<li class="tags-item">
                  <a href="shop.html?lowPrice=${item.lowPrice}&highPrice=${item.highPrice}" class="nav-link fw-semibold">${item.lowPrice} than ${item.highPrice}</a>
                </li>`;
    });

    $(".product-price").empty().append(htmlFilterByPrice);
  }
  renderFilterByPrice(priceList);

  $("#search-form-by-name").on('submit', function(event) {
    event.preventDefault(); 

    let searchQuery = $('#search-input').val().trim();

    if (searchQuery !== '') {
      // Xây dựng URL hoặc thực hiện hành động cần thiết ở đây
      console.log('Đang tìm kiếm sản phẩm có từ khóa:', searchQuery);
      
      // Tạo URL với dữ liệu truyền vào
      let url = `http://127.0.0.1:5500/demo.templatesjungle.com/uniclub/shop.html?name=${searchQuery}`;
      
      // Load lại URL
      window.location.href = url;
  } else {
      // Xử lý khi không có nội dung để search
      console.log('Vui lòng nhập nội dung để tìm kiếm.');
      // Hoặc có thể làm gì đó khác nếu muốn
  }


});
 




  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
});
