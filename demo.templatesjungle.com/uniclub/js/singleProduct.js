$(document).ready(function () {
 // Get the value of the 'id' parameter
 const id = getQueryParam("id");

  $.ajax({
    method: "GET",
    url: `http://localhost:8080/product/detail?idProduct=${id}`,
  }).done(function (result) {

    console.log(result)
    if (result && result.statusCode == 200) {
       data = result.data;
      var nameProduct = `<span>${
        result.data.name ? result.data.name : "Name Product"
      }</span>`;
      $("#name-product").append(nameProduct);

      var price = `<span>$${
        result.data.price ? result.data.price : "Price"
      }</span>`;
      $("#price-product").append(price);

      var desc = `<span>${
        result.data.description
          ? result.data.description
          : "Description Product"
      }</span>`;
      $("#desc-product").append(desc);

      var sku = ` <li data-value="S" class="select-item">${data.sku}</li>`;
      $("#sku-product").append(sku);

      if (data.productDetailList.length > 0) {
        // Process data to remove duplicates
        const productDetails = data.productDetailList;
        const uniqueColors = {};
        const uniqueSizes = {};

        productDetails.forEach((detail) => {
          uniqueColors[detail.color.id] = detail.color;
          uniqueSizes[detail.size.id] = detail.size;
        });

        // Convert objects to arrays
        const colors = Object.values(uniqueColors);
        const sizes = Object.values(uniqueSizes);

        var htmlColorList = "";

        colors.forEach((color) => {
          htmlColorList += `<li class="select-item pe-3" data-val="${color.id}"  title=${color.name}>
                      <button class="btn btn-light fs-6">${color.name}</button>
                    </li>`;
        });
        $("#color-list").append(htmlColorList);

        var htmlSizeList = "";

        sizes.forEach((size) => {
          htmlSizeList += `<li data-value="XL" class="select-item pe-3">
                <button id="" class="btn btn-light fs-6" >${size.name}</button>
              </li>`;
        });
        $("#size-list").append(htmlSizeList);

        if (data.categoryList.length > 0) {
          var htmlCategory = "";
          for (i = 0; i < data.categoryList.length; i++) {
            htmlCategory += `<li data-value="S" class="select-item">
                    <a href="#">${data.categoryList[i].name}</a>,
                  </li>`;
          }
          $("#category-list").append(htmlCategory);
        }
        if (data.tagList.length > 0) {
          var htmlTag = "";
          for (i = 0; i < data.tagList.length; i++) {
            htmlTag += `<li data-value="S" class="select-item">
                    <a href="#">${data.tagList[i].name}</a>,
                  </li>`;
          }
          $("#tag-list").append(htmlTag);
        }


        // process 
        var htmlProductLargeSlider = "";
        var htmlProductThumbnailSlider = "";

        images = colors[0].images;
          images.forEach((item) => {
            htmlProductLargeSlider += ` <div class="swiper-slide">
                          <img src="${item}" alt="product-large" class="img-fluid">
                        </div>`;

            htmlProductThumbnailSlider += `<div class="swiper-slide">
                      <img src="${item}" alt="" class="thumb-image img-fluid">
                    </div>`;
          });

          $("#product-large-slider").append(htmlProductLargeSlider);
        $("#product-thumbnail-slider").append(htmlProductThumbnailSlider);

      }
      // xử lý trong hàm done của ajax 
      
        // Handle button click events
        $('.btn.btn-light.fs-6').on('click', function(event) {
            event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
            $('.btn.btn-light.fs-6').removeClass('active'); // Remove 'active' class from all buttons
            $(this).addClass('active'); // Add 'active' class to the clicked button
          });



    }
  })

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
});
