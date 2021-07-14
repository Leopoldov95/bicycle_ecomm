import * as api from "../api/index";

export const signin = async (formData, history) => {
  try {
    const { data } = await api.signin(formData);

    localStorage.setItem("userProfile", JSON.stringify(data));

    history.push("/");
  } catch (error) {
    console.log(error);
    alert("User does not exist...");
  }
};

export const signup = async (formData, history) => {
  const { data } = await api.signup(formData);

  localStorage.setItem("userProfile", JSON.stringify(data));

  history.push("/");
};
