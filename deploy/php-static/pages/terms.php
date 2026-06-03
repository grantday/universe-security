<?php
$currentPage = 'terms';
layout_start('Terms of Use', 'Terms governing use of the Universe Security website.', $currentPage);
?>
<section class="section">
  <div class="container-page prose reveal">
    <h1 class="display-title" style="font-size:2.25rem;margin:0">Terms of Use</h1>
    <p class="eyebrow">Last updated: <?= date('Y') ?></p>
    <p>By using this website, you agree to these terms. If you do not agree, please discontinue use of the site.</p>
    <h2>No guarantee of response times online</h2>
    <p>Website forms are not a substitute for emergency services. For immediate danger, contact local emergency authorities and use our 24/7 voice hotline.</p>
    <h2>Service engagements</h2>
    <p>Security services are provided under separate written agreements. Nothing on this site amends an executed contract unless expressly stated.</p>
    <h2>Limitation of liability</h2>
    <p>To the extent permitted by law, we are not liable for indirect or consequential damages arising from use of this website.</p>
    <h2>Contact</h2>
    <p><a href="mailto:<?= e($site['email']) ?>"><?= e($site['email']) ?></a></p>
  </div>
</section>
<?php layout_end();
