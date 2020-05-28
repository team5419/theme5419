<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package _s
 */

?>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
		<link rel="profile" href="http://gmpg.org/xfn/11" />
        
		<?php wp_head(); ?>
    </head>

    <body <?php body_class(); ?>>
		<?php wp_body_open(); ?>
        <header class="theme5419-header">
            <div class="theme5419-left">
                <div class="theme5419-content">
                    <img
                        class="theme5419-header-logo"
                        src="<?php echo get_theme_file_uri('assets/images/logo.png'); ?>"
                    >
                </div>
                <img
                    class="theme5419-header-triangle"
                    src="<?php echo get_theme_file_uri('assets/images/leftTriangle.svg'); ?>"
                >
            </div>
            <div class="theme5419-content">
                <?php wp_nav_menu( array(
                    "menu"            => "header-menu",
                    "container_class" => "theme5419-navbar",
                ) ) ?>
            </div>
            <div class="theme5419-right">
                <img
                    class="theme5419-header-triangle"
                    src="<?php echo get_theme_file_uri('assets/images/rightTriangle.svg'); ?>"
                >
                <div class="theme5419-content">
                    <span class="theme5419-header-page">HOME</span>
                    <form action="TODO" class="theme5419-header-search">
                        <input type="text"/>
                        <button type="submit"><i class="fa fa-search"></i></button>
                    </form>
                </div>
            </div>
        </header>