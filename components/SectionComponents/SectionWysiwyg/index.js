import React, { useEffect, useState } from "react";
 

const SectionWysiwyg = (props) => {

	// console.log('SectionWysiwyg  PROPS :: ', props )

    

   return  <div className="Nutritionals inner__copy" dangerouslySetInnerHTML={{ __html: props.content }} />
};

SectionWysiwyg.defaultProps = {};

export default SectionWysiwyg;
