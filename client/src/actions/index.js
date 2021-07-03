// we will use this file to inititate the functions to handle the http methods in the /api dir
// file seems reduntant, only needed if using redux
import * as api from "../api";

export const getUsers = async () => {
  try {
    // const action = { type: "FETCH_ALL", payload: [] };
    // destructring {data} can prevent us from having to use response.data
    const data = await api.fetchUser();
    console.log(data);
    //  return action
    // have to use dispatch(), payload is the file to use/return
    //dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};
