
export async function openDemoPage(demoContainer) {
  try {
    const response = await fetch('./Pages/Demo.html');
    if (!response.ok) throw new Error('Failed to load demo page');

    const demoHtml = await response.text();
    demoContainer.innerHTML = demoHtml;

    const overlay = demoContainer.querySelector('.model-overlay');
    if (overlay) overlay.style.display = '';

    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
      sliderContainer.style.zIndex = '0';
    }

    const hamburgerIcon = document.querySelector('.hamburger');
    if (window.innerWidth <= 1023 && hamburgerIcon) {
      hamburgerIcon.style.zIndex = '0';
    }

    demoContainer.querySelector('.btn-1')?.addEventListener('click', () => {
      window.location.href = 'getInTouch.html';
      localStorage.removeItem('appointments');
      localStorage.removeItem('selectedSlot');
    });

    const closeOverlay = () => {
      if (overlay) overlay.style.display = 'none';
      localStorage.removeItem('appointments');
      localStorage.removeItem('selectedSlot');
      setTimeout(() => location.reload(), 300);
    };

    demoContainer.querySelector('.btn-2')?.addEventListener('click', closeOverlay);
    demoContainer.querySelector('.close')?.addEventListener('click', closeOverlay);

  } catch (error) {
    console.error('Error loading demo:', error);
  }
}

// Attach listeners only to static elements
export function setupDemoTriggers() {
  const allowedPages = ['index.html', 'offers.html', 'combos.html', 'book-now.html', 'getInTouch.html'];
  const currentPage = window.location.pathname.split('/').pop();
  if (!allowedPages.includes(currentPage)) return;

  const demoContainer = document.getElementById('demoContainer');
  if (!demoContainer) {
    console.error('demoContainer not found in DOM');
    return;
  }

  const attachEvents = () => {
    const desktopLogin = document.getElementById('desktop-login');
    const sidebarLogin = document.getElementById('sidebar-login');

    if (desktopLogin) {
      desktopLogin.addEventListener('click', async (e) => {
        e.preventDefault();
        await openDemoPage(demoContainer);
      });
    }

    if (sidebarLogin) {
      sidebarLogin.addEventListener('click', async (e) => {
        e.preventDefault();
        await openDemoPage(demoContainer);
      });
    }
  };

  // Retry attaching events after delay if desktop-login is not yet rendered
  if (!document.getElementById('desktop-login')) {
    setTimeout(attachEvents, 100);
  } else {
    attachEvents();
  }
}
