<?php

//Custom Post Type for Splash Polling Questions
add_action( 'init', 'create_splash_polling_questions_post_type' );
function create_splash_polling_questions_post_type() {
	register_post_type( 
		'se_splash_questions',
		array(
			'labels' => array(
				'name' => __( 'Splash Polling Questions' ),
				'singular_name' => __( 'Splash Polling Question' )
			),
			'public' => false,
			'show_ui' => true,
			'supports' => false,
		)
	);
}

//Custom Post Type for Product Polling Questions
add_action( 'init', 'create_product_polling_questions_post_type' );
function create_product_polling_questions_post_type() {
	register_post_type( 
		'se_product_questions',
		array(
			'labels' => array(
				'name' => __( 'Product Polling Questions' ),
				'singular_name' => __( 'Product Polling Question' )
			),
			'public' => false,
			'show_ui' => true,
			'supports' => false,
		)
	);
}

// create custom page for splash polling stats
add_action('admin_menu' , 'create_splash_polling_stats_page'); 
function create_splash_polling_stats_page() {
    add_submenu_page('edit.php?post_type=se_splash_questions', 'Splash Polling Stats', 'Stats', 'edit_posts', 'splash_polling_stats', 'splash_polling_stats');
}
function splash_polling_stats(){
	global $wpdb;
	?>
	
	<div class="wrap"><div id="icon-tools" class="icon32"></div>
		<h2>Splash Polling Stats</h2>
		<div id="poststuff">
			<div class="postbox default">
				<h3 style="border-bottom: 1px solid #eee;">Question Stats</h3>
				<div class="inside">
				<?php
					$args = array(
						'post_type' => 'se_splash_questions',
						'posts_per_page' => -1
					);
					$response = new WP_Query( $args );
				?>
				<?php if ( $response->have_posts() ): $count = 0; ?>
					<table style="width:100%;" cellpadding="5" cellspacing="0">
						<tr>
							<th style="text-align:left;vertical-align:bottom;width:25%;border-bottom:2px solid #ccc;">Question</th>
							<th style="text-align:center;vertical-align:bottom;border-bottom:2px solid #ccc;"># Skips</th>
							<th style="text-align:center;vertical-align:bottom;border-bottom:2px solid #ccc;"># Answers</th>
							<th style="text-align:center;vertical-align:bottom;border-bottom:2px solid #ccc;">Answered Millennial</th>
							<th style="text-align:center;vertical-align:bottom;border-bottom:2px solid #ccc;">Answered Traditional</th>
						</tr>
					<?php while ( $response->have_posts() ): $response->the_post(); $count++; ?>
						<?php 
							$question_id = get_the_ID();
							$question = get_field('question_heading').'<br/>'.get_field('question_subheading');
							$millennial_ans = (get_field('answer_a_user_type') == 'millennial')? get_field('answer_a_text') : get_field('answer_b_text');
							$traditional_ans = (get_field('answer_a_user_type') == 'traditional')? get_field('answer_a_text') : get_field('answer_b_text');

							$sql = $wpdb->prepare( 
								"SELECT			
									(
										SELECT COUNT(*) 
										FROM poll_results_meta as q
										JOIN poll_results_meta as a ON q.result_id = a.result_id 
										WHERE q.meta_key = 'question_id' 
											AND q.meta_value = %s 
											AND a.meta_key = 'answer' 
											AND a.meta_value = '-skipped-'
									) AS skipped,
									(
										SELECT COUNT(*) 
										FROM poll_results_meta as q
										JOIN poll_results_meta as a ON q.result_id = a.result_id 
										WHERE q.meta_key = 'question_id' 
											AND q.meta_value = %s 
											AND a.meta_key = 'answer' 
											AND a.meta_value = %s
									) AS traditional,
									(
										SELECT COUNT(*) 
										FROM poll_results_meta as q
										JOIN poll_results_meta as a ON q.result_id = a.result_id
										WHERE q.meta_key = 'question_id' 
											AND q.meta_value = %s 
											AND a.meta_key = 'answer' 
											AND a.meta_value = %s
									) AS millennial,
									(
										SELECT COUNT(*) 
										FROM poll_results_meta as q
										JOIN poll_results_meta as a ON q.result_id = a.result_id
										WHERE q.meta_key = 'question_id' 
											AND q.meta_value = %s
											AND a.meta_key = 'answer'
											AND a.meta_value != '-skipped-'
									) AS total", 
							    $question_id,
							    $question_id,
							    $traditional_ans,
							    $question_id,
							    $millennial_ans,
							    $question_id
							);
							$counts = $wpdb->get_row($sql);
						?>
						<tr style="<?php if($count % 2 == 0) echo 'background-color:#f6f6f6;'; ?>">
							<td><?php echo $question; ?></td>
							<td style="text-align:center;"><?php echo $counts->skipped; ?></td>
							<td style="text-align:center;"><?php echo $counts->total; ?></td>
							<td style="text-align:center;">
								<?php echo $millennial_ans; ?>
								<br/>
								<?php echo $counts->millennial.' - ('.round($counts->millennial/$counts->total*100).'%)'; ?>
							</td>
							<td style="text-align:center;">
								<?php echo $traditional_ans; ?>
								<br/>
								<?php echo $counts->traditional.' - ('.round($counts->traditional/$counts->total*100).'%)'; ?>
							</td>
						</tr>
					<?php endwhile; ?>
					</table>
				<?php endif;?>
				<?php wp_reset_postdata(); ?>
				</div>
			</div>
		</div>
	</div>
	
	<?php
}
// create custom page for product polling stats
add_action('admin_menu' , 'create_product_polling_stats_page'); 
function create_product_polling_stats_page() {
    add_submenu_page('edit.php?post_type=se_product_questions', 'Product Polling Stats', 'Stats', 'edit_posts', 'product_polling_stats', 'product_polling_stats');
}
function product_polling_stats(){
	global $wpdb;
	?>
	
	<div class="wrap"><div id="icon-tools" class="icon32"></div>
		<h2>Product Polling Stats</h2>
		<div id="poststuff">
			<div class="postbox default">
				<h3 style="border-bottom: 1px solid #eee;">Question Stats</h3>
				<div class="inside">
				<?php
					$args = array(
						'post_type' => 'se_product_questions',
						'posts_per_page' => -1
					);
					$response = new WP_Query( $args );
				?>
				<?php if ( $response->have_posts() ):  $count = 0; ?>
					<table style="width:100%;" cellpadding="5" cellspacing="0">
						<tr>
							<th style="text-align:left;vertical-align:bottom;width:25%;border-bottom:2px solid #ccc;">Question</th>
							<th style="text-align:center;vertical-align:bottom;border-bottom:2px solid #ccc;"># Skips</th>
							<th style="text-align:center;vertical-align:bottom;border-bottom:2px solid #ccc;"># Answers</th>
							<th colspan="2" style="text-align:center;vertical-align:bottom;border-bottom:2px solid #ccc;">Millennials</th>
							<th colspan="2" style="text-align:center;vertical-align:bottom;border-bottom:2px solid #ccc;">Traditionals</th>
						</tr>
					<?php while ( $response->have_posts() ): $response->the_post(); $count++; ?>
						<?php 
							$question_id = get_the_ID();
							$question = get_field('question_heading').'<br/>'.get_field('question_subheading');
							$answer_a = get_field('answer_a_text');
							$answer_b = get_field('answer_b_text');

							$sql = $wpdb->prepare( 
								"SELECT			
									(
										SELECT COUNT(*) 
										FROM poll_results_meta as q
										JOIN poll_results_meta as a ON q.result_id = a.result_id 
										WHERE q.meta_key = 'question_id' 
											AND q.meta_value = %s 
											AND a.meta_key = 'answer' 
											AND a.meta_value = '-skipped-'
									) AS skipped,
									(
										SELECT COUNT(*) 
										FROM poll_results_meta as q
										JOIN poll_results_meta as a ON q.result_id = a.result_id 
										JOIN poll_results_meta as u ON q.result_id = u.result_id 
										WHERE q.meta_key = 'question_id' 
											AND q.meta_value = %s 
											AND a.meta_key = 'answer' 
											AND a.meta_value = %s
											AND u.meta_key = 'user_type'
											AND u.meta_value = 'millennial'
									) AS answer_a_millennial,
									(
										SELECT COUNT(*) 
										FROM poll_results_meta as q
										JOIN poll_results_meta as a ON q.result_id = a.result_id 
										JOIN poll_results_meta as u ON q.result_id = u.result_id 
										WHERE q.meta_key = 'question_id' 
											AND q.meta_value = %s 
											AND a.meta_key = 'answer' 
											AND a.meta_value = %s
											AND u.meta_key = 'user_type'
											AND u.meta_value = 'traditional'
									) AS answer_a_traditional,
									(
										SELECT COUNT(*) 
										FROM poll_results_meta as q
										JOIN poll_results_meta as a ON q.result_id = a.result_id
										JOIN poll_results_meta as u ON q.result_id = u.result_id 
										WHERE q.meta_key = 'question_id' 
											AND q.meta_value = %s 
											AND a.meta_key = 'answer' 
											AND a.meta_value = %s
											AND u.meta_key = 'user_type'
											AND u.meta_value = 'millennial'
									) AS answer_b_millennial,
									(
										SELECT COUNT(*) 
										FROM poll_results_meta as q
										JOIN poll_results_meta as a ON q.result_id = a.result_id
										JOIN poll_results_meta as u ON q.result_id = u.result_id 
										WHERE q.meta_key = 'question_id' 
											AND q.meta_value = %s 
											AND a.meta_key = 'answer' 
											AND a.meta_value = %s
											AND u.meta_key = 'user_type'
											AND u.meta_value = 'traditional'
									) AS answer_b_traditional,
									(
										SELECT COUNT(*) 
										FROM poll_results_meta as q
										JOIN poll_results_meta as a ON q.result_id = a.result_id
										WHERE q.meta_key = 'question_id' 
											AND q.meta_value = %s
											AND a.meta_key = 'answer'
											AND a.meta_value != '-skipped-'
									) AS total", 
							    $question_id,
							    $question_id, $answer_a,
							    $question_id, $answer_a,
							    $question_id, $answer_b,
							    $question_id, $answer_b,
							    $question_id
							);
							$counts = $wpdb->get_row($sql);
							$millennial_total = $counts->answer_a_millennial + $counts->answer_b_millennial;
							$traditional_total = $counts->answer_a_traditional + $counts->answer_b_traditional;
						?>
						<tr style="<?php if($count % 2 == 0) echo 'background-color:#f6f6f6;'; ?>">
							<td><?php echo $question; ?></td>
							<td style="text-align:center;"><?php echo $counts->skipped; ?></td>
							<td style="text-align:center;"><?php echo $counts->total; ?></td>
							<td style="text-align:center;">
								<?php echo $answer_a; ?>
								<br/>
								<?php echo $counts->answer_a_millennial.' - ('.round($counts->answer_a_millennial/$millennial_total*100).'%)'; ?>
							</td>
							<td style="text-align:center;">
								<?php echo $answer_b; ?>
								<br/>
								<?php echo $counts->answer_b_millennial.' - ('.round($counts->answer_b_millennial/$millennial_total*100).'%)'; ?>
							</td>
							<td style="text-align:center;">
								<?php echo $answer_a; ?>
								<br/>
								<?php echo $counts->answer_a_traditional.' - ('.round($counts->answer_a_traditional/$traditional_total*100).'%)'; ?>
							</td>
							<td style="text-align:center;">
								<?php echo $answer_b; ?>
								<br/>
								<?php echo $counts->answer_b_traditional.' - ('.round($counts->answer_b_traditional/$traditional_total*100).'%)'; ?>
							</td>
						</tr>
					<?php endwhile; ?>
					</table>
				<?php endif;?>
				<?php wp_reset_postdata(); ?>
				</div>
			</div>
		</div>
	</div>
	
	<?php
}



