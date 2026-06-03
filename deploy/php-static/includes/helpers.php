<?php

require_once __DIR__ . '/Content.php';

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function base_path(): string
{
    $script = $_SERVER['SCRIPT_NAME'] ?? '/index.php';
    $dir = str_replace('\\', '/', dirname($script));
    if ($dir === '/' || $dir === '.') {
        return '';
    }
    return rtrim($dir, '/');
}

function url(string $path = ''): string
{
    $base = base_path();
    $path = '/' . ltrim($path, '/');
    if ($path === '/') {
        return ($base === '' ? '' : $base) . '/';
    }
    return $base . $path;
}

function asset(string $path): string
{
    return url('assets/' . ltrim($path, '/'));
}

function placeholder(string $seed, string $label = 'Universe Security'): string
{
    return url('placeholder.php?seed=' . rawurlencode($seed) . '&label=' . rawurlencode($label));
}

function format_date(string $iso): string
{
    $ts = strtotime($iso);
    if ($ts === false) {
        return $iso;
    }
    return date('j M Y', $ts);
}

function nav_links(): array
{
    return [
        ['id' => 'home', 'href' => url('/'), 'label' => 'Home'],
        ['id' => 'solutions', 'href' => url('/solutions'), 'label' => 'Solutions'],
        ['id' => 'industries', 'href' => url('/industries'), 'label' => 'Industries'],
        ['id' => 'control-centre', 'href' => url('/control-centre'), 'label' => 'Control Centre'],
        ['id' => 'technology', 'href' => url('/technology'), 'label' => 'Technology'],
        ['id' => 'insights', 'href' => url('/insights'), 'label' => 'Insights'],
        ['id' => 'company', 'href' => url('/company'), 'label' => 'Company'],
        ['id' => 'contact', 'href' => url('/contact'), 'label' => 'Contact'],
        ['id' => 'store', 'href' => url('/store'), 'label' => 'Store'],
    ];
}

function nav_active(string $current, string $id, string $href): bool
{
    if ($id === 'home') {
        return $current === 'home';
    }
    return $current === $id || str_starts_with($current, $id);
}

function icon_svg(string $name): string
{
    $icons = [
        'clock' => '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
        'shield' => '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
        'radio' => '<path d="M4.9 4.9a10 10 0 0 1 14.2 0M7.8 7.8a6 6 0 0 1 8.5 0"/><circle cx="12" cy="12" r="2"/>',
        'mapPin' => '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
        'users' => '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>',
        'cpu' => '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/>',
        'zap' => '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
        'barChart3' => '<path d="M3 3v18h18"/><path d="M7 16v-5M12 16V8M17 16v-9"/>',
        'headphones' => '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3zM18 14h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-3"/>',
        'check' => '<path d="M20 6 9 17l-5-5"/>',
        'camera' => '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
        'lock' => '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
        'building2' => '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12h12M10 6h.01M14 6h.01M10 10h.01M14 10h.01"/>',
        'truck' => '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h2M14 9h4l3 3v6h-7V9z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    ];
    $path = $icons[$name] ?? $icons['shield'];
    return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' . $path . '</svg>';
}
