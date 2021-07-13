import Cart from "../models/Cart.js";

// may need to change this
export const getCart = async (req, res) => {
  try {
    const email = req.body;

    // will want to pass individual item here later
    const userCart = await Cart.find(email, (err, result) => {
      if (result.length === 0) {
        const newCart = new Cart({
          ...email,
          items: [],
        });
        newCart.save();
      }
    });
    res.json(userCart[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postCart = async (req, res) => {
  const { email, item } = req.body;

  // so we will handle all data handling in the front end, and just update the databse with the new data
  try {
    const dbCart = await Cart.findOneAndUpdate(
      { email },
      { $set: { items: item } },
      { new: true }
      /* (err, result) => {
        if (err) {
          res.status(404).json({ message: err.message });
        }
        if (result) {
          console.log(result.items);
          res.json(result.items);
        }
      } */
    );

    res.json(dbCart);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
