<?php
/**
 * Plugin Name: Fab Feeds — Language Filter
 * Description: Adds a "Language" taxonomy to posts so the headless frontend (Next.js) can filter articles by language via the REST API. New/existing posts default to "English" unless another language is chosen.
 * Version: 1.0.0
 * Author: Fab Feeds
 *
 * ── HOW IT WORKS ──────────────────────────────────────────────────────────
 * 1. Registers a taxonomy `blog_language` on the `post` post type.
 *    - Exposed in the REST API at /wp-json/wp/v2/languages
 *    - Also appears embedded on every post response under `_embedded["wp:term"]`
 *      when a request uses `_embed` (same mechanism as Categories/Tags).
 * 2. Seeds a starter list of languages on activation: English, Hindi, German,
 *    Spanish, French. Add more any time from Posts → Languages in wp-admin —
 *    it works exactly like the Tags screen.
 * 3. Any post published without a language selected is automatically tagged
 *    "English" (both for new posts going forward, and for all existing posts
 *    — run once on activation).
 *
 * ── HOW TO USE IN WP-ADMIN ────────────────────────────────────────────────
 * Edit any post → in the right sidebar you'll see a new "Languages" box
 * (works like Tags: type/select the language). Leave it empty to keep it
 * English by default.
 *
 * ── HOW THE FRONTEND USES THIS ────────────────────────────────────────────
 * GET /wp-json/wp/v2/languages              → list all language terms (id, slug, name)
 * GET /wp-json/wp/v2/posts?blog_language=ID → posts filtered to that language
 * GET /wp-json/wp/v2/posts?_embed           → each post's language appears in
 *                                              `_embedded["wp:term"]` (alongside
 *                                              categories/tags, identified by
 *                                              `"taxonomy":"blog_language"`)
 */

if (!defined('ABSPATH')) exit;

define('FABFEEDS_LANG_TAXONOMY', 'blog_language');
define('FABFEEDS_LANG_DEFAULT_SLUG', 'english');

/**
 * Register the "Language" taxonomy on posts.
 */
function fabfeeds_register_language_taxonomy() {
    register_taxonomy(
        FABFEEDS_LANG_TAXONOMY,
        ['post'],
        [
            'label'             => 'Languages',
            'labels'            => [
                'name'          => 'Languages',
                'singular_name' => 'Language',
                'search_items'  => 'Search Languages',
                'all_items'     => 'All Languages',
                'edit_item'     => 'Edit Language',
                'update_item'   => 'Update Language',
                'add_new_item'  => 'Add New Language',
                'new_item_name' => 'New Language Name',
                'menu_name'     => 'Languages',
            ],
            'hierarchical'      => false, // tag-style UI: type or pick from list
            'show_ui'           => true,
            'show_admin_column' => true,
            'show_in_nav_menus' => false,
            'show_in_rest'      => true,
            'rest_base'         => 'languages',
            'query_var'         => true,
            'public'            => true,
        ]
    );
}
add_action('init', 'fabfeeds_register_language_taxonomy');

/**
 * Ensure the default "English" term always exists, and return its term_id.
 */
function fabfeeds_get_default_language_term_id() {
    $term = get_term_by('slug', FABFEEDS_LANG_DEFAULT_SLUG, FABFEEDS_LANG_TAXONOMY);
    if ($term && !is_wp_error($term)) {
        return (int) $term->term_id;
    }
    $inserted = wp_insert_term('English', FABFEEDS_LANG_TAXONOMY, ['slug' => FABFEEDS_LANG_DEFAULT_SLUG]);
    if (is_wp_error($inserted)) return 0;
    return (int) $inserted['term_id'];
}

/**
 * Auto-assign "English" to any post that is published/updated without a
 * language selected. Runs on every save so it stays correct going forward.
 */
function fabfeeds_default_language_on_save($post_id, $post) {
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (wp_is_post_revision($post_id)) return;
    if ($post->post_type !== 'post') return;
    if (!in_array($post->post_status, ['publish', 'future', 'draft', 'pending'], true)) return;

    $existing = wp_get_post_terms($post_id, FABFEEDS_LANG_TAXONOMY, ['fields' => 'ids']);
    if (is_wp_error($existing) || !empty($existing)) return;

    $default_id = fabfeeds_get_default_language_term_id();
    if ($default_id) {
        wp_set_post_terms($post_id, [$default_id], FABFEEDS_LANG_TAXONOMY, false);
    }
}
add_action('save_post', 'fabfeeds_default_language_on_save', 20, 2);

/**
 * One-time setup on activation:
 *  - register the taxonomy immediately (activation runs before `init`)
 *  - seed a starter list of common languages
 *  - backfill every existing post that has no language with "English"
 *  - flush rewrite rules
 */
function fabfeeds_language_filter_activate() {
    fabfeeds_register_language_taxonomy();

    $starter_languages = [
        'English' => 'english',
        'Hindi'   => 'hindi',
        'German'  => 'german',
        'Spanish' => 'spanish',
        'French'  => 'french',
    ];
    foreach ($starter_languages as $name => $slug) {
        if (!get_term_by('slug', $slug, FABFEEDS_LANG_TAXONOMY)) {
            wp_insert_term($name, FABFEEDS_LANG_TAXONOMY, ['slug' => $slug]);
        }
    }

    $default_id = fabfeeds_get_default_language_term_id();
    if ($default_id) {
        $post_ids = get_posts([
            'post_type'      => 'post',
            'post_status'    => 'any',
            'posts_per_page' => -1,
            'fields'         => 'ids',
            'tax_query'      => [
                [
                    'taxonomy' => FABFEEDS_LANG_TAXONOMY,
                    'operator' => 'NOT EXISTS',
                ],
            ],
        ]);
        foreach ($post_ids as $post_id) {
            wp_set_post_terms($post_id, [$default_id], FABFEEDS_LANG_TAXONOMY, false);
        }
    }

    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'fabfeeds_language_filter_activate');

function fabfeeds_language_filter_deactivate() {
    flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'fabfeeds_language_filter_deactivate');
