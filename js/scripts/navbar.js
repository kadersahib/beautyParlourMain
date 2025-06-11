export async function loadNavbar() {
    try {
      const res = await fetch('../Pages/navbar.html');
      const html = await res.text();
      document.getElementById('navbar-container').innerHTML = html;
  
      highlightActiveLink();
      setupHamburgerMenu();
  
    } catch (error) {
      console.error('Error loading navbar:', error);
    }
  }
  
  function highlightActiveLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-item-text');
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });
  }
  
  function setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navItems = document.getElementById('nav-items');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
  
    const blurOverlay = document.createElement('div');
    blurOverlay.className = 'blur-overlay hide';
    document.body.appendChild(blurOverlay);
  
    function openMenu() {
      navItems.classList.add('active');
      menuIcon.style.display = 'none';
      closeIcon.style.display = 'block';
      blurOverlay.classList.remove('hide');
    }
  
    function closeMenu() {
      navItems.classList.remove('active');
      menuIcon.style.display = 'block';
      closeIcon.style.display = 'none';
      blurOverlay.classList.add('hide');
    }
  
    hamburger?.addEventListener('click', () => {
      navItems.classList.contains('active') ? closeMenu() : openMenu();
    });
  
    navItems?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  
    blurOverlay.addEventListener('click', closeMenu);
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1023) closeMenu();
    });
  }
  