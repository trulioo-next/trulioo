<?php

// Custom Post Type For Home Header Videos
add_action( 'init', 'create_home_header_vids_post_type' );
function create_home_header_vids_post_type() {
	register_post_type( 
		'se_home_header_vids',
		array(
			'labels' => array(
				'name' => __( 'Home Page Headers' ),
				'singular_name' => __( 'Home Page Header' )
			),
			'public' => false,
			'show_ui' => true,
			'supports' => array('title')
		)
	);
}
// Register Taxonomy Weather Types 
add_action( 'init', 'register_taxonomy_weather_type' );
function register_taxonomy_weather_type() {
	register_taxonomy( 
		'weather_types',
		'se_home_header_vids',
		array(
			'labels' => array(
				'name' => __( 'Weather Types' ),
				'singular_name' => __( 'Weather Type' )
			),
			'hierarchical' => true,
		)
	);
}


// Add Custom Column in admin
add_filter('manage_se_home_header_vids_posts_columns', 'home_header_vids_columns_head');
function home_header_vids_columns_head($defaults) {
    unset($defaults['date']);
    $defaults['weather_types'] = 'Weather Type';
    $defaults['date'] = 'Date';
    return $defaults;
}
add_action('manage_se_home_header_vids_posts_custom_column', 'home_header_vids_columns_content', 10, 2);
function home_header_vids_columns_content($column_name, $post_ID) {
    if ( $column_name == 'weather_types' ) {
        $terms = get_the_terms($post_ID, 'weather_types');
        $terms_list = array();
        foreach($terms as $term){
	        $terms_list[] = '<a href="'.admin_url().'edit.php?post_type=se_home_header_vids&weather_types='.$term->slug.'" title="Filter “'.$term->name.'”">'.$term->name.'</a>';
        }
        echo implode(',<br>', $terms_list);   
    }
}


// Register ACF Groups
if(function_exists("register_field_group")){
	register_field_group(array (
		'id' => 'acf_home-page-header-fields',
		'title' => 'Home Page Header Fields',
		'fields' => array (
/* Comment out all field except the connected module
			array (
				'key' => 'field_5660a41a7159d',
				'label' => 'Product Name',
				'name' => 'video_product_name',
				'type' => 'text',
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'none',
				'maxlength' => '',
			),
			array (
				'key' => 'field_5b0f1cce53d39',
				'label' => 'Display Option',
				'name' => 'display_option',
				'type' => 'radio',
				'required' => 1,
				'choices' => array (
					'image' => 'Image',
					'video' => 'Video',
				),
				'other_choice' => 0,
				'save_other_choice' => 0,
				'default_value' => 'image',
				'layout' => 'vertical',
			),
			array (
				'key' => 'field_5b0f1de93a15b',
				'label' => 'Image',
				'name' => 'image',
				'type' => 'image',
				'conditional_logic' => array (
					'status' => 1,
					'rules' => array (
						array (
							'field' => 'field_5b0f1cce53d39',
							'operator' => '==',
							'value' => 'image',
						),
					),
					'allorany' => 'all',
				),
				'save_format' => 'object',
				'preview_size' => 'thumbnail',
				'library' => 'all',
			),
			array (
				'key' => 'field_5660a1fd71594',
				'label' => 'mp4 Video',
				'name' => 'mp4_video',
				'type' => 'file',
				'instructions' => 'Please be sure your video has been compressed appropriately, and converted to the proper \'mp4\' format. You can do all of this here: <a href="http://video.online-convert.com/convert-to-mp4" target="_blank">http://video.online-convert.com/convert-to-mp4</a>',
				'conditional_logic' => array (
					'status' => 1,
					'rules' => array (
						array (
							'field' => 'field_5b0f1cce53d39',
							'operator' => '==',
							'value' => 'video',
						),
					),
					'allorany' => 'all',
				),
				'save_format' => 'object',
				'library' => 'all',
			),
			array (
				'key' => 'field_5660a22971595',
				'label' => 'webm Video',
				'name' => 'webm_video',
				'type' => 'file',
				'instructions' => 'Please be sure your video has been compressed appropriately, and converted to the proper \'webm\' format. You can do all of this here: <a href="http://video.online-convert.com/convert-to-webm" target="_blank">http://video.online-convert.com/convert-to-webm</a>',
				'conditional_logic' => array (
					'status' => 1,
					'rules' => array (
						array (
							'field' => 'field_5b0f1cce53d39',
							'operator' => '==',
							'value' => 'video',
						),
					),
					'allorany' => 'all',
				),
				'save_format' => 'object',
				'library' => 'all',
			),
			array (
				'key' => 'field_5660a26b71596',
				'label' => 'Poster Image',
				'name' => 'poster_image',
				'type' => 'image',
				'conditional_logic' => array (
					'status' => 1,
					'rules' => array (
						array (
							'field' => 'field_5b0f1cce53d39',
							'operator' => '==',
							'value' => 'video',
						),
					),
					'allorany' => 'all',
				),
				'save_format' => 'object',
				'preview_size' => 'thumbnail',
				'library' => 'all',
			),
			array (
				'key' => 'field_5660a2dd71597',
				'label' => 'Overlay Text Color',
				'name' => 'overlay_text_color',
				'type' => 'color_picker',
				'conditional_logic' => array (
					'status' => 1,
					'rules' => array (
						array (
							'field' => 'field_5b0f1cce53d39',
							'operator' => '==',
							'value' => 'video',
						),
					),
					'allorany' => 'all',
				),
				'default_value' => '#ffffff',
			),
			array (
				'key' => 'field_5660a2f671598',
				'label' => 'Overlay Text Accent Color',
				'name' => 'overlay_text_accent_color',
				'type' => 'color_picker',
				'conditional_logic' => array (
					'status' => 1,
					'rules' => array (
						array (
							'field' => 'field_5b0f1cce53d39',
							'operator' => '==',
							'value' => 'video',
						),
					),
					'allorany' => 'all',
				),
				'default_value' => '#f37721',
			),
			array (
				'key' => 'field_5660a34971599',
				'label' => 'Button Color',
				'name' => 'button_color',
				'type' => 'color_picker',
				'default_value' => '#0a8162',
			),
			array (
				'key' => 'field_5660a37f7159a',
				'label' => 'Button Text Color',
				'name' => 'button_text_color',
				'type' => 'color_picker',
				'default_value' => '#ffffff',
			),
			array (
				'key' => 'field_5660a39d7159b',
				'label' => 'Button Text',
				'name' => 'button_text',
				'type' => 'text',
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'none',
				'maxlength' => '',
			),
			array (
				'key' => 'field_5660a3cc7159c',
				'label' => 'Button Link',
				'name' => 'button_link',
				'type' => 'text',
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'none',
				'maxlength' => '',
			),
//*/
			array (
				'key' => 'field_5670b5006bd2f',
				'label' => 'Use Connected Module',
				'name' => 'include_connected_module',
				'type' => 'true_false',
				'message' => '',
				'default_value' => 0,
			),
			array (
				'key' => 'field_5670b5246bd30',
				'label' => 'Connected Module',
				'name' => 'connected_module',
				'type' => 'post_object',
				'conditional_logic' => array (
					'status' => 1,
					'rules' => array (
						array (
							'field' => 'field_5670b5006bd2f',
							'operator' => '==',
							'value' => '1',
						),
					),
					'allorany' => 'all',
				),
				'post_type' => array (
					0 => 'se_modules',
				),
				'taxonomy' => array (
					0 => 'all',
				),
				'allow_null' => 0,
				'multiple' => 0,
			),
		),
		'location' => array (
			array (
				array (
					'param' => 'post_type',
					'operator' => '==',
					'value' => 'se_home_header_vids',
					'order_no' => 0,
					'group_no' => 0,
				),
			),
		),
		'options' => array (
			'position' => 'normal',
			'layout' => 'default',
			'hide_on_screen' => array (
			),
		),
		'menu_order' => 0,
	));
}



