import Cart from "../models/Cart.js";
import User from "../models/users.js";

export const getCart = async (req, res) => {
  try {
    const email = req.body;
    console.log(email);
    console.log("welcome to the cart api");

    // will want to pass individual item here later
    const userCart = await Cart.find(email);

    //const res = Cart.find().then((item) => res.json(item));

    //res ? res : "";
    res.status(200).json(userCart[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postCart = async (req, res) => {
  // if an item already exists in the cart, will want to just increment it, but not create a new instance of it
  try {
    const { email, item } = req.body;

    let userCart = await Cart.find(email);
    if (userCart.length === 0) {
      console.log("no cart for that user exists");
      const newCart = new Cart({
        ...email,
        items: [],
        quantity: 0,
      });
      newCart.save();
      userCart = await Cart.find(email);
    }
    //console.log(userCart);

    // simply put - if id and size don't match, then a new item is created
    const itemSearch = await Cart.findOneAndUpdate(
      {
        $and: [
          email,
          {
            items: { $elemMatch: { title: item.title, id: item.id } },
          },
        ],
      },
      { $inc: { "items.$.quantity": 1, quantity: 1 } },
      { upsert: true },
      (err, result) => {
        if (err) {
          /* handle err */
          console.log(err);
        }
        if (!result) {
          console.log("something went wrong");
          // we don't, item does not exist, add to cart items and set quanity to 1
          /*  Cart.findOneAndUpdate(
            email,
            {
              $push: { items: { ...item, quantity: 1 } },
            },
            (err, doc) => {
              if (err) console.error(err);
              console.log("new item added to cart");
            }
          ); */
        }
      }
    );

    res.json(itemSearch);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const increaseItem = async (req, res) => {};
export const decreaseItem = async (req, res) => {};
export const deleteItem = async (req, res) => {};
