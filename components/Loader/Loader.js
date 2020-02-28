import React from "react";

import css from "./Loader.scss";

const Loader = () => (
  <div className="loader__bg">
    <div className="page__loader">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
);

export default Loader;
