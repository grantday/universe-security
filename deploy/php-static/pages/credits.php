<?php
$currentPage = 'credits';
layout_start('Image credits', 'Stock photography sources used on this site.', $currentPage);
?>
<section class="section">
  <div class="container-page prose reveal">
    <h1 class="display-title" style="font-size:2.25rem;margin:0">Image credits</h1>
    <p>Marketing photos use branded placeholder imagery. Replace with your own photography when approved assets are available.</p>
    <div class="card">
      <p><strong>Pexels</strong> — <a href="https://www.pexels.com/" target="_blank" rel="noopener">https://www.pexels.com/</a></p>
      <p style="font-size:.875rem;color:var(--ink-muted)">Free licence; attribution appreciated but not required.</p>
    </div>
    <p class="mt-4"><a href="<?= e(url('/')) ?>">← Back to home</a></p>
  </div>
</section>
<?php layout_end();
