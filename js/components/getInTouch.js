
import { countryData } from "./countryData.js";

export async function getIntouch() {
  try {
    const res = await fetch('Pages/getInTouch.html');
    const html = await res.text();
    const container = document.getElementById('getInTouch');
    if (container) {
      container.innerHTML = html;

    // Wait one tick to ensure DOM is updated

    setTimeout(() => {
        countryData();
      
        const form = container.querySelector('form');
        const submitBtn = container.querySelector('.submit');
      
        // if (submitBtn && form) {
        //   submitBtn.addEventListener('click', (e) => {
        //     e.preventDefault();
      
        //     const requiredInputs = form.querySelectorAll('input[required]');
        //     let allValid = true;
      
        //     requiredInputs.forEach(input => {
        //       if (!input.value.trim()) {
        //         input.classList.add('input-error');
        //         allValid = false;
        //       } else {
        //         input.classList.remove('input-error');
        //       }
        //     });
      
        //     if (allValid) {
        //       // window.location.href = 'index.html'; // ✅ Redirect if valid
        //     } else {
        //       alert('Please fill in all required fields.');
        //     }
        //   });
        // }
      }, 0);
      
    } else {
      console.warn('getInTouch container not found');
    }
  } catch (error) {
    console.error('Error loading getInTouch page:', error);
  }
}

  