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


require_once 'trulioo_inc/utilities.php';
require_once 'trulioo_inc/menus.php';

if(class_exists('ACF') ) {
	require_once 'trulioo_inc/logo.php';
    require_once 'trulioo_inc/routes.php';
    require_once 'trulioo_inc/custom-filter.php';
    require_once 'trulioo_inc/options.php';
    require_once 'trulioo_inc/posts.php';
    require_once 'trulioo_inc/resources.php';
    require_once 'trulioo_inc/press-releases.php';
    require_once 'trulioo_inc/custom-articles-types.php';
    require_once 'trulioo_inc/custom-resources-types.php';
    require_once 'trulioo_inc/custom-press-release-types.php';
    require_once 'trulioo_inc/theme-setup.php';
    require_once 'trulioo_inc/featured-image.php';
    require_once 'trulioo_inc/resources-types-topics.php';
    require_once 'trulioo_inc/post-types-topics.php';
    require_once 'trulioo_inc/press-releases-types-topics.php';
    require_once 'trulioo_inc/settings.php';
    require_once 'trulioo_inc/wpseo-yoast-sitemap-post-types.php';
}

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