// register Home Header Videos ajax request
add_action('wp_ajax_nopriv_change_home_video', 'ajax_change_home_video');
add_action('wp_ajax_change_home_video', 'ajax_change_home_video');
function ajax_change_home_video(){
	
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
	header("Cache-Control: post-check=0, pre-check=0", false);
	header("Pragma: no-cache");
	header('Content-type: application/json');

	$nonce = $_POST['nonce'];
	
/*
	if ( !wp_verify_nonce($nonce, 'change_home_video_nonce') ){
		$return = array('status' => 'err', 'message' => 'Sorry, You have failed the spambot check.');
		die(json_encode($return));
	}
*/

	$video_id = isset($_POST['video_id']) ? $_POST['video_id'] : null;
	$product_videos = array();
	if(empty($video_id)){
		$weather_type_id = $_POST['weather_type_id'];
		$args = array(
			'post_type' => 'se_home_header_vids',
			'posts_per_page' => -1,
			'orderby' => 'rand',
			'tax_query' => array(
				array(
					'taxonomy' => 'weather_types',
					'field'    => 'term_id',
					'terms'    => $weather_type_id,
				)
			)
		);
		$videos = new WP_Query( $args );
		foreach($videos->posts as $video_post){
			$product_videos[] = array('id' => $video_post->ID, 'video_product_name' => get_field('video_product_name', $video_post->ID));
		}
		if(!empty($product_videos))
			$video_id = $product_videos[0]['id'];
	}

	$display_option = get_field('display_option', $video_id);
	$mp4_video = get_field('mp4_video', $video_id);
	$webm_video = get_field('webm_video', $video_id);
	$poster_image = get_field('poster_image', $video_id);
	$image = get_field('image', $video_id);

	$include_connected_module = get_field('include_connected_module', $video_id);
	$connected_module = get_field('connected_module', $video_id);

	$header = array();
	$header['video_product_name'] = get_field('video_product_name', $video_id);
	$header['display_option'] = $display_option;
	if($display_option == 'video'){
		$header['mp4_video'] = isset($mp4_video['url']) ? $mp4_video['url'] : '';
		$header['webm_video'] = isset($webm_video['url']) ? $webm_video['url'] : '';
		$header['poster_image'] = isset($poster_image['url']) ? $poster_image['url'] : '';
		$header['overlay_text_color'] = get_field('overlay_text_color', $video_id);
		$header['overlay_text_accent_color'] = get_field('overlay_text_accent_color', $video_id);
	}
	if($display_option == 'image'){
		$header['image'] = isset($image['url']) ? $image['url'] : '';
	}
	$header['button_color'] = get_field('button_color', $video_id);
	$header['button_text_color'] = get_field('button_text_color', $video_id);
	$header['button_text'] = get_field('button_text', $video_id);
	$header['button_link'] = get_field('button_link', $video_id);
	$header['connected_module'] = ($include_connected_module)? get_module($connected_module) : '';
	
	$return = array('status' => 'OK', 'header' => $header);
	if(!empty($product_videos))
		$return['product_videos'] = $product_videos;
	die(json_encode($return));
}





