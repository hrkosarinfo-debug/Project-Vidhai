// --- KIPL Cabs Interactive Logic & Booking Engine ---

let autocompletePickup, autocompleteDropoff;

// 1. Initialize Google Maps Autocomplete (focused on Tamil Nadu & Kerala)
function initGoogleMaps() {
    if (typeof google === 'undefined' || !google.maps || !google.maps.places) {
        console.warn("Google Maps SDK not loaded. Operating in manual distance mode.");
        // Make distance field editable so the user can test manually
        const distanceInput = document.getElementById('trip-distance');
        if (distanceInput) {
            distanceInput.removeAttribute('readonly');
            distanceInput.placeholder = "Enter distance manually in km";
        }
        return;
    }

    // Coordinates bounding Coimbatore/Tamil Nadu & Kerala regions
    const southWest = new google.maps.LatLng(8.0, 74.5);
    const northEast = new google.maps.LatLng(14.0, 80.5);
    const regionalBounds = new google.maps.LatLngBounds(southWest, northEast);

    const autocompleteOptions = {
        bounds: regionalBounds,
        componentRestrictions: { country: 'in' },
        fields: ['address_components', 'geometry', 'formatted_address'],
        strictBounds: false // Biases search results to TN/Kerala, but allows rest of India
    };

    const pickupInput = document.getElementById('pickup-location');
    const dropoffInput = document.getElementById('dropoff-location');

    if (pickupInput && dropoffInput) {
        autocompletePickup = new google.maps.places.Autocomplete(pickupInput, autocompleteOptions);
        autocompleteDropoff = new google.maps.places.Autocomplete(dropoffInput, autocompleteOptions);

        // Listen for selection changes to trigger auto-distance calculation
        autocompletePickup.addListener('place_changed', calculateRouteDistance);
        autocompleteDropoff.addListener('place_changed', calculateRouteDistance);
    }
}

// 2. Calculate Driving Distance via Google Maps API
function calculateRouteDistance() {
    const pickupVal = document.getElementById('pickup-location').value;
    const dropoffVal = document.getElementById('dropoff-location').value;

    if (!pickupVal || !dropoffVal) return;

    if (typeof google === 'undefined' || !google.maps || !google.maps.DistanceMatrixService) {
        return;
    }

    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [pickupVal],
        destinations: [dropoffVal],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    }, (response, status) => {
        if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
            const distanceValue = response.rows[0].elements[0].distance.value / 1000; // Meters to Kilometers
            const distanceInput = document.getElementById('trip-distance');
            if (distanceInput) {
                distanceInput.value = distanceValue.toFixed(1);
            }
        } else {
            console.error("Distance Matrix calculation failed:", status);
        }
    });
}

// 3. Handle Booking Submission & Backend API Call
async function calculateTripFare() {
    const cabType = document.getElementById('cab-type').value;
    const name = document.getElementById('booking-name').value;
    const phone = document.getElementById('booking-phone').value;
    const pickup = document.getElementById('pickup-location').value;
    const dropoff = document.getElementById('dropoff-location').value;
    const distanceInput = document.getElementById('trip-distance');
    const distance = parseFloat(distanceInput.value);

    if (isNaN(distance) || distance <= 0) {
        alert("Please select pickup/drop-off locations to calculate distance.");
        return;
    }

    // Base client-side rates (for immediate UI response)
    const rates = {
        redtaxi: { base: 50, perKm: 12, name: "RedTaxi (City Cabs)" },
        itcabs: { base: 100, perKm: 15, name: "IT Cabs (Corporate)" },
        tripcabs: { base: 200, perKm: 18, name: "Trip Cabs (Outstation)" }
    };

    const selectedService = rates[cabType];
    const totalFare = selectedService.base + (distance * selectedService.perKm);

    // Format local currency
    const formattedFare = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(totalFare);

    // Reveal UI results card
    const resultDiv = document.getElementById('calc-result');
    const amountDiv = document.getElementById('fare-amount');
    const detailsDiv = document.getElementById('fare-details');
    const statusMsg = document.getElementById('booking-status-msg');

    amountDiv.textContent = formattedFare;
    detailsDiv.innerHTML = `Route: <strong>${pickup}</strong> to <strong>${dropoff}</strong> (${distance} km)<br>
                            Service: <strong>${selectedService.name}</strong>`;
    
    statusMsg.style.color = "var(--primary)";
    statusMsg.textContent = "Sending booking request to KIPL Operations Desk...";
    resultDiv.classList.remove('hidden');

    // Backend Integration Payload
    const payload = {
        name: name,
        phone: phone,
        pickup_location: pickup,
        dropoff_location: dropoff,
        distance: distance,
        cab_type: cabType
    };

    try {
        // Submit request to local/production FastAPI server
        const response = await fetch('http://localhost:8000/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const data = await response.json();
            statusMsg.style.color = "var(--success)";
            statusMsg.innerHTML = `✓ Booking Confirmed! Order ID: #${data.id}<br>Our dispatcher will contact you on ${phone} shortly.`;
        } else {
            throw new Error("Server error");
        }
    } catch (error) {
        console.warn("Backend server not running. Running in standalone local mode.", error);
        // Standalone demonstration success (since hosted static pages don't run API servers natively)
        setTimeout(() => {
            statusMsg.style.color = "var(--success)";
            statusMsg.innerHTML = `✓ Request Received (Demo Mode)<br>To store live bookings, start the Python FastAPI backend in the /backend folder!`;
        }, 1500);
    }
}

// 4. Interactive Fleet Filtering
function filterFleet(category) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(category)) {
            btn.classList.add('active');
        }
    });

    const fleetCards = document.querySelectorAll('.fleet-card');
    fleetCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
            card.style.animation = 'scaleIn 0.3s ease-out';
        } else {
            card.classList.add('hidden');
        }
    });
}

// 5. Contact / Inquiry Form
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

    contactForm.classList.add('hidden');
    successMessage.classList.remove('hidden');
}

// 6. Header Sticky Scroll Animation
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.style.padding = '12px 0';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.05)';
    } else {
        header.style.padding = '16px 0';
        header.style.boxShadow = 'none';
    }
});

// Run Google Maps Initialization when API is loaded
window.addEventListener('load', () => {
    initGoogleMaps();
});
