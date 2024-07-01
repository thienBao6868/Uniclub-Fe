$(document).ready(function () {
  var idProduct = getQueryParam("id");
  let product = [];
  let selectColorId;
  let selectSizeId;

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
    renderQuantityInstock(selectColorId, selectSizeId);
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
    console.log(colors);
    var htmlColorList = "";

    for (i = 0; i < colors.length; i++) {
      htmlColorList += `<li id="" class="select-item-color select-item pe-3 ${
        i == 0 ? "disabled" : ""
      }" data-val="${colors[i].id}"  title=${colors[i].name} >
                      <button class="btn btn-light fs-6 ${
                        i == 0 ? "active" : ""
                      } " >${colors[i].name}</button>
                    </li>`;
    }
    $("#color-list").empty().append(htmlColorList);
    selectColorId = colors[0].id

    renderImagesProduct(productDetails, selectColorId);
  }

  function renderSizes(productDetails) {
    const uniqueSizes = {};
    productDetails.forEach((detail) => {
      uniqueSizes[detail.size.id] = detail.size;
    });

    const sizes = Object.values(uniqueSizes);

    var htmlSizeList = "";
    sizes.forEach((size) => {
      htmlSizeList += `<li id="" data-val=${size.id} class="select-item-size select-item pe-3">
              <button class="btn btn-light fs-6" >${size.name}</button>
            </li>`;
    });
    $("#size-list").empty().append(htmlSizeList);
  }

  function renderImagesProduct(productDetails, idCurrentColor) {
    const uniqueColors = {};

    productDetails.forEach((detail) => {
      uniqueColors[detail.color.id] = detail.color;
    });
    // Convert objects to arrays
    const colors = Object.values(uniqueColors);

    const currentColor = colors.find((color) => color.id === idCurrentColor);
    console.log("currentColor", currentColor);
    if (!currentColor || !currentColor.images) {
      console.error("No images found for the current color");
      return;
    }
    // process
    var htmlProductLargeSlider = "";
    var htmlProductThumbnailSlider = "";

    currentColor.images.forEach((item) => {
      htmlProductLargeSlider += ` <div class="swiper-slide">
                       <img src="${item}" alt="product-large" class="img-fluid">
                     </div>`;

      htmlProductThumbnailSlider += `<div class="swiper-slide">
                   <img src="${item}" alt="" class="thumb-image img-fluid">
                 </div>`;
    });

    $("#product-large-slider").empty().append(htmlProductLargeSlider);
    $("#product-thumbnail-slider").empty().append(htmlProductThumbnailSlider);
  }

  // render quantity in stock

  function renderQuantityInstock(selectColorId, selectSizeId) {
    console.log("selectColorId  ",selectColorId)
    console.log("selectSize", selectSizeId)

    var htmlInStock = "";

    if ((selectColorId, selectSizeId)) {
      const productDetailWithIdColorAndIdSize = product.productDetailList.find(
        (item) => item.color.id == selectColorId && item.size.id == selectSizeId
      );
      if (productDetailWithIdColorAndIdSize) {
        htmlInStock = `<em>${productDetailWithIdColorAndIdSize?.quantity} in stock</em>`;
      }else{
        htmlInStock = `<em> in stock</em>`
      }
    } else {
      htmlInStock = `<em> in stock</em>`;
    }

    $(".stock-number").empty().append(htmlInStock);
    // <div class="stock-number text-dark"><em>2 in stock</em></div>
  }

  // Gán sự kiện click cho các phần tử có class là .select-item
  $(document).on("click", ".select-item-color", function () {
    if ($(this).hasClass("disabled")) {
      return;
    }
    // Xóa class "active" khỏi tất cả các phần tử <button>
    $(".select-item-color button").removeClass("active");
    $(".select-item-color").removeClass("disabled");
    // Thêm class "active" cho phần tử <button> được click
    $(this).find("button").addClass("active");
    $(this).addClass("disabled");
    // Lấy giá trị của thuộc tính data-val
    selectColorId = $(this).data("val");
    console.log(selectColorId);
    // Thực hiện các hành động khác nếu cần
    renderImagesProduct(product.productDetailList, selectColorId);
    renderQuantityInstock(selectColorId, selectSizeId);
  });

  $(document).on("click", ".select-item-size", function () {
    if ($(this).hasClass("disabled")) {
      return;
    }
    // Xóa class "active" khỏi tất cả các phần tử <button>
    $(".select-item-size button").removeClass("active");
    $(".select-item-size").removeClass("disabled");
    // Thêm class "active" cho phần tử <button> được click
    $(this).find("button").addClass("active");
    $(this).addClass("disabled");

    selectSizeId = $(this).data("val");

    renderQuantityInstock(selectColorId, selectSizeId);
  });

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
});
