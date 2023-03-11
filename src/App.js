import React from "react";
import CookiesInfo from "./components/cookies";
import Appk from "./Main";
import Cookies from "js-cookie";

function App() {
  return Cookies.get("allowcookies") === "true" ? <Appk /> : <CookiesInfo />;
}

export default App;
