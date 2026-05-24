/* ── navigation bar ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('stuck', scrollY > 28), { passive: true });

/* ── active navigation bar ── */
const allSec = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let cur = '';
  allSec.forEach(s => { if (scrollY >= s.offsetTop - 130) cur = s.id; });
  document.querySelectorAll('#navlinks a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
}, { passive: true });

/* ── hamburger menu ── */
const ham = document.getElementById('ham');
const mob = document.getElementById('mobnav');
const mclose = document.getElementById('mobclose');
ham.addEventListener('click', () => mob.classList.toggle('open'));
mclose.addEventListener('click', () => mob.classList.remove('open'));
document.querySelectorAll('.m-lnk').forEach(a => a.addEventListener('click', () => mob.classList.remove('open')));

/* ── particles ── */
const pContainer = document.getElementById('particles');
const positions = [
  [12, 18], [24, 62], [38, 35], [55, 80], [67, 22], [80, 54], [91, 38], [47, 15],
  [6, 44], [72, 72], [33, 90], [88, 12], [16, 76], [60, 48], [43, 67]
];
positions.forEach(([l, t]) => {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.cssText = `left:${l}%;top:${t}%;--d:${6 + Math.random() * 8}s;--delay:${Math.random() * 7}s;`;
  if (Math.random() > 0.5) { p.style.background = '#c084fc'; p.style.width = '1.5px'; p.style.height = '1.5px'; }
  pContainer.appendChild(p);
});

/* ── the line which is being typed ── */
const phrases = [
  'Lorem ipsum dolor, amet consectetur',
  'Lorem ipsum dolor, consectetur',
  'Lorem ipsum dolor, sit amet',
  'Lorem ipsum dolor, sit amet consectetur ✦'
];
let pi = 0, ci = 0, erasing = false;
const tel = document.getElementById('typed');
function type() {
  const cur = phrases[pi];
  tel.textContent = erasing ? cur.slice(0, ci - 1) : cur.slice(0, ci + 1);
  erasing ? ci-- : ci++;
  let delay = erasing ? 48 : 78;
  if (!erasing && ci === cur.length) { delay = 2400; erasing = true; }
  else if (erasing && ci === 0) { erasing = false; pi = (pi + 1) % phrases.length; delay = 380; }
  setTimeout(type, delay);
}
setTimeout(type, 1000);

/* ── revel of object by .rv ── */
const rvs = document.querySelectorAll('.rv');
const rvo = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vi'); rvo.unobserve(e.target); } });
}, { threshold: 0.08 });
rvs.forEach(el => rvo.observe(el));

/* ── contact section ── */
function sendMsg() {
  const n = document.getElementById('fn').value.trim();
  const e = document.getElementById('fe').value.trim();
  const s = document.getElementById('fs').value.trim();
  const m = document.getElementById('fm').value.trim();
  if (!n || !e || !m) { alert('Please fill in your name, email and message.'); return; }
  const body = `From: ${n}\nEmail: ${e}\n\n${m}`;
  window.location.href = `mailto:the.ayushsuman2006@gmail.com?subject=${encodeURIComponent(s || 'Portfolio enquiry')}&body=${encodeURIComponent(body)}`;
  const ok = document.getElementById('okmsg');
  ok.style.display = 'block';
  setTimeout(() => ok.style.display = 'none', 5000);
}
