const layout = require("./layout");

module.exports = ({ items }) => {
  // calculates the total cost of all items
  const totalPrice = items.reduce((prev, item) => {
    return prev + item.quantity * item.product.price;
  }, 0);

  const renderedItems = items
    .map((item) => {
      return `
      <div class="cart-item">
          <div>
            <h3>${item.product.title}</h3>
          </div>
          <div class="cart-item-price">
            <div>
              <p>$${item.product.price} X ${item.quantity} = </p>
            </div>
            <div>
              <h2>$${item.product.price * item.quantity}</h2>
            </div>
            <div>
            <form method="POST" action="/cart/products/delete">
              <input hidden value="${item.id}" name="itemId" />
              <button>
                <i class="fas fa-times-circle"></i>
              </button>
              </form>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  return layout({
    content: `
    <div id="cart">
      <div>
        <h1>Shopping Cart</h1>
      </div>
      <div class="cart-items">
      ${renderedItems}
      </div>
      <div class="cart-total">
        <div>
          <h2>Total</h2>
        </div>
        <div>
          <h1>$${totalPrice}</h1>
          <button>Buy</button>
        </div>
      </div>
    </div>
        `,
  });
};
