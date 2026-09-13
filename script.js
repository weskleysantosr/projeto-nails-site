const accessGate = document.getElementById('accessGate');
const siteShell = document.getElementById('siteShell');
const accessForm = document.getElementById('accessForm');
const passwordInput = document.getElementById('passwordInput');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const yearEl = document.getElementById('year');

const ACCESS_KEY = 'nail_lab_access';
const PASSWORD = 'nail2026';

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

function unlockSite() {
  accessGate.classList.add('hidden');
  siteShell.style.display = 'block';
  localStorage.setItem(ACCESS_KEY, 'granted');
}

function validateAccess() {
  const granted = localStorage.getItem(ACCESS_KEY) === 'granted';
  if (granted) {
    unlockSite();
    return;
  }

  siteShell.style.display = 'none';
  accessGate.classList.remove('hidden');
}

if (accessForm) {
  accessForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const password = passwordInput.value.trim();

    if (password === PASSWORD) {
      unlockSite();
      passwordInput.value = '';
    } else {
      passwordInput.value = '';
      passwordInput.placeholder = 'Senha incorreta';
      passwordInput.style.borderColor = '#ff5ea8';
      passwordInput.focus();
    }
  });
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

validateAccess();
