
import { OpenBookFormModal } from './bookFormModal.js';
import { calendarData } from '../components/calender.js';
import { setupSummaryModal } from './appointmentSummary.js'; 

export function openBookAppointmentModal() {
  const modalContainer = document.getElementById('modal-container');

  fetch('Pages/bookAppointment.html')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load bookAppointment page');
      return res.text();
    })
    .then(appHtml => {
      modalContainer.innerHTML = appHtml;
      const modalOverlay = modalContainer.querySelector('.modal-overlay');
      if (modalOverlay) modalOverlay.style.display = '';

      const closeBtn = modalContainer.querySelector('.close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          openContinueExitModal();
        });
      }

      const editImage = modalContainer.querySelector('.edit-image');
      if (editImage) {
        editImage.addEventListener('click', () => {
          const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

          fetch('Pages/AppointmentSummary.html')
            .then(response => {
              if (!response.ok) throw new Error('Failed to load AppointmentSummary');
              return response.text();
            })
            .then(html => {
              modalContainer.innerHTML = html;

              const modalOverlay = modalContainer.querySelector('.modal-overlay');
              if (modalOverlay) modalOverlay.style.display = '';

              const navbar = document.getElementById("navbar-container");
              if (navbar) navbar.style.display = "none";
              document.body.classList.add("modal-open");

              // ✅ Reuse logic to set up summary
              setupSummaryModal(modalContainer, appointments);
            })
            .catch(error => {
              console.error('Error loading AppointmentSummary:', error);
            });
        });
      }

      const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
      let totalMinutes = 0;
      let validityTexts = new Set();

      appointments.forEach(({ validity }) => {
        if (validity.startsWith('Validity:')) {
          const text = validity.split('Validity:')[1].trim();
          validityTexts.add(text);
        } else {
          const hourMatch = validity.match(/(\d+)\s*hr/);
          const minMatch = validity.match(/(\d+)\s*min/);
          const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
          const mins = minMatch ? parseInt(minMatch[1], 10) : 0;
          if (hours || mins) {
            totalMinutes += (hours * 60) + mins;
          } else if (validity && validity.trim()) {
            validityTexts.add(validity.trim());
          }
        }
      });

      const totalServices = appointments.length;
      const hoursPart = Math.floor(totalMinutes / 60);
      const minutesPart = totalMinutes % 60;

      let timeDisplay = '';
      if (totalMinutes > 0) {
        timeDisplay = `${hoursPart ? `${hoursPart} hr` : ''}${hoursPart && minutesPart ? ' ' : ''}${minutesPart ? `${minutesPart} min` : ''}`;
      }

      const comboOffer = localStorage.getItem('validity') || '';
      let validityDisplayText = [...validityTexts].join(' | ');
      if (timeDisplay) validityDisplayText += validityDisplayText ? ` | ${timeDisplay}` : timeDisplay;
      if (comboOffer) validityDisplayText += validityDisplayText ? ` | ${comboOffer}` : comboOffer;

      const serviceTimeElement = modalContainer.querySelector(".service-time");
      if (serviceTimeElement) {
        serviceTimeElement.innerHTML = `
          <span>${totalServices} service${totalServices !== 1 ? 's' : ''}</span>
          <span>${validityDisplayText}</span>
        `;
      }

      const slotButtons = modalContainer.querySelectorAll('.slot-btn');
      slotButtons.forEach(button => {
        button.addEventListener('click', () => {
          slotButtons.forEach(btn => btn.classList.remove('selected'));
          button.classList.add('selected');
        });
      });

      const nextBtn = modalContainer.querySelector('#next-btn');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          const selectedSlot = modalContainer.querySelector('.slot-btn.selected');
          const selectedDate = modalContainer.querySelector('#selected-date-label')?.textContent.trim() || '01 May 2025';

          if (selectedSlot && selectedDate) {
            const selectedSlotTime = selectedSlot.textContent.trim();
            localStorage.setItem('selectedSlot', JSON.stringify({ date: selectedDate, time: selectedSlotTime }));
            OpenBookFormModal();
          } else {
            alert('Please select a slot before continuing.');
          }
        });
      } else {
        console.warn('Next button not found in bookAppointment modal');
      }
      calendarData();
    })
    .catch(err => {
      console.error('Error loading booking page:', err);
    });
}

function openContinueExitModal() {
  const modalContainer = document.getElementById('modal-container');

  fetch('Pages/exit.html')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load confirmExit page');
      return res.text();
    })
    .then(confirmHtml => {
      modalContainer.innerHTML = confirmHtml;

      const modalOverlay = modalContainer.querySelector('.modal-overlay');
      if (modalOverlay) modalOverlay.style.display = '';

      const exitBtn = modalContainer.querySelector('#exit-btn');
      const continueBtn = modalContainer.querySelector('#continue-btn');
      const closeBtn = modalContainer.querySelector('.close');

      exitBtn?.addEventListener('click', () => {
        window.location.href = 'index.html';
        localStorage.removeItem('appointments');
      });

      continueBtn?.addEventListener('click', () => {
        openBookAppointmentModal();
      });

      closeBtn?.addEventListener('click', () => {
        modalContainer.innerHTML = '';
        window.location.href = 'index.html';
      });
    })
    .catch(err => {
      console.error('Error loading confirmExit page:', err);
    });
}
