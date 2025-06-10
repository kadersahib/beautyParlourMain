
import { loadNavbar } from './scripts/navbar.js';
import { setupBookingButtons } from './scripts/appointmentSummary.js';
import { getIntouch } from './components/getInTouch.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadNavbar();
    setupBookingButtons();
    getIntouch();
  } catch (error) {
    console.error('Error initializing page:', error);
  }
});




