import axios from "axios";
import { setAlert } from "./alert";

export const GET_POSTS = "post/GET_POSTS";
export const POST_ERROR = "post/POST_ERROR";

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

export default function post(state = initialState, action) {
  const { type, payload } = action;
  
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
}
