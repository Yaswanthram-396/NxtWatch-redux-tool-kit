import "./index.css";
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Home({ Num }) {
  return (
    <div className="home">
      <Navbar />
      <Sidebar Num={Num} />
    </div>
  );
}

export default Home;