function get_weather_info($location){
	global $open_weather_key;
	
	$open_weather_request_url = 'http://api.openweathermap.org/data/2.5/find?q='.$location.'&units=metric&appid='.$open_weather_key;
	$weather_response = @file_get_contents($open_weather_request_url);
	$weather_details = json_decode($weather_response);

	if($weather_details->cod != '200' || $weather_details->count <= 0){
		return false;
	}
	$weather_info = new stdClass();
	$weather_info->temp = round($weather_details->list[0]->main->temp);
	$weather_info->weather = $weather_details->list[0]->weather;
	
	return $weather_info;
}


function get_current_season(){
	$month = date('m');
	
	if ($month >= '03' && $month <= '05') // Mar 1 - May 31 = Spring
		$season = 'spring';
	elseif ($month >= '06' && $month <= '08') // June 1 - August 31 = Summer
		$season = 'summer';
	elseif ($month >= '09' && $month <= '11') // Sept 1 - Nov 30 = Fall
		$season = 'fall';
	else // Dec 1 - Feb 28/29 = Winter
		$season = 'winter';
		
	return $season;
}


function get_weather_categories($temp, $weather = array()){
	$weather_categories = array();
	
/*
	// get categories based on weather type
	$storm = array(200, 201, 202, 210, 211, 212, 221, 230, 231, 232, 781, 900, 901, 902, 960, 961, 962);
	$rain = array(300, 301, 302, 310, 311, 312, 313, 314, 321, 500, 501, 502, 503, 504, 511, 520, 521, 522, 531, 701);
	$sun = array(800, 801, 802);
	$snow = array(600, 601, 602, 611, 612, 615, 616, 620, 621, 622);
	if(is_array($weather)){
		foreach($weather as $w){
			if(in_array($w->id, $storm)){
				$weather_categories[] = 'storm';
			}
			elseif(in_array($w->id, $snow)){
				$weather_categories[] = 'snow';
			}
			elseif(in_array($w->id, $rain)){
				$weather_categories[] = 'rain';
			}
			elseif(in_array($w->id, $sun)){
				$weather_categories[] = 'sun';
			}
		}
	}
*/
	
/*
	// get categories based on sesonal temp
	$season = get_current_season();
	$temp_breaks = array(
		'spring' => 10,
		'summer' => 20,
		'fall' => 15,
		'winter' => 5
	);
	switch($season){
		case 'spring':
		case 'summer':
			if($temp === false)
				$weather_categories[] = 'hot';
			else{
				if($temp >= $temp_breaks[$season])
					$weather_categories[] = 'hot';
				else
					$weather_categories[] = 'cold';
			}
			break;
		case 'fall':
		case 'winter':
			if($temp === false)
				$weather_categories[] = 'cold';
			else{
				if($temp <= $temp_breaks[$season])
					$weather_categories[] = 'cold';
				else
					$weather_categories[] = 'hot';
			}
			break;
	}
*/
	
	// get categories based on monthly temp
	$month = date('m');
	$temp_breaks = array(
		'01' => 15,
		'02' => 15,
		'03' => 15,
		'04' => 16,
		'05' => 16,
		'06' => 17,
		'07' => 17,
		'08' => 17,
		'09' => 16,
		'10' => 16,
		'11' => 15,
		'12' => 15,
	);
	switch($month){
		case '04':
		case '05':
		case '06':
		case '07':
		case '08':
		case '09':
			if($temp === false)
				$weather_categories[] = 'hot';
			else{
				if($temp >= $temp_breaks[$month])
					$weather_categories[] = 'hot';
				else
					$weather_categories[] = 'cold';
			}
			break;
		case '10':
		case '11':
		case '12':
		case '01':
		case '02':
		case '03':
			if($temp === false)
				$weather_categories[] = 'cold';
			else{
				if($temp <= $temp_breaks[$month])
					$weather_categories[] = 'cold';
				else
					$weather_categories[] = 'hot';
			}
			break;
	}
	
	return $weather_categories;
}