// Add Custom Column in admin
add_filter('manage_se_splash_questions_posts_columns', 'polling_question_columns_head');
add_filter('manage_se_product_questions_posts_columns', 'polling_question_columns_head');
function polling_question_columns_head($defaults) {
    unset($defaults['title']);
    unset($defaults['date']);
    $defaults['question'] = 'Question';
    $defaults['date'] = 'Date';
    return $defaults;
}
add_action('manage_se_splash_questions_posts_custom_column', 'polling_question_columns_content', 10, 2);
add_action('manage_se_product_questions_posts_custom_column', 'polling_question_columns_content', 10, 2);
function polling_question_columns_content($column_name, $post_ID) {
    if ( $column_name == 'question' ) {
        $question_heading = get_field('question_heading', $post_ID);
        $question_subheading = get_field('question_subheading', $post_ID);
        
        $question = $question_heading.(!empty($question_subheading)? '<br>'.$question_subheading : '');
		$question_url = get_edit_post_link( $id, 'edit' );
        echo '<a class="row-title" title="Edit" href="'.$question_url.'">'.$question.'</a>';   
    }
}

// register Splash Polling Questions ajax request
add_action('wp_ajax_nopriv_splash_polling', 'ajax_splash_polling');
add_action('wp_ajax_splash_polling', 'ajax_splash_polling');
function ajax_splash_polling(){
	global $wpdb;
	
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
	header("Cache-Control: post-check=0, pre-check=0", false);
	header("Pragma: no-cache");
	header('Content-type: application/json');

	$nonce = $_POST['nonce'];
	
/*
	if ( !wp_verify_nonce($nonce, 'splash_polling_nonce') ){
		$return = array('status' => 'err', 'message' => 'Sorry, You have failed the spambot check.');
		die(json_encode($return));
	}
*/

	$poll_type = 'se_splash_questions';
	$poll_result_meta = array();
	
	$poll_result_meta['question_id'] = $_POST['question_id'];
	$poll_result_meta['answer'] = $_POST['answer'];
	$user_type = isset($_POST['user_type'])? $_POST['user_type'] : 'traditional';
	if($user_type != 'millennial' && $user_type != 'traditional'){
		$user_type = 'traditional';
	}
	$ip = $_SERVER['REMOTE_ADDR'];
	$date = current_time('mysql');

	$wpdb->query(
		$wpdb->prepare( 
			"INSERT INTO poll_results ( poll_type, ip, date )
			 VALUES ( %s, %s, %s )", 
		    $poll_type,
		    $ip, 
		    $date
		)
	);
	$result_id = $wpdb->insert_id;
	foreach($poll_result_meta as $key=>$val){
		$wpdb->query(
			$wpdb->prepare( 
				"INSERT INTO poll_results_meta ( result_id, meta_key, meta_value )
				 VALUES ( %d, %s, %s )", 
			    $result_id, 
				$key, 
				$val
			)
		);
	}
	setcookie('user_type', $user_type, time()+(60*60*24*365), '/'); // expires 1 year
	
	// get question stats
	$sql = $wpdb->prepare( 
			"SELECT
				a.meta_value as answer,
				COUNT(q.result_id) as count
			FROM poll_results_meta as q
			JOIN poll_results_meta as a
				ON q.result_id = a.result_id AND a.meta_key = 'answer'
			WHERE q.meta_key = 'question_id'
			AND q.meta_value = %s
			AND a.meta_value != '-skipped-'
			GROUP BY a.meta_value", 
	    $poll_result_meta['question_id'] 
	);
	$answers = $wpdb->get_results($sql);
	$total = 0;
	foreach($answers as $answer){
		$total += $answer->count;
	}
	
	$return = array('status' => 'OK', 'answers' => $answers, 'total' => $total);
	die(json_encode($return));
}


