
import { otpInputColor } from "./components/otpInputColor.js";
import { countryData } from "./components/countryData.js";


document.addEventListener('DOMContentLoaded', () => {
  const signupBtn = document.querySelector('.signup-btn');
  const modalContainer = document.getElementById('modal-container');

  if (!signupBtn || !modalContainer) {
    console.error('Required elements not found in the DOM.');
    return;
  }
    // ✅ Initialize country dropdown logic
  countryData();  // defaults to document

  // Validate fields and launch OTP modal on sign up
  signupBtn.addEventListener('click', () => {
    const inputs = document.querySelectorAll('#data-input, #phone');
    let allFilled = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        allFilled = false;
        input.classList.add('input-error'); // Optional: Add visual feedback
      } else {
        input.classList.remove('input-error');
      }
    });

    if (allFilled) {
      otpModel();
    } else {
      alert('Please fill in all required fields.');
    }
  });
});

function otpModel() {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return console.error('modal-container not found');

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
        });
      }

      const verifyBtn = modalContainer.querySelector('#verify-btn');
      const otpInputs = modalContainer.querySelectorAll('.otp-input');

      if (verifyBtn) {
        verifyBtn.addEventListener('click', () => {
          const enteredOtp = Array.from(otpInputs).map(i => i.value).join('');
          const correctOtp = '1234';

          if (enteredOtp === correctOtp) {
            successPage();
          } else {
            alert('Invalid OTP');
          }
        });
      }

      otpInputColor();
    })
    .catch(error => {
      console.error('Error loading OTP Page:', error);
    });
}

function successPage() {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return console.error('modal-container not found');

  fetch('Pages/accCreateSuccess.html')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load success page');
      return res.text();
    })
    .then(successHtml => {
      modalContainer.innerHTML = successHtml;

      const okButton = modalContainer.querySelector('.ok-btn');
      if (okButton) {
        okButton.addEventListener('click', () => {
          console.log('button is click');
          window.location.href = 'login.html'; // Redirect to login page
        });
      }
    })
    .catch(error => {
      console.error('Error loading success page:', error);
    });
}
