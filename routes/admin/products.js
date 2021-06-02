const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { handleErrors } = require("../../controllers/middlewares");
const adminProductView = require("../../views/admin/listProducts");
const newProductView = require("../../views/admin/products/new");
const editProductView = require("../../views/admin/products/edit");
const { requireAuth } = require("../../controllers/middlewares");
const {
  getAllItems,
  addProduct,
  getSingleItem,
  updateItem,
  deleteItem,
} = require("../../controllers/main");
const { requireTitle, requirePrice } = require("./validation");

/* MULTER CONFIG */
/* file.fieldname + "-" + Date.now() + path.extname */
/* const storage = multer.diskStorage({
  destination: "./public/images/products",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
}); */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10000000,
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// multer options / Upload variable
/* const upload = multer({
  storage: storage,

}).single("image"); // the name for the file upload input field */

// check file type
const checkFileType = (file, cb) => {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png/;
  // check the extension
  const extname = filetypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  ); // test() compares the filenam to the reg ex
  //ceck MIME type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images only!");
  }
};
// everything works with the GET request
router.get("/admin/products", requireAuth, async (req, res) => {
  const products = await getAllItems();
  res.send(adminProductView({ products }));
});

router.get("/admin/products/new", requireAuth, (req, res) => {
  res.send(newProductView({}));
});

router.post(
  "/admin/products/new",
  requireAuth,
  upload.single("image"),
  [requireTitle, requirePrice],

  handleErrors(newProductView),
  async (req, res) => {
    //res.send("you have created a new item");
    const image = req.file.buffer.toString("base64"); // 'base64' can safely show the img in a string format
    const { title, price } = req.body;
    await addProduct({ title, price, image });
    res.redirect("/admin/products");
    //console.log(image);
    /*   upload(req, res, (err) => {
    //console.log(req.body);
    //console.log(req.file);
    addProduct(req);
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
  }); */
  }
);

router.get("/admin/products/:id/edit", requireAuth, async (req, res) => {
  const product = await getSingleItem(req.params.id); // this will capture the id of the selected product upon clicking 'edit'

  if (!product) {
    return res.send("Product not found");
  }

  res.send(editProductView({ product }));
});
// In order to read the req.body data when using Multer, must pass the upload as a middleware
router.post(
  "/admin/products/:id/edit",
  requireAuth,
  upload.single("image"),
  [requireTitle, requirePrice],
  handleErrors(editProductView, async (req) => {
    const product = await getSingleItem(req.params.id);
    return { product };
  }),
  async (req, res) => {
    const changes = req.body;
    if (req.file) {
      changes.image = req.file.buffer.toString("base64");
    } else {
      throw new Error("Please upload a valid image...");
    }
    try {
      await updateItem(req.params.id, changes);
    } catch (err) {
      return res.send("Could not find item...");
    }

    //console.log(item.title);
    res.redirect("/admin/products");
  }
);

router.post("/admin/products/:id/delete", async (req, res) => {
  await deleteItem(req.params.id);

  return res.redirect("/admin/products");
});
module.exports = router;
