$(document).ready(function () {
  var idProduct = getQueryParam("id");
  let product = [];

  // Fetch dữ liệu từ API all products
  function fetchGetProduct() {
    $.ajax({
      url: `http://localhost:8080/product/detail?idProduct=${idProduct}`,
      method: "GET",
      success: function (data) {
        product = data.data;
        console.log(product);
        renderProduct(product);
      },
      error: function (error) {
        console.error("Error fetching all products:", error);
      },
    });
  }

  // Gọi API all products khi lần đầu load trang
  fetchGetProduct();

  function renderProduct(product) {
    renderNameProduct(product.name);
    renderPrice(product.price);
    renderDesc(product.description);
    renderSku(product.sku);
    renderCategory(product.categoryList);
    renderTags(product.tagList);
    renderColors(product.productDetailList);
    renderSizes(product.productDetailList);
  }

  function renderNameProduct(name) {
    var nameProduct = `<span>${name ? name : "Name Product"}</span>`;
    $("#name-product").empty().append(nameProduct);
  }

  function renderPrice(price) {
    var priceProduct = `<span>$${price ? price : "Price"}</span>`;
    $("#price-product").empty().append(priceProduct);
  }

  function renderDesc(desc) {
    var descPro = `<span>${desc ? desc : "Description Product"}</span>`;
    $("#desc-product").empty().append(descPro);
  }

  function renderSku(sku) {
    var skuPro = ` <li data-value="S" class="select-item">${sku}</li>`;
    $("#sku-product").empty().append(skuPro);
  }

  function renderCategory(category) {
   
    if (category.length > 0) {
      var htmlCategory = "";
      for (i = 0; i < category.length; i++) {
        htmlCategory += `<li data-value="S" class="select-item">
                  <a href="#">${category[i].name}</a>,
                </li>`;
      }
      $("#category-list").empty().append(htmlCategory);
    }
  }

  function renderTags(tags) {
    if (tags.length > 0) {
      var htmlTag = "";
      for (i = 0; i < tags.length; i++) {
        htmlTag += `<li data-value="S" class="select-item">
                  <a href="#">${tags[i].name}</a>,
                </li>`;
      }
      $("#tag-list").empty().append(htmlTag);
    }
  }

  

  function renderColors(productDetails) {
    const uniqueColors = {};
    productDetails.forEach((detail) => {
      uniqueColors[detail.color.id] = detail.color;
    });
    // Convert objects to arrays
    const colors = Object.values(uniqueColors);
    var htmlColorList = "";

        colors.forEach((color) => {
          htmlColorList += `<li class="select-item pe-3" data-val="${color.id}"  title=${color.name}>
                      <button class="btn btn-light fs-6">${color.name}</button>
                    </li>`;
        });
        $("#color-list").empty().append(htmlColorList);

  }

  function renderSizes(productDetails){
    const uniqueSizes = {};
    productDetails.forEach((detail) => {
        uniqueSizes[detail.size.id] = detail.size;
      });

      const sizes = Object.values(uniqueSizes);

      var htmlSizeList = ""
      sizes.forEach((size) => {
        htmlSizeList += `<li data-value="XL" class="select-item pe-3">
              <button id="" class="btn btn-light fs-6" >${size.name}</button>
            </li>`;
      });
      $("#size-list").empty().append(htmlSizeList);
  }

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
});
