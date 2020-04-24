import React, { useEffect, useState } from "react";
import SectionMaker from '@/components/SectionMaker';

const ReusableComponent = (props) => {

	// console.log('Reusable Component  PROPS :: ', props.component )
    return (
		<>
			{ props.component &&
	        props.component.components && props.component.components.map((section, sectionKey) => (
	          <SectionMaker
	            type={section.acf_fc_layout}
	            params={section}
	            key={sectionKey}
	            sectionIndex={sectionKey}
	          />
	        ))}
		</>
   	)
};

ReusableComponent.defaultProps = {};
export default ReusableComponent;
