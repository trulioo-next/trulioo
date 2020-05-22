import React from 'react';

import { Hero } from '@/components/Hero';
import { SectionImageList } from '@/components/SectionImageList';
import { IdentityVerification } from '@/components/IdentityVerification';
import { SuccessFinancial } from '@/components/SuccessFinancial';
import { DidYouKnow } from '@/components/DidYouKnow';
import { BookDemo } from '@/components/BookDemo';
// 
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
 

    default:
      return `<>${type}</>`;
  }
};

export default SectionMaker;
