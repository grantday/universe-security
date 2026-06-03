<?php
require __DIR__ . '/includes/helpers.php';
$c = site_config();
$currentPage = 'solutions';
$pageTitle = 'Solutions';
$pageDescription = 'Security solutions for home, business, and industrial sites.';
require __DIR__ . '/includes/header.php';
?>
    <section class="hero compact">
      <div class="container">
        <div class="badge">Solutions</div>
        <h1 class="h1 sm">Protection tailored to your environment</h1>
        <p class="lead">From residential estates to industrial plants — integrated guarding, technology, and monitoring.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="grid two">
          <div class="card" id="home">
            <h3>Home security</h3>
            <p>Alarm systems, CCTV, and rapid response for residences and estates.</p>
          </div>
          <div class="card" id="business">
            <h3>Business security</h3>
            <p>Access control, patrols, and control-room monitoring for offices and retail.</p>
          </div>
          <div class="card" id="industrial">
            <h3>Industrial security</h3>
            <p>Perimeter protection, incident logging, and compliance-ready reporting.</p>
          </div>
          <div class="card" id="specialised">
            <h3>Specialised</h3>
            <p>Custom deployments for logistics, healthcare, and critical infrastructure.</p>
          </div>
        </div>
        <div class="cta-row" style="margin-top: 18px">
          <a class="btn primary" href="<?= e(url('contact.php')) ?>">Request assessment</a>
        </div>
      </div>
    </section>
<?php require __DIR__ . '/includes/footer.php'; ?>
