<?php
/**
 * Plugin Name: Fab Feeds — Banner Manager
 * Description: Lets you manage square ad/promo banners (image + link) for 8 fixed slots — 4 on blog article pages, 4 on the home page — that update live on the Next.js frontend the moment you publish/change them here. No code changes needed on the frontend.
 * Version: 1.0.0
 * Author: Fab Feeds
 *
 * ── HOW IT WORKS ──────────────────────────────────────────────────────────
 * Adds a "Banners" section in wp-admin (custom post type `fabfeeds_banner`).
 * Each Banner has:
 *   - Featured Image  → the square banner image (recommended 600×600px)
 *   - Banner Location → which of the 8 fixed slots it fills:
 *       Home Banner 1-4   (slugs: home-1, home-2, home-3, home-4)
 *       Blog Banner 1-4   (slugs: blog-1, blog-2, blog-3, blog-4)
 *   - Link URL        → where clicking the banner sends the visitor
 *   - Status          → Publish = live on the site, Draft = hidden
 *
 * Exposed to the frontend via the REST API at:
 *   /wp-json/wp/v2/fabfeeds_banner?_embed&status=publish
 * The image comes through `_embedded["wp:featuredmedia"]`, the location
 * through `_embedded["wp:term"]` (taxonomy "banner_location"), and the link
 * through `meta.fabfeeds_banner_link`.
 *
 * ── HOW TO USE IN WP-ADMIN ────────────────────────────────────────────────
 * 1. Go to Banners → Add New.
 * 2. Give it an internal title (e.g. "Diwali Sale — Amazon").
 * 3. Set the Featured Image (square image, ideally 600×600px or larger).
 * 4. In the "Banner Location" box, tick exactly ONE of the 8 slots.
 * 5. In the "Banner Link" box, paste the destination URL.
 * 6. Publish. It appears on the site within a few seconds (or on next page
 *    load — the frontend fetches live banner data on every visit).
 * 7. To temporarily remove a banner, switch it back to Draft — no need to
 *    delete it.
 * 8. To replace a banner, just edit the existing one (swap the image/link)
 *    rather than creating a new one for the same slot.
 */

if (!defined('ABSPATH')) exit;

define('FABFEEDS_BANNER_CPT', 'fabfeeds_banner');
define('FABFEEDS_BANNER_TAX', 'banner_location');
define('FABFEEDS_BANNER_LINK_META', 'fabfeeds_banner_link');

/**
 * Register the Banner custom post type.
 */
function fabfeeds_register_banner_cpt() {
    register_post_type(FABFEEDS_BANNER_CPT, [
        'labels' => [
            'name'               => 'Banners',
            'singular_name'      => 'Banner',
            'add_new_item'       => 'Add New Banner',
            'edit_item'          => 'Edit Banner',
            'new_item'           => 'New Banner',
            'view_item'          => 'View Banner',
            'search_items'       => 'Search Banners',
            'not_found'          => 'No banners found',
            'all_items'          => 'All Banners',
            'menu_name'          => 'Banners',
        ],
        'public'             => false,
        'publicly_queryable' => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'show_in_rest'       => true,
        'rest_base'          => FABFEEDS_BANNER_CPT,
        'menu_icon'          => 'dashicons-images-alt2',
        'supports'           => ['title', 'thumbnail'],
        'has_archive'        => false,
    ]);
}
add_action('init', 'fabfeeds_register_banner_cpt');

/**
 * Register the Banner Location taxonomy (fixed, hierarchical-style checklist
 * so the admin picks exactly one of the 8 predefined slots).
 */
function fabfeeds_register_banner_location_taxonomy() {
    register_taxonomy(FABFEEDS_BANNER_TAX, [FABFEEDS_BANNER_CPT], [
        'labels' => [
            'name'          => 'Banner Locations',
            'singular_name' => 'Banner Location',
            'menu_name'     => 'Banner Location',
        ],
        'hierarchical'      => true, // checkbox-list UI, like Categories
        'show_ui'           => true,
        'show_admin_column' => true,
        'show_in_rest'      => true,
        'rest_base'         => 'banner_location',
        'query_var'         => true,
        'public'            => true,
    ]);
}
add_action('init', 'fabfeeds_register_banner_location_taxonomy');

