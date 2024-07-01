$(document).ready(function(){
    var token = localStorage.getItem("token")

    if(!token){
      window.location.href = "http://127.0.0.1:5500/demo.templatesjungle.com/uniclub/account.html"
    }

    $.ajax({
        method: "GET",
        headers:{
            Authorization:`Bearer ${token}`
        },
        url: "http://localhost:8080/cart",
      }).done(function (result) {
        console.log(result)
        if(result && result.data.length > 0){
            var html="";
            var totalPrice = 0;
            for(i=0; i< result.data.length; i++){
                
                var item = result.data[i];
                html += `<tr id-product=${item.id} id-color=${item.idColor} id-size=${item.idSize}>
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
                          <a href="#" class="text-decoration-none">${item.productName}</a>
                        </h6>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="py-4 align-middle">
                  <div class="input-group product-qty align-items-center w-55>
                    <span class="input-group-btn">
                      <button type="button" class="quantity-left-minus p-1 btn btn-light btn-number" data-type="minus">
                        <svg width="16" height="16">
                          <use xlink:href="#minus"></use>
                        </svg>
                      </button>
                    </span>
                    <input type="text" id="quantity" name="quantity"
                      class="form-control input-number text-center p-2 mx-1" value="${item.quantity}">
                    <span class="input-group-btn">
                      <button type="button" class="quantity-right-plus p-1 btn btn-light btn-number" data-type="plus"
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
                    <span class="secondary-font fw-medium">${item.quantity * item.price}</span>
                  </div>
                </td>
                <td class="py-4 align-middle">
                  <div class="cart-remove">
                    <button class="select-deleted" id-cart=${item.id}>
                      <svg width="24" height="24">
                        <use xlink:href="#trash"></use>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>`
              totalPrice += item.quantity * item.price;
              
            }
           
            $("#cart-body").empty().append(html);
            $("#subtotal").empty().append( `<span class="price-currency-symbol">$ ${totalPrice}</span>`)
            $("#total").empty().append( `<span class="price-currency-symbol">$ ${totalPrice}</span>`)
        }

      })


      




})