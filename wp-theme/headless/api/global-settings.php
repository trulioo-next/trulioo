<?php
/**
 *
 *
 * @package  IdealRebel_Headless_WP
 *
 */

 
/**
	* WP Core Global Settings
	* RT - 2-26-20
	* 
	* @param Global - Menus
*/


add_action( 'rest_api_init', 'get_global_settings' );
function get_global_settings() {
    
    // Return Global settings 
    // Menus 
    // ***** 
    register_rest_route( 'global-settings', 'global', array(
            'methods' => 'GET',
            'callback' => 'return_global_settings',
        )
    );
}
  
/**
 * Return site Global settings 
 *
 * @param 
 */
function return_global_settings() {

	// Build Menus 
	//
	$headerNav = getMenuSlug('main');
	$footerSubMenu = getMenuSlug('footer-sub-menu');
	$footer = getMenuSlug('footer');
 
	// 
	$GLOBAL['main'] = $headerNav;
	$GLOBAL['footer'] = $footer;
	$GLOBAL['footer-sub-menu'] = $footerSubMenu;
	//
    return rest_ensure_response( $GLOBAL );
}

/**
 * Get Menu Items From Location
 *
 * @param $location : location slug given as key in register_nav_menus
 */
function getMenuItemsFromLocation($location) {
	$theme_locations = get_nav_menu_locations();
	$menu_obj = get_term( $theme_locations[$location], 'nav_menu' );
	return  getMenuItemsForParent($menu_obj->slug, 0, $menu_obj);
}

function getBuildTree( $elements, $parentId = 0 ) {
    $branch = array();
    foreach ( $elements as $element )
    {
        if ( $element->menu_item_parent == $parentId )
        {
            $children = buildTree( $elements, $element->ID );
            
            if ( $children ) {
              foreach ($children as $child) {
                if ($child->object === 'page') {
                  $parsedURL = parse_url($child->url);
                  $child->url = $parsedURL['path'];
                }
              }

              $element->sub_nav = $children;
            }

            $branch[] = $element;
            $element->{'acf'} = get_fields($element->ID);
        }
    }
    return $branch;
}

function getMenuSlug($data) {
	$menu_items = wp_get_nav_menu_items($data);
	$menu_items_tree = $menu_items ? buildTree( $menu_items, 0 ) : null;
  
  
	if ($menu_items_tree) {
	  foreach ($menu_items_tree as $item) {
  
		if ($item->object === 'page') {
		  $post = get_post($item->object_id);
		  $slug = $post->post_name;
  
		  $item->url = '/' . $slug;
		}
	  }
  
	  return array(
		'slug' => $data['slug'],
		'menu' => $menu_items_tree
	  );
	}
  
	return array();
}

/**
 * Format Navigation 
 * 
 * @param $menuSlug
 * @param $parentId
 * @return array 
 */

function getMenuItemsForParent($menuSlug, $parentId, $menu) {
	$args = [
			'post_type' => 'nav_menu_item',
			'meta_key' => '_menu_item_menu_item_parent',
			'meta_value' => $parentId,
			'tax_query' => [
				[
					'taxonomy' => 'nav_menu',
					'field' => 'slug',
					'terms' => [$menuSlug]
				]
			],
			'order' => 'ASC',
			'orderby' => 'menu_order',
			'posts_per_page' => -1
		];
	$tmpItems = query_posts($args);

	$items = [];
	foreach ( $tmpItems as $tmpItem ) {
		$item = new stdClass;
		$type = get_post_meta($tmpItem->ID, '_menu_item_type', true);
		switch($type):

			case 'post_type':
				$postId = get_post_meta($tmpItem->ID, '_menu_item_object_id', true);
				$post = get_post($postId);
				$parent = false;
				$title = $post->post_title;
				$slug = '/'.$post->post_name;
				$class = "regular";	
				 $menu_items = wp_get_nav_menu_items($menu);
				if($post->post_parent != 0) {
					$parent = get_post($post->post_parent);
					$parent = $parent->post_name;
				}
				if($parent && $parent) {
					$slug ='/'.$parent.'/'.$post->post_name;
				}
				if( $title == "Sign-In" || $title == "Sign-In / Join Now") {
					$class = "auth--hidden";
				}
				if( $title == "Sign-Out" || $title == "7Rewards Sign-Out") {
					$class = "auth--required";
				}
				if( $title == "My Account" || $title == "7Rewards My Account" || $post->post_name == 'myaccount') {
					$class = "auth--required";
				}
 
				
				$item->name = $post->post_title;
				$item->ID = $tmpItem->ID;
				$item->className = $class;
				$item->label = getLinkLabel($menu_items,$tmpItem->ID);
				// '/'.$post->post_type.
				$item->url = $slug;
				break;

			case 'custom':
			    $class = "regular";			
				if( $tmpItem->post_title == "My Account" || $tmpItem->post_title == "7Rewards My Account" || $tmpItem->post_title == 'myaccount') {
					$class = "auth--required";
				}
				$item->name = $tmpItem->post_title;
				$item->ID = $tmpItem->ID;
				$item->className = $class;
				$item->url = get_post_meta($tmpItem->ID, '_menu_item_url', true);

		endswitch;
		$item->children = getMenuItemsForParent($menuSlug, $tmpItem->ID, $menu);

		$items[] = $item;
	}
			
	return $items;
}

// get link label
function getLinkLabel($data,$id) {
	$label = 'hre';	
	foreach ($data as $value) {
		$menu_label = intval($value->ID);
		$post_id = intval($id);
		if( $menu_label == $post_id ) {
		 	$label = $value->post_title;
		}
	 
	}
	return $label;
}



// END POINT
// 
// http://trullio-wp.local/wp-json/global-settings/global
 


