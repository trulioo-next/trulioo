<?php

////////////////////////////////////////////////////////////////
// Get Posts
////////////////////////////////////////////////////////////////

function press_releases_get_posts($data) {

  $posts_per_page =  $data->get_param( 'posts_per_page' );
  $post_author = 'all';
  $args = array(
    'post_type' => 'press_releases',
    'author' => $post_author ,
    'posts_per_page' => ($posts_per_page ? $posts_per_page : 9),
    'orderby' =>  'post_date',
    'post_status' => 'publish'
  );


  $query = new WP_Query( $args );

  if( empty($query->posts) ){
     return new WP_Error( 'no_posts', __('No post found'), array( 'status' => 404 ) );
  }

  $max_pages = $query->max_num_pages;
  $total = $query->found_posts;

  $posts_list = $query->posts;

  $controller = new WP_REST_Posts_Controller('post');

  $posts = [];

  foreach ($posts_list as $post_list ) {

    $post_categories = wp_get_post_categories($post_list->ID);
    $post_tags = get_the_tags($post_list->ID);

    $categories = array();
    $tags = array();

    foreach($post_categories as $c){
      $category = get_category( $c );
      $categories[] = array( 'name' => $category->name, 'slug' => $category->slug );
    }

    foreach($post_tags as $t){
      $tag = get_category( $t );
      $tags[] = array( 'name' => $tag->name, 'slug' => $tag->slug );
    }

    $types = array();

    $types_list = wp_get_post_terms( $post_list->ID, 'press_releases_types', array( 'fields' => 'all' ));

    foreach ($types_list as $type_list) {
      $color = get_field('color', $type_list->taxonomy.'_'.$type_list->term_id);
      $types[] = $type_list;
      $type_list->{'color'} = $color;
    }  
 
    
    $post = array(
      'content' => $post_list,
      'author' => get_the_author_meta('display_name', $post_list->post_author),
      'reading_time' => prefix_estimated_reading_time($post_list->post_content),
      'categories' => $categories,
      'tags' => $tags,
      'types' => $types,
      'acf' => get_fields($post_list->ID),
      'featured_image' => get_the_post_thumbnail_url($post_list->ID,'full')
    );
    array_push($posts, $post);
  }

  $response = new WP_REST_Response($posts, 200);
  $response->header( 'X-WP-Total', $total );
  $response->header( 'X-WP-TotalPages', $max_pages );

  return $response;
}


add_action( 'rest_api_init', function () {
  register_rest_route( 'trulioo', '/press_releases', array(
      'methods' => 'GET',
      'callback' => 'press_releases_get_posts'
	) );
});


////////////////////////////////////////////////////////////////
// Search
////////////////////////////////////////////////////////////////

function press_releases_get_search($data) {
  $post_author = 'all';

  $taxonomy_types = 'press_releases_types';
  $taxonomy_terms = get_terms( $taxonomy_types, array(
      'hide_empty' => 0,
      'fields' => 'ids'
  ));
   
  $types =  $data->get_param( 'types' );
  $search =  $data->get_param( 'search' );
  $posts_per_page =  $data->get_param( 'posts_per_page' );
  $paged =  $data->get_param( '$paged' );
  $years =  $data->get_param( 'years' );
  $current_year = date('Y');

  $args = array(
    'post_type' => 'press_releases',
    'author' => $post_author ,
    'posts_per_page' => ($posts_per_page ? $posts_per_page : 9),
    'orderby' =>  'date',
    'order' =>  'desc',
    'post_status' => 'publish',
    'paged' => ($paged ? $paged : 1),
    's' => ($search ? $search : ''),
    'tax_query' => array(
      'relation' => 'AND',
      array(
        'taxonomy' => $taxonomy_types,
        'field' => 'id',
        'terms' => ($types ? $types : $taxonomy_terms),
        'include_children' => false,
      )
    ),
    'date_query' => array(
      'relation' => 'AND',
      array(
        'year'  => ($years ? $years : $current_year),
      )
    )
  );


  $query = new WP_Query( $args );
  if( empty($query->posts) ){
    return new WP_Error( 'no_posts', __('No post found'), array( 'status' => 404 ) );
  }

  $max_pages = $query->max_num_pages;
  $total = $query->found_posts;

  $posts_list = $query->posts;

  $controller = new WP_REST_Posts_Controller('post');

  $posts = [];

  foreach ($posts_list as $post_list ) {

   $post_categories = wp_get_post_categories($post_list->ID);
   $post_tags = get_the_tags($post_list->ID);

   $categories = array();
   $tags = array();

   foreach($post_categories as $c){
     $category = get_category( $c );
     $categories[] = array( 'name' => $category->name, 'slug' => $category->slug );
   }

   foreach($post_tags as $t){
     $tag = get_category( $t );
     $tags[] = array( 'name' => $tag->name, 'slug' => $tag->slug );
   }

   $types = array();  
   $types_list = wp_get_post_terms( $post_list->ID, 'press_releases_types', array( 'fields' => 'all' ));

   foreach ($types_list as $type_list) {
     $color = get_field('color', $type_list->taxonomy.'_'.$type_list->term_id);
     $types[] = $type_list;
     $type_list->{'color'} = $color;
   }  
  
   
   $post = array(
     'content' => $post_list,
     'author' => get_the_author_meta('display_name', $post_list->post_author),
     'reading_time' => prefix_estimated_reading_time($post_list->post_content),
     'categories' => $categories,
     'tags' => $tags,
     'types' => $types,
     'year' => $years,
     'acf' => get_fields($post_list->ID),
     'featured_image' => get_the_post_thumbnail_url($post_list->ID,'full')
   );
   array_push($posts, $post);
 }

 $response = new WP_REST_Response($posts, 200);
 $response->header( 'X-WP-Total', $total );
 $response->header( 'X-WP-TotalPages', $max_pages );

 return $response;
}


add_action( 'rest_api_init', function () {
  register_rest_route( 'trulioo', '/press_releases/search', array(
      'methods' => 'GET',
      'callback' => 'press_releases_get_search'
	) );
});


////////////////////////////////////////////////////////////////
// Get Years 
////////////////////////////////////////////////////////////////

function get_posts_years_array() {
  global $wpdb;
  $result = array();
  $years = $wpdb->get_results(
      $wpdb->prepare(
          "SELECT YEAR(post_date) FROM {$wpdb->posts} WHERE post_status = 'publish' AND wp_posts.post_type = 'press_releases' GROUP BY YEAR(post_date) DESC"
      ),
      ARRAY_N
  );

  if ( is_array( $years ) && count( $years ) > 0 ) {
      foreach ( $years as $year ) {
        $convert_int = (int)$year[0];
        $yearly = array(
          'id' => $convert_int,
          'name' => $year[0],
        );
        array_push($result, $yearly);
      }
  }
  return $result;
}

add_action( 'rest_api_init', function () {
  register_rest_route( 'trulioo', '/press_releases/year', array(
      'methods' => 'GET',
      'callback' => 'get_posts_years_array'
	) );
});

?>
