const handleError = (errors, prop) => {
  // check to see if an error exists
  try {
    return errors.mapped()[prop].msg;
  } catch {
    // if no error exists, simply return an emty string value
    return "";
  }
};
module.exports = { handleError };
