<?php
    wp_enqueue_style( 'base stlye', get_template_directory_uri() . '/assets/css/main.php');

    // add fonts
    wp_enqueue_style(
        "Righteous and Comfortaa fonts",
        "https://fonts.googleapis.com/css?family=Righteous|Comfortaa&display=swap"
    );
    wp_enqueue_style(
        "font awesome",
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    );
?>