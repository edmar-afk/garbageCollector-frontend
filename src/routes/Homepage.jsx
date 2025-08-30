import React from "react";
import Greetings from "../components/homepage/Greetings";
import Header from "../components/homepage/Header";
import History from "../components/homepage/History";

function Homepage() {
  return (
    <>
      <Header />
      <Greetings />
      <History/>
    </>
  );
}

export default Homepage;
