
// import { otpModel } from './otpModal.js';
import { countryData } from '../components/countryData.js';
import { setupDemoTriggers } from './demoPopup.js';


export function OpenBookFormModal() {
  const modalContainer = document.getElementById('modal-container');

  fetch('Pages/book-form.html')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load book-form page');
      return res.text();
    })
    .then( formHtml => {

    modalContainer.innerHTML = formHtml;
    
    const modalOverlay = modalContainer.querySelector('.modal-overlay');
    if (modalOverlay) modalOverlay.style.display = '';

      const closeBtn = modalContainer.querySelector('.close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          if (modalOverlay) modalOverlay.style.display = 'none';
          modalContainer.innerHTML = '';
          const navbar = document.getElementById("navbar-container");
          if (navbar) navbar.style.display = "";
          document.body.classList.remove("modal-open");
          localStorage.removeItem('appointments'); // Clear appointments on close
          localStorage.removeItem('selectedSlot'); // Clear selected slot on close
        });
      }

      // const nextBtn = modalContainer.querySelector('#next-btn');
      // if (nextBtn) {
      //   nextBtn.addEventListener('click', () => {
      //     const form = modalContainer.querySelector('#bookingForm');
      //     if (form) {
      //       if (form.checkValidity()) {
      //         otpModel();  // Open OTP modal on valid form
      //       } else {
      //         form.reportValidity();
      //       }
      //     } else {
      //       console.warn('Form not found in modal');
      //     }
      //   });
      // }

        // ✅ Show demo page on clicking Next button
      const nextBtn = modalContainer.querySelector('#next-btn');
      if (nextBtn) {
        nextBtn.addEventListener('click', async () => {
          const demoContainer = document.getElementById('demoContainer');
          if (demoContainer) await setupDemoTriggers(demoContainer);
        });
      }

        // ✅ Show demo page on clicking Login button
      const loginBtn = modalContainer.querySelector('.login-btn');
      if (loginBtn) {
        loginBtn.addEventListener('click', async () => {
          const demoContainer = document.getElementById('demoContainer');
          if (demoContainer) await setupDemoTriggers(demoContainer);
        });
      }

      // Render dynamic booking info (appointments, slot)
      const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
      const slot = JSON.parse(localStorage.getItem('selectedSlot')) || { date: '', time: '' };

      const serviceList = modalContainer.querySelector('.service-list');
      if (serviceList) {
        serviceList.innerHTML = '';
        if (appointments.length === 0) {
          serviceList.innerHTML = `<p>No services selected.</p>`;
        } else {
          appointments.forEach(appointment => {
            const serviceItem = document.createElement('div');
            serviceItem.classList.add('service-item');
            serviceItem.innerHTML = `
              <div class="service-info">
                <h3>${appointment.title}</h3>
                <p class="service-time">${slot.date} at ${slot.time}</p>
                <p class="service-price">${appointment.price}</p>
                <p class="service-duration">${appointment.validity}</p>
              </div>
            `;
            serviceList.appendChild(serviceItem);
          });
        }
      }
   
        const modalContent = modalContainer.querySelector('.input-with-icons'); // Or whatever wraps the form
        countryData(modalContent); // Target specific DOM


        
    })
    .catch(err => console.error('Error loading book-form page:', err));
}

