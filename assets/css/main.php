:root {
    --team-color: #990000;
    --light-gray: #F3F3F3;
    
    --sidebar-side: 330px;
    /* --sidebar-side: 450px; */

    --header-height: 1.5in;
    --neg-header-height: -1.5in;
}

* {
    box-sizing: border-box;
}

html, body {
    margin: 0px;

    width: 100%;
}

html {
    height: 100%;
}
 
body {
    display: flex;
    flex-direction: column;
    
    font-family: 'Comfortaa';
    font-weight: 13px;

    min-height: 100%;

    background-color: var(--light-gray);
}

/* base layout */

.theme5419-header, .theme5419-main, .theme5419-footer {
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;

    width: 100%;
}

.theme5419-header .theme5419-left,
.theme5419-header .theme5419-right,

.theme5419-main .theme5419-left,
.theme5419-main .theme5419-right,

.theme5419-content .theme5419-left,
.theme5419-content .theme5419-right {
    width: var(--sidebar-side);
    max-width: var(--sidebar-side);
    min-width: var(--sidebar-side);
}

.theme5419-header .theme5419-content,
.theme5419-main .theme5419-content,
.theme5419-footer .theme5419-content {
    width: 100%;
}

/* header */

.theme5419-header {
    height: var(--header-height);
}

.theme5419-navbar {
    background-color: var(--team-color);
    width: 100%;
    text-align: center;

    padding: 10px;
    padding-top: 65px;
}

.theme5419-navbar span {
    font-family: 'Righteous', sans-serif;
    font-weight: bold;
    font-size: 18px;

    color: var(--light-gray);
    
    margin: 10px;
}

.theme5419-header .theme5419-left,
.theme5419-header .theme5419-right {
    display: flex;
}

.theme5419-header .theme5419-left .theme5419-header-triangle {
    margin-right: var(--neg-header-height);
}

.theme5419-header .theme5419-right .theme5419-header-triangle {
    margin-left: var(--neg-header-height);
}

.theme5419-header-triangle {
    z-index: -1;
    height: 100%;
}

.theme5419-header .theme5419-right .theme5419-content,
.theme5419-header .theme5419-left .theme5419-content {
    width: 100%;
    height: 100%;

    background-color: var(--team-color);

    text-align: center;
}

.theme5419-header .theme5419-right .theme5419-content {
    padding-top: 10px;
}

.theme5419-header-logo {
    height: 100%;
}

.theme5419-header-page {
    font-family: 'Righteous', sans-serif;
    font-size: 72px;
    color: var(--light-gray);
    margin: auto;
}

/* main */

.theme5419-main {
    flex: 1 0 auto;
}

.theme5419-main .theme5419-left,
.theme5419-main .theme5419-right {
    overflow: hidden;
    background-size: 80%;
    background-repeat: repeat-y;
}

.theme5419-main .theme5419-left {
    background-image: url(get_theme_file_uri('/assets/images/leftSidebar.jpg'));
    <!-- background-image: url(./assets/images/leftSidebar.jpg); -->
    background-position: top left;
}

.theme5419-main .theme5419-right {
    background-image: url(get_theme_file_uri('/assets/images/leftSidebar.jpg'));
    background-position: top right;
}

.theme5419-main .theme5419-content {
    padding: 10px 30px;
}

/* footer */

.theme5419-footer {
    height: 1in;
    background-color: var(--team-color);
}

.theme5419-header-search {
    padding: 5px;
}

.theme5419-header-search input {
    width: calc(100% - 30px);
    float: left;
}

.theme5419-header-search button {
    width: 30px;
    float: left;
}

/* small screen */

@media screen and (max-width: 940px) {

    :root {
        --sidebar-side: 100%;
    }

    /* Just hide the sidebars for main and footer on mobile */

    .theme5419-main .theme5419-right,
    .theme5419-main .theme5419-left,
    .theme5419-footer .theme5419-right,
    .theme5419-footer .theme5419-left {
        display: none;
    }

    /* mobile header */

    .theme5419-header-page,
    .theme5419-header-triangle {
        display: none;
    }

    .theme5419-header {
        display: block;
        height: 100%;
    }

    .theme5419-header-logo {
        width: 300px;
    }

    .theme5419-header .theme5419-content {
        background-color: var(--team-color);
    }

    .theme5419-navbar {    
        padding: 10px;
        padding-top: 10px;

        max-width: 340px;
        display: table;
        text-align: center;

        margin: auto;
    }
    
    .theme5419-navbar span {  
        display: table-cell;
        margin: 0px;
    }

    .theme5419-header-search {
        margin: auto;
        max-width: 340px;
        padding: 5px;
        text-align: center;
    }

    .theme5419-header .theme5419-right .theme5419-content {
        padding-top: 0px;
        padding-bottom: 10px;
    }
}

/* medium screen */

@media screen and (max-width: 1300px) and (min-width: 940px) {
    /* Just hide the right sidebars and footer on tablet */

    .theme5419-main .theme5419-right,
    .theme5419-footer .theme5419-right {
        display: none;
    }

    .theme5419-header-page,
    .theme5419-right .theme5419-header-triangle {
        display: none;
    }

    .theme5419-header .theme5419-right {
        min-width: 200px;
        max-width: 200px;
    }

    .theme5419-header .theme5419-right .theme5419-content {
        height: 98px;
        padding-top: 65px;
    }
}