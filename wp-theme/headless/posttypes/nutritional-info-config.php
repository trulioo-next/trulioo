<?php
/*
//Custom Post Type Nutritional info - food
add_action( 'init', 'create_nutrition_food_post_type' );
function create_nutrition_food_post_type() {
	register_post_type( 'se_food',
		array(
			'labels' => array(
				'name' => __( 'Nutritional Info' ),
				'singular_name' => __( 'Food Item' ),
				'all_items'=> __( 'All Food' ),
				'add_new_item' => __( 'Add New Food Item' ),
				
			),
			'public' => false,
			'show_ui' => true,
			'supports' => array('title')
		)
	);
}

//add taxonomy to nutritional info
add_action( 'init', 'register_taxonomy_nutrition' );
function register_taxonomy_nutrition() {
	register_taxonomy( 
		'nutritional-information',
		'se_food',
		array(
			'labels' => array(
				'name' => __( 'Food Categories' ),
				'singular_name' => __( 'Food Category' ),
			),
			'hierarchical' => true,
		)
	);

}*/

// Add Nutrition Info Columns
add_filter('manage_edit-se_food_columns', 'nutrition_columns_head');
function nutrition_columns_head($defaults) {
	unset($defaults['date']);
    $defaults['flavour'] = 'Flavour';
    $defaults['additional_info'] = 'Additional Info';
    $defaults['food_category'] = 'Food Category';
    $defaults['date'] = 'Date';
    return $defaults;
}
// Display Nutrition Info Column Content
add_action('manage_se_food_posts_custom_column', 'nutrition_columns_content', 10, 2);
function nutrition_columns_content($column_name, $post_ID) {
    if ( $column_name == 'flavour' ) {
        $flavour = wp_strip_all_tags(get_field('flavour', $post_ID));
        echo $flavour;   
    }
    if ( $column_name == 'additional_info' ) {
        $flavour = wp_strip_all_tags(get_field('additional_information', $post_ID));
        echo $flavour;   
    }
    if ( $column_name == 'food_category' ) {
        $terms = get_the_terms($post_ID, 'nutritional-information');
        $terms_list = array();
        if($terms){
	        foreach($terms as $term){
		        $terms_list[] = '<a href="'.admin_url().'edit.php?post_type=se_food&nutritional-information='.$term->slug.'" title="Filter “'.$term->name.'”">'.$term->name.'</a>';
	        }
		}
        echo implode(',<br>', $terms_list);   
    }
}
// Allow New Food Category Column to be Sortable
add_filter( 'manage_edit-se_food_sortable_columns', 'nutrition_sortable_columns' );
function nutrition_sortable_columns( $sortable_columns ) {
	$sortable_columns[ 'food_category' ] = 'food_category';
	return $sortable_columns;
}
add_filter('posts_clauses', 'food_category_sort_order', 10, 2);
function food_category_sort_order($clauses, $query){
    global $wpdb;
    if(isset($query->query['orderby']) && $query->query['orderby'] == 'food_category'){
        $clauses['join'] .= <<<SQL
LEFT OUTER JOIN {$wpdb->term_relationships} ON {$wpdb->posts}.ID={$wpdb->term_relationships}.object_id
LEFT OUTER JOIN {$wpdb->term_taxonomy} USING (term_taxonomy_id)
LEFT OUTER JOIN {$wpdb->terms} USING (term_id)
SQL;
        $clauses['where'] .= "AND (taxonomy = 'nutritional-information' OR taxonomy IS NULL)";
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


/*
// Register ACF Groups
if(function_exists("register_field_group")){

	register_field_group(array (
		'id' => 'acf_nutrional-images',
		'title' => 'Nutrional Images',
		'fields' => array (
			array (
				'key' => 'field_5a6f34dffb95a',
				'label' => 'Nutritional Information Additional Info',
				'name' => 'nutritionimage',
				'type' => 'image',
				'instructions' => 'Please upload the image to be shown on the listing page',
				'required' => 1,
				'save_format' => 'object',
				'preview_size' => 'medium',
				'library' => 'all',
			),
		),
		'location' => array (
			array (
				array (
					'param' => 'ef_taxonomy',
					'operator' => '==',
					'value' => 'nutritional-information',
					'order_no' => 0,
					'group_no' => 0,
				),
			),
		),
		'options' => array (
			'position' => 'normal',
			'layout' => 'no_box',
			'hide_on_screen' => array (
			),
		),
		'menu_order' => 0,
	));
	register_field_group(array (
		'id' => 'acf_nutritional-info',
		'title' => 'Nutritional Info',
		'fields' => array (
			array (
				'key' => 'field_5a71a6f1257a2',
				'label' => 'Flavour (optional)',
				'name' => 'flavour',
				'type' => 'text',
				'instructions' => '',
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_5a70e7ec9a6c3',
				'label' => 'Additional Information (optional)',
				'name' => 'additional_information',
				'type' => 'text',
				'instructions' => 'Such as cup size, available location, or any other additional info about the serving.',
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_5a70e6d9cb44b',
				'label' => 'Serving Size',
				'name' => 'serving_size',
				'type' => 'text',
				'required' => 1,
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_5a70e73acb44c',
				'label' => 'Calories',
				'name' => 'calories',
				'type' => 'text',
				'required' => 1,
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_5a70e746cb44d',
				'label' => 'Total Fat',
				'name' => 'total_fat',
				'type' => 'text',
				'required' => 1,
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_5a70e750cb44e',
				'label' => 'Saturated Fat',
				'name' => 'saturated_fat',
				'type' => 'text',
				'required' => 1,
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_5a70e757cb44f',
				'label' => 'Trans Fat',
				'name' => 'trans_fat',
				'type' => 'text',
				'required' => 1,
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_5a70e762cb450',
				'label' => 'Cholesterol',
				'name' => 'cholesterol',
				'type' => 'text',
				'required' => 1,
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_5a70e78acb451',
				'label' => 'Sodium',
				'name' => 'sodium',
				'type' => 'text',
				'required' => 1,
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_5a70e7aa42ee5',
				'label' => 'Carbohydrates',
				'name' => 'carbohydrates',
				'type' => 'text',
				'required' => 1,
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_5a70e7b642ee6',
				'label' => 'Dietary Fibre',
				'name' => 'dietary_fibre',
				'type' => 'text',
				'required' => 1,
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_5a70e7bc42ee7',
				'label' => 'Sugars',
				'name' => 'sugars',
				'type' => 'text',
				'required' => 1,
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_5a70e7c242ee8',
				'label' => 'Protein',
				'name' => 'protein',
				'type' => 'text',
				'required' => 1,
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_5a70e7c942ee9',
				'label' => 'Vitamin A',
				'name' => 'vitamin_a',
				'type' => 'text',
				'required' => 1,
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_5a70e7d342eea',
				'label' => 'Vitamin C',
				'name' => 'vitamin_c',
				'type' => 'text',
				'required' => 1,
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_5a70e7db42eeb',
				'label' => 'Calcium',
				'name' => 'calcium',
				'type' => 'text',
				'required' => 1,
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_5a70e7e042eec',
				'label' => 'Iron',
				'name' => 'iron',
				'type' => 'text',
				'required' => 1,
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
		),
		'location' => array (
			array (
				array (
					'param' => 'post_type',
					'operator' => '==',
					'value' => 'se_food',
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

// create custom page for stores bulk upload
add_action('admin_menu' , 'nutrition_bulk_upload_page'); 
function nutrition_bulk_upload_page() {
    add_submenu_page('edit.php?post_type=se_food', 'Nutrition Bulk Uploader', 'Bulk Upload', 'edit_posts', 'nutrition_bulk_uploader', 'nutrition_upload_page');
}
function nutrition_upload_page(){
	global $wpdb;

	$messages = array();
	$messages['error'] = array();
	$messages['updated'] = array();
	
	if(isset($_POST['nutrition_bulk_submit'])){
		$file = (isset($_FILES['csv']) && !empty($_FILES['csv']))? $_FILES['csv'] : null;
		if ( !empty($file) ) {
			$csv_types = array('application/vnd.ms-excel','text/plain','text/csv','text/tsv');
			if(in_array($file['type'], $csv_types)){
			
				$items = array();
				
				ini_set('auto_detect_line_endings', true);
				$handle = fopen($file['tmp_name'],"r");
				$new_categories_inserted = 0;
				while ( $data = fgetcsv($handle) ) {
					// ignore first columns
					array_shift($data);
					
					$first = array_shift($data);
					
					// create category
					if(substr($first, 0, 1) === '*'){
						$cat = ucwords(strtolower(substr($first, 1)));
						$item['category'] = term_exists( $cat, 'nutritional-information', 0 );
						if ( !$item['category'] ) {
							$item['category'] = wp_insert_term( $cat, 'nutritional-information', array( 'parent' => 0 ) );
							$new_categories_inserted++;
						}
					}else{
						$item_title_flavour = explode('-', $first);
						$item['title'] = trim($item_title_flavour[0]);

						if(count($item_title_flavour) > 1){
							$item['flavour'] = trim($item_title_flavour[1]);
						}else{
							$item['flavour'] = '';
						}
						
						$item['additional_information'] = trim(array_shift($data));
						$item['serving_size'] = trim(array_shift($data));
						$item['calories'] = trim(array_shift($data));
						$item['total_fat'] = trim(array_shift($data));
						$item['saturated_fat'] = trim(array_shift($data));
						$item['trans_fat'] = trim(array_shift($data));
						$item['cholesterol'] = trim(array_shift($data));
						$item['sodium'] = trim(array_shift($data));
						$item['carbohydrates'] = trim(array_shift($data));
						$item['dietary_fibre'] = trim(array_shift($data));
						$item['sugars'] = trim(array_shift($data));
						$item['protein'] = trim(array_shift($data));
						$item['vitamin_a'] = trim(array_shift($data));
						$item['vitamin_c'] = trim(array_shift($data));
						$item['calcium'] = trim(array_shift($data));
						$item['iron'] = trim(array_shift($data));
	
						$items[] = $item;
					}
				}

				$field_keys['flavour'] = 'field_5a71a6f1257a2';
				$field_keys['additional_information'] = 'field_5a70e7ec9a6c3';
				$field_keys['serving_size'] = 'field_5a70e6d9cb44b';
				$field_keys['calories'] = 'field_5a70e73acb44c';
				$field_keys['total_fat'] = 'field_5a70e746cb44d';
				$field_keys['saturated_fat'] = 'field_5a70e750cb44e';
				$field_keys['trans_fat'] = 'field_5a70e757cb44f';
				$field_keys['cholesterol'] = 'field_5a70e762cb450';
				$field_keys['sodium'] = 'field_5a70e78acb451';
				$field_keys['carbohydrates'] = 'field_5a70e7aa42ee5';
				$field_keys['dietary_fibre'] = 'field_5a70e7b642ee6';
				$field_keys['sugars'] = 'field_5a70e7bc42ee7';
				$field_keys['protein'] = 'field_5a70e7c242ee8';
				$field_keys['vitamin_a'] = 'field_5a70e7c942ee9';
				$field_keys['vitamin_c'] = 'field_5a70e7d342eea';
				$field_keys['calcium'] = 'field_5a70e7db42eeb';
				$field_keys['iron'] = 'field_5a70e7e042eec';

				$new_items_inserted = 0;
				$skipped_items = 0;
				foreach ( $items as $item ) {
					// check if item already exists
					$item_id = $wpdb->get_var($wpdb->prepare(
						"SELECT ID FROM $wpdb->posts AS p 
							LEFT JOIN $wpdb->postmeta AS m1 
								ON p.ID = m1.post_id 
								AND m1.meta_key = 'flavour' 
							LEFT JOIN $wpdb->postmeta AS m2 
								ON p.ID = m2.post_id 
								AND m2.meta_key = 'additional_information' 
							WHERE 
								p.post_type = 'se_food' 
								AND p.post_status = 'publish'
								AND p.post_title = '".$item['title']."'
								AND m1.meta_value = '".$item['flavour']."'
								AND m2.meta_value = '".$item['additional_information']."'"));
					// create new item if doesn't exist
					if(!$item_id){
						$new_item = array(
							'post_title' => $item['title'], 
							'post_status' => 'publish',
							'post_type' => 'se_food',
							'tax_input' => array(
								'nutritional-information' => array($item['category']['term_taxonomy_id'])
							)
						);
						$item_id = wp_insert_post($new_item, true);

						update_field($field_keys['flavour'], $item['flavour'], $item_id);
						update_field($field_keys['additional_information'], $item['additional_information'], $item_id);
						update_field($field_keys['serving_size'], $item['serving_size'], $item_id);
						update_field($field_keys['calories'], $item['calories'], $item_id);
						update_field($field_keys['total_fat'], $item['total_fat'], $item_id);
						update_field($field_keys['saturated_fat'], $item['saturated_fat'], $item_id);
						update_field($field_keys['trans_fat'], $item['trans_fat'], $item_id);
						update_field($field_keys['cholesterol'], $item['cholesterol'], $item_id);
						update_field($field_keys['sodium'], $item['sodium'], $item_id);
						update_field($field_keys['carbohydrates'], $item['carbohydrates'], $item_id);
						update_field($field_keys['dietary_fibre'], $item['dietary_fibre'], $item_id);
						update_field($field_keys['sugars'], $item['sugars'], $item_id);
						update_field($field_keys['protein'], $item['protein'], $item_id);
						update_field($field_keys['vitamin_a'], $item['vitamin_a'], $item_id);
						update_field($field_keys['vitamin_c'], $item['vitamin_c'], $item_id);
						update_field($field_keys['calcium'], $item['calcium'], $item_id);
						update_field($field_keys['iron'], $item['iron'], $item_id);
						
						$new_items_inserted++;
					}else{
						$messages['error'][] = 'Skipped duplicate content: '.$item['title'].' - '.$item['flavour'].' ('.$item['additional_information'].') : Existing WP Post ID - '.$item_id;
						$skipped_items++;
					}
				}
				$messages['updated'][] = 'Successfully added '.(($new_categories_inserted > 0)? $new_categories_inserted.' new Food Categories, and ':'').$new_items_inserted.' new Nutrition Items.'.
					(($skipped_items > 0)? '</br>NOTE: Skipped '.$skipped_items.' Items, due to duplicate content.':'');
				
			}else{
				$messages['error'][] = 'File must be in CSV format.';
			}
		}else{
			$messages['error'][] = 'No file uploaded.';
		}
	}
	?>
	
	<div class="wrap"><div id="icon-tools" class="icon32"></div>
		<h2>Nutrition Bulk Uploader</h2>
		<?php foreach($messages as $type => $message_group): ?>
			<?php if(!empty($message_group)): ?>
			<div class="<?php echo $type; ?>">
				<p><?php foreach($message_group as $message): echo $message.'<br/>'; endforeach; ?></p>
			</div>
			<?php endif; ?>
		<?php endforeach; ?>
		<div id="poststuff">
			<div class="postbox default">
				<h3 style="border-bottom: 1px solid #eee;">Nutrition CSV Upload</h3>
				<div class="inside">
					<form method="post" action="<?php echo $_SERVER['REQUEST_URI']; ?>" enctype="multipart/form-data">
						<div class="field">
							<p class="label">
								<label for="">CSV:</label>
								<input class="file" type="file" id="csv" name="csv"/>
							</p>
						</div>
						<input class="button button-primary" type="submit" name="nutrition_bulk_submit" value="Submit" />
					</form>
				</div>
			</div>
		</div>
	</div>
	
	<?php
}
*/