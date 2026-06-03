<?php
/**
 * Single source of truth for the temporary PHP site.
 * Keep in sync with lib/site-config.ts when contact details change.
 */
return [
    'name' => 'Universe Security',
    'tagline' => 'Intelligent Security. Real-Time Response. Total Control.',
    'description' =>
        'Integrated protection services for residential, commercial, and industrial environments across Zimbabwe.',
    'email' => 'info@universe-security.com',
    'phone' => '0773236764',
    'phone_display' => '077 323 6764',
    'address' => '84 King George, Avondale, Harare, Zimbabwe',
    'office_hours' => 'Mon–Fri 08:00–17:30 CAT · 24/7 Control Centre',
    'map_embed_url' =>
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3820.5!2d31.05!3d-17.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDQ5JzEyLjAiUyAzMcKwMDMnMDAuMCJF!5e0!3m2!1sen!2szw!4v1',
    'contact_to' => 'info@universe-security.com',
    'base_path' => rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '')), '/'),
];
