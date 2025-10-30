const form = document.getElementById('newsletterForm');
        const emailInput = document.getElementById('email');
        const errorMessage = document.getElementById('errorMessage');
        const newsletterCard = document.getElementById('newsletterCard');
        const successCard = document.getElementById('successCard');
        const confirmedEmail = document.getElementById('confirmedEmail');
        const dismissBtn = document.getElementById('dismissBtn');

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function showError() {
            emailInput.classList.add('error');
            errorMessage.textContent = "Valid email required";
            errorMessage.style.display = 'block';
        }

        function hideError() {
            emailInput.classList.remove('error');
            errorMessage.style.display = 'none';
        }

        let inputTimer;

        emailInput.addEventListener('input', function(e) {
            const email = emailInput.value.trim();

            // Clear any existing timer
            clearTimeout(inputTimer);

            // If there's an error state and user is typing, hide it immediately
            if (emailInput.classList.contains('error')) {
                hideError();
            }

            // Only show error for non-empty invalid emails after a delay
            if(email.length > 0 && !validateEmail(email)) {
                inputTimer = setTimeout(() => {
                    if(!validateEmail(emailInput.value.trim())) {
                        showError();
                    }
                }, 1000);
            }
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            // Check if email is empty or invalid
            if (!email || !validateEmail(email)) {
                showError();
                // Make sure we stay on the newsletter card
                newsletterCard.style.display = 'grid';
                successCard.style.display = 'none';
                successCard.classList.remove('active');
                return;
            }

            // Valid email - show success
            hideError();
            confirmedEmail.textContent = email;
            newsletterCard.style.display = 'none';
            successCard.style.display = 'flex';
            successCard.classList.add('active');
        });

        dismissBtn.addEventListener('click', function() {
            successCard.classList.remove('active');
            successCard.style.display = 'none';
            newsletterCard.style.display = 'grid';
            emailInput.value = '';
            hideError();
        });