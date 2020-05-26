<?php

	acf_add_options_page(array(
		'page_title' 	=> 'Theme General Settings',
		'menu_title'	=> 'Theme Settings',
		'menu_slug' 	=> 'theme-general-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false,
		'post_id'    	=> 'theme-general-settings'
	));

	acf_add_options_page(array(
		'page_title' 	=> 'Popular Articles',
		'menu_title'	=> 'Popular Articles',
		'menu_slug' 	=> 'popular-articles-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false,
		'post_id'   	=> 'popular-articles-settings'
	));

	acf_add_options_page(array(
		'page_title' 	=> 'Marketo on Blog Pages',
		'menu_title'	=> 'Marketo on Blog Pages',
		'menu_slug' 	=> 'marketo-on-blog-pages',
		'capability'	=> 'edit_posts',
		'redirect'		=> false,
		'post_id'   	=> 'marketo-on-blog-pages'
	));

	acf_add_options_page(array(
		'page_title' 	=> 'Redirects',
		'menu_title'	=> 'Redirects',
		'menu_slug' 	=> 'redirects',
		'capability'	=> 'edit_posts',
		'redirect'		=> false,
		'post_id'   	=> 'redirects'
	));

?>
