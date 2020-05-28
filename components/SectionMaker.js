import React from 'react';

import { Hero } from '@/components/Hero';
import { SectionImageList } from '@/components/SectionImageList';
import { IdentityVerification } from '@/components/IdentityVerification';
import { SuccessFinancial } from '@/components/SuccessFinancial';
import { DidYouKnow } from '@/components/DidYouKnow';
import { BookDemo } from '@/components/BookDemo';
import { HalfHero } from '@/components/HalfHero';
import { InvestorList } from '@/components/InvestorList';
import { MultipleRowSection } from '@/components/MultipleRowSection';
import { DidYouKnowHalf } from '@/components/DidYouKnowHalf';
import { BookDemoHalf } from '@/components/BookDemoHalf';
import { MeetTheProduct } from '@/components/MeetTheProduct';
import { TwoColumnContent } from '@/components/TwoColumnContent';
import { VideoSection } from '@/components/VideoSection';
import { BusinessIntelligence } from '@/components/BusinessIntelligence';
import { Pricing } from '@/components/Pricing';
import { Marketo } from '@/components/Marketo';
import { SectionVideoBg } from '@/components/SectionVideoBg';
import { OnPageSection } from '@/components/OnPageSection';
import { SliderSection } from '@/components/Slider';

const SectionMaker = ({
  type,
  params,
  sectionIndex,
  category,
  defaultImage,
  props,
}) => {
  switch (type) {
    case 'header_block':
      return <Hero sectionIndex={sectionIndex} component={params} />;

    case 'section_image_list_block':
      return <SectionImageList sectionIndex={sectionIndex} component={params} />;  

    case 'identity_verification_block':
      return <IdentityVerification sectionIndex={sectionIndex} component={params} />;

    case 'success_stories_financial_services_block':
      return <SuccessFinancial sectionIndex={sectionIndex} component={params} />;  

    case 'did_you_know_block':
      return <DidYouKnow sectionIndex={sectionIndex} component={params} />; 

    case 'book_demo_block':
      return <BookDemo sectionIndex={sectionIndex} component={params} />; 

    case 'header_half_block':
      return <HalfHero sectionIndex={sectionIndex} component={params} />;     

    case 'about_investor_list_block':
      return <InvestorList sectionIndex={sectionIndex} component={params} />;

    case 'multi_row_section_block':
      return <MultipleRowSection sectionIndex={sectionIndex} component={params} />; 

    case 'did_you_know_half_block':
      return <DidYouKnowHalf sectionIndex={sectionIndex} component={params} />;   

    case 'book_demo_half_block':
      return <BookDemoHalf sectionIndex={sectionIndex} component={params} />;

    case 'meet_the_product_block':
      return <MeetTheProduct sectionIndex={sectionIndex} component={params} />;

    case 'two_column_content_block':
      return <TwoColumnContent sectionIndex={sectionIndex} component={params} />;

    case 'video_block':
      return <VideoSection sectionIndex={sectionIndex} component={params} />;  

    case 'business_intelligence_block':
      return <BusinessIntelligence sectionIndex={sectionIndex} component={params} />;

    case 'pricing_block':
      return <Pricing sectionIndex={sectionIndex} component={params} />; 

    case 'section_video_bg_block':
      return <SectionVideoBg sectionIndex={sectionIndex} component={params} />;   

    case 'on_page_section_block':
      return <OnPageSection sectionIndex={sectionIndex} component={params} />;

    case 'homepage_slider_block':
      return <SliderSection sectionIndex={sectionIndex} component={params} />;   

    case 'marketo_forms_block':
      return <Marketo sectionIndex={sectionIndex} component={params} />;                               
 

    default:
      return `<>${type}</>`;
  }
};

export default SectionMaker;
