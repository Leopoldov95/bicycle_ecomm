// we will use this file to inititate the functions to handle the http methods in the /api dir
// file seems reduntant, only needed if using redux
import * as api from "../api/index";

export const signin = async (formData, history) => {
  try {
    const { data } = await api.signin(formData);

    // dispatch here
    localStorage.setItem("userProfile", JSON.stringify(data));

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (formData, history) => {
  const { data } = await api.signup(formData);
  // dispatch here
  localStorage.setItem("userProfile", JSON.stringify(data));

  history.push("/");
};
