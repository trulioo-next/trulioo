import React, { useEffect, useState } from "react";
import {SectionCTA} from "../SectionCallToAction/SectionCallToAction";
import './SectionWysiwyg.scss';

const SectionWysiwyg = (props) => {

	// console.log('SectionWysiwyg  PROPS :: ', props )

	let ctas = null;
	const ctaStyle = {};
	if (props.call_to_action)
	{	ctas = {
					item: {...props.call_to_action},
					text_colour: '#ffffff',
					// background_colour: '#000000',
					hover_text_colour: '#000000',
					// hover_background_colour: ''
				};
	}

   return  (
		<React.Fragment>
			<div className="Nutritionals inner__copy" dangerouslySetInnerHTML={{ __html: props.content }} />
			{ctas &&
				<div className="wysiwygCTA">
					<SectionCTA data={ctas} modal={false} i={0} />
				</div>
			}
		</React.Fragment>
   )
};

SectionWysiwyg.defaultProps = {};

export default SectionWysiwyg;
