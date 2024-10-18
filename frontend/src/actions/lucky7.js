import { LUCKY7_BET, LUCKY7_WINNERS } from "../constants/actionTypes";
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

export const winners = (history) => async (dispatch) => {
  try {
    const { data } = await api.winners();
    dispatch({ type: LUCKY7_WINNERS, data });
    history("/");
    messages.success("Winners Updated");
    //TODO: update the data in the UI
    console.log(data);
  } catch (error) {
    messages.error(error.response.data.message);
  }
};
