<?php

function trulioo_get_custom_terms($request) {
  $terms = $request['terms'];
  $args = array(
    'hide_empty' => false
  );
  $get_terms =  get_terms($terms, $args);
  $response = new WP_REST_Response($get_terms, 200);
  return $response;
}

add_action( 'rest_api_init', function () {
	register_rest_route( 'trulioo', '/terms/(?P<terms>[a-z0-9]+(?:-[a-z0-9]+)*)', array(
		'methods'  => 'GET',
		'callback' => 'trulioo_get_custom_terms'
	) );
});
?>
