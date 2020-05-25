<?php
/**
 *
 *
 * @package  IdealRebel_Headless_WP
 *
 */

require_once(__DIR__ .'/../inc/featuredProducts.php');
 
/**
	* WP 7-11 Search  
	* RM - 05-01-20
	* 
	* @param search
*/
add_action( 'rest_api_init', 'get_headless_search' );
function get_headless_search() {

	register_rest_route( 'api/v1', '/search', array(
        	'methods'  => WP_REST_Server::READABLE,
        	'callback' => 'return_headless_search',
        	'args' => array(
			'search' => array(
				'required' => true
			)
		)
    	));
}



function return_headless_search(WP_REST_Request $request) {

	$results = [];

	$searchTerm = isset($request['search']) ? $request['search'] : '';
	$searchTerm = trim($searchTerm);

	$query = null;
	if (!empty($searchTerm))
	{
		$args = array(
			's' => $searchTerm
		); 
		$query = new WP_Query( $args );
	}

	$foodTaxonomyResults = searchTaxonomy('nutritional_information', $searchTerm);
	$posts = [];
	if (!empty($foodTaxonomyResults))
	{	$posts = $foodTaxonomyResults;
	}
	if (!is_null($query) && $query->have_posts())
	{	$posts = array_merge($posts, $query->posts);
	}

	if (count($posts) < 1)
	{	// --- No results
		return $results;
	}

	// print_r($posts);

	$_searchAPI_featuredFoods = null;
	foreach($posts as $post) {
		$r = format_search_item($post);
		if ($r)
		{	$results[] = $r;
		}
	}

	// print_r($results);

	return new WP_REST_Response( $results, 200 );
}



function searchTaxonomy($taxonomyName, $searchTerm)
{
	$args = array(
	    'taxonomy'      => array( $taxonomyName ),
	    'orderby'       => 'id',
	    'order'         => 'ASC',
	    'hide_empty'    => true,
	    'fields'        => 'all',
	    'name__like'    => $searchTerm
	);

	$terms = get_terms( $args );

	return $terms;
}



function format_search_item($post) {

	if ($post instanceof WP_Term)
	{	return format_taxonomy_for_search($post);
	}
	return format_post_for_search($post);
}



function format_taxonomy_for_search($tax) {

	$item = [];
	$item['id'] = $tax->term_id;
	$item['title'] = $tax->name;
	$item['slug'] = '/menu/'. $tax->slug;
	$item['excerpt'] = $tax->description;
	$item['post_type'] = 'foodCategory';

	return $item;
}



function format_post_for_search($post) {
	global $_searchAPI_featuredFoods;
	
	// --- Exclude some types of results:
	if ($post->post_type == 'se_alert')
	{	return false;
	}elseif (stripos($post->guid, '/7rewards/') !== false)
	{	return false;
	}

	$item = [];
	$item['id'] = $post->ID;
	$item['title'] = $post->post_title;
	$item['slug'] = $post->post_name; 
	$item['post_type'] = $post->post_type;

	$excerpt = get_post_field('post_excerpt', $post->ID);
	if (!empty($excerpt))
	{	$item['excerpt'] = trim($excerpt);
	}

	// $acf = get_fields($post->ID);
	// $post->acf = $acf;
	// $item['POST_OBJECT'] = $post;

	switch ($item['post_type'])
	{
		case 'se_food' :
			$terms = get_the_terms( $post->ID, 'nutritional_information'  );
			if ($terms && (is_null($_searchAPI_featuredFoods) || !isset($_searchAPI_featuredFoods[$terms[0]->id])))
			{	$_searchAPI_featuredFoods[$terms[0]->id] = search_load_featured_products_of_category($terms[0]);
			}

			if (isset($_searchAPI_featuredFoods[$terms[0]->id]))
			{	// --- Only include food items that are featured on category pages:
				$inFeatured = array_filter($_searchAPI_featuredFoods[$terms[0]->id], function($p) use($item)
							{	return $p->ID == $item['id'];
							});
				if (!$inFeatured)
				{	return;
				}
			}

			if (!isset($item['excerpt']) || empty($item['excerpt']))
			{	$content = get_post_field('post_content', $post->ID);
				if (!empty($content))
				{	$item['excerpt'] = $content;
				}
			}

			if ($terms) {
				$item['category'] = $terms[0]->name;
				$item['slug'] = '/menu/'.$terms[0]->slug.'/'.$item['slug'];
			}
			break;

		case 'se_newsroom' :
			$item['category'] = 'Newsroom';
			$item['slug'] = '/newsroom/'.$item['slug'];
			break;

		case 'se_faq_sevenrew' :
			break;

		case 'se_alert' :
			return false;

		default:
			if (!isset($item['excerpt']) || empty($item['excerpt']))
			{	$content = get_post_field('post_content', $post->ID);
				if (!empty($content))
				{	$item['excerpt'] = $content;
				}
			}
	}

	return $item;
}



function search_load_featured_products_of_category($term)
{	return getFeaturedProductsOfTaxonomyTerm($term);
}


// END POINT
// 
// http://seven-eleven-wp.local/wp-json/api/v1/search?search=
