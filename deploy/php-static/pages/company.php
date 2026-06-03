<?php
$currentPage = 'company';
$p = $pages['company'];
layout_start($p['title'], $site['description'], $currentPage);
page_hero($p['title'], $site['description']);
?>
<section class="section">
  <div class="container-page">
    <div class="grid-2 reveal">
      <div class="card">
        <p class="eyebrow"><?= e($p['mission']['eyebrow']) ?></p>
        <h2 class="section-title"><?= e($p['mission']['title']) ?></h2>
        <p><?= e($p['mission']['body']) ?></p>
      </div>
      <div class="card">
        <p class="eyebrow"><?= e($p['vision']['eyebrow']) ?></p>
        <h2 class="section-title"><?= e($p['vision']['title']) ?></h2>
        <p><?= e($p['vision']['body']) ?></p>
      </div>
    </div>
    <h2 class="section-title mt-4"><?= e($p['valuesHeading']) ?></h2>
    <div class="grid-2 reveal">
      <?php foreach ($p['values'] as $v): ?>
      <div class="card">
        <h3><?= e($v['title']) ?></h3>
        <p><?= e($v['body']) ?></p>
      </div>
      <?php endforeach; ?>
    </div>
    <div class="card mt-4 reveal">
      <h3><?= e($p['compliance']['title']) ?></h3>
      <p><?= e($p['compliance']['body']) ?></p>
    </div>
  </div>
</section>
<?php compliance_strip(); layout_end();
