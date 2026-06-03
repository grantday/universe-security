<?php
$currentPage = 'technology';
$p = $pages['technology'];
layout_start($p['title'], $p['intro'], $currentPage);
page_hero($p['title'], $p['intro']);
?>
<section class="section">
  <div class="container-page">
    <div class="grid-3 reveal">
      <?php foreach ($p['stack'] as $item): ?>
      <div class="card">
        <div class="icon-wrap" style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:var(--brand-50);border-radius:.65rem;color:var(--brand-700);margin-bottom:.5rem"><?= icon_svg($item['icon']) ?></div>
        <h3><?= e($item['title']) ?> <?php if (!empty($item['badge'])): ?><span style="font-size:.7rem;background:var(--amber);color:#fff;padding:.15rem .5rem;border-radius:999px;vertical-align:middle"><?= e($item['badge']) ?></span><?php endif; ?></h3>
        <p><?= e($item['body']) ?></p>
      </div>
      <?php endforeach; ?>
    </div>
    <h2 class="section-title mt-4"><?= e($p['dataSecurityHeading']) ?></h2>
    <div class="grid-3 reveal">
      <?php foreach ($p['dataSecurity'] as $item): ?>
      <div class="card">
        <h3><?= e($item['title']) ?></h3>
        <p><?= e($item['body']) ?></p>
      </div>
      <?php endforeach; ?>
    </div>
    <p class="text-center mt-4"><a class="btn btn-primary" href="<?= e(url($p['ctaHref'])) ?>"><?= e($p['ctaLabel']) ?></a></p>
  </div>
</section>
<?php compliance_strip(); layout_end();
