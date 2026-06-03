<?php $c = site_config(); ?>
    </main>
    <footer class="footer">
      <div class="container">
        <div class="kvs">
          <div class="kv">
            <strong>Phone</strong>
            <a href="tel:<?= e($c['phone']) ?>"><?= e($c['phone_display']) ?></a>
          </div>
          <div class="kv">
            <strong>Email</strong>
            <a href="mailto:<?= e($c['email']) ?>"><?= e($c['email']) ?></a>
          </div>
          <div class="kv">
            <strong>Address</strong>
            <span><?= e($c['address']) ?></span>
          </div>
        </div>
        <p class="footer-note">
          &copy; <?= date('Y') ?> <?= e($c['name']) ?>. Zimbabwe.
        </p>
      </div>
    </footer>
  </body>
</html>
