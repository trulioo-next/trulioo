<?php

if( !function_exists('se_is_plugin_active') ){
	
	function se_is_plugin_active($plugin) {

		include_once (ABSPATH . 'wp-admin/includes/plugin.php');
	
		return is_plugin_active($plugin);
	
	}
	
}

if( !function_exists('se_has_shortcode') ){
	
	function se_has_shortcode($shortcode = '') {
     
		$post_to_check = get_post(get_the_ID());
		 
		// false because we have to search through the post content first
		$found = false;
		 
		// if no short code was provided, return false
		if (!$shortcode) {
			return $found;
		}
		// check the post content for the short code
		if($post_to_check) {
			if ( stripos($post_to_check->post_content, '[' . $shortcode) !== false ) {
				// we have found the short code
				$found = true;
			}
		}
		
		 
		// return our final results
		return $found;
	}
	
}

?>