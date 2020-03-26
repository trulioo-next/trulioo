import React, { useEffect, useState } from "react";
import ColumnSpread from '@/components/ColumnSpread';
import MediaObjectCard from '@/components/MediaObjectCard';
 
const SectionPostGrid = (props) => {

	let { posts, category } = props
	let count = posts.length;

    return <ColumnSpread spread={count}>
            
	{ posts &&
		posts.map((post, sectionKey) => (
		<MediaObjectCard key={sectionKey}
		title={post.title}
		image={ post.photos ? post.photos[0].url : "/static/images/placeholders/NewYorkDeliMeatLovers.png" }
		product={{ href: '/menu/'+category+'/'+post.slug, calories: post.calories }}
		stacked
		>
		{post.description}
		</MediaObjectCard>
		))
	}
     </ColumnSpread>
};

SectionPostGrid.defaultProps = {};

export default SectionPostGrid;
