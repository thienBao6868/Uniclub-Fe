$(document).ready(function () {
  // Get the value of the 'id' parameter
  const id = getQueryParam("id");

  // Xử lý sự kiện click cho mỗi thẻ <a> trong danh sách màu
  $("#color-list").on(
    "click",
    "button",
    function (event) {
      event.preventDefault(); // Ngăn chặn hành động mặc định nếu cần
      var selectedColorId = $(this).closest("li").attr("data-val");

      // Thêm logic xử lý khi click vào mỗi màu ở đây

      // Xóa class 'active' khỏi tất cả các button
      $("#color-list button").removeClass("active");
      // Thêm class 'active' vào button được click
      $(this).addClass("active");

      $("#product-large-slider").empty();
      $("#product-thumbnail-slider").empty();

      $.ajax({
        method: "GET",
        url: `http://localhost:8080/product/detail?idProduct=${id}`,
      }).done(function (result) {
        console.log(result)
        var htmlProductLargeSlider = "";
        var htmlProductThumbnailSlider = "";

        // Process data to remove duplicates

        const productDetails = result.data.productDetailList;
        const uniqueColors = {};
        const uniqueSizes = {};

        productDetails.forEach((detail) => {
          uniqueColors[detail.color.id] = detail.color;
          uniqueSizes[detail.size.id] = detail.size;
        });

        // Convert objects to arrays
        const colors = Object.values(uniqueColors);
        const sizes = Object.values(uniqueSizes);

        colors.forEach((color) => {
          if ((color.id = selectedColorId)) {
            var images = color.images;
            images.forEach((item) => {
              htmlProductLargeSlider += ` <div class="swiper-slide">
                        <img src="${item}" alt="product-large" class="img-fluid">
                      </div>`;

              htmlProductThumbnailSlider += `<div class="swiper-slide">
                    <img src="${item}" alt="" class="thumb-image img-fluid">
                  </div>`;
            });
          }
        });

        $("#product-large-slider").append(htmlProductLargeSlider);
        $("#product-thumbnail-slider").append(htmlProductThumbnailSlider);
      });
    },

   
  );


  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
});
