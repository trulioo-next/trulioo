import React from "react";

import SectionHero from "./SectionComponents/SectionHero";
import SectionSlider from "./SectionComponents/SectionSlider";
import SectionCallToAction from './SectionComponents/SectionCallToAction';

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