// register Product Polling Questions ajax request
add_action('wp_ajax_nopriv_product_polling', 'ajax_product_polling');
add_action('wp_ajax_product_polling', 'ajax_product_polling');
function ajax_product_polling(){
	global $wpdb;
	
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
	header("Cache-Control: post-check=0, pre-check=0", false);
	header("Pragma: no-cache");
	header('Content-type: application/json');

	$nonce = $_POST['nonce'];
	
/*
	if ( !wp_verify_nonce($nonce, 'product_polling_nonce') ){
		$return = array('status' => 'err', 'message' => 'Sorry, You have failed the spambot check.');
		die(json_encode($return));
	}
*/

	$poll_type = 'se_porduct_questions';
	$poll_result_meta = array();
	
	$poll_result_meta['question_id'] = $_POST['question_id'];
	$poll_result_meta['answer'] = $_POST['answer'];
	$poll_result_meta['user_type'] = isset($_COOKIE['user_type'])? $_COOKIE['user_type'] : '-';

	if($poll_result_meta['answer'] == '-skipped-')
		setcookie('product_questions', 'skipped', time()+(60*60*24*365), '/'); // expires 1 year

	$ip = $_SERVER['REMOTE_ADDR'];
	$date = current_time('mysql');

	$wpdb->query(
		$wpdb->prepare( 
			"INSERT INTO poll_results ( poll_type, ip, date )
			 VALUES ( %s, %s, %s )", 
		    $poll_type,
		    $ip, 
		    $date
		)
	);
	$result_id = $wpdb->insert_id;
	foreach($poll_result_meta as $key=>$val){
		$wpdb->query(
			$wpdb->prepare( 
				"INSERT INTO poll_results_meta ( result_id, meta_key, meta_value )
				 VALUES ( %d, %s, %s )", 
			    $result_id, 
				$key, 
				$val
			)
		);
	}
	
	// get question stats
	$sql = $wpdb->prepare( 
			"SELECT
				a.meta_value as answer,
				COUNT(q.result_id) as count
			FROM poll_results_meta as q
			JOIN poll_results_meta as a
				ON q.result_id = a.result_id AND a.meta_key = 'answer'
			WHERE q.meta_key = 'question_id'
			AND q.meta_value = %s
			AND a.meta_value != '-skipped-'
			GROUP BY a.meta_value", 
	    $poll_result_meta['question_id'] 
	);
	$answers = $wpdb->get_results($sql);
	$total = 0;
	foreach($answers as $answer){
		$total += $answer->count;
	}
	
	$return = array('status' => 'OK', 'answers' => $answers, 'total' => $total);
	die(json_encode($return));
}
