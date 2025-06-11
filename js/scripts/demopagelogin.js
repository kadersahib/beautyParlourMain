
export function setupLoginTriggers() {
  // List of pages where demo should show
  const allowedPages = ['index.html', 'offers.html', 'combos.html', 'book-now.html' ,'getInTouch.html'];

  const currentPage = window.location.pathname.split('/').pop();

  // If current page is not in the list, exit early
  if (!allowedPages.includes(currentPage)) return;

  const demoContainer = document.getElementById('demoContainer');

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

    const overlay = demoContainer.querySelector('.model-overlay');
    if (overlay) overlay.style.display = '';

    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
      sliderContainer.style.zIndex = '0';
    }

    demoContainer.querySelector('.btn-1')?.addEventListener('click', () => {
      window.location.href = 'getInTouch.html';
    });

    demoContainer.querySelector('.btn-2')?.addEventListener('click', () => {
      if (overlay) overlay.style.display = 'none';
      setTimeout(() => {
        location.reload();
      }, 300); 
    });

    demoContainer.querySelector('.close')?.addEventListener('click', () => {
      if (overlay) overlay.style.display = 'none';
      setTimeout(() => {
        location.reload();
      }, 300); 
    });
  } catch (error) {
    console.error('Error loading demo:', error);
  }
}
