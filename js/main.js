/* ============================================
   Lowkey Window Tint — Main JS v2
   No jQuery. No frameworks.
   ============================================ */

(function () {
  'use strict';

  // Mobile nav toggle
  var toggle = document.getElementById('mobile-toggle');
  var nav = document.getElementById('mobile-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    nav.querySelectorAll('.mobile-nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 70;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // Header scroll effect — transparent at top, solid on scroll
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Floating mobile CTA — slide up after brief delay
  var floatingCta = document.getElementById('floating-cta');
  if (floatingCta) {
    setTimeout(function () {
      floatingCta.classList.add('visible');
    }, 800);
  }

  // Stats count-up animation on viewport entry
  var statsRow = document.querySelector('.stats-row');
  if (statsRow && 'IntersectionObserver' in window) {
    var statNumbers = statsRow.querySelectorAll('.stat-number[data-target]');
    var statsAnimated = false;

    var statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          statNumbers.forEach(function (el) {
            var target = parseInt(el.getAttribute('data-target'), 10);
            var suffix = el.getAttribute('data-suffix') || '';
            var duration = 1200;
            var start = performance.now();

            function animate(now) {
              var elapsed = now - start;
              var progress = Math.min(elapsed / duration, 1);
              // Ease-out cubic
              var ease = 1 - Math.pow(1 - progress, 3);
              var current = Math.round(target * ease);
              el.textContent = current + suffix;
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            }
            requestAnimationFrame(animate);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsRow);
  }
})();
