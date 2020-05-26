<?php
function trulioo_resources_custom_post_type() {
	$labels = array(
		'name'                => __( 'Resources' ),
		'singular_name'       => __( 'Resource'),
		'menu_name'           => __( 'Resources'),
		'parent_item_colon'   => __( 'Parent Resource'),
		'all_items'           => __( 'All Resources'),
		'view_item'           => __( 'View Resource'),
		'add_new_item'        => __( 'Add New Resource'),
		'add_new'             => __( 'Add New'),
		'edit_item'           => __( 'Edit Resource'),
		'update_item'         => __( 'Update Resource'),
		'search_items'        => __( 'Search Resource'),
		'not_found'           => __( 'Not Found'),
		'not_found_in_trash'  => __( 'Not found in Trash')
	);
	$args = array(
		'label'               => __( 'Resources'),
		'description'         => __( 'Trulioo Resources'),
		'labels'              => $labels,
		'supports'            => array( 'title', 'editor', 'excerpt', 'author', 'thumbnail', 'revisions', 'custom-fields'),
		'public'              => true,
		'hierarchical'        => false,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => true,
		'show_in_admin_bar'   => true,
		'has_archive'         => true,
		'can_export'          => true,
		'exclude_from_search' => false,
	  	'yarpp_support'       => true,
		'show_in_rest'        => true,
		'taxonomies'          => array('post_tag'),
		'publicly_queryable'  => true,
		'capability_type'     => 'page'
);
	register_post_type( 'resources', $args );
}

function trulioo_resources_custom_taxonomy() {
	$typesLabels = array(
		'name'               => _x( 'Types', 'taxonomy general name' ),
		'singular_name'      => _x( 'Type', 'taxonomy singular name' ),
		'search_items'       =>  __( 'Search Types' ),
		'all_items'          => __( 'All Types' ),
		'parent_item'        => __( 'Parent Type' ),
		'parent_item_colon'  => __( 'Parent Type:' ),
		'edit_item'          => __( 'Edit Type' ),
		'update_item'        => __( 'Update Type' ),
		'add_new_item'       => __( 'Add New Type' ),
		'new_item_name'      => __( 'New Type Name' ),
		'menu_name'          => __( 'Types' ),
	);

	$topicsLabels = array(
		'name'               => _x( 'Topic', 'taxonomy general name' ),
		'singular_name'      => _x( 'Topic', 'taxonomy singular name' ),
		'search_items'       =>  __( 'Search Topic' ),
		'all_items'          => __( 'All Topics' ),
		'parent_item'        => __( 'Parent Topic' ),
		'parent_item_colon'  => __( 'Parent Topic:' ),
		'edit_item'          => __( 'Edit Topic' ),
		'update_item'        => __( 'Update	Topic' ),
		'add_new_item'       => __( 'Add New Topic' ),
		'new_item_name'      => __( 'New Topic Name' ),
		'menu_name'          => __( 'Topics' ),
	);

  register_taxonomy('resources_types',array('resources'), array(
		'hierarchical'      => true,
		'labels'            => $typesLabels,
		'show_ui'           => true,
		'show_admin_column' => true,
		'query_var'         => true,
		'show_in_rest'      => true,
		'rewrite'           => array( 'slug' => 'resources_types' ),
  ));

	register_taxonomy('resources_topics',array('resources'), array(
		'hierarchical'      => true,
		'labels'            => $topicsLabels,
		'show_ui'           => true,
		'show_admin_column' => true,
		'query_var'         => true,
		'show_in_rest'      => true,
		'rewrite'           => array( 'slug' => 'resources_topics' ),
	));
}

add_action( 'init', 'trulioo_resources_custom_post_type', 0 );
add_action( 'init', 'trulioo_resources_custom_taxonomy', 0 );

?>
