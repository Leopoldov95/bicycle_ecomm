import * as api from "../api/index";

export const signin = async (formData, history) => {
  try {
    const { data } = await api.signin(formData);

    localStorage.setItem("userProfile", JSON.stringify(data));

    history.push("/");
  } catch (error) {
    if (error.response && error.response.data) {
     // console.log(error.response.data.message) // some reason error message
      return error.response.data.message;
    }
  }
};

export const signup = async (formData, history) => {
  try {
    const { data } = await api.signup(formData);

    localStorage.setItem("userProfile", JSON.stringify(data));
  
    history.push("/");
  } catch (error) {
    if (error.response && error.response.data) {
     // alert(error.response.data.message) // some reason error message
     return  error.response.data.message;
    }
  }

};
