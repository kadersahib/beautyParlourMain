
  // Load OTP modal
  function otpModel() {
    const modalContainer = document.getElementById('modal-container');

    fetch('Pages//signUpOtp.html')
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

        otpPageScript();
      })
      .catch(error => {
        console.error('Error loading OTP Page:', error);
      });
  }

  // Load script and apply styling for OTP inputs
  function otpPageScript() {
    if (!document.querySelector('script[src="./js/components/otpPage.js"]')) {
      const script = document.createElement('script');
      script.src = './js/components/otpPage.js';
      script.onload = () => {
        if (typeof otpInputColor === "function") {
          otpInputColor();
        } else {
          console.warn('otpInputColor not found after script load.');
        }
      };
      document.body.appendChild(script);
    } else {
      if (typeof otpInputColor === "function") {
        otpInputColor();
      } else {
        console.warn('otpInputColor not found (script already present).');
      }
    }
  }

  // Load success page
  function successPage() {
    const modalContainer = document.getElementById('modal-container');

    fetch('Pages/accCreateSuccess.html')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load success page');
        return res.text();
      })
      .then(successHtml => {
        modalContainer.innerHTML = successHtml;

      // Add listener after content is loaded
      const okButton = modalContainer.querySelector('.ok-btn');
      if (okButton) {
        okButton.addEventListener('click', () => {
          console.log('button is click')
          window.location.href = 'login.html'; // Redirect to login page
        });
      }
      })
      .catch(error => {
        console.error('Error loading success page:', error);
      });
  }

  // Validate fields and launch OTP modal on sign up
  document.querySelector('.signup-btn').addEventListener('click', () => {
    const inputs = document.querySelectorAll('#data-input, #phone');
    let allFilled = true;

    inputs.forEach(input => {
      if (!input.value.trim()) allFilled = false;
    });

    if (!allFilled) {
      alert("Please fill in all required fields.");
      return;
    }

    otpModel();
  });

