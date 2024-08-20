## LÊ CÔNG THIÊN BẢO 
### WED DEVELOPER 
### 0868700430
### BẢO VỆ ĐỒ ÁN CYBERSOFT (2024)


### Giới thiệu về dự án

Uniclub Shop là một nền tảng thương mại điện tử về thời trang,  được phát triển để giúp khách hàng tìm kiếm, lựa chọn mua các sản phẩm thời trang mà cửa hàng đang bán. Nó giúp khách hàng dể dáng tìm kiếm các sản phẩm theo sở thích, loại sản phẩm, giá sản phẩm… 

Với Uniclub khách hàng có thể truy cập và tìm kiếm tất cả sản phẩm mà cửa hàng có, ngoài ra trang wed còn nhiều tính năng giúp quá trình mua các sản phẩm thời trang của khách hàng một cách nhanh chóng, chọn lọc được sản phẩm theo sở thích của mình, mua hàng chỉ trong vài phút.

trải nghiệm thân thiện với người dùng này cho phép khách hàng duyệt qua ảnh và mô tả chi tiết các sản phẩm trước khi quyết định mua hàng.

Hơn nữa, uniclub wed còn cung cấp cho chủ shop, nhân viên quản lý một giao diện trực quan, dể dàng quản lý tất cả sản phẩm của cửa hàng. 

Nhìn chung, Uniclub shop là một bước tiến mang đến sự tiện lợi, linh hoạt cho khách hàng dể dàng tiếp cận sản phẩm và mua hàng một cách nhanh chóng. 

### Các công nghệ dùng để phát triển dự án: 

#### FE:
- HTML, CSS.
- Ngôn ngữ :JavaScript
- BootStrap, jQuery , Ajax (fetch API )

#### BE

- Ngôn ngữ : Java
- Framworks : Spring Boot
- Spring security,JWT, spring data (JPA)
- Cơ sở dữ liệu SQL: MySQL
- cơ sở dữ liệu NoSQL: Redis
- API : Restful API


### Các Tính Năng trong dự án 

Authentication 

- Đăng ký tài khoản
- Đăng nhập

User 

#### Product 

Khách hàng :

- Thấy tất cả danh sách sản phẩm
- Thấy chi tiết sản phẩm
- Thêm sản phẩm vào cart
- Order sản phẩm
- Lọc sản phẩm theo ( category, tag, name, price )
- Lấy tất cả sản phẩm đã được thêm vào cart

Chủ shop

- Thêm sản phẩm mới
- Chỉnh sửa sản phẩm
- thêm chi tiết về sản phẩm
- Chỉnh sửa về chi tiết của sản phẩm đó.

#### Cart 

Khách hàng :

- Thêm Sản phẩm vào cart
- cập nhật sản phẩm trong  cart
- xoá sản phẩm trong cart
- Cập nhật số lượng sản phẩm trong cart

chủ 

#### Order 

khách

- Tạo order sản phẩm

Chủ 

- Lấy tất cả danh sách order của khách hàng
- Lấy thông tin chi tiết của order
- Cập nhật trạng thái order

#### Các Endpoint APIS

#### Auth

POST            /auth/signup           register new user

POST            /auth/signin           all  can login

#### Product

GET           /product/all      get all products 

POST        /product        *** **Login required**      insert product  (admin)

GET       /product/detail    get detail Product 

PUT      /product/update  *** **Login required**    update product  (admin)

POST    /product/by-category  get all product by category 

POST       /product/by-tag     get all product by tag 

POST      /product/by-price   get all product by price 

POST     /product/by-name  get all product by name

#### Cart 

POST     /cart       *** **Login required**   insert to cart  

GET      /cart   *** **Login required**     Get cart of user 

PUT      /cart   *** **Login required**    Update cart 

DELETE   /cart/:id-cart   *** **Login required**     delete cart 

PUT      /cart/update-quantity     *** **Login required**     update- quantity product of cart 

#### Order

POST     /order      *** **Login required**   insert order 

GET       /order/all    *** **Login required**       get all order  (admin)

GET     /order/:id-order    *** **Login required**    get detail order (admin)

PUT    /order/update    *** **Login required**   update status order  (admin)

#### Tag 

GET    /tag/all  get all tag 

POST   /tag   *** **Login required**  insert new tag (admin) 

#### category 

GET    /category/all      get all category 

POST     /category   *** **Login required**   insert new category  (admin)

#### Color 

GET              /color/all       get all color 

POST           /color    *** **Login required**       insert new color  (admin) 

#### Size 

GET       /size/all    get all size 

POST     /size      *** **Login required**   insert new Size  (admin)

#### Product Detail 

POST      /product-detail      *** **Login required**    insert new product detail  (admin)

PUT      /product-detail         *** **Login required**     update product detail   (admin)