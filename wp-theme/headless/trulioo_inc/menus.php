<?php

function buildTree( $elements, $parentId = 0 ) {
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

function trulioo_get_menu($data) {

  $menu_items = wp_get_nav_menu_items($data['slug']);
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

add_action( 'rest_api_init', function () {
  register_rest_route( 'trulioo', 'menus/(?P<slug>[a-zA-Z0-9-]+)', array(
    'methods'  => 'GET',
    'callback' => 'trulioo_get_menu'
  ) );
});

add_action( 'init', function() {
  global $wp_post_types;

  $post_type = 'nav_menu_item';
  if ( isset( $wp_post_types[$post_type] ) ) {
    $wp_post_types[$post_type]->show_in_rest = true;
    $wp_post_types[$post_type]->rest_base = 'menus';
  }
} );
?>
