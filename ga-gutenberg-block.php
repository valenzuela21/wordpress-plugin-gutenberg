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
        'ga/hero',
        'ga/imagetext'
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

    // Add blocks in register_block_type dinamic
    register_block_type(
        'ga/dinamico',
        array(
            'editor_script' => 'ga-editor-script',
            'editor_style' => 'ga_editor_styles',
            'style' => 'ga_editor_frontend_styles',
            'render_callback' => 'ga_back_recipe_gutenberg'
        )
    );
}

function ga_back_recipe_gutenberg(){
    //Query database of gutenberg
   global $post;

   // Get Back recipe
   $args =  array(
       'post_type' => 'post',
       'numberposts' => 3,
       'post_status' => 'publish'
   );

   $recipes =  wp_get_recent_posts($args);

   // Check recipes data
   if(count($recipes) === 0){
       return "Not recipes";
   }
   $body = '';
   $body .= '<h2 class="titulo-ultimas" > Back Recipes </h2>';
   $body .= '<ul class="ultimas-recetas contenido">';

   foreach($recipes as $recipe):
        $post = get_post($recipe['ID']);
        setup_postdata($post);
        $body .=  sprintf(
            ' <li>
             %1$s
                <div class="contenido">
                    <h3>%2$s</h3>
                    <p>%3$s</p>
                 </div>
                <a href="%4$s" class="boton" > Ver más</a>
            </li>',
            get_the_post_thumbnail($post),
            esc_html(get_the_title($post)),
            esc_html(wp_trim_words(get_the_content($post), 30)),
            esc_url(get_the_permalink($post)),
        );
        wp_reset_postdata();
    endforeach;
    $body .= '</ul>';
    return $body;
 }

/**Show imagen firts  post in REST API**/
add_action( 'rest_api_init', function () {
    register_rest_field( 'post', 'featured_image_src', array(
        'get_callback' => function ( $post_arr ) {
            $image_src_arr = wp_get_attachment_image_src( $post_arr['featured_media'], 'medium' );
 
            return $image_src_arr[0];
        },
        'update_callback' => null,
        'schema' => null
    ) );
} );