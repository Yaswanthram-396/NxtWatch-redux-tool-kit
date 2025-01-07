import "./index.css";
import Cookies from "js-cookie";
import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { connect } from "react-redux";
import { loginUser } from "../actions/loginAction";
class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      showPass: false,
      error: false,
      loading: false,
    };
  }

  // navigate = useNavigate();

  handleChangeUsername = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      username: event.target.value,
    }));
  };

  handleChangePassword = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      password: event.target.value,
    }));
  };

  handleShowPass = () => {
    const { showPass } = this.state;
    this.setState((prevState) => ({
      ...prevState,
      showPass: !showPass,
    }));
  };

  // handleSubmit = async () => {
  //   const { username, password, error } = this.state;
  //   this.setState({ loading: true });
  //   try {
  //     const response = await fetch("https://apis.ccbp.in/login", {
  //       method: "POST",
  //       body: JSON.stringify({ username, password }),
  //     });
  //     console.log(response);
  //     if (!response.ok) {
  //       console.log("try");
  //       this.setState((prevState) => ({
  //         ...prevState,
  //         error: !error,
  //       }));
  //       return;
  //     }

  //     const data = await response.json();
  //     const token = data.jwt_token;
  //     console.log(token);
  //     Cookies.set("jwt_token", token, { expires: 0.1 });

  //     console.log("Login successful! Token stored.");
  //     this.setState({ loading: false });
  //     window.location.href = "/NxtWatch/Home";
  //   } catch (error) {
  //     console.log("There was a problem with the login request:", error);
  //     this.setState((prevState) => ({
  //       ...prevState,
  //       error: !error,
  //       loading: false,
  //     }));
  //   }
  // };
  handleSubmit = async () => {
    const { username, password } = this.state;
    // Dispatching the action directly
    const { loginUser } = this.props;
    loginUser(username, password);
    console.log("DONE await");
  };

  render() {
    const { username, password, showPass } = this.state;
    const { mode, loading, error } = this.props;

    return (
      <>
        <div className="nxwLogin">
          <div className="loginField">
            <div className="logoImageCon">
              {!this.context.mode ? (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="logo"
                  className="logoImage"
                />
              ) : (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                  alt="logo"
                  className="logoImage"
                />
              )}
            </div>
            <div className="loginInputFildsBtn">
              <div className="inputsWithbtn">
                <div className="inputs">
                  <div className="usernameCon">
                    <p className="usernameHeading">USERNAME</p>
                    <input
                      onChange={this.handleChangeUsername}
                      placeholder="Username"
                      className="userInput"
                      value={username}
                    />
                  </div>
                  <div className="passwordCon">
                    <p className="usernameHeading">PASSWORD</p>
                    <input
                      onChange={this.handleChangePassword}
                      placeholder="Password"
                      className="userInput"
                      type={showPass ? "text" : "password"}
                      value={password}
                    />
                  </div>
                </div>
                <form>
                  <input type="checkbox" onClick={this.handleShowPass} />
                  <label>Show password</label>
                </form>
              </div>
              <div className="btnCon">
                <button
                  type="button"
                  style={{ height: "44px", cursor: "pointer" }}
                  className="loginButton"
                  onClick={this.handleSubmit}
                  disabled={loading} // Disable button while loading
                >
                  {this.state.loading ? (
                    <ThreeDots
                      height="32"
                      width="32"
                      radius="9"
                      color="white"
                      ariaLabel="three-dots-loading"
                      visible={true}
                      style={{ justifyContent: "center" }}
                    />
                  ) : (
                    "Login"
                  )}
                </button>
                {error && (
                  <p className="error">*Username or Password didn't match</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

// export default LoginPage;
const connectStateAsProps = (state) => ({
  mode: state.modePageinSavedVid.mode,
  loading: state.login.loading,
  error: state.login.error,
});
const mapDispatchToProps = {
  loginUser,
};

export default connect(connectStateAsProps, mapDispatchToProps)(LoginPage);
// export default connect(connectStateAsProps)(LoginPage);

// const { username, password } = this.state;
// this.setState({ loading: true, error: false }); // Reset loading and error states
// try {
// const response = await fetch("https://apis.ccbp.in/login", {
//   method: "POST",
//   body: JSON.stringify({ username, password }),
// });

//   if (!response.ok) {
//     this.setState({ error: true, loading: false }); // Set error if response is not OK
//     return;
//   }

//   const data = await response.json();
//   const token = data.jwt_token;
//   Cookies.set("jwt_token", token, { expires: 0.1 });

//   this.setState({ loading: false });
//   window.location.href = "/NxtWatch/Home"; // Navigate after successful login
// } catch (error) {
//   this.setState({ error: true, loading: false }); // Handle network or other errors
//   console.error("Login request failed:", error);
// }
