<?php
    // use base theme style (style.css)
    wp_enqueue_style( 'base stlye', get_stylesheet_uri());

    // add fonts
    wp_enqueue_style(
        "Righteous and Comfortaa fonts",
        "https://fonts.googleapis.com/css?family=Righteous|Comfortaa&display=swap"
    );
    wp_enqueue_style(
        "font awesome",
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    );

    // add navbar
    function register_nav_menu() {
        register_nav_menus(
            array(
                'header' => __( 'Header' )
            )
        );
    }
    add_action( 'init', 'register_nav_menu' );
?>