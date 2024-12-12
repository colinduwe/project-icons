<?php
/**
 * Plugin Name:         Project Icons
 * Description:         Adds project icon set to the Icon Block.
 * Version:             0.1.0
 * Requires at least:   6.3
 * Requires PHP:        7.4
 * License:             GPLv2
 * License URI:         https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * Text Domain:         project-icons
 * Domain Path:         /languages
 *
 */

defined( 'ABSPATH' ) || exit;

//Add extra icon libraries
function project_icons_register_icons() {
	wp_enqueue_script(
		'project-icons',
		plugins_url( '/dist/project-icons.min.js', __FILE__ ),
        array( 'wp-i18n', 'wp-hooks', 'wp-dom' ),
        filemtime( plugin_dir_path( __FILE__ ) . '/dist/project-icons.min.js' ),
		true // Very important, otherwise the filter is called too early.
	);
}
add_action( 'enqueue_block_editor_assets', 'project_icons_register_icons' );