/* TCMCC mobile navigation + sentence-case labels.
   Non-destructive: it changes presentation only and leaves site content/links intact. */

(function () {
  const nav = document.querySelector('nav');
  const navbar = nav && nav.querySelector('.navbar');
  if (!nav || !navbar) return;

  // Change only known interface labels. Club names and content are left alone.
  const labelMap = {
    'HOME': 'Home',
    '50TH ANNIVERSARY': '50th anniversary',
    'RIDES & EVENTS': 'Rides & events',
    'OUR CLUB': 'Our club',
    'ARCHIVES': 'Archives',
    'GALLERY': 'Gallery',
    'NEWSLETTERS': 'Newsletters',
    'JOIN US': 'Join us',
    'CONTACT': 'Contact',
    'DISCOVER THE CLUB': 'Discover the club',
    'MORE INFORMATION →': 'More information →',
    'RIDE INFORMATION →': 'Ride information →',
    'MEMBERSHIP →': 'Membership →',
    'EMAIL THE CLUB': 'Email the club',
    'READ SEPTEMBER NEWSLETTER': 'Read September newsletter',
    'JOIN THE WEDNESDAY RIDERS WHATSAPP': 'Join the Wednesday Riders WhatsApp',
    'JOIN WEDNESDAY RIDERS WHATSAPP': 'Join Wednesday Riders WhatsApp'
  };

  document.querySelectorAll('.navbar a, .button, .card a').forEach(function (el) {
    const current = el.textContent.trim().replace(/\s+/g, ' ');
    if (labelMap[current]) {
      el.textContent = labelMap[current];
    }
  });

  // Insert the mobile menu button once.
  if (!nav.querySelector('.mobile-menu-toggle')) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'mobile-menu-toggle';
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'tcmcc-main-menu');
    button.innerHTML = '<span class="menu-icon" aria-hidden="true">☰</span><span>Menu</span>';

    navbar.id = navbar.id || 'tcmcc-main-menu';
    navbar.parentNode.insertBefore(button, navbar);

    function closeMenu() {
      nav.classList.remove('mobile-open');
      button.setAttribute('aria-expanded', 'false');
      button.querySelector('span:last-child').textContent = 'Menu';
    }

    button.addEventListener('click', function () {
      const opening = !nav.classList.contains('mobile-open');
      nav.classList.toggle('mobile-open', opening);
      button.setAttribute('aria-expanded', opening ? 'true' : 'false');
      button.querySelector('span:last-child').textContent = opening ? 'Close menu' : 'Menu';
    });

    navbar.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 760) closeMenu();
    });
  }
})();