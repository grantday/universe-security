<?php

require __DIR__ . '/bootstrap.php';
require __DIR__ . '/includes/layout.php';

$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$base = base_path();
if ($base !== '' && str_starts_with($uri, $base)) {
    $uri = substr($uri, strlen($base)) ?: '/';
}
$uri = '/' . trim($uri, '/');
if ($uri === '//') {
    $uri = '/';
}

$routes = [
    '/' => 'pages/home.php',
    '/solutions' => 'pages/solutions.php',
    '/industries' => 'pages/industries.php',
    '/control-centre' => 'pages/control-centre.php',
    '/technology' => 'pages/technology.php',
    '/insights' => 'pages/insights.php',
    '/company' => 'pages/company.php',
    '/contact' => 'pages/contact.php',
    '/store' => 'pages/store.php',
    '/privacy' => 'pages/privacy.php',
    '/terms' => 'pages/terms.php',
    '/credits' => 'pages/credits.php',
];

if (isset($routes[$uri])) {
    require __DIR__ . '/' . $routes[$uri];
    exit;
}

if (preg_match('#^/insights/([a-z0-9-]+)$#', $uri, $m)) {
    $insightSlug = $m[1];
    require __DIR__ . '/pages/insight.php';
    exit;
}

http_response_code(404);
$currentPage = '404';
require __DIR__ . '/pages/404.php';
