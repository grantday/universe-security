<?php
$currentPage = 'contact';
$p = $pages['contact'];
$flash = $_GET['sent'] ?? '';
layout_start($p['title'], $p['intro'], $currentPage);
page_hero($p['title'], $p['intro']);
?>
<section class="section">
  <div class="container-page">
    <?php if ($flash === '1'): ?><div class="flash ok">Thank you — your message was sent.</div><?php endif; ?>
    <div id="form-flash" class="flash" hidden></div>
    <div class="grid-2">
      <div class="card reveal">
        <h3><?= e($p['emergencyHeading']) ?></h3>
        <p><?= e($p['emergencyNote']) ?></p>
        <a class="btn btn-emergency mt-2" href="tel:<?= e($site['emergencyPhone']) ?>"><?= e($site['emergencyPhoneDisplay']) ?></a>
        <h3 class="mt-4"><?= e($p['officeHeading']) ?></h3>
        <p><?= e($site['addressFull']) ?></p>
        <p class="eyebrow mt-2"><?= e($site['officeHours']) ?></p>
        <iframe class="map-iframe mt-4" title="Map" loading="lazy" src="<?= e($site['mapEmbedUrl']) ?>"></iframe>
      </div>
      <div class="card reveal">
        <h3><?= e($p['formHeading']) ?></h3>
        <p class="section-intro"><?= e($p['formIntro']) ?></p>
        <form id="contact-form" class="form" method="post" action="<?= e(url('/api/contact.php')) ?>" data-ajax="1">
          <div class="hp"><input type="text" name="website" tabindex="-1" autocomplete="off" /></div>
          <div class="field"><label for="name">Name</label><input id="name" name="name" required /></div>
          <div class="form-error" data-error-for="name"></div>
          <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" required /></div>
          <div class="form-error" data-error-for="email"></div>
          <div class="field"><label for="phone">Phone</label><input id="phone" name="phone" type="tel" /></div>
          <div class="field"><label for="subject">Subject</label>
            <select id="subject" name="subject">
              <option>General enquiry</option>
              <option>Security assessment</option>
              <option>Store / products</option>
            </select>
          </div>
          <div class="field"><label for="message">Message</label><textarea id="message" name="message" required></textarea></div>
          <div class="form-error" data-error-for="message"></div>
          <button type="submit" class="btn btn-primary">Send message</button>
        </form>
      </div>
    </div>
  </div>
</section>
<?php layout_end();
