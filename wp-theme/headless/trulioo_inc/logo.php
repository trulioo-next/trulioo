<?php
///////////////////////////////////
// Logo
///////////////////////////////////
function themename_custom_logo_setup() {
 $defaults = array(
 'flex-height' => true,
 'flex-width'  => true,
 'header-text' => array( 'site-title', 'site-description' ),
 );
 add_theme_support( 'custom-logo', $defaults );
}
add_action( 'after_setup_theme', 'themename_custom_logo_setup' );

class WP_REST_API_logo {


 /**
  * Get WP API namespace.
  *
  * @since 1.0.0
  * @return string
  */
 public static function get_api_namespace() {
     return 'wp/v2';
 }


 /**
  * Get WP API Menus namespace.
  *
  * @since 1.0.0
  * @return string
  */
 public static function get_plugin_namespace() {
   return 'wp-rest-api-static/v2';
 }


 /**
  * Register menu routes for WP API v2.
  *
  * @since  1.0.0
  */
 public function register_routes() {

   register_rest_route( self::get_api_namespace(), '/logo', array(
       array(
         'methods'  => WP_REST_Server::READABLE,
         'callback' => array( $this, 'get_logo' )
       )
     )
   );
 }


 /**
  * Get the logo
  *
  * @since  1.0.0
  * @return Url of the logo
  */
 public static function get_logo() {

   $rest_url = trailingslashit( get_rest_url() . self::get_plugin_namespace() . '/logo/' );

   if (has_custom_logo()) {
     $custom_logo_id = get_theme_mod( 'custom_logo' );
     $logo_meta = wp_get_attachment_image_src($custom_logo_id,'full');
     $output = json_decode('{"id": ' . $custom_logo_id . ', "url": "' . $logo_meta[0] . '"}');
   } else {
       $output = null;
   }

   // No logo is set
   if( empty($output) ) {
     return new WP_Error( 'wpse-error',
       esc_html__( 'No logo set', 'wpse' ),
       [ 'status' => 404 ] );
   }

   // Response setup
   return new WP_REST_Response( $output, 200 );
 }
}

add_theme_support( 'post-thumbnails' );
add_action( 'init', 'wp_rest_api_logo_init' );
function wp_rest_api_logo_init() {
  $class = new WP_REST_API_logo();
  add_filter( 'rest_api_init', array( $class, 'register_routes' ) );
}
?>
