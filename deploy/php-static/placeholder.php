<?php
$seed = preg_replace('/[^a-z0-9]/i', '', $_GET['seed'] ?? 'US') ?: 'US';
$label = $_GET['label'] ?? 'Universe Security';
$initials = strtoupper(substr($seed, 0, 2));
$safeLabel = htmlspecialchars($label, ENT_XML1 | ENT_QUOTES, 'UTF-8');
header('Content-Type: image/svg+xml; charset=utf-8');
header('Cache-Control: public, max-age=86400');
echo <<<SVG
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#EAF2FB"/>
      <stop offset="0.45" stop-color="#D6E7F7"/>
      <stop offset="1" stop-color="#0B2545"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#g)"/>
  <rect x="70" y="620" width="1060" height="110" rx="28" fill="rgba(255,255,255,0.78)"/>
  <text x="110" y="685" font-family="system-ui,sans-serif" font-size="34" font-weight="700" fill="#0B2545">{$safeLabel}</text>
  <text x="110" y="725" font-family="system-ui,sans-serif" font-size="18" font-weight="600" fill="rgba(11,37,69,0.72)">Universe Security</text>
  <rect x="980" y="646" width="120" height="58" rx="18" fill="#0B2545"/>
  <text x="1040" y="685" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" font-weight="800" fill="#ffffff">{$initials}</text>
</svg>
SVG;
