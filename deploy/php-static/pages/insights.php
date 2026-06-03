<?php
$currentPage = 'insights';
$posts = Content::insights();
layout_start('Insights', 'Security insights and operational guidance from Universe Security.', $currentPage);
page_hero('Insights', 'Practical guidance for retailers, industry, and estates — from our control-room-led security model.');
?>
<section class="section">
  <div class="container-page">
    <?php if (!$posts): ?>
    <p class="section-intro">New articles will be published here soon.</p>
    <?php else: ?>
    <div class="grid-3" id="insights-grid">
      <?php foreach ($posts as $post): ?>
      <a class="insight-card reveal" href="<?= e(url('/insights/' . $post['slug'])) ?>">
        <div class="card">
          <h3><?= e($post['title']) ?></h3>
          <p><?= e($post['description']) ?></p>
          <p class="insight-meta"><?= e(format_date($post['publishedAt'])) ?></p>
        </div>
      </a>
      <?php endforeach; ?>
    </div>
    <?php endif; ?>
  </div>
</section>
<?php layout_end();
