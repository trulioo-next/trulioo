import React, { useEffect, useState } from "react";
 

import ColumnSpread from '@/components/ColumnSpread';
import MediaObjectCard from '@/components/MediaObjectCard';


const SectionTasteOfAsia = (props) => {
   
    const [ lang, setLang ] = useState('hindi_content'); 

    let { products } = props;

    console.log('TASTE OF ASIA ', products )

    return <ColumnSpread spread={3}>
            
	{ products &&
		products.map((product, sectionKey) => (
		<MediaObjectCard key={sectionKey}
		title={product.product[lang].title}
		image={ product.product.image ? product.product.image.url : "/static/images/placeholders/NewYorkDeliMeatLovers.png" }
		stacked
		>
		{product.product[lang].description}
		</MediaObjectCard>
		))
	}
     </ColumnSpread>
};

SectionTasteOfAsia.defaultProps = {};

export default SectionTasteOfAsia;
