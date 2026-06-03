<?php
/** @var string $pageTitle */
/** @var string|null $pageDescription */
/** @var string $currentPage */

$c = site_config();
$title = isset($pageTitle) ? $pageTitle . ' — ' . $c['name'] : $c['name'];
$desc = $pageDescription ?? $c['description'];
$nav = [
    ['id' => 'home', 'href' => url('index.php'), 'label' => 'Home'],
    ['id' => 'solutions', 'href' => url('solutions.php'), 'label' => 'Solutions'],
    ['id' => 'company', 'href' => url('company.php'), 'label' => 'Company'],
    ['id' => 'contact', 'href' => url('contact.php'), 'label' => 'Contact'],
    ['id' => 'store', 'href' => url('store.php'), 'label' => 'Store'],
];
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><?= e($title) ?></title>
    <meta name="description" content="<?= e($desc) ?>" />
    <link rel="stylesheet" href="<?= e(url('assets/css/site.css')) ?>" />
    <script defer src="<?= e(url('assets/js/site.js')) ?>"></script>
  </head>
  <body data-page="<?= e($currentPage ?? 'home') ?>">
    <header class="nav">
      <div class="container nav-inner">
        <a class="logo" href="<?= e(url('index.php')) ?>"><?= e($c['name']) ?></a>
        <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="site-nav">
          Menu
        </button>
        <nav id="site-nav" class="links">
          <?php foreach ($nav as $item): ?>
          <a
            href="<?= e($item['href']) ?>"
            class="<?= is_active($item['id'], $currentPage ?? '') ? 'active' : '' ?>"
          ><?= e($item['label']) ?></a>
          <?php endforeach; ?>
        </nav>
      </div>
    </header>
    <main>
