<?php
$currentPage = 'insights';
$post = Content::insightBySlug($insightSlug ?? '');
if (!$post) {
    http_response_code(404);
    require __DIR__ . '/404.php';
    exit;
}
layout_start($post['title'], $post['description'], $currentPage);
page_hero($post['title'], $post['description']);
?>
<section class="section">
  <div class="container-page">
    <p class="eyebrow"><?= e(format_date($post['publishedAt'])) ?></p>
    <div class="prose reveal"><?= $post['html'] ?></div>
    <p class="mt-4"><a href="<?= e(url('/insights')) ?>" class="btn btn-secondary">← All insights</a></p>
  </div>
</section>
<?php layout_end();
