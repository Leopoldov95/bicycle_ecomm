const layout = require("../adminLayout");
const { handleError } = require("../../error");

module.exports = ({ errors }) => {
  return layout({
    content: `
    <div class="admin-edit">
        <h1 class="subtitle">Create a New Product</h1>

        <form method="POST" enctype="multipart/form-data">
          <div class="field">
            <label class="label">Title</label>
            <input
              class="input"
              placeholder="Title"
              name="title"
            />
            <p class='error-msg'>${handleError(errors, "title")}</p>
          </div>

          <div class="field">
            <label class="label">Price</label>
            <input
              class="input"
              placeholder="Price"
              name="price"
            />
            <p class='error-msg'>${handleError(errors, "price")}</p>
          </div>

          <div class="field">
            <label class="label">Image</label>
            <input type="file" name="image" accept="image/*" />
          </div>
          <br />
          <button class="submit-btn">Submit</button>
        </form>
      </div>
    `,
  });
};
