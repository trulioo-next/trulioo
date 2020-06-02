<?php

////////////////////////////////////////////////////////////////
// Get Posts
////////////////////////////////////////////////////////////////

function trulioo_get_posts($data) {

  $posts_per_page =  $data->get_param( 'posts_per_page' );
  $paged =  $data->get_param( 'paged' );
  $offset =  $data->get_param( 'offset' );

  $post_author = 'all';
  $query = new WP_Query(array(
    'type' => 'post',
    'author' => $post_author ,
    'orderby' =>  'date',
    'order' => 'desc',
    'paged' => ($paged ? $paged : 1),
    'offset' => ($offset ? $offset : 0),
    'posts_per_page' => ($posts_per_page ? $posts_per_page : 9),
    'numberposts'       => -1,
  ));

  $max_pages = $query->max_num_pages;
  $posts_list = $query->posts;
  $posts = [];

  foreach($posts_list as $post_list) {

    $articles_types_list = wp_get_post_terms( $post_list->ID, 'articles_types', array( 'fields' => 'all' ));

    $articles_topics_list =  wp_get_post_terms( $post_list->ID, 'articles_topics', array( 'fields' => 'all' ));

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

    $post = array(
      'content' => $post_list,
      'author' => get_the_author_meta('display_name', $post_list->post_author),
      'reading_time' => prefix_estimated_reading_time($post_list->post_content),
      'categories' => $categories,
      'tags' => $tags,
      'types' => $articles_types_list,
      'topics' => $articles_topics_list,
      'featured_image' => get_the_post_thumbnail_url($post_list->ID,'full')
    );

    array_push($posts, $post);
  }

  $finalPost = array(
    'maxpages' => $max_pages,
    'posts' => $posts,
  );
  
  $response = new WP_REST_Response($finalPost, 200);
 
  return $response;
}

add_action( 'rest_api_init', function () {
  register_rest_route( 'trulioo', '/posts', array(
    'methods' => 'GET',
    'callback' => 'trulioo_get_posts'
	) );
});


////////////////////////////////////////////////////////////////
// Posts by ID
////////////////////////////////////////////////////////////////

function trulioo_get_posts_by_id($data) {
  $getPost = get_page_by_path( $data['title'], OBJECT, 'post' );
  
  $post_categories = wp_get_post_categories($getPost->ID);
  $post_tags = get_the_tags($getPost->ID);

  $topics = wp_get_post_terms( $getPost->ID, 'articles_topics', array( 'fields' => 'all' ));  
  $term_ids = wp_list_pluck( $topics, 'term_id' );

  $args = array(
    'post_type' => 'post',
    'posts_per_page' => 3,
    'orderby'   => 'rand',
    'post_status' => 'publish',
    'tax_query' => array(
      'relation' => 'AND',
      array(
        'taxonomy' => 'articles_topics',
        'field' => 'id',
        'terms' => $term_ids,
        'include_children' => false,
      )
    ),
  );

  $query = new WP_Query( $args );
  $getRelatedPost = $query->posts;

  $relatedPost = [];

  foreach ($getRelatedPost as $post_list ) {

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
    
    $types_list = wp_get_post_terms( $post_list->ID, 'articles_types', array( 'fields' => 'all' ));
    $topics_list =  wp_get_post_terms( $post_list->ID, 'articles_topics', array( 'fields' => 'all' ));  

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
      'featured_image' => get_the_post_thumbnail_url($post_list->ID,'full'),
    );
    array_push($relatedPost, $post);
  }

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

  $author = array();
  $author[] = array( 
    'username' => get_the_author_meta('display_name', $post->post_author),
    'avatar' =>  get_avatar_url( get_the_author_meta( $post->post_author ), 32 ),   
    'description' => get_the_author_meta('description', $post->post_author),
  );

  $single_post = array(
    'content' => $getPost,
    'author' => $author,
    'reading_time' => prefix_estimated_reading_time($getPost->post_content),
    'acf' => get_fields($getPost->ID),
    'categories' => $categories,
    'tags' => $tags,
    'topics' => wp_get_post_terms( $post_list->ID, 'articles_topics', array( 'fields' => 'all' )),
    'related_post' => $relatedPost,
    'featured_image' => get_the_post_thumbnail_url($getPost->ID,'full'),
  );

  return $single_post;

}

add_action( 'rest_api_init', function () {
	register_rest_route( 'trulioo', '/post/(?P<title>[a-z0-9]+(?:-[a-z0-9]+)*)', array(
		'methods'  => 'GET',
		'callback' => 'trulioo_get_posts_by_id'
	) );
});


////////////////////////////////////////////////////////////////
// Posts by Slug/Pagination/Amount
////////////////////////////////////////////////////////////////