/**
 * The 8 fixed slots. Name => slug.
 */
function fabfeeds_banner_slot_terms() {
    return [
        'Home Banner 1' => 'home-1',
        'Home Banner 2' => 'home-2',
        'Home Banner 3' => 'home-3',
        'Home Banner 4' => 'home-4',
        'Blog Banner 1' => 'blog-1',
        'Blog Banner 2' => 'blog-2',
        'Blog Banner 3' => 'blog-3',
        'Blog Banner 4' => 'blog-4',
    ];
}

/**
 * Register the link URL as post meta, exposed via REST.
 */
function fabfeeds_register_banner_meta() {
    register_post_meta(FABFEEDS_BANNER_CPT, FABFEEDS_BANNER_LINK_META, [
        'type'              => 'string',
        'single'            => true,
        'show_in_rest'      => true,
        'sanitize_callback' => 'esc_url_raw',
        'auth_callback'     => function () {
            return current_user_can('edit_posts');
        },
    ]);
}
add_action('init', 'fabfeeds_register_banner_meta');

/**
 * Metabox: Banner Link URL.
 */
function fabfeeds_add_banner_metabox() {
    add_meta_box(
        'fabfeeds_banner_settings',
        'Banner Settings',
        'fabfeeds_render_banner_metabox',
        FABFEEDS_BANNER_CPT,
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'fabfeeds_add_banner_metabox');

function fabfeeds_render_banner_metabox($post) {
    wp_nonce_field('fabfeeds_banner_save', 'fabfeeds_banner_nonce');
    $link = get_post_meta($post->ID, FABFEEDS_BANNER_LINK_META, true);
    ?>
    <p>
        <label for="fabfeeds_banner_link_field"><strong>Link URL</strong> — where visitors go when they click this banner.</label><br>
        <input
            type="url"
            id="fabfeeds_banner_link_field"
            name="fabfeeds_banner_link_field"
            value="<?php echo esc_attr($link); ?>"
            placeholder="https://example.com/your-offer"
            style="width:100%;max-width:600px;padding:8px;margin-top:6px;"
        />
    </p>
    <p style="color:#666;">
        Don't forget to also set a <strong>Featured Image</strong> (square, e.g. 600×600px)
        and tick the correct <strong>Banner Location</strong> in the sidebar.
    </p>
    <?php
}

function fabfeeds_save_banner_metabox($post_id) {
    if (!isset($_POST['fabfeeds_banner_nonce']) || !wp_verify_nonce($_POST['fabfeeds_banner_nonce'], 'fabfeeds_banner_save')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    if (isset($_POST['fabfeeds_banner_link_field'])) {
        update_post_meta($post_id, FABFEEDS_BANNER_LINK_META, esc_url_raw($_POST['fabfeeds_banner_link_field']));
    }
}
add_action('save_post_' . FABFEEDS_BANNER_CPT, 'fabfeeds_save_banner_metabox');

/**
 * One-time setup on activation: register CPT/taxonomy immediately, seed the
 * 8 fixed location terms, flush rewrite rules.
 */
function fabfeeds_banner_manager_activate() {
    fabfeeds_register_banner_cpt();
    fabfeeds_register_banner_location_taxonomy();

    foreach (fabfeeds_banner_slot_terms() as $name => $slug) {
        if (!get_term_by('slug', $slug, FABFEEDS_BANNER_TAX)) {
            wp_insert_term($name, FABFEEDS_BANNER_TAX, ['slug' => $slug]);
        }
    }

    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'fabfeeds_banner_manager_activate');

function fabfeeds_banner_manager_deactivate() {
    flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'fabfeeds_banner_manager_deactivate');
