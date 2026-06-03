<?php
require __DIR__ . '/includes/helpers.php';
$c = site_config();
$currentPage = 'home';
$pageTitle = $c['name'];
$pageDescription = $c['description'];
require __DIR__ . '/includes/header.php';
?>
    <section class="hero">
      <div class="container">
        <div class="badge"><?= e($c['tagline']) ?></div>
        <h1 class="h1">Total Control. 24/7 Response. Zimbabwe-wide coverage.</h1>
        <p class="lead">
          Guarding, CCTV, access control, and control-room monitoring — fewer incidents, faster escalation,
          and audit-ready reporting.
        </p>
        <div class="cta-row">
          <a class="btn primary" href="<?= e(url('contact.php')) ?>">Request security assessment</a>
          <a class="btn ghost" href="tel:<?= e($c['phone']) ?>">Emergency: <?= e($c['phone_display']) ?></a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2>What we do</h2>
        <p class="muted">Security built for prevention, detection, and rapid response.</p>
        <div class="grid three" style="margin-top: 14px">
          <div class="card">
            <h3>24/7 Control Centre</h3>
            <p>Live monitoring, escalation workflows, and incident logging.</p>
          </div>
          <div class="card">
            <h3>Guarding &amp; Rapid Response</h3>
            <p>Visible deterrence with supervisor oversight and clear escalation.</p>
          </div>
          <div class="card">
            <h3>Technology &amp; Access Control</h3>
            <p>CCTV design, alarm integration, and access-control hardening.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2>Who we serve</h2>
        <div class="grid three" style="margin-top: 14px">
          <div class="card"><h3>Residential</h3><p>Homes, estates, and private clients.</p></div>
          <div class="card"><h3>Commercial</h3><p>Retail, offices, and logistics sites.</p></div>
          <div class="card"><h3>Industrial</h3><p>Plants, warehouses, and critical infrastructure.</p></div>
        </div>
        <div class="cta-row" style="margin-top: 18px">
          <a class="btn ghost" href="<?= e(url('solutions.php')) ?>">View solutions</a>
          <a class="btn primary" href="<?= e(url('store.php')) ?>">Online store (coming soon)</a>
        </div>
      </div>
    </section>
<?php require __DIR__ . '/includes/footer.php'; ?>
