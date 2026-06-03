<?php
require __DIR__ . '/includes/helpers.php';
$c = site_config();
$currentPage = 'store';
$pageTitle = 'Store';
$pageDescription = 'Universe Security online store — coming soon.';
require __DIR__ . '/includes/header.php';
?>
    <section class="hero compact">
      <div class="container">
        <div class="badge">Coming soon</div>
        <h1 class="h1 sm">Universe Security Online Store</h1>
        <p class="lead">
          Equipment, access control, alarm systems, and monitoring packages — launching soon.
        </p>
        <div class="cta-row">
          <a class="btn primary" href="<?= e(url('contact.php')) ?>?subject=store">Get notified at launch</a>
          <a class="btn ghost" href="tel:<?= e($c['phone']) ?>">Call <?= e($c['phone_display']) ?></a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2>What will be available</h2>
        <div class="grid two" style="margin-top: 14px">
          <div class="card"><h3>Guard equipment</h3><p>Torches, PPE, and site-ready kits.</p></div>
          <div class="card"><h3>Alarm systems</h3><p>Panels, sensors, and installation bundles.</p></div>
          <div class="card"><h3>Access control</h3><p>Card readers, locks, and gate hardware.</p></div>
          <div class="card"><h3>Monitoring packages</h3><p>Control-room subscriptions for your site.</p></div>
        </div>
      </div>
    </section>
<?php require __DIR__ . '/includes/footer.php'; ?>
