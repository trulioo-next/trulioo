<?php

////////////////////////////////////////////////////////////////
// Get Posts
////////////////////////////////////////////////////////////////

function resources_get_posts($data) {

  $posts_per_page =  $data->get_param( 'posts_per_page' );
  $post_author = 'all';
  $args = array(
    'post_type' => 'resources',
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
    $topics = array();
    
    $types_list = wp_get_post_terms( $post_list->ID, 'resources_types', array( 'fields' => 'all' ));
    $topics_list =  wp_get_post_terms( $post_list->ID, 'resources_topics', array( 'fields' => 'all' ));  
    foreach ($types_list as $type_list) {
      $color = get_field('color', $type_list->taxonomy.'_'.$type_list->term_id);
      $types[] = $type_list;
      $type_list->{'color'} = $color;
    }  
    foreach ($topics_list as $topic_list) {
      $color = get_field('color', $topic_list->taxonomy.'_'.$topic_list->term_id);
      $topic[] = $topic_list;
      $topic_list->{'color'} = $color;
    }  
    
    $post = array(
      'content' => $post_list,
      'author' => get_the_author_meta('display_name', $post_list->post_author),
      'reading_time' => prefix_estimated_reading_time($post_list->post_content),
      'categories' => $categories,
      'tags' => $tags,
      'types' => $types,
      'topics' => $topics,
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
  register_rest_route( 'trulioo', '/resources', array(
      'methods' => 'GET',
      'callback' => 'resources_get_posts'
	) );
});

////////////////////////////////////////////////////////////////
// Filter by Category and Tag
////////////////////////////////////////////////////////////////

function trulioo_get_resources_filter($request) {

  $category = $request['category'];
  $post_tag = $request['post_tag'];

$args = array(
    'post_type' => 'resources',
    'posts_per_page' => 5,
    'orderby'           => 'date',
    'order'             => 'desc',
    'tax_query' => array(
        'relation' => 'AND',
        array(
            'taxonomy' => 'types',
            'field' => 'slug',
            'terms' => $category,
            'include_children' => false,
            'operator' => 'IN',
        ),
        array(
            'taxonomy' => 'post_tag',
            'field' => 'slug',
            'terms' => $post_tag,
            'operator' => 'IN',
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

    $post_categories =  get_terms('types');
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

    $post = array(
      'content' => $post_list,
      'author' => get_the_author_meta('display_name', $post_list->post_author),
      'reading_time' => prefix_estimated_reading_time($post_list->post_content),
      'categories' => $categories,
      'tags' => $tags,
      'featured_image' => wp_get_attachment_image_src( get_post_thumbnail_id( $post_list->id ), 'full' )
    );
    array_push($posts, $post);
}

$response = new WP_REST_Response($posts, 200);
$response->header( 'X-WP-Total', $total );
$response->header( 'X-WP-TotalPages', $max_pages );

return $response;

}

add_action( 'rest_api_init', function () {
	register_rest_route( 'trulioo', '/resources/filter/(?P<category>[a-z0-9]+(?:-[a-z0-9]+)*)/(?P<post_tag>[a-zA-Z0-9-]+)', array(
		'methods'  => 'GET',
		'callback' => 'trulioo_get_resources_filter'
	) );
});

////////////////////////////////////////////////////////////////
// Search
////////////////////////////////////////////////////////////////

function resources_get_search($data) {
  $post_author = 'all';

  $taxonomy_types = 'resources_types';
  $taxonomy_terms = get_terms( $taxonomy_types, array(
      'hide_empty' => 0,
      'fields' => 'ids'
  ));

  $taxonomy_topics = 'resources_topics';
  $taxonomy_terms_topics = get_terms( $taxonomy_topics, array(
      'hide_empty' => 0,
      'fields' => 'ids'
  ));
   
  $types =  $data->get_param( 'types' );
  $topics =  $data->get_param( 'topics' );
  $search =  $data->get_param( 'search' );
  $posts_per_page =  $data->get_param( 'posts_per_page' );
  $paged =  $data->get_param( '$paged' );

  $args = array(
    'post_type' => 'resources',
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
      ),
      array(
        'taxonomy' => $taxonomy_topics,
        'field' => 'id',
        'terms' => ($topics ? $topics : $taxonomy_terms_topics),
        'include_children' => false,
      )
    ),
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
    $topics = array();
    
    $types_list = wp_get_post_terms( $post_list->ID, 'resources_types', array( 'fields' => 'all' ));
    $topics_list =  wp_get_post_terms( $post_list->ID, 'resources_topics', array( 'fields' => 'all' ));  
    foreach ($types_list as $type_list) {
      $color = get_field('color', $type_list->taxonomy.'_'.$type_list->term_id);
      $types[] = $type_list;
      $type_list->{'color'} = $color;
    }  
    foreach ($topics_list as $topic_list) {
      $color = get_field('color', $topic_list->taxonomy.'_'.$topic_list->term_id);
      $topic[] = $topic_list;
      $topic_list->{'color'} = $color;
    }  
    
    $post = array(
      'content' => $post_list,
      'author' => get_the_author_meta('display_name', $post_list->post_author),
      'reading_time' => prefix_estimated_reading_time($post_list->post_content),
      'categories' => $categories,
      'tags' => $tags,
      'types' => $types,
      'topics' => $topics,
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
  register_rest_route( 'trulioo', '/resources/search/', array(
      'methods' => 'GET',
      'callback' => 'resources_get_search'
	) );
});



?>
