const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
// manage users here

const scrypt = util.promisify(crypto.scrypt); // returns a promisified crypto.script
const createUser = async (user) => {
  // since readFile is async, it must be prmised in order for me to use it!

  //const newId = uuidv4(); cab ne replaced with:
  user.id = uuidv4();
  // encryption magic
  const salt = crypto.randomBytes(8).toString("hex");
  const buffer = await scrypt(user.password, salt, 64);
  //const records = await getAllUsers();

  // need to parse the data
  //let rawData = await fs.promises.readFile("users.json");
  let data = JSON.parse(
    await fs.promises.readFile("users.json", { encoding: "utf8" })
  );
  const newUser = {
    email: user.email,
    password: `${buffer.toString("hex")}.${salt}`,
    id: user.id,
  };
  // data.push({ email: user.email, password: user.password, id: newId }); can be replaced with:
  data.push(newUser);
  await fs.promises.writeFile("users.json", JSON.stringify(data, null, 2));

  // res.redirect here!

  return newUser;
};

const getAllUsers = async () => {
  return JSON.parse(
    await fs.promises.readFile("users.json", {
      encoding: "utf8",
    })
  );
};

const getSingleUser = async (email) => {
  const allUsers = await getAllUsers();
  return allUsers.find((user) => user.email === email);
};

const comparePasswords = async (saved, supplied) => {
  const [hashed, salt] = saved.split("."); // destructuring and saving to [hashed and salt]
  const hashedSuppliedBuffer = await scrypt(supplied, salt, 64);

  return hashed === hashedSuppliedBuffer.toString("hex");
};

module.exports = { createUser, getSingleUser, comparePasswords };

// On password validation. SO the reason why salting the password works even thought the hash is still there and the "." seperates the hash and the salt, the salt adds extra ancryption so even if hackers know the hashed password, the salted part of the password will be nearly impossible to figure out
