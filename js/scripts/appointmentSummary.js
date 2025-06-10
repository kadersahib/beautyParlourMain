import { openBookAppointmentModal } from './bookAppointment.js';

export  function setupBookingButtons() {
  const buttons = document.querySelectorAll(
    '.combo-card .book-now-btn, .card .book-now-btn, .services-card .book-now-btn'
  );
  const modalContainer = document.getElementById('modal-container');

  buttons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      event.preventDefault();

      const { title, price, validity } = extractServiceDetails(button);
      if (!title) return;

      const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      appointments.push({ title, price, validity });
      localStorage.setItem('appointments', JSON.stringify(appointments));

      try {
        const res = await fetch('Pages/AppointmentSummary.html');
        const html = await res.text();
        modalContainer.innerHTML = html;

        // document.getElementById('navbar-container').style.display = 'none';
        document.body.classList.add('modal-open');

        setupSummaryModal(modalContainer, appointments);
      } catch (error) {
        console.error('Error loading AppointmentSummary:', error);
      }
    });
  });
}

function extractServiceDetails(button) {
  const comboCard = button.closest('.combo-card');
  const card = button.closest('.card');
  const servicesCard = button.closest('.services-card');

  let title = '', price = '', validity = '';

  if (comboCard) {
    title = comboCard.querySelector('h2')?.textContent.trim() || '';
    price = comboCard.querySelector('.price')?.textContent.trim() || '';
    validity = comboCard.querySelector('.validity')?.textContent.trim() || '';
  } else if (card) {
    title = card.querySelector('h2')?.textContent.trim() || '';
    price = card.querySelector('#price')?.textContent.trim() || '';
    validity = card.querySelector('#hour')?.textContent.trim() || '';
  } else if (servicesCard) {
    title = servicesCard.querySelector('h2')?.textContent.trim() || '';
    price = servicesCard.querySelector('.price')?.textContent.trim() || '';
    validity = servicesCard.querySelector('.hour')?.textContent.trim() || '';
  }

  return { title, price, validity };
}

function setupSummaryModal(container, appointments) {
  const modalOverlay = container.querySelector('.modal-overlay');
  modalOverlay.style.display = '';

   // Hide hamburger icon behind modal
  const hamburger = document.getElementById('hamburger'); // Adjust if using a class
  if (hamburger) hamburger.style.zIndex = '0';
  
  const closeBtn = container.querySelector('.close');
  closeBtn?.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
    container.innerHTML = '';
    // document.getElementById('navbar-container').style.display = '';
    document.body.classList.remove('modal-open');
    localStorage.removeItem('appointments');
  });

  const bookAppointmentBtn = container.querySelector('#book-appointment-btn');
  const addServiceBtn = container.querySelector('#add-service-btn');

  bookAppointmentBtn?.addEventListener('click', openBookAppointmentModal);
  addServiceBtn?.addEventListener('click', () => window.location.href = 'book-now.html');

  const serviceListContainer = container.querySelector('#selected-services-list');
  serviceListContainer.innerHTML = '';
  appointments.forEach((appointment, index) => {
    const serviceDiv = document.createElement('div');
    serviceDiv.classList.add('service');
    serviceDiv.innerHTML = `
      <div>
        <p>${appointment.title}</p>
        <p id="hour">${appointment.validity}</p>
      </div>
      <div class="price-delete">
        <p>${appointment.price}</p>
        <span class="delete-icon" data-index="${index}">
          <img src="./public/icons/delete-icon.svg" alt="delete">
        </span>
      </div>
    `;
    serviceDiv.querySelector('.delete-icon').addEventListener('click', () => {
      appointments.splice(index, 1);
      localStorage.setItem('appointments', JSON.stringify(appointments));
      serviceDiv.remove();
    });

    serviceListContainer.appendChild(serviceDiv);
  });
}
