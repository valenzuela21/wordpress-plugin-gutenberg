<?php
/*
    Plugin name:  Gourmet Artist Gutenberg Blocks
    Plugin URI:
    Description: Add blocks person of gutenberg
    Version: 1.0
    Author: David Valenzuela Pardo
    Author URI: @vlzdavid12
    License: GPL2
    License URI: https://github.com/valenzuela21
*/

if(!defined('ABSPATH')) exit;


/** Category Custom **/
add_filter('block_categories', 'ga_new_category', 10, 2);

function ga_new_category($categories, $post){
    return array_merge(
        $categories,
        array(
            array(
            'slug' => 'gourmet-artist',
            'title' => 'Gourmet Artist (GA)',
            'icon' =>  'awards'
            ),
        )
    );
}

/** Register Block  and Css **/

add_action('init', 'ga_register_block');


function ga_register_block(){

    // Gutenberg exist validate
    if(!function_exists('register_block_type')){
        return;
    }

    // Register the script in gutenberg of blocks
    wp_register_script(
        'ga-editor-script', // name
        plugins_url('build/index.js', __FILE__), // FILE IN BLOCKS
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'), // Add Dependency
        filemtime(plugin_dir_path(__FILE__). 'build/index.js') // version
    );

    // Styles for editor
    wp_register_script(
        'ga_editor_styles',  
        plugins_url('src/css/editor.css', __FILE__),
        array('wp-edit-blocks'),
        filemtime(plugin_dir_path(__FILE__). 'src/css/editor.css')
    );

    // Styles for frontend
    wp_register_style(
        'ga_editor_frontend_styles',  
        plugins_url('src/css/style.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__). 'src/css/style.css')
    );

    // Array of blocks
    $blocks =  array(
        'ga/testimonial',
     
    );
    
    // Add register blocks in resgister_block_type

    foreach($blocks as $block){
        register_block_type(
            $block,
            array(
                'editor_script' => 'ga-editor-script',
                'editor_style' => 'ga_editor_styles',
                'style' => 'ga_editor_frontend_styles'
            )
        );
    }






}