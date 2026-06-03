<?php
$currentPage = 'home';
$home = $content['home'] ?? [];
$slides = $content['heroSlides'] ?? [];
layout_start($site['name'], $site['description'], $currentPage, true);
?>
<section class="hero-slider" id="hero-slider" aria-label="Hero">
  <?php foreach ($slides as $i => $slide): ?>
  <div class="hero-slide <?= $i === 0 ? 'is-active' : '' ?>" style="background-image:url('<?= e(placeholder($slide['seed'] ?? $slide['id'], $slide['title'])) ?>')">
    <div class="hero-slide-inner container-page">
      <p class="eyebrow"><?= e($slide['eyebrow']) ?></p>
      <h1><?= e($slide['title']) ?></h1>
      <p class="lead"><?= e($slide['body']) ?></p>
      <div class="mt-4" style="display:flex;gap:.75rem;flex-wrap:wrap">
        <a class="btn btn-primary" href="<?= e(url($slide['ctaPrimary']['href'] ?? '/contact')) ?>"><?= e($slide['ctaPrimary']['label'] ?? 'Contact') ?></a>
        <?php if (!empty($slide['ctaSecondary'])): ?>
        <a class="btn btn-secondary" href="<?= e(str_starts_with($slide['ctaSecondary']['href'], 'tel:') ? $slide['ctaSecondary']['href'] : url($slide['ctaSecondary']['href'])) ?>"><?= e($slide['ctaSecondary']['label']) ?></a>
        <?php endif; ?>
      </div>
    </div>
  </div>
  <?php endforeach; ?>
  <?php if (count($slides) > 1): ?>
  <div class="container-page" style="position:relative;z-index:2;margin-top:-3rem;padding-bottom:1rem">
    <div class="hero-dots" aria-label="Slide navigation">
      <?php foreach ($slides as $j => $_): ?>
      <button type="button" class="<?= $j === 0 ? 'is-active' : '' ?>" aria-label="Slide <?= $j + 1 ?>"></button>
      <?php endforeach; ?>
    </div>
  </div>
  <?php endif; ?>
</section>

<section class="section-tight">
  <div class="container-page trust-strip">
    <?php foreach ($home['trustBadges'] ?? [] as $badge): ?>
    <span class="trust-badge"><?= icon_svg($badge['icon']) ?> <?= e($badge['label']) ?></span>
    <?php endforeach; ?>
  </div>
</section>

<section class="section reveal">
  <div class="container-page">
    <h2 class="section-title"><?= e($home['coreServices']['heading'] ?? 'Core security services') ?></h2>
    <p class="section-intro"><?= e($home['coreServices']['intro'] ?? '') ?></p>
    <div class="grid-3">
      <?php foreach ($content['services'] ?? [] as $svc): ?>
      <article class="card">
        <div class="card-media"><img src="<?= e(placeholder($svc['theme'] ?? 'svc', $svc['title'])) ?>" alt="" loading="lazy" /></div>
        <h3><?= e($svc['title']) ?></h3>
        <p><?= e($svc['description']) ?></p>
        <ul style="margin:.75rem 0 0;padding-left:1.1rem;font-size:.8125rem;color:var(--ink-muted)">
          <?php foreach ($svc['items'] ?? [] as $item): ?><li><?= e($item) ?></li><?php endforeach; ?>
        </ul>
      </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="section reveal" style="background:var(--surface)">
  <div class="container-page">
    <h2 class="section-title"><?= e($home['controlCentrePreview']['heading'] ?? '') ?></h2>
    <p class="section-intro"><?= e($home['controlCentrePreview']['intro'] ?? '') ?></p>
    <div class="grid-2">
      <div class="card-media" style="aspect-ratio:16/10;border-radius:1rem;overflow:hidden">
        <img src="<?= e(placeholder('control-room', 'Control Centre')) ?>" alt="" loading="lazy" />
      </div>
      <div>
        <div class="flow-steps">
          <?php foreach (($extras['controlCentreSteps'] ?? []) as $step): ?>
          <div class="flow-step">
            <div class="icon-wrap"><?= icon_svg($step['icon']) ?></div>
            <strong><?= e($step['title']) ?></strong>
            <p style="font-size:.75rem;margin:.35rem 0 0;color:var(--ink-muted)"><?= e($step['body']) ?></p>
          </div>
          <?php endforeach; ?>
        </div>
        <a class="btn btn-primary mt-4" href="<?= e(url($home['controlCentrePreview']['ctaHref'] ?? '/control-centre')) ?>"><?= e($home['controlCentrePreview']['ctaLabel'] ?? 'Explore') ?></a>
      </div>
    </div>
  </div>
