
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');

    
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

    
    function validateName() {
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        const nameFeedback = document.getElementById('nameFeedback');

        if (!nameRegex.test(nameInput.value)) {
            nameInput.classList.add('invalid');
            nameInput.classList.remove('valid');
            nameError.textContent = 'Name must be at least 3 alphabetic characters.';
            nameFeedback.innerHTML = '&#10007;';
            return false;
        } else {
            nameInput.classList.remove('invalid');
            nameInput.classList.add('valid');
            nameError.textContent = '';
            nameFeedback.innerHTML = '&#10004;';
            return true;
        }
    }

    function validateEmail() {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailFeedback = document.getElementById('emailFeedback');

        if (!emailRegex.test(emailInput.value)) {
            emailInput.classList.add('invalid');
            emailInput.classList.remove('valid');
            emailError.textContent = 'Please enter a valid email address.';
            emailFeedback.innerHTML = '&#10007;';
            return false;
        } else {
            emailInput.classList.remove('invalid');
            emailInput.classList.add('valid');
            emailError.textContent = '';
            emailFeedback.innerHTML = '&#10004;';
            return true;
        }
    }

    function validatePassword() {
        const passwordInput = document.getElementById('password');
        const passwordError = document.getElementById('passwordError');
        const passwordFeedback = document.getElementById('passwordFeedback');

        if (!passwordRegex.test(passwordInput.value)) {
            passwordInput.classList.add('invalid');
            passwordInput.classList.remove('valid');
            passwordError.textContent = 'Password must be at least 8 characters long and contain both letters and numbers.';
            passwordFeedback.innerHTML = '&#10007;';
            return false;
        } else {
            passwordInput.classList.remove('invalid');
            passwordInput.classList.add('valid');
            passwordError.textContent = '';
            passwordFeedback.innerHTML = '&#10004;';
            return true;
        }
    }

    function validateConfirmPassword() {
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        const confirmPasswordFeedback = document.getElementById('confirmPasswordFeedback');

        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordInput.classList.add('invalid');
            confirmPasswordInput.classList.remove('valid');
            confirmPasswordError.textContent = 'Passwords do not match.';
            confirmPasswordFeedback.innerHTML = '&#10007;';
            return false;
        } else {
            confirmPasswordInput.classList.remove('invalid');
            confirmPasswordInput.classList.add('valid');
            confirmPasswordError.textContent = '';
            confirmPasswordFeedback.innerHTML = '&#10004;';
            return true;
        }
    }

    function validateDateOfBirth() {
        const dobInput = document.getElementById('dob');
        const dobError = document.getElementById('dobError');
        const dobFeedback = document.getElementById('dobFeedback');
        const dobValue = new Date(dobInput.value);
        const today = new Date();
        const age = today.getFullYear() - dobValue.getFullYear();
        const monthDiff = today.getMonth() - dobValue.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobValue.getDate())) {
            age--;
        }

        if (age < 18) {
            dobInput.classList.add('invalid');
            dobInput.classList.remove('valid');
            dobError.textContent = 'You must be at least 18 years old.';
            dobFeedback.innerHTML = '&#10007;';
            submitBtn.disabled = true;
            return false;
        } else {
            dobInput.classList.remove('invalid');
            dobInput.classList.add('valid');
            dobError.textContent = '';
            dobFeedback.innerHTML = '&#10004;';
            submitBtn.disabled = false;
            return true;
        }
    }

    // Attach event listeners for real-time feedback
    document.getElementById('name').addEventListener('input', validateName);
    document.getElementById('email').addEventListener('input', validateEmail);
    document.getElementById('password').addEventListener('input', validatePassword);
    document.getElementById('confirmPassword').addEventListener('input', validateConfirmPassword);
    document.getElementById('dob').addEventListener('input', validateDateOfBirth);

    // Form submission handler
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isDobValid = validateDateOfBirth();

        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isDobValid) {
            alert('Registration successful!');
            form.reset();
            submitBtn.disabled = true;
        } else {
            alert('Please correct the errors in the form.');
        }
    });
});