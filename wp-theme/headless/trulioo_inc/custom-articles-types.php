<?php

function trulioo_articles_custom_taxonomy() {
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

  register_taxonomy('articles_types',array('post'), array(
		'hierarchical'      => true,
		'labels'            => $typesLabels,
		'show_ui'           => true,
		'show_admin_column' => true,
		'query_var'         => true,
		'show_in_rest'      => true,
		'rewrite'           => array( 'slug' => 'articles_types' ),
  ));

	register_taxonomy('articles_topics',array('post'), array(
		'hierarchical'      => true,
		'labels'            => $topicsLabels,
		'show_ui'           => true,
		'show_admin_column' => true,
		'query_var'         => true,
		'show_in_rest'      => true,
		'rewrite'           => array( 'slug' => 'articles_topics' ),
	));
}

add_action( 'init', 'trulioo_articles_custom_taxonomy', 0 );

?>
