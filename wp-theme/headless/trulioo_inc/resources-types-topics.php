<?php

class ResourcesTypesTopics {

    /**
     * The endpoints we want to target
     */
    public $target_endpoints = '';
 
    /**
     * Constructor
     * @uses rest_api_init
     */
    function __construct() {
      $this->target_endpoints = array('resources');
      add_action( 'rest_api_init', array( $this, 'add_image' ));
    }
 
 
    /**
     * Add Images to json api
     */
    function add_image() {

      register_rest_field( $this->target_endpoints, 'resource_types',
            array(
            'get_callback'    => array( $this, 'get_types'),
            'update_callback' => null,
            'schema'          => null,
            )
       );

       register_rest_field( $this->target_endpoints, 'resource_topics',
            array(
                'get_callback'    => array( $this, 'get_topics'),
                'update_callback' => null,
                'schema'          => null,
            )
        );
 
     }

    function get_types() {
        $id = get_the_ID();

        $types = array();

        $types_list = wp_get_post_terms( $id, 'resources_types', array( 'fields' => 'all' ));

        foreach ($types_list as $type_list) {
        $color = get_field('color', $type_list->taxonomy.'_'.$type_list->term_id);
        $types[] = $type_list;
        $type_list->{'color'} = $color;
        } 

        return $types;
    }

    function get_topics() {
        $id = get_the_ID();

        $types = array();

        $types_list = wp_get_post_terms( $id, 'resources_topics', array( 'fields' => 'all' ));

        foreach ($types_list as $type_list) {
        $color = get_field('color', $type_list->taxonomy.'_'.$type_list->term_id);
        $types[] = $type_list;
        $type_list->{'color'} = $color;
        } 

        return $types;
    }

 }
 
 new ResourcesTypesTopics;