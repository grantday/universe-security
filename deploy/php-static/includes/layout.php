<?php

function layout_start(string $pageTitle, string $description, string $currentPage, bool $transparentHeader = false): void
{
    $fullTitle = $pageTitle === ($GLOBALS['site']['name'] ?? 'Universe Security')
        ? $pageTitle
        : $pageTitle . ' — ' . ($GLOBALS['site']['name'] ?? 'Universe Security');
    $headerClass = $transparentHeader ? 'site-header is-home-top' : 'site-header';
    ?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title><?= e($fullTitle) ?></title>
  <meta name="description" content="<?= e($description) ?>" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="<?= e(asset('css/main.css')) ?>" />
  <script defer src="<?= e(asset('js/app.js')) ?>"></script>
</head>
<body data-page="<?= e($currentPage) ?>">
<header class="<?= e($headerClass) ?>" id="site-header">
  <div class="container-page header-inner">
    <a class="brand" href="<?= e(url('/')) ?>">
      <img src="<?= e(asset('img/mark.svg')) ?>" alt="<?= e($GLOBALS['site']['name']) ?>" class="brand-mark" width="40" height="40" />
      <span class="brand-text"><?= e($GLOBALS['site']['name']) ?></span>
    </a>
    <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="main-nav">Menu</button>
    <nav id="main-nav" class="main-nav" aria-label="Main">
      <?php foreach (nav_links() as $link): ?>
      <a href="<?= e($link['href']) ?>" class="<?= nav_active($currentPage, $link['id'], $link['href']) ? 'active' : '' ?>"><?= e($link['label']) ?></a>
      <?php endforeach; ?>
    </nav>
    <div class="header-cta">
      <a class="btn btn-secondary btn-sm" href="<?= e(url('/contact')) ?>">Request assessment</a>
      <a class="btn btn-emergency btn-sm" href="tel:<?= e($GLOBALS['site']['emergencyPhone']) ?>">
        <span class="pulse-dot" aria-hidden="true"></span> Emergency 24/7
      </a>
    </div>
  </div>
  <div id="mobile-drawer" class="mobile-drawer" hidden>
    <nav class="mobile-nav">
      <?php foreach (nav_links() as $link): ?>
      <a href="<?= e($link['href']) ?>"><?= e($link['label']) ?></a>
      <?php endforeach; ?>
    </nav>
    <div class="mobile-cta">
      <a class="btn btn-secondary" href="<?= e(url('/contact')) ?>">Request assessment</a>
      <a class="btn btn-emergency" href="tel:<?= e($GLOBALS['site']['emergencyPhone']) ?>">Emergency 24/7</a>
    </div>
  </div>
</header>
<main class="site-main">
    <?php
}

function layout_end(): void
{
    $site = $GLOBALS['site'];
    $footer = $GLOBALS['extras']['footerColumns'] ?? [];
    ?>
</main>
<footer class="site-footer">
  <div class="container-page">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="brand brand-on-dark">
          <img src="<?= e(asset('img/mark.svg')) ?>" alt="" class="brand-mark" width="36" height="36" />
          <span class="brand-text"><?= e($site['name']) ?></span>
        </div>
        <p><?= e($site['description']) ?></p>
        <div class="footer-contact">
          <a href="tel:<?= e($site['salesPhone']) ?>"><?= e($site['salesPhoneDisplay']) ?></a>
          <a href="mailto:<?= e($site['email']) ?>"><?= e($site['email']) ?></a>
          <span><?= e($site['addressFull']) ?></span>
        </div>
      </div>
      <?php foreach ($footer as $col): ?>
      <div>
        <p class="footer-col-title"><?= e($col['title']) ?></p>
        <ul>
          <?php foreach ($col['links'] as $link): ?>
          <li><a href="<?= e(url($link['href'])) ?>"><?= e($link['label']) ?></a></li>
          <?php endforeach; ?>
        </ul>
      </div>
      <?php endforeach; ?>
    </div>
    <div class="footer-bottom">
      <p>&copy; <?= date('Y') ?> <?= e($site['name']) ?>. All rights reserved.</p>
      <a class="btn btn-emergency btn-sm" href="tel:<?= e($site['emergencyPhone']) ?>">Emergency: <?= e($site['emergencyPhoneDisplay']) ?></a>
    </div>
  </div>
</footer>
</body>
</html>
    <?php
}

function page_hero(string $title, string $intro, bool $dark = true): void
{
    ?>
<section class="page-hero <?= $dark ? 'page-hero-dark' : '' ?>">
  <div class="container-page">
    <h1 class="display-title"><?= e($title) ?></h1>
    <?php if ($intro !== ''): ?><p class="page-hero-lead"><?= e($intro) ?></p><?php endif; ?>
  </div>
</section>
    <?php
}

function compliance_strip(): void
{
    $cert = $GLOBALS['extras']['certifications'] ?? null;
    if (!$cert || empty($cert['items'])) {
        return;
    }
    ?>
<section class="compliance-strip section-tight">
  <div class="container-page">
    <h2 class="section-title-sm"><?= e($cert['heading']) ?></h2>
    <div class="grid-3">
      <?php foreach ($cert['items'] as $item): ?>
      <div class="card">
        <h3><?= e($item['title']) ?></h3>
        <p><?= e($item['body']) ?></p>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
    <?php
}
