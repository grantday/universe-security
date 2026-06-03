<?php
require __DIR__ . '/includes/helpers.php';
$c = site_config();
$currentPage = 'contact';
$pageTitle = 'Contact';
$pageDescription = 'Contact Universe Security — enquiries and emergency hotline.';
$flash = $_GET['sent'] ?? '';
require __DIR__ . '/includes/header.php';
?>
    <section class="hero compact">
      <div class="container">
        <div class="badge">Contact</div>
        <h1 class="h1 sm">Get in touch</h1>
        <p class="lead">
          For urgent incidents call the emergency hotline. For enquiries, use the form or email us directly.
        </p>
        <div class="cta-row">
          <a class="btn primary" href="tel:<?= e($c['phone']) ?>">Emergency: <?= e($c['phone_display']) ?></a>
          <a class="btn ghost" href="mailto:<?= e($c['email']) ?>"><?= e($c['email']) ?></a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <?php if ($flash === '1'): ?>
        <div class="flash ok">Thank you — your message was sent. We will respond shortly.</div>
        <?php elseif ($flash === 'saved'): ?>
        <div class="flash ok">Thank you — your message was received and saved. We will respond shortly.</div>
        <?php elseif ($flash === 'error'): ?>
        <div class="flash err">Something went wrong. Please email <?= e($c['email']) ?> directly.</div>
        <?php endif; ?>

        <div class="grid two">
          <div class="card">
            <h3>Office</h3>
            <p><?= e($c['address']) ?></p>
            <p style="margin-top: 8px" class="muted"><?= e($c['office_hours']) ?></p>
          </div>
          <div class="card">
            <h3>Enquiry form</h3>
            <form id="contact-form" class="form" method="post" action="<?= e(url('send-contact.php')) ?>">
              <div class="hp" aria-hidden="true">
                <label>Leave blank</label>
                <input type="text" name="website" tabindex="-1" autocomplete="off" />
              </div>
              <div class="field">
                <label for="name">Name</label>
                <input id="name" name="name" type="text" required maxlength="120" />
                <div class="form-error" data-error-for="name"></div>
              </div>
              <div class="field">
                <label for="email">Email</label>
                <input id="email" name="email" type="email" required maxlength="160" />
                <div class="form-error" data-error-for="email"></div>
              </div>
              <div class="field">
                <label for="phone">Phone (optional)</label>
                <input id="phone" name="phone" type="tel" maxlength="40" />
              </div>
              <div class="field">
                <label for="subject">Subject</label>
                <select id="subject" name="subject">
                  <option>General enquiry</option>
                  <option>Security assessment</option>
                  <option>Store / products</option>
                  <option>Emergency (non-urgent follow-up)</option>
                </select>
              </div>
              <div class="field">
                <label for="message">Message</label>
                <textarea id="message" name="message" required maxlength="4000"></textarea>
                <div class="form-error" data-error-for="message"></div>
              </div>
              <button type="submit" class="btn primary">Send message</button>
            </form>
          </div>
        </div>

        <div class="card" style="margin-top: 14px">
          <h3>Map</h3>
          <iframe
            class="iframe"
            title="Office location map"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
            src="<?= e($c['map_embed_url']) ?>"
          ></iframe>
        </div>
      </div>
    </section>
<?php require __DIR__ . '/includes/footer.php'; ?>
