import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
  try {
    const email = req.body;

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
    );

    res.json(dbCart);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
