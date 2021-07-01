// we will use this file to inititate the functions to handle the http methods in the /api dir
import * as api from "../api";

export const getUsers = async () => {
    try {
        // const action = { type: "FETCH_ALL", payload: [] };
        // destructring {data} can prevent us from having to use response.data
        const data = await api.fetchUsers();
        console.log(data)
        //  return action
        // have to use dispatch(), payload is the file to use/return
        //dispatch({ type: "FETCH_ALL", payload: data });
      } catch (error) {
        console.log(error);
      }
}