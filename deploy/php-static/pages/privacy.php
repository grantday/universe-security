<?php
$currentPage = 'privacy';
layout_start('Privacy Policy', 'How Universe Security handles personal data.', $currentPage);
?>
<section class="section">
  <div class="container-page prose reveal">
    <h1 class="display-title" style="font-size:2.25rem;margin:0">Privacy Policy</h1>
    <p class="eyebrow">Last updated: <?= date('Y') ?></p>
    <p><?= e($site['name']) ?> (“we”, “us”) respects your privacy. This policy describes how we process information you provide through our website forms.</p>
    <h2>Information we collect</h2>
    <p>When you submit a contact or assessment enquiry, we collect the details you provide (name, phone, email, service interest, and message).</p>
    <h2>How we use information</h2>
    <p>We use this information to respond to enquiries, coordinate security services, and operate our control centre workflows. We do not sell your personal data.</p>
    <h2>Retention</h2>
    <p>We retain enquiry records only as long as needed for operations, legal obligations, and legitimate business purposes.</p>
    <h2>Contact</h2>
    <p>Questions: <a href="mailto:<?= e($site['email']) ?>"><?= e($site['email']) ?></a></p>
  </div>
</section>
<?php layout_end();
