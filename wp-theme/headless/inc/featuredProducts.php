<?php

function getFeaturedProductsOfTaxonomyTerm($term)
{
	$productIDs = [];
	$components = get_field('components',$term->taxonomy . '_' . $term->term_id );
	if (!$components)
	{	return [];
	}

	foreach ($components as $c)
	{	$block = isset($c['acf_fc_layout']) ? $c['acf_fc_layout'] : null;
		if ($block == 'section_post_grid')
		{
			$productIDs = $c['posts'];
		}
	}

	if ($productIDs)
	{
		$query = new WP_Query(array(
				'post__in' => $productIDs,
				'posts_per_page' => -1,
				'post_type' => 'se_food'
			));
		if ($query->have_posts())
		{	return $query->posts;
		}
	}

	return [];
}

