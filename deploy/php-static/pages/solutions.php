<?php
$currentPage = 'solutions';
$p = $pages['solutions'];
layout_start($p['title'], $p['intro'], $currentPage);
page_hero($p['title'], $p['intro']);
?>
<section class="section">
  <div class="container-page">
    <?php foreach ($p['sections'] as $i => $sec): ?>
    <article id="<?= e($sec['id']) ?>" class="service-card <?= $i % 2 ? 'reverse' : '' ?> reveal" style="margin-bottom:3rem">
      <div class="card-media"><img src="<?= e(placeholder($sec['id'], $sec['title'])) ?>" alt="" loading="lazy" /></div>
      <div>
        <h2 class="section-title"><?= e($sec['title']) ?></h2>
        <p class="section-intro"><?= e($sec['lead']) ?></p>
        <ul style="margin:0;padding-left:1.1rem;color:var(--ink-muted);line-height:1.8">
          <?php foreach ($sec['items'] as $item): ?><li><?= e($item) ?></li><?php endforeach; ?>
        </ul>
      </div>
    </article>
    <?php endforeach; ?>
    <p class="text-center"><a class="btn btn-primary" href="<?= e(url('/contact')) ?>">Request assessment</a></p>
  </div>
</section>
<?php compliance_strip(); layout_end();