</section>

<section class="section reveal">
  <div class="container-page">
    <h2 class="section-title"><?= e($home['whyChoose']['heading'] ?? '') ?></h2>
    <p class="section-intro"><?= e($home['whyChoose']['intro'] ?? '') ?></p>
    <div class="grid-3">
      <?php foreach ($home['whyChoose']['pillars'] ?? [] as $p): ?>
      <div class="card">
        <div class="icon-wrap" style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:var(--brand-50);border-radius:.65rem;color:var(--brand-700);margin-bottom:.5rem"><?= icon_svg($p['icon']) ?></div>
        <h3><?= e($p['title']) ?></h3>
        <p><?= e($p['body']) ?></p>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="section reveal" style="background:var(--surface)">
  <div class="container-page text-center">
    <h2 class="section-title"><?= e($home['kpisSection']['heading'] ?? 'Response metrics') ?></h2>
    <p class="section-intro mx-auto"><?= e($home['kpisSection']['intro'] ?? '') ?></p>
    <div class="kpi-grid">
      <?php foreach ($content['kpis'] ?? [] as $kpi): ?>
      <div class="kpi">
        <div class="kpi-value"><?= e($kpi['value']) ?><?= e($kpi['suffix'] ?? '') ?></div>
        <div class="kpi-label"><?= e($kpi['label']) ?></div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<?php if (!empty($extras['clientLogos'])): ?>
<section class="section-tight reveal">
  <div class="container-page logo-marquee">
    <?php foreach ($extras['clientLogos'] as $name): ?>
    <span class="logo-pill"><?= e($name) ?></span>
    <?php endforeach; ?>
  </div>
</section>
<?php endif; ?>

<section class="section reveal">
  <div class="container-page">
    <h2 class="section-title"><?= e($home['testimonialsSection']['heading'] ?? '') ?></h2>
    <p class="section-intro"><?= e($home['testimonialsSection']['intro'] ?? '') ?></p>
    <div class="grid-3">
      <?php foreach ($content['testimonials'] ?? [] as $t): ?>
      <blockquote class="testimonial">
        <q><?= e($t['quote']) ?></q>
        <cite><?= e($t['author']) ?> — <?= e($t['org']) ?></cite>
      </blockquote>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<?php
$insightItems = array_slice(Content::insights(), 0, 3);
if ($insightItems):
?>
<section class="section reveal" style="background:var(--surface)">
  <div class="container-page">
    <h2 class="section-title">Insights</h2>
    <div class="grid-3">
      <?php foreach ($insightItems as $post): ?>
      <a class="insight-card" href="<?= e(url('/insights/' . $post['slug'])) ?>">
        <div class="card">
          <h3><?= e($post['title']) ?></h3>
          <p><?= e($post['description']) ?></p>
          <p class="insight-meta"><?= e(format_date($post['publishedAt'])) ?></p>
        </div>
      </a>
      <?php endforeach; ?>
    </div>
    <p class="text-center mt-4"><a class="btn btn-secondary" href="<?= e(url('/insights')) ?>">All insights</a></p>
  </div>
</section>
<?php endif; ?>

<section class="section reveal">
  <div class="container-page">
    <div class="cta-band">
      <h2><?= e($home['contactCta']['heading'] ?? '') ?></h2>
      <p><?= e($home['contactCta']['intro'] ?? '') ?></p>
      <div style="display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap">
        <a class="btn btn-primary" href="<?= e(url($home['contactCta']['primaryCta']['href'] ?? '/contact')) ?>"><?= e($home['contactCta']['primaryCta']['label'] ?? 'Contact') ?></a>
        <a class="btn btn-secondary" href="<?= e(url($home['contactCta']['secondaryCta']['href'] ?? '/control-centre')) ?>"><?= e($home['contactCta']['secondaryCta']['label'] ?? 'Control Centre') ?></a>
      </div>
    </div>
  </div>
</section>

<?php compliance_strip(); layout_end();
