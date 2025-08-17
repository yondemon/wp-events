<?php
/**
 * Plugin Name: Event block (Gutenberg)
 * Description: Muestra la información de un evento con schema.org
 * Version: 1.0.0
 * Author: Pablo RM (pablo.rod@amorodio.es)
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

add_action( 'init', function () {
    // Usamos block.json para registrar el bloque y sus assets.
    register_block_type( __DIR__ );
} );
