const layout = require("../adminLayout");
const { handleError } = require("../../error");

module.exports = ({ errors }) => {
  return layout({
    content: `
        <div class="admin-signin">
        <form method="POST">
          <h1>Admin Signup</h1>
          <div class="field">
            <label class="label">Email</label>
            <input
              required
              class="input"
              placeholder="Enter your Email"
              name="email"
              type="email"
            />
            <!-- will want to display error message here -->
            <p class='error-msg'>${handleError(errors, "email")}</p>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <input
              required
              class="input"
              placeholder="Password"
              name="password"
              type="password"
            />
            <!-- will want to display error message here -->
            <p class='error-msg'>${handleError(errors, "password")}</p>
          </div>
          <div class="field">
            <label class="label">Password Confirmation</label>
            <input
              required
              class="input"
              placeholder="Password Confirmation"
              name="passwordConfirmation"
              type="password"
            />
            <!-- will want to display error message here -->
            <p class='error-msg'>${handleError(
              errors,
              "passwordConfirmation"
            )}</p>
          </div>
          <button class="submit-btn">
            <i class="fas fa-user-shield"></i>Create Account
          </button>
        </form>
        <a class="p-1" href="/login">Have an account? Sign In</a>
      </div>
        `,
  });
};
