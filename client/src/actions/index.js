// we will use this file to inititate the functions to handle the http methods in the /api dir
// file seems reduntant, only needed if using redux
import * as api from "../api/index";

export const getUsers = async () => {
  try {
    // const action = { type: "FETCH_ALL", payload: [] };
    // destructring {data} can prevent us from having to use response.data
    // const data = await api.fetchUser();
    //  return action
    // have to use dispatch(), payload is the file to use/return
    //dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const signin = async (formData, history) => {
  try {
    const { data } = await api.signin(formData);
    console.log(data);
    // dispatch here
    localStorage.setItem("userProfile", JSON.stringify(data));

    history.push("/");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (formData, history) => {
  const { data } = await api.signup(formData);
  // dispatch here
  localStorage.setItem("userProfile", JSON.stringify(data));
  console.log(data);

  history.push("/");
  return data;
};
