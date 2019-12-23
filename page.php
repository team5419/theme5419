<?php get_header(); ?>

<?php 
    // Start the Loop
    if ( have_posts() ) { 
        while ( have_posts() ) { 
            the_post(); 
            // Include the page content
            get_template_part( 'content', 'page' );   	

            // If comments are open or the page has at least one comment, load the comments template.
            if ( comments_open() || get_comments_number() ) {
                comments_template();
            }
            
        // End the Loop
        } 
    }
?>

<?php get_footer(); ?>