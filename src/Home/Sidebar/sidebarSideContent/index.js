import React from "react";
import "./index.css";
import { FaTimes } from "react-icons/fa";
import GetApiRes from "../videosAnSearch";
import { connect } from "react-redux";
class VideosInHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { banner: true };
  }
  darkMode = {
    backgroundColor: "white",
  };
  light = {
    backgroundColor: "black",
  };
  handleCloseBanner = () => {
    const { banner } = this.state;
    this.setState({ banner: !banner });
  };
  render() {
    const { banner } = this.state;
    const { mode } = this.props;
    return (
      <div
        className="sidebarSideContent"
        style={!mode ? this.darkMode : this.light}
      >
        <div
          className="SideContentbanner"
          style={{ display: banner ? "block" : "none" }}
        >
          <div className="innerContainer">
            <div className="adContent">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="logo"
                className="logoNavbar"
              />
              <p style={{ color: "#000" }}>
                Buy Nxt Watch Premium prepaid plans with UPI
              </p>
              <button className="AdBtn">GET IT NOW</button>
            </div>

            <FaTimes
              className="closeIcon"
              style={{ color: "#000" }}
              onClick={this.handleCloseBanner}
            />
          </div>
        </div>
        <GetApiRes />
      </div>
    );
  }
}

const connectStateAsProps = (state) => ({
  mode: state.modePageinSavedVid.mode,
});

export default connect(connectStateAsProps)(VideosInHome);
