// ── YEAR
document.getElementById('year').textContent = new Date().getFullYear();

// ── CURSOR
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animCursor() {
  rx += (mx - rx) * .15; ry += (my - ry) * .15;
  cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
  ring.style.transform   = `translate(${rx - 18}px, ${ry - 18}px)`;
  requestAnimationFrame(animCursor);
})();
document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.transform += ' scale(1.8)'; ring.style.width = '52px'; ring.style.height = '52px'; ring.style.marginLeft = '-8px'; ring.style.marginTop = '-8px'; });
  el.addEventListener('mouseleave', () => { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.marginLeft = '0'; ring.style.marginTop = '0'; });
});

// ── TYPING EFFECT
const phrases = [
  'Construyo apps web modernas.',
  'Apasionado por el código limpio.',
  'Full Stack Developer.',
  'Siempre aprendiendo algo nuevo.'
];
let pi = 0, ci = 0, deleting = false;
const el = document.getElementById('typed-text');
function type() {
  const word = phrases[pi];
  if (!deleting) {
    el.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(type, 1600); return; }
  } else {
    el.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 45 : 80);
}
setTimeout(type, 1000);

// ── SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(r => obs.observe(r));

// ── NAV ACTIVE
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  const y = window.scrollY + 120;
  document.querySelectorAll('section').forEach(s => {
    if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + s.id ? 'var(--green)' : '';
      });
    }
  });
});
