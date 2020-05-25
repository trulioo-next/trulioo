<?php
/**
 * Add GraphQL resolvers
 *
 * @package  Postlight_Headless_WP
 */

// check if WPGraphQL plugin is active.
if ( function_exists( 'register_graphql_field' ) ) {
    require_once 'resolvers/header-menu.php';
}
