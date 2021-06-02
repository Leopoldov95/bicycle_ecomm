const layout = require("./layout");

module.exports = () => {
  return layout({
    content: `
        <div id="unkown">
          <h1>SORRY, THE PAGE YOUR LOOKING FOR DOESN'T EXIST...<i class="fas fa-search search-unkown"></i></h1>
        </div>
        `,
  });
};
