
document.addEventListener('DOMContentLoaded', () => {

  document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('close-icon')) {
      await openDemoPage();
    }
  });
});

async function openDemoPage() {
  const demoContainer = document.getElementById('demoContainer');

  try {
    const response = await fetch('./Pages/Demo.html');
    if (!response.ok) throw new Error('Failed to load demo page');

    const demoHtml = await response.text();
    demoContainer.innerHTML = demoHtml;

    const modelOverlay = demoContainer.querySelector('.model-overlay');
    if (modelOverlay) modelOverlay.style.display = '';

    // Handle "Get in Touch" button
    const getInTouchBtn = demoContainer.querySelector('.btn-1');
    if (getInTouchBtn) {
      getInTouchBtn.addEventListener('click', () => {
        window.location.href = 'getinTouch.html'; // Adjust if needed
      });
    }

    // Handle close buttons
    const closeBtn = demoContainer.querySelector('.close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (modelOverlay) modelOverlay.style.display = 'none';
      });
    }

    const cancelBtn = demoContainer.querySelector('.btn-2');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        if (modelOverlay) modelOverlay.style.display = 'none';
      });
    }
  } catch (error) {
    console.error('Error loading demo page:', error);
  }
}
