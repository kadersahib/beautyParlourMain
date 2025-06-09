// otpModal.js
import { successPage } from './successModal.js';
import { otpInputColor } from '../components/otpInputColor.js';

export function otpModel() {
  const modalContainer = document.getElementById('modal-container');

  fetch('Pages/otpPage.html')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load Otp Page');
      return res.text();
    })
    .then(otpHtml => {
      modalContainer.innerHTML = otpHtml;

      const modalOverlay = modalContainer.querySelector('.model-overlay');
      if (modalOverlay) modalOverlay.style.display = '';

      const closeBtn = modalContainer.querySelector('.close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          modalContainer.innerHTML = '';
          window.location.href = "index.html";
          localStorage.removeItem('appointments'); // Clear appointments on close
          localStorage.removeItem('selectedSlot'); // Clear selected slot on close
        });
      }

      const verifyBtn = modalContainer.querySelector('#verify-btn');
      const otpInput = modalContainer.querySelectorAll('.otp-input');

      if (verifyBtn) {
        verifyBtn.addEventListener('click', () => {
          const enteredOtp = Array.from(otpInput).map(i => i.value).join('');
          const correctOtp = '1234'; // Your OTP

          if (enteredOtp === correctOtp) {
            successPage();  // Open success modal
          } else {
            alert('Invalid OTP');
          }
        });
      }
      otpInputColor();

    })
    .catch(error => {
      console.error('Error loading Otp Page', error);
    });
}
