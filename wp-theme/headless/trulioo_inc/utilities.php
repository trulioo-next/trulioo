<?php
// Gets a post of any type by its slug
function get_post_by_slug($slug){
    $posts = get_posts(array(
            'name' => $slug,
            'post_type' => 'any',
            'posts_per_page' => 1,
            'post_status' => 'publish'
    ));

    if (!$posts ) {
        throw new Exception("NoSuchPostBySpecifiedSlug");
    }

    return $posts[0];
}

function prefix_estimated_reading_time( $content ) {
  $wpm = 300;
	$clean_content = strip_shortcodes( $content );
	$clean_content = strip_tags( $clean_content );
	$word_count = str_word_count( $clean_content );
  $time = ceil( $word_count / $wpm );
	return $time;
}

?>
