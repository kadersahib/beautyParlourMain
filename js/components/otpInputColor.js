
 export function otpInputColor(){
    const otpInputs = document.querySelectorAll('.otp-input');

    otpInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.classList.add('active');
            } else {
                input.classList.remove('active');
            }
        });

        input.addEventListener('focus', () => {
            if (input.value.trim() === '') {
                input.classList.remove('active');
            }
        });
    });
}   

otpInputColor()