function trulioo_get_options($request) {

  $slug = $request['slug'];
  $posts_per_page = $request['posts_per_page'];
  $post_type = $request['post_type'];
  $term = get_term_by('slug', $slug, 'post_tag');

  $args = array(
    'post_type'         => ($post_type ? $post_type : 'any'),
    'tag__in'           => $term->term_id,
    'orderby'           => 'date',
    'order'             => 'desc',
    'posts_per_page'    => ($posts_per_page ? $posts_per_page : 10),
    'paged'             => ($_REQUEST['page'] ? $_REQUEST['page'] : 1)
  );

  $query = new WP_Query( $args );

  if( empty($query->posts) ){
     return new WP_Error( 'no_posts', __('No post found'), array( 'status' => 404 ) );
  }

  $max_pages = $query->max_num_pages;
  $total = $query->found_posts;

  $posts_list = $query->posts;

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

      if ($post_type === 'resources') { 
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
      } else { 
        $types_list = wp_get_post_terms( $post_list->ID, 'articles_types', array( 'fields' => 'all' ));
        $topics_list =  wp_get_post_terms( $post_list->ID, 'articles_topics', array( 'fields' => 'all' )); 
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
	register_rest_route( 'trulioo', '/(?P<post_type>[a-z0-9]+(?:-[a-z0-9]+)*)/(?P<slug>[a-z0-9]+(?:-[a-z0-9]+)*)/(?P<posts_per_page>[a-zA-Z0-9-]+)', array(
		'methods'  => 'GET',
		'callback' => 'trulioo_get_options'
	) );
});


function trulioo_get_press_release($request) {

  $slug = $request['slug'];
  $posts_per_page = $request['posts_per_page'];
  $term = get_term_by('slug', $slug, 'post_tag');

  $args = array(
    'post_type' => 'press_releases',
    'author' => $post_author ,
    'posts_per_page' => 3,
    'tag__in'           => $term->term_id,
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
     $primary = array();

     $types_list = wp_get_post_terms( $post_list->ID, 'press_releases_types', array( 'fields' => 'all' ));
     $topics_list =  wp_get_post_terms( $post_list->ID, 'press_releases_topics', array( 'fields' => 'all' )); 
     foreach ($types_list as $type_list) {
       $color = get_field('color', $type_list->taxonomy.'_'.$type_list->term_id);
       $types[] = $type_list;
       $type_list->{'color'} = $color;
     }

     if ( class_exists('WPSEO_Primary_Term') )
     {
         $wpseo_primary_term = new WPSEO_Primary_Term( 'press_releases_types', $post_list->ID);
         $wpseo_primary_term = $wpseo_primary_term->get_primary_term();
         $term = get_term( $wpseo_primary_term );
         $color = get_field('color', $term->taxonomy.'_'.$term->term_id);
         $primary[] = $term;
         $term->{'color'} = $color;
     } 

     $post = array(
       'content' => $post_list,
       'author' => get_the_author_meta('display_name', $post_list->post_author),
       'reading_time' => prefix_estimated_reading_time($post_list->post_content),
       'categories' => $categories,
       'tags' => $tags,
       'types' => $types,
       'primary' => $primary,
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
	register_rest_route( 'trulioo', '/press/(?P<slug>[a-z0-9]+(?:-[a-z0-9]+)*)', array(
		'methods'  => 'GET',
		'callback' => 'trulioo_get_press_release'
	) );
});


////////////////////////////////////////////////////////////////
// Search
////////////////////////////////////////////////////////////////

function articles_get_search($data) {
  $post_author = 'all';

  $taxonomy_types = 'articles_types';
  $taxonomy_terms = get_terms( $taxonomy_types, array(
      'hide_empty' => 0,
      'fields' => 'ids'
  ));

  $taxonomy_topics = 'articles_topics';
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
    'post_type' => 'post',
    'author' => $post_author ,
    'posts_per_page' => ($posts_per_page ? $posts_per_page : 9),
    'orderby' =>  'post_date',
    'post_status' => 'publish',
    'paged' => ($paged ? $paged : 1),
    's' => ($search ? $search : ''),
    'tax_query' => array(
      'relation' => 'AND',
      array(
        'taxonomy' => 'articles_types',
        'field' => 'id',
        'terms' => ($types ? $types : $taxonomy_terms),
        'include_children' => false,
      ),
      array(
        'taxonomy' => 'articles_topics',
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
    
    $types_list = wp_get_post_terms( $post_list->ID, 'articles_types', array( 'fields' => 'all' ));
    $topics_list =  wp_get_post_terms( $post_list->ID, 'articles_topics', array( 'fields' => 'all' ));  
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
  register_rest_route( 'trulioo', '/articles/search/', array(
      'methods' => 'GET',
      'callback' => 'articles_get_search'
	) );
});

?>
