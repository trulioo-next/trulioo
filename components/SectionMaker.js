import React from 'react';

import SectionHero from './SectionComponents/SectionHero';
import SectionSlider from './SectionComponents/SectionSlider';
import SectionCallToAction from './SectionComponents/SectionCallToAction';
import SectionColumnGroup from './SectionComponents/SectionColumnGroup';
import SectionFaq from './SectionComponents/SectionFaq';
import SectionGetDeliveryAddress from './SectionComponents/SectionGetDeliveryAddress';
import Section7Rewards from './SectionComponents/Section7Rewards';
import SectionNewsletter from './SectionComponents/SectionNewsletter';
import SectionWysiwyg from './SectionComponents/SectionWysiwyg';
import SectionCodeEditor from './SectionComponents/SectionCodeEditor';
import ReusableComponent from './SectionComponents/ReusableComponent';

const SectionMaker = ({ type, params }) => {
  switch (type) {
    case 'section_hero_block':
      return <SectionHero {...params} />;

    case 'section_slider_block':
      return <SectionSlider {...params} />;

    case 'section_call_to_action_block':
      return <SectionCallToAction {...params} />;

    case 'section_column_group_block':
      return <SectionColumnGroup {...params} />;

    case 'section_faq_block':
      return <SectionFaq {...params} />;

    case 'section_get_delivery_address_block':
      return <SectionGetDeliveryAddress {...params} />;

    case 'section_7rewards_block':
      return <Section7Rewards {...params} />;

    case 'section_newsletter_block':
      return <SectionNewsletter {...params} />;

    case 'section_wysiwyg_block':
      return <SectionWysiwyg {...params} />;

    case 'section_code_editor_block':
      return <SectionCodeEditor {...params} />;

    case 'reusable_component_block':
      return <ReusableComponent {...params} />;
  }
};

export default SectionMaker;
