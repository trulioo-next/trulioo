import React from 'react';

import SectionHero from './SectionComponents/SectionHero';
import SectionSlider from './SectionComponents/SectionSlider';
import SectionCallToAction from './SectionComponents/SectionCallToAction';
import SectionColumnGroup from './SectionComponents/SectionColumnGroup';
import SectionColumnSpread from './SectionComponents/SectionColumnSpread';
import SectionFaq from './SectionComponents/SectionFaq';
import SectionGetDeliveryAddress from './SectionComponents/SectionGetDeliveryAddress';
import Section7Rewards from './SectionComponents/Section7Rewards';
import SectionNewsletter from './SectionComponents/SectionNewsletter';
import SectionWysiwyg from './SectionComponents/SectionWysiwyg';
import SectionCodeEditor from './SectionComponents/SectionCodeEditor';
import ReusableComponent from './SectionComponents/ReusableComponent';
import SectionPostGrid from './SectionComponents/SectionPostGrid';
import SectionNewsroomGrid from './SectionComponents/SectionNewsroomGrid';
import SectionTasteOfAsia from './SectionComponents/SectionTasteOfAsia';
import SectionGiftCardBalance from './SectionComponents/SectionGiftCardBalance';
import SectionContestWinners from './SectionComponents/SectionContestWinners';
import SectionSearchResults from './SectionComponents/SectionSearchResults';
import SectionLoggedOutSlider from './SectionComponents/SectionLoggedOutSlider';
import SectionImageLinkBlocks from './SectionComponents/SectionImageLinkBlocks';
import SectionTextSlider from './SectionComponents/SectionTextSlider';
import SectionSlurpeeTrivia from './SectionComponents/SectionSlurpeeTrivia';
import SlurpeeSpacer from '@/components/SlurpeeSpacer';

const SectionMaker = ({
  type,
  params,
  sectionIndex,
  category,
  defaultImage,
  props,
}) => {
  switch (type) {
    case 'section_hero_block':
      return <SectionHero sectionIndex={sectionIndex} {...params} />;

    case 'section_slider_block':
      return <SectionSlider sectionIndex={sectionIndex} {...params} />;

    case 'section_call_to_action_block':
      return <SectionCallToAction sectionIndex={sectionIndex} {...params} />;

    case 'section_column_group_block':
      return <SectionColumnGroup sectionIndex={sectionIndex} {...params} />;

    case 'section_column_spread_block':
      return <SectionColumnSpread sectionIndex={sectionIndex} {...params} />;

    case 'section_faq_block':
      return <SectionFaq sectionIndex={sectionIndex} {...params} />;

    case 'section_get_delivery_address_block':
      return (
        <SectionGetDeliveryAddress sectionIndex={sectionIndex} {...params} />
      );

    case 'section_7rewards_block':
      return <Section7Rewards sectionIndex={sectionIndex} {...params} />;

    case 'section_loggedout_slider_block':
      return <SectionLoggedOutSlider sectionIndex={sectionIndex} {...params} />;

    case 'section_newsletter_block':
      return <SectionNewsletter sectionIndex={sectionIndex} {...params} />;

    case 'section_wysiwyg_block':
      return <SectionWysiwyg sectionIndex={sectionIndex} {...params} />;

    case 'section_code_editor_block':
      return <SectionCodeEditor sectionIndex={sectionIndex} {...params} />;

    case 'reusable_component_block':
      return <ReusableComponent sectionIndex={sectionIndex} {...params} />;

    case 'section_post_grid':
      return (
        <SectionPostGrid
          sectionIndex={sectionIndex}
          {...params}
          category={category}
          defaultImage={defaultImage}
        />
      );

    case 'section_newsroom_grid':
      return <SectionNewsroomGrid sectionIndex={sectionIndex} {...params} />;

    case 'section_taste_of_asia':
      return <SectionTasteOfAsia sectionIndex={sectionIndex} {...params} />;

    case 'section_gift_card_balance':
      return <SectionGiftCardBalance sectionIndex={sectionIndex} {...params} />;

    case 'selection_contest_winners':
      return <SectionContestWinners {...params} />;

    case 'search_results_placeholder':
      return <SectionSearchResults props={{ ...props }} {...params} />;

    case 'section_image_overlay_link_blocks':
      return <SectionImageLinkBlocks {...params} />;

    case 'section_text_slider':
      return <SectionTextSlider {...params} />;

    case 'slurpee_trivia':
      return <SectionSlurpeeTrivia {...params} />;

    case 'slurpee_spacer':
      return <SlurpeeSpacer {...params} />;

    default:
      return '';
  }
};

export default SectionMaker;
