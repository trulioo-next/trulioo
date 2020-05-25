<?php
/**
 * Header Menu Type used for GraphQL.
 *
 * @package IdealRebel_Headless_WP
 */

use \WPGraphQL\Types;
use \WPGraphQL\Type\WPObjectType;

/**
 * Header menu type class that extends WPObjectType
 */
class HeaderMenuType extends WPObjectType {
    /**
     * Graphql Fields
     *
     * @var $fields HeaderMenuType fields
     */
    private static $fields;

    /**
     * Constructor
     */
    public function __construct() {
        $config = array(
            'name'        => 'HeaderMenuType',
            'fields'      => self::fields(),
            'description' => __( 'Header Menu', 'IdealRebel_Headless_WP' ),
        );
        parent::__construct( $config );
    }

    /**
     * Fields generator
     */
    protected static function fields() {
        if ( null === self::$fields ) {
            self::$fields = function () {
                $fields = array(
                    'label' => array(
                        'type'        => Types::string(),
                        'description' => __( 'The URL label', 'IdealRebel_Headless_WP' ),
                    ),
                    'url'   => array(
                        'type'        => Types::string(),
                        'description' => __( 'The URL', 'IdealRebel_Headless_WP' ),
                    ),
                    'type'  => array(
                        'type'        => Types::string(),
                        'description' => __( 'internal or external', 'IdealRebel_Headless_WP' ),
                    ),
                );
                return self::prepare_fields( $fields, 'HeaderMenuType' );
            };
        }
        return ! empty( self::$fields ) ? self::$fields : null;
    }
}
