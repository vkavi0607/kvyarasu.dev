const prog = document.getElementById('prog');
const nav = document.getElementById('nav');
const contactForm = document.getElementById('contact-form');
const tlItems = document.querySelectorAll('.tl-item');

window.addEventListener('scroll', () => {
  const s = window.scrollY;
  const t = document.documentElement.scrollHeight - window.innerHeight;
  prog.style.width = (s / t * 100) + '%';
  nav.classList.toggle('sc', s > 20);
}, {passive: true});

document.getElementById('ham').addEventListener('click', () => nav.classList.toggle('mo'));
nav.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => nav.classList.remove('mo')));

if (contactForm) {
  contactForm.addEventListener('submit', handleForm);
}

if (tlItems.length) {
  tlItems.forEach(item => item.addEventListener('click', () => toggleTl(item)));
}

const rv = document.querySelectorAll('.rv');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      obs.unobserve(e.target);
    }
  });
}, {threshold: 0.1});

rv.forEach(el => obs.observe(el));

function toggleTl(el) {
  const wasOpen = el.classList.contains('open');
  document.querySelectorAll('.tl-item').forEach(t => t.classList.remove('open'));
  if (!wasOpen) el.classList.add('open');
}

function handleForm(e) {
  e.preventDefault();
  const name = document.getElementById('cname').value.trim();
  const email = document.getElementById('cemail').value.trim();
  const message = document.getElementById('cmsg').value.trim();
  const phone = '918883094601';
  const text = `Hello Kaviyarasu,%0A%0AMy name is ${encodeURIComponent(name)}.%0AEmail: ${encodeURIComponent(email)}.%0A%0A${encodeURIComponent(message)}`;
  const url = `https://wa.me/${phone}?text=${text}`;
  window.open(url, '_blank');

  const btn = document.getElementById('fbtn');
  btn.textContent = 'Opening WhatsApp...';
  btn.style.background = '#10B981';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3000);
}

