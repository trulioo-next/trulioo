<?php
/**
 *
 *
 * @package  IdealRebel_Headless_WP
 *
 */


require_once 'inc/frontend-origin.php';
require_once 'inc/class-acf-commands.php';
require_once 'inc/log.php';
require_once 'inc/cors.php';
require_once 'inc/admin.php';
require_once 'inc/menus.php';
require_once 'inc/acf-options.php';
require_once 'inc/graphql/resolvers.php';
require_once 'posttypes/helper-functions.php'; 

// Api's 
require_once 'api/global-settings.php'; 
require_once 'api/page.php';
require_once 'api/post.php';

//add SVG to allowed file uploads
function add_file_types_to_uploads($file_types){

     $new_filetypes = array();
     $new_filetypes['svg'] = 'image/svg';
     $file_types = array_merge($file_types, $new_filetypes );

     return $file_types; 
} 
add_action('upload_mimes', 'add_file_types_to_uploads');
 


// Create menu locations 
// 
function register_trulioo_menus() {
	register_nav_menus(
		array(
		'footer' => __( 'Footer' ),
		'footer-sub-menu' => __( 'Footer Sub Menu' )
		)
	);
}
add_action( 'init', 'register_trulioo_menus' );