import React from "react";
import Greetings from "../components/homepage/Greetings";
import Header from "../components/homepage/Header";
import History from "../components/homepage/History";
import Navbar from "../components/Navbar";
import SendRequest from "../components/requests/SendRequest";

function Homepage() {
  return (
    <>
      <Header />
      <Greetings />
      <History />
      <Navbar />
    </>
  );
}

export default Homepage;
