<?php
if (!isset($currentPage)) {
    $currentPage = '404';
}
layout_start('Page not found', 'The page you requested could not be found.', $currentPage);
?>
<section class="section text-center">
  <div class="container-page reveal">
    <h1 class="display-title">Page not found</h1>
    <p class="section-intro mx-auto">The link may be outdated. Return to the homepage or contact us.</p>
    <a class="btn btn-primary" href="<?= e(url('/')) ?>">Home</a>
    <a class="btn btn-secondary" href="<?= e(url('/contact')) ?>">Contact</a>
  </div>
</section>
<?php layout_end();
