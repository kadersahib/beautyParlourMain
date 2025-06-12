
import { loadNavbar } from './scripts/navbar.js';
import { setupBookingButtons } from './scripts/appointmentSummary.js';
import { getIntouch } from './components/getInTouch.js';
import { setupDemoTriggers } from './scripts/demoPopup.js';
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadNavbar();
    setupDemoTriggers();
    setupBookingButtons();
    getIntouch();
    


  } catch (error) {
    console.error('Error initializing page:', error);
  }
});




