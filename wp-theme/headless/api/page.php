<?php
/**
 *
 *
 * @package  IdealRebel_Headless_WP
 *
 */

 
/**
	* WP Page Content
	* RT - 2-26-20
	* 
	* @param Page + ACF Data
*/
add_action( 'rest_api_init', 'get_page_content' );
function get_page_content() {

	register_rest_route( 'api/v1', '/page/(?P<slug>[a-zA-Z0-9-]+)', array(
        	// 
        	'methods'  => WP_REST_Server::READABLE,
        	// 
        	'callback' => 'return_page_content',
        	// Validate ID is numeric 		
        	'args' => array(
		            'slug' => array (
		                'required' => false
		            )
		        )
	));
}

/**
	* WP_REST_PAGE 
	* RT - 2-26-20
	* 
	* @param String | Slug
*/
function return_page_content(WP_REST_Request $request) {

	$parms = $request;

    if ( isset( $parms['slug'] ) ) {
        $slug = $parms['slug'];
         

        $parent = explode("--", $slug);
        if($parent[0] && isset($parent[1]) && $parent[1]) {
            $slug = $parent[0] .'/'. $parent[1];
        }

        if($parent[0] && isset($parent[1]) && $parent[1] && isset($parent[2]) && $parent[2] ) {
            $slug = $parent[0] .'/'. $parent[1].'/'. $parent[2];
        }

        $id = get_page_by_path($slug);
        $acf = get_fields($id->ID);
         
        $seoDesc = get_post_meta($id->ID, '_yoast_wpseo_metadesc', true); 
        $seoTitle = get_post_meta($id->ID, '_yoast_wpseo_title', true); 
        $seoFacebookImage = get_post_meta($id->ID, '_yoast_wpseo_opengraph-image', true);
        $seoFacbookTitle = get_post_meta($id->ID, '_yoast_wpseo_opengraph-title', true);
        $seoFacbookDesc = get_post_meta($id->ID, '_yoast_wpseo_opengraph-description', true);
        $seoTwitterImage = get_post_meta($id->ID, '_yoast_wpseo_twitter-image', true);
        $seoTwitterTitle = get_post_meta($id->ID, '_yoast_wpseo_twitter-title', true);
        $seoTwitterDesc = get_post_meta($id->ID, '_yoast_wpseo_twitter-description', true);  

        $seo =  array(
            'title' => $seoTitle, 
            'desc' => $seoDesc, 
            'facebook_title'=>$seoFacbookTitle,
            'facebook_desc'=>$seoFacbookDesc,
            'facebook_image'=>$seoFacebookImage,
            'twitter_title'=>$seoTwitterTitle,
            'twitter_desc'=>$seoTwitterDesc,
            'twitter_image'=>$seoTwitterImage    
        );

        $post = get_post( $id->ID );
        $POST['parent'] = $parent;
        $POST['page_data'] = $post;
        $POST['seo'] = $seo;
        $POST['acf_data'] = $acf;
        $POST['isLoading'] = false;
        return new WP_REST_Response( $POST, 200 );
    }
 	// Sanitise response 
    return new WP_Error( 'rest_invalid', esc_html__( 'The ID parameter is required.', 'IR Error' ), array( 'status' => 400 ) );
}

// END POINT
// 
// http://trullio-wp.local/wp-json/api/v1/page/home


