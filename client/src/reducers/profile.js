import axios from "axios";
import { setAlert } from "./alert";

export const GET_PROFILE = "profile/GET_PROFILE";
export const PROFILE_ERROR = "profile/PROFILE_ERROR";
export const CLEAR_PROFILE = "profile/CLEAR_PROFILE";
export const UPDATE_PROFILE = "";

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert("Experience Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put("/api/profile/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert("Education Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

export default function profile(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      };
    default:
      return state;
  }
}
