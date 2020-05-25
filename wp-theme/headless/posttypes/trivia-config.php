<?php
/*
//Custom Post Type Trivia Questions
add_action( 'init', 'create_trivia_question_post_type' );
function create_trivia_question_post_type() {
	register_post_type( 'se_trivia_questions',
		array(
			'labels' => array(
				'name' => __( 'Trivia Questions' ),
				'singular_name' => __( 'Trivia Question' ),
				'all_items'=> __( 'All Questions' ),
				'add_new_item' => __( 'Add New Question' ),
				
			),
			'public' => false,
			'show_ui' => true,
			'supports' => false,
		)
	);
}
*/
// Add Question Column
add_filter('manage_edit-se_trivia_questions_columns', 'trivia_columns_head');
function trivia_columns_head($defaults) {
	unset($defaults['title'],
	$defaults['date']);
    $defaults['question'] = 'Question';
    return $defaults;
}
 // Show the Question
add_action('manage_se_trivia_questions_posts_custom_column', 'trivia_columns_content', 10, 2);
function trivia_columns_content($column_name, $post_ID) {
    if ( $column_name == 'question' ) {
        $question = wp_strip_all_tags(get_field('question', $post_ID));
		$question_url = get_edit_post_link( $post_ID, 'edit' );
        echo '<a class="row-title" title="Edit" href="'.$question_url.'">'.$question.'</a>';   
    }
}


add_action( 'wp_ajax_nopriv_check_trivia_answers', 'ajax_check_trivia_answers' );
add_action( 'wp_ajax_check_trivia_answers', 'ajax_check_trivia_answers' );

function ajax_check_trivia_answers() {
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
	header("Cache-Control: post-check=0, pre-check=0", false);
	header("Pragma: no-cache");
	header('Content-type: application/json');
	
	$answers = $_POST['answers'];
	$responses = array();
	foreach ($answers as $answer){
		$question_id = $answer['question_id'];
		$answer = $answer['answer'];
		$check = get_field('answer', $question_id);
		if ($answer == $check)
			$checked = 'correct';
		else 
			$checked = 'incorrect';
		
		$responses[$question_id] = $checked;
	}
	
	$return = array('status' => 'OK', 'answers' => $responses);
    die(json_encode($return));
}

add_action( 'wp_ajax_nopriv_new_questions', 'ajax_new_questions' );
add_action( 'wp_ajax_new_questions', 'ajax_new_questions' );

function ajax_new_questions() {
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
	header("Cache-Control: post-check=0, pre-check=0", false);
	header("Pragma: no-cache");
	header('Content-type: application/json');
	

	$num_questions = isset($_POST['num_questions']) ? $_POST['num_questions'] : 5;
	$question_type = $_COOKIE['user_type'];
	$args = array (
		'post_type' => array( 'se_trivia_questions' ),
		'pagination' => false,
		'orderby' => 'rand',
		'posts_per_page' => $num_questions,
		'tax_query' => array(
			array(
				'taxonomy' => 'user_type',
				'field'    => 'slug',
				'terms'    => $question_type,
			),
		)
	);

	// The Query
	$the_query = new WP_Query( $args );
	$number = 0;

	$html = '';
	if ( $the_query->have_posts() ):
		$html .= '<ul class="questions">';
		
		while ( $the_query->have_posts() ) : $the_query->the_post();
			$question = get_field('question', false, false);
			$number++;						
			$question_id = get_the_id();
			
			$html .= '<li class="question_container row" id="question_'.$question_id.'">';
			$html .= '<div class="question-wrapper col-lg-8 col-md-8 col-sm-8 col-xs-12 col-lg-offset-1 col-md-offset-1">';
			$html .= '<span class="question-number bold">' . $number . '.</span><span class="question">' . $question . '</span>';
			$html .= '</div>';
			$html .= '<div class="question-answer col-lg-3 col-md-3 col-sm-4 col-xs-12">';
			$html .= '<input type="radio" name="'. $question_id .'" value="True" id="' . $number . '-true" class="question-radio">';
			$html .= '<label class="true" for="' . $number . '-true"><div class="inner-radio"></div></label>';
			$html .= '<input type="radio" name="'. $question_id .'" value="False" id="' . $number . '-false" class="question-radio">';
			$html .= '<label class="false" for="' . $number . '-false"><div class="inner-radio"></div></label></div>';
			$html .= '</li>';
		endwhile;
		$html .= '</ul>';
	endif;
	
	$return = array('status' => 'OK', 'questions' => $html);
    die(json_encode($return));
}
