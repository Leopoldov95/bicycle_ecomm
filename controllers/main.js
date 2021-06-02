// here will be all the helper functions to handle images and JSON data

// another option of handling this file to work on both products and cart methods is to create a class and then extends those clasees to two seperate files. One for products and one for cart. But since only the JSON file is the varaible, I will keep this file as such.
const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require("uuid");
//const path = require("path");

const addProduct = async (item, file = "products.json") => {
  // since readFile is async, it must be prmised in order for me to use it!
  item.id = uuidv4();
  // need to parse the data
  let rawData = await fs.promises.readFile(file);
  let data = JSON.parse(rawData);
  //console.log(item);
  data.push(item);
  await fs.promises.writeFile(file, JSON.stringify(data, null, 2));
  return item;
};

// get all the items and then use the result to render each indiviual display card
// may want to add error handling
const getAllItems = async (file = "products.json") => {
  try {
    return JSON.parse(
      await fs.promises.readFile(file, {
        encoding: "utf8",
      })
    );
  } catch (error) {
    res.status(error.response.status);
    return res.send(error.message);
  }
};

const getSingleItem = async (id, file = "products.json") => {
  const allItems = await getAllItems(file);
  return allItems.find((item) => item.id === id);
};

const updateItem = async (id, body, file = "products.json") => {
  //const item = await getSingleItem(id);
  const allItems = await getAllItems(file);
  const item = allItems.find((product) => product.id === id);

  if (!item) {
    throw new Error(`Item ${id} not found...`);
  }
  Object.assign(item, body); // this creates a new object

  // so in order to successfuly write/edit a singl item need to first get all the items, change the specific one, then write the whole darn thing to the json file
  await fs.promises.writeFile(file, JSON.stringify(allItems, null, 2));
  // console.log(item.title);
  //return item;
};

const deleteItem = async (id) => {
  const items = await getAllItems();
  const filteredItems = items.filter((item) => item.id !== id);

  await fs.promises.writeFile(
    "products.json",
    JSON.stringify(filteredItems, null, 2)
  );
};

//const update =
module.exports = {
  addProduct,
  getAllItems,
  getSingleItem,
  updateItem,
  deleteItem,
};
