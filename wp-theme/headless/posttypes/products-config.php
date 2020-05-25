<?php

//Custom Post Type For Products
add_action( 'init', 'create_products_post_type' );
function create_products_post_type() {
	register_post_type( 
		'se_products',
		array(
			'labels' => array(
				'name' => __( 'Products' ),
				'singular_name' => __( 'Product' )
			),
			'public' => false,
			'show_ui' => true,
			'supports' => array('title'),
		)
	);
}
//Register Taxonomy Product Category 
add_action( 'init', 'register_taxonomy_product_category' );
function register_taxonomy_product_category() {
	register_taxonomy( 
		'product_category',
		'se_products',
		array(
			'labels' => array(
				'name' => __( 'Product Categories' ),
				'singular_name' => __( 'Product Category' ),
			),
			'hierarchical' => true,
		)
	);
}


//Custom Post Type For Reuasable Components 
//
// add_action( 'init', 'create_coponents_post_type' );
// function create_coponents_post_type() {
//     register_post_type( 
//         'reusable_componenets',
//         array(
//             'labels' => array(
//                 'name' => __( 'Reusable Components' ),
//                 'singular_name' => __( 'Reusable Components' )
//             ),
//             'public' => false,
//             'show_ui' => true,
//             'supports' => array('title'),
//         )
//     );
// }


// Add Custom Columns in admin
add_filter('manage_se_products_posts_columns', 'products_columns_head');
function products_columns_head($defaults) {
    unset($defaults['date']);
    $defaults['product_category'] = 'Category';
    $defaults['featured'] = 'Featured';
    $defaults['date'] = 'Date';
    return $defaults;
}
add_action('manage_se_products_posts_custom_column', 'products_columns_content', 10, 2);
function products_columns_content($column_name, $post_ID) {
    if ( $column_name == 'product_category' ) {
        $terms = get_the_terms($post_ID, 'product_category');
        $terms_list = array();
        foreach($terms as $term){
	        $terms_list[] = '<a href="'.admin_url().'edit.php?post_type=se_products&product_category='.$term->slug.'" title="Filter “'.$term->name.'”">'.$term->name.'</a>';
        }
        echo implode(',<br>', $terms_list);   
    }
    if ( $column_name == 'featured' ) {
        echo (get_field('featured', $post_ID))? 'yes':'';   
    }

}
add_filter( 'manage_edit-se_products_sortable_columns', 'products_sortable_columns' );
function products_sortable_columns( $sortable_columns ) {
	$sortable_columns[ 'featured' ] = 'featured';
	$sortable_columns[ 'product_category' ] = 'product_category';
	return $sortable_columns;
}
add_action( 'pre_get_posts', 'products_featured_sort_order', 1 );
function products_featured_sort_order( $query ) {
	if ( $query->is_main_query() && ( $query->get('orderby') == 'featured' ) ) {
        $query->set( 'meta_key', 'featured' );
		$query->set( 'orderby', 'meta_value' );
	}
}
add_filter('posts_clauses', 'products_category_sort_order', 10, 2);
function products_category_sort_order($clauses, $query){
    global $wpdb;
    if(isset($query->query['orderby']) && $query->query['orderby'] == 'product_category'){
        $clauses['join'] .= <<<SQL
LEFT OUTER JOIN {$wpdb->term_relationships} ON {$wpdb->posts}.ID={$wpdb->term_relationships}.object_id
LEFT OUTER JOIN {$wpdb->term_taxonomy} USING (term_taxonomy_id)
LEFT OUTER JOIN {$wpdb->terms} USING (term_id)
SQL;
        $clauses['where'] .= "AND (taxonomy = 'product_category' OR taxonomy IS NULL)";
        $clauses['groupby'] = "object_id";
        $clauses['orderby'] = "GROUP_CONCAT({$wpdb->terms}.name ORDER BY name ASC)";
        if(strtoupper($query->get('order')) == 'ASC'){
            $clauses['orderby'] .= 'ASC';
        } else{
            $clauses['orderby'] .= 'DESC';
        }
    }
    return $clauses;
}


// load choices for related categories field
add_filter('acf/load_field/key=field_56452a6f2978d', 'acf_load_related_categories_field_choices');
function acf_load_related_categories_field_choices( $field ) {
    
    $field['choices'] = array();
    
    $categories = get_terms( 'product_category' );
    
    foreach($categories as $category){
	    $field['choices'][ $category->slug ] = $category->name;
    }
    
    return $field;
}

