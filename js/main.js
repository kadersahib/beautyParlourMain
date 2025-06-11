
import { loadNavbar } from './scripts/navbar.js';
import { setupBookingButtons } from './scripts/appointmentSummary.js';
import { getIntouch } from './components/getInTouch.js';
import { setupLoginTriggers } from './scripts/demopagelogin.js';
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadNavbar();
    setupLoginTriggers();
    setupBookingButtons();
    getIntouch();

    

  } catch (error) {
    console.error('Error initializing page:', error);
  }
});




