// successModal.js

export function successPage() {
    const modalContainer = document.getElementById('modal-container');
  
    fetch('Pages/successFull.html')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load Success Page');
        return res.text();
      })
      .then(successHtml => {
        modalContainer.innerHTML = successHtml;
  
        const modalOverlay = modalContainer.querySelector('.model-overlay');
        if (modalOverlay) modalOverlay.style.display = '';
  
        const okBtn = modalContainer.querySelector('#okBtn');
        if (okBtn) {
          okBtn.addEventListener('click', () => {
            localStorage.removeItem('appointments');
            localStorage.removeItem('selectedSlot');
            window.location.href = 'index.html';
          });
        }
  
        // Inject dynamic booking info into success modal
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        const slot = JSON.parse(localStorage.getItem('selectedSlot')) || { date: '', time: '' };
  
        const serviceListContainer = modalContainer.querySelector('.content-scroll');
        if (serviceListContainer) {
          serviceListContainer.innerHTML = '';
          if (appointments.length === 0) {
            serviceListContainer.innerHTML = `<p>No booking data available.</p>`;
          } else {
            appointments.forEach(appointment => {
              const item = document.createElement('div');
              item.classList.add('item');
              item.innerHTML = `
                <div class="service-time-details">
                  <h4>${appointment.title}</h4>
                  <p>${slot.date} at ${slot.time}</p>
                  <p>${appointment.validity}</p>
                </div>
                <div class="price">${appointment.price}</div>
              `;
              serviceListContainer.appendChild(item);
            });
          }
        } else {
          console.warn('service-confirmation-list container not found in success page');
        }
      })
      .catch(error => {
        console.error('Error loading Success Page', error);
      });
  }
  