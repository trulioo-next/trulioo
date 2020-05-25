<?php
/**
 * Admin filters.
 *
 * @package  IdealRebel_Headless_WP
 */

/**
 *
 * @param arr $args Array of arguments.
 * @return arr
 */
function taxonomy_checklist_checked_ontop_filter( $args ) {
    $args['checked_ontop'] = false;
    return $args;
}

add_filter( 'wp_terms_checklist_args', 'taxonomy_checklist_checked_ontop_filter' );

/**
 *
 * @param  str $link The WordPress preview link.
 * @return str The headless WordPress preview link.
 */
function set_headless_preview_link( $link ) {
    $post = get_post();
    if ( ! $post ) {
        return $link;
    }
    $status      = 'revision';
    $frontend    = get_frontend_origin();
    $parent_id   = $post->post_parent;
    $revision_id = $post->ID;
    $type        = get_post_type( $parent_id );
    $nonce       = wp_create_nonce( 'wp_rest' );
    if ( 0 === $parent_id ) {
        $status = 'draft';
    }
    return "$frontend/_preview/$parent_id/$revision_id/$type/$status/$nonce";
}

add_filter( 'preview_post_link', 'set_headless_preview_link' );

/**
 * Includes preview link in post data for a response.
 *
 * @param \WP_REST_Response $response The response object.
 * @param \WP_Post          $post     Post object.
 * @return \WP_REST_Response The response object.
 */
function set_preview_link_in_rest_response( $response, $post ) {
    if ( 'draft' === $post->post_status ) {
        $response->data['preview_link'] = get_preview_post_link( $post );
    }

    return $response;
}

add_filter( 'rest_prepare_post', 'set_preview_link_in_rest_response', 10, 2 );
add_filter( 'rest_prepare_page', 'set_preview_link_in_rest_response', 10, 2 );
