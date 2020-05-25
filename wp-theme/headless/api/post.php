<?php
/**
 *
 *
 * @package  IdealRebel_Headless_WP
 *
 */

 
/**
	* WP Post Content 
	* RT - 2-26-20
	* 
	* @param Page + ACF Data
*/
add_action( 'rest_api_init', 'get_post_content' );
function get_post_content() {

	register_rest_route( 'api/v1', '/post/(?P<id>\d+)', array(
        	// 
        	'methods'  => WP_REST_Server::READABLE,
        	// 
        	'callback' => 'return_post_content',
        	// Validate ID is numeric 		
        	'args' => array(
		      'id' => array(
		        'validate_callback' => function($param, $request, $key) {
		        	 
		          return is_numeric( $param );
		        }
		      ),
    	) 
	));
}

/**
	* WP_REST_POST
	* RT - 2-26-20
	* 
	* @param Number (id)
*/
function return_post_content(WP_REST_Request $request) {

	$parms = $request;
    if ( isset( $parms['id'] ) ) {
        // return rest_ensure_response( $request['data'] );
        $acf = get_fields($parms['id']);
        $post = get_post( $parms['id'] );
        $POST['post_data'] = $post;
        $POST['acf_data'] = $acf;
        return new WP_REST_Response( $POST, 200 );
    }
 	// Sanitise response 
    return new WP_Error( 'rest_invalid', esc_html__( 'The ID parameter is required.', 'IR Error' ), array( 'status' => 400 ) );
}

 


// END POINT
// 
// http://trullio-wp.local/wp-json/api/v1/page/home


