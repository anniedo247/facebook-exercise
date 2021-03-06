import * as types from "../constants/reaction.constants";
import api from "../api";

const createReaction = (postId, body) => async (dispatch) => {
  dispatch({ type: types.CREATE_REACTION, payload: null });
  try {
    const res = await api.post(`/posts/${postId}/comments`, {
      body,
    });
    dispatch({
      type: types.CREATE_REACTION_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_REACTION_FAILURE, payload: error });
  }
};

export const reactionActions = {
  createReaction,
};