<?php

/**
 * USAGE:
 * - Configure the return value of the `trulioo_post_types` to required post type(s) - otherwise populates sitemap with all posts and pages
 * - Search and replace the `trulioo` string with a lowercase identifier name: e.g., "myseo", "vehicles", "customer_profiles", "postspage", etc.
 * - Uses heredocs for inline XML: https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc
 */

/**
 * Uncomment the next line of code to disable sitemap caching.
 * - For development environments and debugging only. 
 * - All other scenarios, follow the "Manual Sitemap Update" instructions in the Yoast documentation:
 *   - https://yoast.com/help/sitemap-does-not-update/#manual
 */
add_filter("wpseo_enable_xml_sitemap_transient_caching", "__return_false");

/**
 * Configure return value of this function to required post type(s)
 */
function trulioo_sitemap_post_types() {
    return array("post", "page");
}

/**
 * Add trulioo-sitemap.xml to Yoast sitemap index
 */
function trulioo_sitemap_index($sitemap_index) {
    global $wpseo_sitemaps;
    $sitemap_url = site_url("trulioo-sitemap.xml");
    $sitemap_date = $wpseo_sitemaps->get_last_modified(trulioo_sitemap_post_types()); 
    $trulioo = <<<SITEMAP_INDEX_ENTRY
<sitemap>
    <loc>%s</loc>
    <lastmod>%s</lastmod>
</sitemap>
SITEMAP_INDEX_ENTRY;
    $sitemap_index .= sprintf($trulioo, $sitemap_url, $sitemap_date);
    return $sitemap_index;
}
add_filter("wpseo_sitemap_index", "trulioo_sitemap_index");

/**
 * Register trulioo sitemap with Yoast
 */
function trulioo_sitemap_register() {
    global $wpseo_sitemaps;
    if (isset($wpseo_sitemaps) && !empty($wpseo_sitemaps)) {
        $wpseo_sitemaps->register_sitemap("trulioo", "trulioo_sitemap_generate");
    }
}
add_action("init", "trulioo_sitemap_register");

/**
 * Generate trulioo sitemap XML body
 */
function trulioo_sitemap_generate() {
    global $wpseo_sitemaps;
    $urls_string = trulioo_sitemap_urls(trulioo_sitemap_post_types());
    $sitemap_body = <<<SITEMAP_BODY
<urlset
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd"
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
%s
</urlset>
SITEMAP_BODY;
    $sitemap = sprintf($sitemap_body, $urls_string);
    $wpseo_sitemaps->set_sitemap($sitemap);
}

/**
 * Generate sitemap `<url>` tags from the given $post_types
 * @param $post_types string|array Slugs of posts to load: e.g., "post", "page", "custom_type" - according to the `WP_Query` `post_type` parameter: https://developer.wordpress.org/reference/classes/wp_query/#post-type-parameters
 * @return string
 */
function trulioo_sitemap_urls($post_types) {
    global $wpseo_sitemaps;
    $urls = array();
    $query_args = array(
        "post_type" => $post_types, 
        "posts_per_page" => -1,
        "suppress_filters" => true,
    );
    $query = new WP_Query($query_args);
    foreach ($query->posts as $post) {
        // Basic URL details - location and last modified
        $url = array(
            "mod" => get_the_date(DATE_W3C, $post),  # <lastmod></lastmod>
            "loc" => get_permalink($post),  # <loc></loc>
        );
        // Detect and use any featured image / post thumbnail
        $attachment_id = get_post_thumbnail_id($post);
        if ($attachment_id) {
            $image_url = wp_get_attachment_url($attachment_id);
            $image_title = get_post_meta($attachment_id, "_wp_attachment_image_alt", true);
            $image_caption = wp_get_attachment_caption($attachment_id);
        } else {
            $image_url = "";
            $image_title = "";
            $image_caption = "";
        }
        if ($image_url) {
            $url["images"] = array(
                array(  # <image:image></image:image>
                    "src" => $image_url,  # <image:loc></image:loc>
                    "title" => $image_title,  # <image:title></image:title>
                    "alt" => $image_caption,  # <image:caption></image:caption>
                ),
            );
        }
        // Transform url array to sitemap `<url></url>` schema format
        $urls[]= $wpseo_sitemaps->renderer->sitemap_url($url);
    }
    return implode("\n", $urls);
}