<?php
/**
 * Add ACF options page.
 *
 * @package  IdealRebel_Headless_WP
 */

if ( function_exists( 'acf_add_options_page' ) ) {
    acf_add_options_page(
        array(
            'page_title' => 'Headless Settings',
            'menu_title' => 'Headless',
            'menu_slug'  => 'headless-settings',
            'capability' => 'manage_options',
            'post_id'    => 'headless-settings',
            'redirect'   => false,
        )
    );
}
