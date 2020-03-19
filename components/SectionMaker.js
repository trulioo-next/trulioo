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

const SectionMaker = ({ type, params, sectionIndex }) => {
  switch (type) {
    case 'section_hero_block':
      return <SectionHero sectionIndex={sectionIndex} {...params} />;

    case 'section_slider_block':
      return <SectionSlider sectionIndex={sectionIndex} {...params} />;

    case 'section_call_to_action_block':
      return <SectionCallToAction sectionIndex={sectionIndex} {...params} />;

    case 'section_column_group_block':
      return <SectionColumnGroup sectionIndex={sectionIndex} {...params} />;

    case 'section_faq_block':
      return <SectionFaq sectionIndex={sectionIndex} {...params} />;

    case 'section_get_delivery_address_block':
      return (
        <SectionGetDeliveryAddress sectionIndex={sectionIndex} {...params} />
      );

    case 'section_7rewards_block':
      return <Section7Rewards sectionIndex={sectionIndex} {...params} />;

    case 'section_newsletter_block':
      return <SectionNewsletter sectionIndex={sectionIndex} {...params} />;

    case 'section_wysiwyg_block':
      return <SectionWysiwyg sectionIndex={sectionIndex} {...params} />;

    case 'section_code_editor_block':
      return <SectionCodeEditor sectionIndex={sectionIndex} {...params} />;

    case 'reusable_component_block':
      return <ReusableComponent sectionIndex={sectionIndex} {...params} />;

    default:
      return '';
  }
};

export default SectionMaker;
