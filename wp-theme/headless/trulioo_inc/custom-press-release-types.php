<?php
function trulioo_press_release_custom_post_type() {
	$labels = array(
		'name'                => __( 'News' ),
		'singular_name'       => __( 'News'),
		'menu_name'           => __( 'News'),
		'parent_item_colon'   => __( 'Parent News'),
		'all_items'           => __( 'All News'),
		'view_item'           => __( 'View News'),
		'add_new_item'        => __( 'Add News Item'),
		'add_new'             => __( 'Add News'),
		'edit_item'           => __( 'Edit News'),
		'update_item'         => __( 'Update News'),
		'search_items'        => __( 'Search News'),
		'not_found'           => __( 'Not Found'),
		'not_found_in_trash'  => __( 'Not found in Trash')
	);
	$args = array(
		'label'               => __( 'News'),
		'description'         => __( 'Trulioo News'),
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
	register_post_type( 'press_releases', $args );
}

function trulioo_press_release_custom_taxonomy() {
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

	$yearsLabels = array(
		'name'               => _x( 'Years', 'taxonomy general name' ),
		'singular_name'      => _x( 'Year', 'taxonomy singular name' ),
		'search_items'       =>  __( 'Search Years' ),
		'all_items'          => __( 'All Years' ),
		'parent_item'        => __( 'Parent Year' ),
		'parent_item_colon'  => __( 'Parent Year:' ),
		'edit_item'          => __( 'Edit Year' ),
		'update_item'        => __( 'Update Year' ),
		'add_new_item'       => __( 'Add New Year' ),
		'new_item_name'      => __( 'New Year Name' ),
		'menu_name'          => __( 'Years' ),
	);

	register_taxonomy('press_releases_years',array('press_releases'), array(
		'hierarchical'      => true,
		'labels'            => $yearsLabels,
		'show_ui'           => true,
		'show_admin_column' => true,
		'query_var'         => true,
		'show_in_rest'      => true,
		'rewrite'           => array( 'slug' => 'press_releases_years' ),
	));

	register_taxonomy('press_releases_types',array('press_releases'), array(
		'hierarchical'      => true,
		'labels'            => $typesLabels,
		'show_ui'           => true,
		'show_admin_column' => true,
		'query_var'         => true,
		'show_in_rest'      => true,
		'rewrite'           => array( 'slug' => 'press_releases_types' ),
	));

}

add_action( 'init', 'trulioo_press_release_custom_post_type', 0 );
add_action( 'init', 'trulioo_press_release_custom_taxonomy', 0 );

?>
