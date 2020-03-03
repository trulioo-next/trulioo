import React from "react";

import SectionHero from "./SectionHero";
import SectionSlider from "./SectionSlider";
import SectionCallToAction from './SectionCallToAction';

const SectionMaker = ({type, params}) => {
  switch (type) {
     
    case "SectionHero":
      return <SectionHero {...params} />;

    case "SectionSlider":
      return <SectionSlider {...params} />;  

    case "SectionCallToAction":
      return <SectionCallToAction {...params} />;     

  }
};

export default SectionMaker
