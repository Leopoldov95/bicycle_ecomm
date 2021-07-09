import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
  try {
    const email = req.body;

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
  const { email, item } = req.body;
  // if an item already exists in the cart, will want to just increment it, but not create a new instance of it
  try {
    const userCart = await Cart.find(email);
    if (userCart.length < 1) {
      const newCart = new Cart({
        ...email,
        items: [],
        quantity: 0,
      });
      newCart.save();
    }
    /* Cart.find(email, (err, result) => {
      if (err) {
        console.log(err);
      }
      if (!result) {
        console.log("no cart for that user exists");
        const newCart = new Cart({
          ...email,
          items: [],
          quantity: 0,
        });
        newCart.save();
      }
    }); */

    //console.log(userCart);
    /*  if (userCart.length === 0) {
 
      //userCart = await Cart.find(email);
    } */
    //console.log(userCart);

    // simply put - if id and size don't match, then a new item is created
    Cart.findOneAndUpdate(
      {
        $and: [
          email,
          {
            items: { $elemMatch: { bikeSize: item.bikeSize, id: item.id } },
          },
        ],
      },
      { $inc: { "items.$.quantity": 1, quantity: 1 } },

      (err, result) => {
        if (err) {
          console.log(err);
        }
        if (!result) {
          Cart.findOneAndUpdate(
            email,
            {
              $push: { items: { ...item, quantity: 1 } },
              $inc: { quantity: 1 },
            },
            (err, doc) => {
              if (err) console.error(err);
            }
          );
        }
      }
    );

    res.json(userCart);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  const { email, item, action } = req.body;

  try {
    if (action === "plus") {
      Cart.findOneAndUpdate(
        {
          $and: [
            email,
            {
              items: { $elemMatch: { bikeSize: item.bikeSize, id: item.id } },
            },
          ],
        },
        { $inc: { "items.$.quantity": 1, quantity: 1 } },
        (err, result) => {
          if (err) console.log(err);
        }
      );
    } else if (action === "minus") {
      Cart.findOneAndUpdate(
        {
          $and: [
            email,
            {
              items: { $elemMatch: { bikeSize: item.bikeSize, id: item.id } },
            },
          ],
        },
        { $inc: { "items.$.quantity": -1, quantity: -1 } },
        (err, result) => {
          if (err) console.log(err);
        }
      );
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteItem = async (req, res) => {
  const { email, item } = req.body;

  try {
    const bike = await Cart.findOneAndUpdate(
      {
        $and: [
          email,
          {
            items: { $elemMatch: { bikeSize: item.bikeSize, id: item.id } },
          },
        ],
      },
      { $pull: { items: { bikeSize: item.bikeSize, id: item.id } } }
    );
    res.json(bike);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
