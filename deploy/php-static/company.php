<?php
require __DIR__ . '/includes/helpers.php';
$c = site_config();
$currentPage = 'company';
$pageTitle = 'Company';
$pageDescription = 'About Universe Security — Zimbabwe integrated protection services.';
require __DIR__ . '/includes/header.php';
?>
    <section class="hero compact">
      <div class="container">
        <div class="badge">Company</div>
        <h1 class="h1 sm">Universe Security</h1>
        <p class="lead"><?= e($c['description']) ?></p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="grid two">
          <div class="card">
            <h3>Our approach</h3>
            <p>
              We combine guarding, technology, and a 24/7 control centre so clients get prevention,
              detection, and rapid response in one accountable service.
            </p>
          </div>
          <div class="card">
            <h3>Contact</h3>
            <p>
              <strong>Phone:</strong>
              <a href="tel:<?= e($c['phone']) ?>"><?= e($c['phone_display']) ?></a><br />
              <strong>Email:</strong>
              <a href="mailto:<?= e($c['email']) ?>"><?= e($c['email']) ?></a><br />
              <strong>Address:</strong> <?= e($c['address']) ?>
            </p>
          </div>
        </div>
      </div>
    </section>
<?php require __DIR__ . '/includes/footer.php'; ?>
