import axios from "axios";
import { setAlert } from "./alert";

export const GET_POSTS = "post/GET_POSTS";
export const POST_ERROR = "post/POST_ERROR";
export const UPDATE_LIKES = "post/UPDATE_LIKES";

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

// Add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: {id,likes:res.data}
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: {id,likes:res.data}
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
      case UPDATE_LIKES:
        return{
          ...state,
          posts:state.posts.map(post=>post._id===payload.id?{...post,likes:payload.likes}:post),
          loading:false
        }

    default:
      return state;
  }
}
