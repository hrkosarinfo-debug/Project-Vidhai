// --- Kosar Infotech Website Interactive Logic ---

// 1. Live Cab Booking & Fare Calculator
function calculateTripFare() {
    const cabType = document.getElementById('cab-type').value;
    const distanceInput = document.getElementById('trip-distance');
    const distance = parseFloat(distanceInput.value);

    if (isNaN(distance) || distance <= 0) {
        alert("Please enter a valid trip distance in kilometers.");
        return;
    }

    // Rate configurations
    const rates = {
        redtaxi: { base: 50, perKm: 12, name: "RedTaxi (Local)" },
        itcabs: { base: 100, perKm: 15, name: "IT Cabs (Corporate)" },
        tripcabs: { base: 200, perKm: 18, name: "Trip Cabs (Outstation)" }
    };

    const selectedService = rates[cabType];
    const baseFare = selectedService.base;
    const distanceCost = distance * selectedService.perKm;
    const totalFare = baseFare + distanceCost;

    // Format final currency output (Indian Rupees)
    const formattedFare = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(totalFare);

    // Update UI elements
    const resultDiv = document.getElementById('calc-result');
    const amountDiv = document.getElementById('fare-amount');
    const detailsDiv = document.getElementById('fare-details');

    amountDiv.textContent = formattedFare;
    detailsDiv.innerHTML = `Calculation for <strong>${selectedService.name}</strong>:<br>
                            Base Fare: ₹${baseFare} + ₹${selectedService.perKm}/km × ${distance} km = ${formattedFare}`;

    // Reveal result with animation
    resultDiv.classList.remove('hidden');
}

// 2. Interactive Fleet Filtering
function filterFleet(category) {
    // Update active filter button state
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        // Simple check to identify which button was clicked using its onclick handler
        if (btn.getAttribute('onclick').includes(category)) {
            btn.classList.add('active');
        }
    });

    // Filter cards
    const fleetCards = document.querySelectorAll('.fleet-card');
    fleetCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
            // Adding dynamic animation trigger
            card.style.animation = 'scaleIn 0.3s ease-out';
        } else {
            card.classList.add('hidden');
        }
    });
}

// 3. Contact Form Submission simulation
function submitInquiry() {
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const phone = document.getElementById('user-phone').value;
    
    if (!name || !email || !phone) {
        alert("Please fill out all required fields.");
        return;
    }

    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('submit-success');

    // Hide form and reveal thank you message
    contactForm.classList.add('hidden');
    successMessage.classList.remove('hidden');
}

// 4. Header sticky effect on scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.style.padding = '12px 0';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.4)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = 'none';
    }
});
