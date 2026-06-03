<?php
$currentPage = 'store';
layout_start('Online Store', 'Universe Security store — equipment and monitoring packages coming soon.', $currentPage);
?>
<div class="store-page">
  <div class="store-bg" style="background-image:url('<?= e(placeholder('control-room', 'Store')) ?>')"></div>
  <div class="store-inner reveal">
    <span class="eyebrow" style="color:rgba(255,255,255,.8)">Coming soon</span>
    <h1>Universe Security <span class="accent">Online Store</span></h1>
    <p class="lead" style="max-width:42rem;margin:1rem auto;color:rgba(255,255,255,.88)">
      Guard equipment, alarm systems, access control, and monitoring packages — launching soon.
    </p>
    <div style="display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;margin-top:1.5rem">
      <a class="btn btn-primary" href="<?= e(url('/contact')) ?>">Get notified at launch</a>
      <a class="btn btn-secondary" href="tel:<?= e($site['salesPhone']) ?>">Call <?= e($site['salesPhoneDisplay']) ?></a>
    </div>
    <div class="grid-2 mt-4" style="text-align:left;max-width:48rem;margin:2rem auto 0">
      <?php
      $products = [
        ['Guard equipment', 'Torches, PPE, and site-ready kits.'],
        ['Alarm systems', 'Panels, sensors, and installation bundles.'],
        ['Access control', 'Card readers, locks, and gate hardware.'],
        ['Monitoring packages', 'Control-room subscriptions for your site.'],
      ];
      foreach ($products as [$title, $body]):
      ?>
      <div class="card" style="background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.15);color:#fff">
        <h3 style="color:#fff"><?= e($title) ?></h3>
        <p style="color:rgba(255,255,255,.75)"><?= e($body) ?></p>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</div>
<?php layout_end();
