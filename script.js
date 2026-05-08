// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Copy template content to clipboard
document.querySelectorAll('.template-card').forEach(function (card) {
  const btn = card.querySelector('.btn-copy');
  const textarea = card.querySelector('textarea.template');
  const status = card.querySelector('.copy-status');

  btn.addEventListener('click', function () {
    const text = textarea.value;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () {
        status.textContent = 'Copied to clipboard ✔';
        status.style.color = '#22c55e';
      }).catch(function () {
        fallbackCopy(textarea, status);
      });
    } else {
      fallbackCopy(textarea, status);
    }

    setTimeout(function () {
      status.textContent = '';
    }, 2500);
  });
});

function fallbackCopy(textarea, status) {
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);
  try {
    const ok = document.execCommand('copy');
    status.textContent = ok ? 'Copied to clipboard ✔' : 'Could not copy automatically.';
    status.style.color = ok ? '#22c55e' : '#fbbf24';
  } catch (e) {
    status.textContent = 'Please select and copy manually.';
    status.style.color = '#fbbf24';
  }
}

// Active nav link on scroll
(function () {
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sectionIds = Array.from(navLinks).map(a => a.getAttribute('href').slice(1));
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();

// Scroll-to-top button
(function () {
  const btn = document.getElementById('scrollTop');

  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
