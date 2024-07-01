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
  // Fetch API InSert Product in cart
  function insertProductToCart(idProduct, idColor, idSize, quantity) {
    console.log("process insert to cart");
    let produtId = Number(idProduct);
    let colorId = Number(idColor);
    let sizeId = Number(idSize);
    let sl = Number(quantity);

    const token = localStorage.getItem("token");
    if (token) {
      $.ajax({
        url: `http://localhost:8080/cart`,
        method: "POST",
        contentType: "application/json",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify({
          idProduct: produtId,
          idSize: sizeId,
          idColor: colorId,
          quantity: sl,
        }),
        success: function (data) {
          if (data.statusCode == 200) {
            window.location.href =
              "http://127.0.0.1:5500/demo.templatesjungle.com/uniclub/cart.html";
          }
        },
        error: function (error) {
          console.error("Error insert product incart :", error);
        },
      });
    } else {
      window.location.href = "http://127.0.0.1:5500/demo.templatesjungle.com/uniclub/account.html"
    }
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
    selectColorId = colors[0].id;

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
    console.log("selectColorId  ", selectColorId);
    console.log("selectSize", selectSizeId);

    var htmlInStock = "";

    if ((selectColorId, selectSizeId)) {
      const productDetailWithIdColorAndIdSize = product.productDetailList.find(
        (item) => item.color.id == selectColorId && item.size.id == selectSizeId
      );
      if (productDetailWithIdColorAndIdSize) {
        htmlInStock = `<em>${productDetailWithIdColorAndIdSize?.quantity} in stock</em>`;
      } else {
        htmlInStock = `<em> in stock</em>`;
      }
    } else {
      htmlInStock = `<em> in stock</em>`;
    }

    $(".stock-number").empty().append(htmlInStock);
    // <div class="stock-number text-dark"><em>2 in stock</em></div>
  }

  var initProductQty = function () {
    $(".product-qty").each(function () {
      var $el_product = $(this);

      $el_product.find(".quantity-right-plus").click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find("#quantity").val());
        $el_product
          .find("#quantity")
          .val(quantity + 1)
          .trigger("change");
      });

      $el_product.find(".quantity-left-minus").click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find("#quantity").val());
        if (quantity > 0) {
          $el_product
            .find("#quantity")
            .val(quantity - 1)
            .trigger("change");
        }
      });

      // Xử lý sự kiện input để kiểm soát giá trị nhập vào
      $el_product.find("#quantity").on("input", function () {
        var value = $(this).val();
        // Xóa tất cả các ký tự không phải là số
        value = value.replace(/[^0-9]/g, "");

        // Cập nhật lại giá trị của input
        $(this).val(value).trigger("change");
      });

      // Xử lý sự kiện blur để đảm bảo giá trị không nhỏ hơn 1 khi người dùng rời khỏi ô nhập liệu
      $el_product.find("#quantity").on("blur", function () {
        var value = $(this).val();

        // Đảm bảo giá trị không nhỏ hơn 1
        if (value === "" || parseInt(value) < 1) {
          value = 1;
        }

        // Cập nhật lại giá trị của input
        $(this).val(value).trigger("change");
      });

      // Xử lý sự kiện keypress để ngăn không cho nhập ký tự không phải số
      $el_product.find("#quantity").on("keypress", function (event) {
        // Kiểm tra nếu ký tự nhập vào không phải là số
        if (event.which < 48 || event.which > 57) {
          event.preventDefault();
        }
      });

      // Listen for the change event to perform additional actions
      $el_product.find("#quantity").on("change", function () {
        var updatedQuantity = $(this).val();
        console.log("Quantity updated to:", updatedQuantity);
        // You can perform additional actions here if needed
        $(this).removeClass("value");
        $(this).attr("value", updatedQuantity);
      });
    });
  };

  initProductQty();

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

  $("#button-add-to-cart").on("click", function (e) {
    e.preventDefault();
    let quantity = Number($("#quantity").val());
    if (idProduct && selectColorId && selectSizeId && quantity) {
      const productDetailWithIdColorAndIdSize = product.productDetailList.find(
        (item) => item.color.id == selectColorId && item.size.id == selectSizeId
      );
      if (productDetailWithIdColorAndIdSize) {
        insertProductToCart(idProduct, selectColorId, selectSizeId, quantity);
      } else {
        console.log("Không tìm thấy sản phẩm có color và size mà bạn đã chọn");
      }
    } else {
      console.log("Vui Lòng nhập chọn Đầy đủ thông tin: color, size, quantity");
    }
  });

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
});
