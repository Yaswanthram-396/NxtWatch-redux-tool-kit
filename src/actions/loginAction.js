export const loginUser = (username, password) => {
  return async (dispatch) => {
    dispatch({ type: "LOGIN_REQUEST" });

    try {
      const response = await fetch("https://apis.ccbp.in/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const token = data.jwt_token;
      console.log(token);
      dispatch({ type: "LOGIN_SUCCESS", payload: token });
      return token;
    } catch (error) {
      console.log(username, password);
      dispatch({ type: "LOGIN_FAILURE", error: true });
    }
  };
};
