<?php
$currentPage = 'control-centre';
$p = $pages['controlCentre'];
$steps = $extras['controlCentreSteps'] ?? [];
$kpis = $content['kpis'] ?? [];
layout_start($p['heroTitle'], $p['heroIntro'], $currentPage);
page_hero($p['heroTitle'], $p['heroIntro']);
?>
<section class="section">
  <div class="container-page">
    <div class="flow-steps reveal">
      <?php foreach ($steps as $step): ?>
      <div class="flow-step">
        <div class="icon-wrap"><?= icon_svg($step['icon']) ?></div>
        <strong><?= e($step['title']) ?></strong>
        <p style="font-size:.75rem;margin:.35rem 0 0;color:var(--ink-muted)"><?= e($step['body']) ?></p>
      </div>
      <?php endforeach; ?>
    </div>
    <div class="grid-3 mt-4 reveal">
      <div class="card-media"><img src="<?= e(placeholder('alarm', 'Alarm signal')) ?>" alt="" /></div>
      <div class="card-media"><img src="<?= e(placeholder('dispatch', 'Dispatch')) ?>" alt="" /></div>
      <div class="card-media"><img src="<?= e(placeholder('response', 'Response')) ?>" alt="" /></div>
    </div>
    <div class="grid-2 mt-4" style="align-items:start">
      <div class="reveal">
        <?php foreach ($p['features'] as $f): ?>
        <div class="feature-row">
          <div class="icon-wrap"><?= icon_svg($f['icon']) ?></div>
          <div>
            <h2><?= e($f['title']) ?></h2>
            <p><?= e($f['body']) ?></p>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
      <div class="simulator reveal">
        <p style="margin:0;font-weight:700">Live operations snapshot</p>
        <p style="font-size:.8125rem;color:rgba(255,255,255,.7);margin:.5rem 0 0">Illustrative control-room metrics</p>
        <div class="sim-kpis">
          <?php foreach (array_slice($kpis, 0, 3) as $kpi): ?>
          <div class="sim-kpi"><strong><?= e($kpi['value']) ?></strong><?= e($kpi['label']) ?></div>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
    <p class="text-center mt-4"><a class="btn btn-primary" href="<?= e(url($p['ctaHref'])) ?>"><?= e($p['ctaLabel']) ?></a></p>
  </div>
</section>
<?php compliance_strip(); layout_end();
