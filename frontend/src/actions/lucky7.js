import { LUCKY7_BET } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const lucky7 = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.lucky7Bet(formData);
    dispatch({ type: LUCKY7_BET, data });
    history("/");
    messages.success("Bet Placed Successfully");
  } catch (error) {
    messages.error(error.response.data.message);
  }
};
