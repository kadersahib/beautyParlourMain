

export function setupDemoTriggers() {
  // List of pages where demo should show
  const allowedPages = ['index.html', 'offers.html', 'combos.html', 'book-now.html', 'getInTouch.html'];

  const currentPage = window.location.pathname.split('/').pop();

  // If current page is not in the list, exit early
  if (!allowedPages.includes(currentPage)) return;

  const demoContainer = document.getElementById('demoContainer');
  if (!demoContainer) {
    console.error('demoContainer not found in DOM');
    return;
  }

  const attachEvents = () => {
    const desktopLogin = document.getElementById('desktop-login');
    const sidebarLogin = document.getElementById('sidebar-login');
    const loginBtn = document.querySelector('.login-btn');
    const nextBtn = document.getElementById('next-btn');

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

    if (loginBtn) {
      loginBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        await openDemoPage(demoContainer);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        await openDemoPage(demoContainer);
      });
    }
  };

  // Wait a bit if desktop-login isn't loaded yet
  if (!document.getElementById('desktop-login')) {
    setTimeout(attachEvents, 100);
  } else {
    attachEvents();
  }
}

async function openDemoPage(demoContainer) {
  try {
    const response = await fetch('./Pages/Demo.html');
    if (!response.ok) throw new Error('Failed to load demo page');

    const demoHtml = await response.text();
    demoContainer.innerHTML = demoHtml;
    document.body.classList.add('modal-open');

    const overlay = demoContainer.querySelector('.model-overlay');
    if (overlay) overlay.style.display = '';

    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
      sliderContainer.style.zIndex = '0';
    }

    demoContainer.querySelector('.btn-1')?.addEventListener('click', () => {
      window.location.href = 'getInTouch.html';
    });

    const closeOverlay = () => {
      if (overlay) overlay.style.display = 'none';
      
    };

    demoContainer.querySelector('.btn-2')?.addEventListener('click', closeOverlay);
    demoContainer.querySelector('.close')?.addEventListener('click', closeOverlay);

  } catch (error) {
    console.error('Error loading demo:', error);
  }
}
