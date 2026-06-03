<?php
$currentPage = 'industries';
$p = $pages['industries'];
layout_start($p['title'], $p['intro'], $currentPage);
page_hero($p['title'], $p['intro']);
?>
<section class="section">
  <div class="container-page">
    <div class="grid-3">
      <?php foreach ($p['items'] as $item): ?>
      <div class="card reveal">
        <div class="icon-wrap" style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:var(--brand-50);border-radius:.65rem;color:var(--brand-700);margin-bottom:.5rem"><?= icon_svg($item['icon']) ?></div>
        <h3><?= e($item['title']) ?></h3>
        <p><?= e($item['blurb']) ?></p>
      </div>
      <?php endforeach; ?>
    </div>
    <p class="text-center mt-4"><a class="btn btn-primary" href="<?= e(url('/contact')) ?>">Discuss your industry</a></p>
  </div>
</section>
<?php compliance_strip(); layout_end();
