import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    console.log(req.headers);

    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500; // checking to see if toke is OUR own token, if it's more than 500 characters, then it the Google Auth's token from the google signin

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test123"); // 'test' is the secret keyword from the other file, THEY MUST MATCH

      req.userId = decodedData?.id;
    } else {
      // so the user is not using our web token, but google's web token
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub; // .sub is a google func that diferentiates between users
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
