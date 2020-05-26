<?php

class PressReleasesTypesTopics {

    /**
     * The endpoints we want to target
     */
    public $target_endpoints = '';
 
    /**
     * Constructor
     * @uses rest_api_init
     */
    function __construct() {
      $this->target_endpoints = array('press_releases');
      add_action( 'rest_api_init', array( $this, 'add_custom_fields' ));
    }
 
    function get_post_primary_category($post_id, $term='category', $return_all_categories=false){
        $return = array();
    
        if (class_exists('WPSEO_Primary_Term')){
            // Show Primary category by Yoast if it is enabled & set
            $wpseo_primary_term = new WPSEO_Primary_Term( $term, $post_id );
            $primary_term = get_term($wpseo_primary_term->get_primary_term());
    
            if (!is_wp_error($primary_term)){
                $return['primary_category'] = $primary_term;
            }
        }
    
        if (empty($return['primary_category']) || $return_all_categories){
            $categories_list = get_the_terms($post_id, $term);
    
            if (empty($return['primary_category']) && !empty($categories_list)){
                $return['primary_category'] = $categories_list[0];  //get the first category
            }
            if ($return_all_categories){
                $return['all_categories'] = array();
    
                if (!empty($categories_list)){
                    foreach($categories_list as &$category){
                        $return['all_categories'][] = $category->term_id;
                    }
                }
            }
        }
    
        return $return;
    }

    function add_custom_fields() {

      register_rest_field( $this->target_endpoints, 'press_releases_types_',
            array(
            'get_callback'    => array( $this, 'get_types'),
            'update_callback' => null,
            'schema'          => null,
            )
       );

       register_rest_field( $this->target_endpoints, 'primary',
            array(
            'get_callback'    => array( $this, 'get_primary_category'),
            'update_callback' => null,
            'schema'          => null,
            )
        );

     }

    function get_types() {
        $id = get_the_ID();

        $types = array();

        $types_list = wp_get_post_terms( $id, 'press_releases_types', array( 'fields' => 'all' ));

        foreach ($types_list as $type_list) {
        $color = get_field('color', $type_list->taxonomy.'_'.$type_list->term_id);
        $types[] = $type_list;
        $type_list->{'color'} = $color;
        } 

        return $types;
    }
    
    function get_primary_category() {
        if ( class_exists('WPSEO_Primary_Term') )
        {
            $wpseo_primary_term = new WPSEO_Primary_Term( 'press_releases_types', get_the_id() );
            $wpseo_primary_term = $wpseo_primary_term->get_primary_term();
            $term = get_term( $wpseo_primary_term );
            $color = get_field('color', $term->taxonomy.'_'.$term->term_id);
            $term->{'color'} = $color;
            return $term;
        } 
        
    }

 }
 
 new PressReleasesTypesTopics;