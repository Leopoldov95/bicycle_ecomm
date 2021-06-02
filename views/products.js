const layout = require("./layout");

module.exports = ({ products }) => {
  const renderedProducts = products
    .map((product) => {
      return `
      <div class="products-card">
        <div class="card-img-container">
          <img src="data:image/png;base64, ${product.image}"${product.img}"/>
        </div>
          <h2>${product.title}</h2>
          <p>$${product.price}</p>
          <form action="/cart/products" method="POST">
          <input hidden value="${product.id}" name="productId" />
          <button class="products-shopping">
            <i class="fas fa-shopping-cart"></i>Add to Cart
          </button>
        </form>
      </div>
        `;
    })
    .join("\n");
  return layout({
    content: `
    <div id="products">
      <h1>Featured Bikes</h1>
      <div class="products-container">
        ${renderedProducts}
      </div>
    </div>
       
        `,
  });
};
