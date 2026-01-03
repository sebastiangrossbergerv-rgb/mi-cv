// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Copy template content to clipboard
document.querySelectorAll('.template-card').forEach(function(card) {
  const btn = card.querySelector('.btn-copy');
  const textarea = card.querySelector('textarea.template');
  const status = card.querySelector('.copy-status');

  btn.addEventListener('click', function() {
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    
    try {
      const ok = document.execCommand('copy');
      if (ok) {
        status.textContent = 'Copied to clipboard ✔';
        status.style.color = '#22c55e';
      } else {
        status.textContent = 'Could not copy automatically.';
        status.style.color = '#fbbf24';
      }
    } catch (e) {
      status.textContent = 'Copy not supported, please select and copy manually.';
      status.style.color = '#fbbf24';
    }
    
    setTimeout(function() {
      status.textContent = '';
    }, 2500);
  });
});