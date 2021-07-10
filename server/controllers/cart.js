import Cart from "../models/Cart.js";

// may need to change this
export const getCart = async (req, res) => {
  try {
    const email = req.body;

    // will want to pass individual item here later
    const userCart = await Cart.find(email, (err,result) => {
      if (result.length === 0) {
        const newCart = new Cart({
          ...email,
          items: [],
          
        });
        newCart.save();
      }
    });
  

    //const res = Cart.find().then((item) => res.json(item));

    //res ? res : "";
    res.json(userCart[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postCart = async (req, res) => {
  const { email, item } = req.body;
  // if an item already exists in the cart, will want to just increment it, but not create a new instance of it
  try {
 

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
      { $inc: { "items.$.quantity": 1} },
      {new:true},
      (err, result) => {
        if (err) {
          res.status(404).json({ message: error.message})
        }
        if (result) {
          res.json(result)
        } else {
        Cart.findOneAndUpdate(
            email,
            {
              $push: { items: { ...item, quantity: 1 } }
           
            },
            {new: true},
            (err, result) => {
              if (err) {   res.status(404).json({ message: error.message });}
              if (result) {
                res.json(result)
              }
            }
          );
        }
      
         
        
      }
    );

  
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
        {new: true},
        (err, result) => {
          if (err){   res.status(404).json({ message: error.message })}
          if (result) {
          res.json(result)
          }
          
        } ,
     
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
        } ,
        { $inc: { "items.$.quantity": -1} },
        {new: true},
        (err, result) => {
          if (err) {   res.status(404).json({ message: error.message });}
          if (result) {
            res.json(result)
          }
        } ,
      
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
      { $pull: { items: { bikeSize: item.bikeSize, id: item.id } } },
      {new : true}
    );
    res.json(bike);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
