import React from "react";

import SectionHero from "./SectionComponents/SectionHero";
import SectionSlider from "./SectionComponents/SectionSlider";
import SectionCallToAction from './SectionComponents/SectionCallToAction';
import SectionFaq from './SectionComponents/SectionFaq';
import SectionGetDeliveryAddress from './SectionComponents/SectionGetDeliveryAddress';
import SectionFullImageCallToAction from './SectionComponents/SectionFullImageCallToAction';
import SectionProductSlider from './SectionComponents/SectionProductSlider';
import SectionWysiwyg from './SectionComponents/SectionWysiwyg';
import SectionThreeColumnGrid from './SectionComponents/SectionThreeColumnGrid';
import SectionTitle from './SectionComponents/SectionTitle';
import SectionCodeEditor from './SectionComponents/SectionCodeEditor';
import ReusableComponent from './SectionComponents/ReusableComponent';

const SectionMaker = ({type, params}) => {
 
  switch (type) {
     
    case "section_hero_block":
      return <SectionHero {...params} />;

    case "section_slider_block":
      return <SectionSlider {...params} />;

    case "section_call_to_action_block":
      return <SectionCallToAction {...params} />;

    case "section_faq_block":
      return <SectionFaq {...params} />; 

    case "section_get_delivery_address_block":
      return <SectionGetDeliveryAddress {...params} />;

    case "section_full_image_call_to_action_block":
      return <SectionFullImageCallToAction {...params} />; 

    case "section_product_slider_block":
      return <SectionProductSlider {...params} />; 

    case "section_wysiwyg_block":
      return <SectionWysiwyg {...params} />; 

    case "section_three_column_grid_block":
      return <SectionThreeColumnGrid {...params} />;

    case "section_title_block":
      return <SectionTitle {...params} />;

    case "section_code_editor_block":
      return <SectionCodeEditor {...params} />; 

    case "reusable_component_block":
      return <ReusableComponent {...params} />;

    default :
      return ""                      

  }
};

export default SectionMaker
