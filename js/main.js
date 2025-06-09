import { loadNavbar } from './scripts/navbar.js';
import { setupBookingButtons } from './scripts/appointmentSummary.js';
import { getIntouch } from './components/getInTouch.js';
document.addEventListener('DOMContentLoaded', () => {
  loadNavbar().then(() => {
    setupBookingButtons();
    getIntouch();

  });
});



