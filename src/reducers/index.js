import Cookies from "js-cookie";

const initialState = {
  loading: false,
  token: null,
  error: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      window.location.href = "/NxtWatch/Home";
      Cookies.set("jwt_token", action.payload, { expires: 0.1 });
      return { ...state, loading: false, token: action.payload };
    case "LOGIN_FAILURE":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default loginReducer;
