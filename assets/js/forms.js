/**
 * ZORRO HOLIDAYS - Form Processing, Validation & Persistence Engine
 * Supports Netlify Forms in production + LocalStorage persistence for immediate reliability.
 */

(function() {
  'use strict';

  // Persistence Keys
  const STORAGE_KEY_BOOKINGS = 'zorro_taxi_bookings';
  const STORAGE_KEY_TRIPS = 'zorro_trip_enquiries';
  const STORAGE_KEY_CONTACTS = 'zorro_contact_messages';
  const STORAGE_KEY_TICKETS = 'zorro_ticket_enquiries';
  const STORAGE_KEY_VISAS = 'zorro_visa_enquiries';
  const STORAGE_KEY_FOREX = 'zorro_forex_enquiries';

  /**
   * Generates a unique branded reference number
   */
  function generateReference(prefix) {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    return `ZH-${prefix}-${randomDigits}`;
  }

  /**
   * Validates Indian / International phone numbers (10 digits, +91, etc.)
   */
  function isValidPhone(phone) {
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    const phoneRegex = /^(\+91|91|0)?[6-9]\d{9}$/;
    return phoneRegex.test(cleanPhone);
  }

  /**
   * Sets minimum date for date inputs to today and defaults to tomorrow
   */
  function initDatePickers() {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    document.querySelectorAll('input[type="date"]').forEach(input => {
      input.min = todayStr;
      if (!input.value) {
        input.value = tomorrowStr;
      }
    });

    document.querySelectorAll('input[type="time"]').forEach(input => {
      if (!input.value) {
        input.value = '09:00';
      }
    });
  }

  /**
   * Sets up trip type tabs toggling return date visibility
   */
  function initTripTypeSelectors() {
    const tripTypeContainers = document.querySelectorAll('.trip-type-selector');
    tripTypeContainers.forEach(container => {
      const form = container.closest('form');
      const tripTypeInput = form.querySelector('input[name="tripType"]') || form.querySelector('#tripType');
      const returnDateGroup = form.querySelector('.return-date-group');
      const buttons = container.querySelectorAll('.trip-type-btn');

      buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          buttons.forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          const selectedType = this.dataset.tripType;

          if (tripTypeInput) {
            tripTypeInput.value = selectedType;
          }

          if (returnDateGroup) {
            if (selectedType === 'Round Trip') {
              returnDateGroup.style.display = 'flex';
              const returnInput = returnDateGroup.querySelector('input');
              if (returnInput) returnInput.required = true;
            } else {
              returnDateGroup.style.display = 'none';
              const returnInput = returnDateGroup.querySelector('input');
              if (returnInput) returnInput.required = false;
            }
          }
        });
      });
    });
  }

  /**
   * Handles Taxi Booking Form Submission
   */
  /**
   * Handles Taxi Booking Form Submission via event delegation
   * Intercepts both static forms (index.html) and dynamic modal forms (call-taxi.html, etc.)
   */
  function handleTaxiBookingSubmit(e) {
    const form = e.target.closest('.taxi-booking-form');
    if (!form) return;
    e.preventDefault();

    // Remove previous validation errors
    form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

    // Collect fields
    const nameInput = form.querySelector('[name="customerName"]');
    const phoneInput = form.querySelector('[name="mobileNumber"]');
    const pickupInput = form.querySelector('[name="pickupLocation"]');
    const dropInput = form.querySelector('[name="dropLocation"]');
    const dateInput = form.querySelector('[name="travelDate"]');
    const timeInput = form.querySelector('[name="pickupTime"]');
    const passengersInput = form.querySelector('[name="passengers"]');
    const tripTypeInput = form.querySelector('[name="tripType"]') || { value: 'Local' };
    const returnDateInput = form.querySelector('[name="returnDate"]');
    const instructionsInput = form.querySelector('[name="instructions"]');
    const submitBtn = form.querySelector('button[type="submit"]');

    let hasError = false;

    // Validation: Name
    if (!nameInput || !nameInput.value.trim() || nameInput.value.trim().length < 2) {
      if (nameInput) nameInput.classList.add('is-invalid');
      hasError = true;
    }

    // Validation: Phone
    if (!phoneInput || !phoneInput.value.trim() || !isValidPhone(phoneInput.value.trim())) {
      if (phoneInput) phoneInput.classList.add('is-invalid');
      hasError = true;
    }

    // Validation: Pickup
    if (!pickupInput || !pickupInput.value.trim()) {
      if (pickupInput) pickupInput.classList.add('is-invalid');
      hasError = true;
    }

    // Validation: Drop
    if (!dropInput || !dropInput.value.trim()) {
      if (dropInput) dropInput.classList.add('is-invalid');
      hasError = true;
    }

    // Validation: Date
    if (!dateInput || !dateInput.value) {
      if (dateInput) dateInput.classList.add('is-invalid');
      hasError = true;
    } else {
      const selectedDate = new Date(dateInput.value);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (selectedDate < today) {
        dateInput.classList.add('is-invalid');
        hasError = true;
      }
    }

    // Validation: Time (Default to 09:00 if empty)
    if (timeInput && !timeInput.value) {
      timeInput.value = '09:00';
    }

    // Validation: Round Trip Return Date
    if (tripTypeInput.value === 'Round Trip' && returnDateInput) {
      if (!returnDateInput.value) {
        returnDateInput.classList.add('is-invalid');
        hasError = true;
      } else if (dateInput && new Date(returnDateInput.value) < new Date(dateInput.value)) {
        returnDateInput.classList.add('is-invalid');
        hasError = true;
      }
    }

    if (hasError) {
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Submit state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg style="animation: spin 1s linear infinite; width:18px; height:18px; margin-right:8px; display:inline-block;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      Recording Your Request...
    `;

    const refNumber = generateReference('TX');
    const bookingData = {
      ref: refNumber,
      type: 'Taxi Booking',
      status: 'Pending Confirmation',
      customerName: nameInput.value.trim(),
      mobileNumber: phoneInput.value.trim(),
      pickupLocation: pickupInput.value.trim(),
      dropLocation: dropInput.value.trim(),
      travelDate: dateInput.value,
      pickupTime: timeInput ? timeInput.value : '09:00',
      passengers: passengersInput ? passengersInput.value : 'Sedan (Swift / Etios)',
      tripType: tripTypeInput.value || 'Local',
      returnDate: returnDateInput ? returnDateInput.value : '',
      instructions: instructionsInput ? instructionsInput.value.trim() : '',
      submittedAt: new Date().toISOString()
    };

    try {
      // Send background Netlify form asynchronously without blocking the user
      if (window.location.hostname !== 'localhost' && window.location.protocol !== 'file:') {
        const formData = new FormData(form);
        formData.append('referenceNumber', refNumber);
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
        }).catch(() => {});
      }

      // Persist in local storage
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_BOOKINGS) || '[]');
      existing.unshift(bookingData);
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(existing));

      // Generate complete WhatsApp URL
      const whatsappMessage = window.ZORRO_CONFIG.messages.taxiBookingDetail(
        bookingData.ref,
        bookingData.customerName,
        bookingData.mobileNumber,
        bookingData.pickupLocation,
        bookingData.dropLocation,
        bookingData.travelDate,
        bookingData.pickupTime,
        bookingData.tripType,
        bookingData.passengers,
        bookingData.returnDate
      );
      const whatsappLink = window.ZORRO_CONFIG.getWhatsAppUrl(whatsappMessage);

      // Reset button & form
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      form.reset();
      const firstTab = form.querySelector('.trip-type-btn');
      if (firstTab) firstTab.click();

      // Close header taxi modal if open
      const headerTaxiModal = document.getElementById('header-taxi-modal');
      if (headerTaxiModal) {
        headerTaxiModal.classList.remove('active');
        document.body.style.overflow = '';
      }

      // Show confirmation modal with booking details and WhatsApp send options
      showTaxiConfirmationModal(bookingData, whatsappLink);

      // Directly launch WhatsApp:
      // Mobile: window.location.href directly launches native WhatsApp app
      // Desktop: window.open launches WhatsApp Web
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = whatsappLink;
      } else {
        const newWin = window.open(whatsappLink, '_blank');
        if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
          // If popup blocked on desktop, fallback to location href
          window.location.href = whatsappLink;
        }
      }

    } catch (err) {
      console.error('Submission error:', err);
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      alert('There was a temporary issue submitting your request. Please call G.Naveen Kumar directly at +91 95003 60969 or send a WhatsApp message.');
    }
  }

  function initTaxiBookingForms() {
    document.removeEventListener('submit', handleTaxiBookingSubmit);
    document.addEventListener('submit', handleTaxiBookingSubmit);
  }

  /**
   * Displays the Post-Submission Taxi Confirmation & Holiday Promotion Modal
   */
  function showTaxiConfirmationModal(data, whatsappLink) {
    let modal = document.getElementById('taxi-confirmation-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'taxi-confirmation-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    if (!whatsappLink) {
      const whatsappMessage = window.ZORRO_CONFIG.messages.taxiBookingDetail(
        data.ref,
        data.customerName,
        data.mobileNumber,
        data.pickupLocation,
        data.dropLocation,
        data.travelDate,
        data.pickupTime,
        data.tripType,
        data.passengers,
        data.returnDate
      );
      whatsappLink = window.ZORRO_CONFIG.getWhatsAppUrl(whatsappMessage);
    }

    modal.innerHTML = `
      <div class="modal-content" style="max-width: 680px;">
        <button class="modal-close-btn" id="close-confirm-modal" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="confirmation-box">
          <div class="confirm-icon-wrap">
            <svg viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>

          <h2 style="font-size: 1.8rem; margin-bottom: 8px; color: var(--deep-wine);">Booking Request Prepared</h2>
          <div class="confirm-ref-badge">Booking Reference: ${data.ref}</div>
          
          <p style="font-size: 0.95rem; color: var(--body-text); margin-bottom: 14px;">
            Thank you, <strong>${data.customerName}</strong>. Your trip details from <strong>${data.pickupLocation}</strong> to <strong>${data.dropLocation}</strong> on <strong>${data.travelDate} at ${data.pickupTime}</strong> have been prepared.
          </p>

          <div class="confirm-pending-notice" style="background:#F0FDF4; border:1px solid #BBF7D0; color:#166534; padding:14px; border-radius:var(--radius-sm); margin-bottom:20px; text-align:left; font-size:0.92rem; line-height:1.5;">
            <strong style="display:inline-flex; align-items:center; gap:6px;"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.2.662.589 1.221.771 1.394.858.173.086.274.072.375-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/></svg><span>Sending via WhatsApp:</span></strong><br>
            WhatsApp is opening to send your booking request directly to <strong>G.Naveen Kumar (+91 95003 60969)</strong>. Your booking will be confirmed by Zorro Holidays after verifying driver and vehicle availability.
          </div>

          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 24px;">
            <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="padding:12px 24px; font-weight:700; font-size:1rem;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.2.662.589 1.221.771 1.394.858.173.086.274.072.375-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/></svg>
              Send on WhatsApp Now
            </a>
            <a href="tel:+919500360969" class="btn btn-call" style="padding:12px 20px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              Call: +91 95003 60969
            </a>
            <a href="tel:+919087287965" class="btn btn-outline" style="padding:10px 16px; font-size:0.86rem;">
              Call Ajay: 90872 87965
            </a>
          </div>

          <!-- HOLIDAY PROMOTION -->
          <div class="holiday-promo-box">
            <h3 class="holiday-promo-title">✨ Your Next Adventure Awaits!</h3>
            <p style="font-size: 0.88rem; color: var(--body-text); margin-bottom: 12px;">
              While we prepare your taxi confirmation, explore our handpicked holiday packages from Coimbatore:
            </p>
            <div class="holiday-promo-links">
              <a href="domestic-tours.html" class="promo-link-card">
                🏔️ Domestic Tours<br><small style="color:var(--muted-text);">Ooty, Munnar & Hills</small>
              </a>
              <a href="international-tours.html" class="promo-link-card">
                ✈️ International Holidays<br><small style="color:var(--muted-text);">Singapore, Bali, Malaysia</small>
              </a>
              <a href="plan-trip.html" class="promo-link-card">
                🗺️ Custom Trip Planning<br><small style="color:var(--muted-text);">Tailored Itineraries</small>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Close button
    modal.querySelector('#close-confirm-modal').addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /**
   * Plan Your Trip Custom Enquiry Form Handler
   */
  function initPlanTripForm() {
    const tripForm = document.getElementById('custom-trip-form');
    if (!tripForm) return;

    tripForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      tripForm.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

      const nameInput = tripForm.querySelector('[name="customerName"]');
      const phoneInput = tripForm.querySelector('[name="mobileNumber"]');
      const destinationInput = tripForm.querySelector('[name="destination"]');
      const travelTypeInput = tripForm.querySelector('input[name="tourType"]:checked');
      const departureDate = tripForm.querySelector('[name="departureDate"]');
      const returnDate = tripForm.querySelector('[name="returnDate"]');
      const adultsInput = tripForm.querySelector('[name="adults"]');
      const childrenInput = tripForm.querySelector('[name="children"]');
      const budgetInput = tripForm.querySelector('[name="budget"]');
      const foodPrefInput = tripForm.querySelector('[name="foodPreference"]');
      const hotelPrefInput = tripForm.querySelector('[name="hotelPreference"]');
      const requestsInput = tripForm.querySelector('[name="specialRequests"]');
      const submitBtn = tripForm.querySelector('button[type="submit"]');

      let hasError = false;

      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        nameInput.classList.add('is-invalid');
        hasError = true;
      }

      if (!phoneInput.value.trim() || !isValidPhone(phoneInput.value.trim())) {
        phoneInput.classList.add('is-invalid');
        hasError = true;
      }

      if (!destinationInput.value.trim()) {
        destinationInput.classList.add('is-invalid');
        hasError = true;
      }

      if (!departureDate.value) {
        departureDate.classList.add('is-invalid');
        hasError = true;
      }

      if (hasError) {
        const first = tripForm.querySelector('.is-invalid');
        if (first) first.focus();
        return;
      }

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Custom Trip Request...';

      const ref = generateReference('TRIP');
      const tripData = {
        ref: ref,
        type: 'Custom Trip Enquiry',
        status: 'Inquiry Received',
        customerName: nameInput.value.trim(),
        mobileNumber: phoneInput.value.trim(),
        tourType: travelTypeInput ? travelTypeInput.value : 'Domestic',
        destination: destinationInput.value.trim(),
        departureDate: departureDate.value,
        returnDate: returnDate ? returnDate.value : '',
        adults: adultsInput ? adultsInput.value : '2',
        children: childrenInput ? childrenInput.value : '0',
        budget: budgetInput ? budgetInput.value : '',
        foodPreference: foodPrefInput ? foodPrefInput.value : 'All Meals Included',
        hotelPreference: hotelPrefInput ? hotelPrefInput.value : '3-4 Star',
        specialRequests: requestsInput ? requestsInput.value.trim() : '',
        submittedAt: new Date().toISOString()
      };

      try {
        // Save to localStorage
        const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_TRIPS) || '[]');
        existing.unshift(tripData);
        localStorage.setItem(STORAGE_KEY_TRIPS, JSON.stringify(existing));

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        tripForm.reset();

        showTripConfirmationModal(tripData);
      } catch (err) {
        console.error('Trip form error:', err);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        alert('There was an issue submitting your trip enquiry. Please call G.Naveen Kumar directly at +91 95003 60969 or send a WhatsApp message.');
      }
    });
  }

  function showTripConfirmationModal(data) {
    let modal = document.getElementById('trip-confirmation-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'trip-confirmation-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    const whatsappMessage = `Hello Naveen, I submitted custom trip enquiry [Ref: ${data.ref}]. Name: ${data.customerName}, Destination: ${data.destination} (${data.tourType}), Departure: ${data.departureDate}, Guests: ${data.adults} Adults, ${data.children} Children. Please share a personalized itinerary & quote.`;
    const whatsappLink = window.ZORRO_CONFIG.getWhatsAppUrl(whatsappMessage);

    modal.innerHTML = `
      <div class="modal-content" style="max-width: 640px;">
        <button class="modal-close-btn" id="close-trip-modal" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="confirmation-box">
          <div class="confirm-icon-wrap" style="background:#EBF5FB; color:#2980B9;">
            <svg viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2zm0-10h2v8h-2z"/>
            </svg>
          </div>

          <h2 style="font-size: 1.8rem; margin-bottom: 8px; color: var(--deep-wine);">Trip Enquiry Received!</h2>
          <div class="confirm-ref-badge">Enquiry Reference: ${data.ref}</div>
          
          <p style="font-size: 0.95rem; color: var(--body-text); margin-bottom: 16px;">
            Thank you, <strong>${data.customerName}</strong>. G.Naveen Kumar and our tour team will prepare your <strong>${data.destination}</strong> tour plan for your travel date on <strong>${data.departureDate}</strong>.
          </p>

          <p style="font-size: 0.88rem; color: var(--muted-text); margin-bottom: 24px;">
            We will contact you directly on <strong>${data.mobileNumber}</strong> with tailored hotel and transport options.
          </p>

          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
              Chat on WhatsApp
            </a>
            <a href="tel:+919500360969" class="btn btn-call">
              Call: +91 95003 60969
            </a>
            <a href="tel:+919087287965" class="btn btn-outline" style="padding:10px 16px; font-size:0.86rem;">
              Call Ajay: 90872 87965
            </a>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    modal.querySelector('#close-trip-modal').addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /**
   * Contact Us General Enquiry Form Handler
   */
  function initContactForm() {
    const contactForm = document.getElementById('general-contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      contactForm.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

      const nameInput = contactForm.querySelector('[name="name"]');
      const phoneInput = contactForm.querySelector('[name="phone"]');
      const subjectInput = contactForm.querySelector('[name="subject"]');
      const messageInput = contactForm.querySelector('[name="message"]');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      let hasError = false;

      if (!nameInput.value.trim()) {
        nameInput.classList.add('is-invalid');
        hasError = true;
      }
      if (!phoneInput.value.trim() || !isValidPhone(phoneInput.value.trim())) {
        phoneInput.classList.add('is-invalid');
        hasError = true;
      }
      if (!messageInput.value.trim()) {
        messageInput.classList.add('is-invalid');
        hasError = true;
      }

      if (hasError) return;

      const ref = generateReference('CNT');
      const contactData = {
        ref: ref,
        type: 'Contact Inquiry',
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        subject: subjectInput ? subjectInput.value : 'General Inquiry',
        message: messageInput.value.trim(),
        submittedAt: new Date().toISOString()
      };

      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_CONTACTS) || '[]');
      existing.unshift(contactData);
      localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(existing));

      contactForm.reset();
      alert(`Thank you, ${contactData.name}! Your enquiry has been received (Ref: ${ref}). G.Naveen Kumar will connect with you on ${contactData.phone}.`);
    });
  }

  /**
   * Ticket Booking Form Handler (Flight / Train / Bus)
   */
  function initTicketBookingTabs() {
    const tabBtns = document.querySelectorAll('.transport-tab-btn');
    const tabPanes = document.querySelectorAll('.ticket-tab-pane');
    const transportInput = document.getElementById('ticket-transport-type');

    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const transport = this.dataset.transport;
        tabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');

        if (transportInput) {
          transportInput.value = transport;
        }

        tabPanes.forEach(pane => {
          pane.classList.remove('active');
        });
        const targetPane = document.getElementById(`pane-${transport.toLowerCase()}`);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });

    // Flight One-Way / Round-Trip toggle
    const flightTypeBtns = document.querySelectorAll('.flight-type-btn');
    const flightTripTypeVal = document.getElementById('flight-trip-type-val');
    const flightReturnGroup = document.getElementById('flight-return-group');

    flightTypeBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        flightTypeBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const selectedType = this.dataset.flightType;
        if (flightTripTypeVal) flightTripTypeVal.value = selectedType;

        if (flightReturnGroup) {
          if (selectedType === 'Round Trip') {
            flightReturnGroup.style.display = 'block';
            const retInput = flightReturnGroup.querySelector('input');
            if (retInput) retInput.required = true;
          } else {
            flightReturnGroup.style.display = 'none';
            const retInput = flightReturnGroup.querySelector('input');
            if (retInput) retInput.required = false;
          }
        }
      });
    });
  }

  function initTicketBookingForm() {
    const form = document.getElementById('ticket-booking-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

      const transportType = (document.getElementById('ticket-transport-type') || {}).value || 'Flight';
      const flightTripType = (document.getElementById('flight-trip-type-val') || {}).value || 'One Way';
      const nameInput = document.getElementById('ticket-name');
      const phoneInput = document.getElementById('ticket-phone');
      const notesInput = document.getElementById('ticket-notes');
      const submitBtn = form.querySelector('button[type="submit"]');

      let fromLocation = '';
      let toLocation = '';
      let travelDate = '';
      let returnDate = '';
      let passengers = '1 Passenger';
      let travelClass = '';
      let hasError = false;

      if (transportType === 'Flight') {
        const fromInp = document.getElementById('flight-from');
        const toInp = document.getElementById('flight-to');
        const dateInp = document.getElementById('flight-depart-date');
        const retInp = document.getElementById('flight-return-date');
        const passInp = document.getElementById('flight-passengers');
        const classInp = document.getElementById('flight-class');

        if (!fromInp.value.trim()) { fromInp.classList.add('is-invalid'); hasError = true; }
        if (!toInp.value.trim()) { toInp.classList.add('is-invalid'); hasError = true; }
        if (!dateInp.value) { dateInp.classList.add('is-invalid'); hasError = true; }
        if (flightTripType === 'Round Trip' && (!retInp.value || new Date(retInp.value) < new Date(dateInp.value))) {
          retInp.classList.add('is-invalid'); hasError = true;
        }

        fromLocation = fromInp.value.trim();
        toLocation = toInp.value.trim();
        travelDate = dateInp.value;
        returnDate = retInp ? retInp.value : '';
        passengers = passInp ? passInp.value : '1 Passenger';
        travelClass = classInp ? classInp.value : 'Economy Class';

      } else if (transportType === 'Train') {
        const fromInp = document.getElementById('train-from');
        const toInp = document.getElementById('train-to');
        const dateInp = document.getElementById('train-date');
        const passInp = document.getElementById('train-passengers');
        const classInp = document.getElementById('train-class');

        if (!fromInp.value.trim()) { fromInp.classList.add('is-invalid'); hasError = true; }
        if (!toInp.value.trim()) { toInp.classList.add('is-invalid'); hasError = true; }
        if (!dateInp.value) { dateInp.classList.add('is-invalid'); hasError = true; }

        fromLocation = fromInp.value.trim();
        toLocation = toInp.value.trim();
        travelDate = dateInp.value;
        passengers = passInp ? passInp.value : '1 Passenger';
        travelClass = classInp ? classInp.value : '2A (Second AC)';

      } else if (transportType === 'Bus') {
        const fromInp = document.getElementById('bus-from');
        const toInp = document.getElementById('bus-to');
        const dateInp = document.getElementById('bus-date');
        const passInp = document.getElementById('bus-passengers');
        const typeInp = document.getElementById('bus-type');

        if (!fromInp.value.trim()) { fromInp.classList.add('is-invalid'); hasError = true; }
        if (!toInp.value.trim()) { toInp.classList.add('is-invalid'); hasError = true; }
        if (!dateInp.value) { dateInp.classList.add('is-invalid'); hasError = true; }

        fromLocation = fromInp.value.trim();
        toLocation = toInp.value.trim();
        travelDate = dateInp.value;
        passengers = passInp ? passInp.value : '1 Passenger';
        travelClass = typeInp ? typeInp.value : 'AC Sleeper';
      }

      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        nameInput.classList.add('is-invalid');
        hasError = true;
      }

      if (!phoneInput.value.trim() || !isValidPhone(phoneInput.value.trim())) {
        phoneInput.classList.add('is-invalid');
        hasError = true;
      }

      if (hasError) {
        const firstErr = form.querySelector('.is-invalid');
        if (firstErr) firstErr.focus();
        return;
      }

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Preparing Booking Request...';

      const ref = generateReference('TKT');
      const data = {
        ref,
        transportType,
        tripType: transportType === 'Flight' ? flightTripType : 'One Way',
        fromLocation,
        toLocation,
        travelDate,
        returnDate,
        passengers,
        travelClass,
        customerName: nameInput.value.trim(),
        mobileNumber: phoneInput.value.trim(),
        notes: notesInput ? notesInput.value.trim() : '',
        submittedAt: new Date().toISOString()
      };

      try {
        if (window.location.hostname !== 'localhost' && window.location.protocol !== 'file:') {
          const formData = new FormData(form);
          formData.append('referenceNumber', ref);
          fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
          }).catch(() => {});
        }

        const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_TICKETS) || '[]');
        existing.unshift(data);
        localStorage.setItem(STORAGE_KEY_TICKETS, JSON.stringify(existing));

        const whatsappMessage = window.ZORRO_CONFIG.messages.ticketBookingDetail(ref, data);
        const whatsappLink = window.ZORRO_CONFIG.getWhatsAppUrl(whatsappMessage);

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        form.reset();

        showTicketConfirmationModal(data, whatsappLink);

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
          window.location.href = whatsappLink;
        } else {
          const newWin = window.open(whatsappLink, '_blank');
          if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
            window.location.href = whatsappLink;
          }
        }
      } catch (err) {
        console.error('Ticket form error:', err);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        alert('There was an issue submitting your ticket request. Please call G.Naveen Kumar directly at +91 95003 60969 or WhatsApp.');
      }
    });
  }

  function showTicketConfirmationModal(data, whatsappLink) {
    let modal = document.getElementById('ticket-confirmation-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'ticket-confirmation-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-content" style="max-width: 660px;">
        <button class="modal-close-btn" id="close-ticket-modal" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="confirmation-box">
          <div class="confirm-icon-wrap" style="background:#EFF6FF; color:#2563EB;">
            <svg viewBox="0 0 24 24">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
            </svg>
          </div>

          <h2 style="font-size: 1.8rem; margin-bottom: 8px; color: var(--deep-wine);">Ticket Enquiry Prepared!</h2>
          <div class="confirm-ref-badge">Enquiry Reference: ${data.ref}</div>
          
          <p style="font-size: 0.95rem; color: var(--body-text); margin-bottom: 14px;">
            Thank you, <strong>${data.customerName}</strong>. Your ${data.transportType} booking enquiry for <strong>${data.fromLocation} ➔ ${data.toLocation}</strong> on <strong>${data.travelDate}</strong> has been prepared.
          </p>

          <div class="confirm-pending-notice" style="background:#F0FDF4; border:1px solid #BBF7D0; color:#166534; padding:14px; border-radius:var(--radius-sm); margin-bottom:20px; text-align:left; font-size:0.90rem; line-height:1.5;">
            <strong>Opening WhatsApp:</strong><br>
            Sending your ticket enquiry directly to G.Naveen Kumar (+91 95003 60969). Our Coimbatore travel desk will check real-time seat availability and share optimal connection quotes.
          </div>

          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="padding:12px 24px; font-weight:700;">
              Send on WhatsApp Now
            </a>
            <a href="tel:+919500360969" class="btn btn-call" style="padding:12px 20px;">
              Call: +91 95003 60969
            </a>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    modal.querySelector('#close-ticket-modal').addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /**
   * Visa Assistance Form Handler
   */
  function initVisaEnquiryForm() {
    const form = document.getElementById('visa-enquiry-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

      const nameInput = document.getElementById('visa-name');
      const phoneInput = document.getElementById('visa-phone');
      const countryInput = document.getElementById('visa-country');
      const typeInput = document.getElementById('visa-type');
      const dateInput = document.getElementById('visa-date');
      const applicantsInput = document.getElementById('visa-applicants');
      const notesInput = document.getElementById('visa-notes');
      const submitBtn = form.querySelector('button[type="submit"]');

      let hasError = false;

      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        nameInput.classList.add('is-invalid');
        hasError = true;
      }
      if (!phoneInput.value.trim() || !isValidPhone(phoneInput.value.trim())) {
        phoneInput.classList.add('is-invalid');
        hasError = true;
      }
      if (!countryInput.value) {
        countryInput.classList.add('is-invalid');
        hasError = true;
      }
      if (!typeInput.value) {
        typeInput.classList.add('is-invalid');
        hasError = true;
      }
      if (!dateInput.value) {
        dateInput.classList.add('is-invalid');
        hasError = true;
      }

      if (hasError) {
        const firstErr = form.querySelector('.is-invalid');
        if (firstErr) firstErr.focus();
        return;
      }

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Preparing Visa Guidance Request...';

      const ref = generateReference('VSA');
      const data = {
        ref,
        customerName: nameInput.value.trim(),
        mobileNumber: phoneInput.value.trim(),
        country: countryInput.value,
        visaType: typeInput.value,
        travelDate: dateInput.value,
        applicants: applicantsInput ? applicantsInput.value : '1 Applicant',
        notes: notesInput ? notesInput.value.trim() : '',
        submittedAt: new Date().toISOString()
      };

      try {
        if (window.location.hostname !== 'localhost' && window.location.protocol !== 'file:') {
          const formData = new FormData(form);
          formData.append('referenceNumber', ref);
          fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
          }).catch(() => {});
        }

        const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_VISAS) || '[]');
        existing.unshift(data);
        localStorage.setItem(STORAGE_KEY_VISAS, JSON.stringify(existing));

        const whatsappMessage = window.ZORRO_CONFIG.messages.visaAssistanceDetail(ref, data);
        const whatsappLink = window.ZORRO_CONFIG.getWhatsAppUrl(whatsappMessage);

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        form.reset();

        showVisaConfirmationModal(data, whatsappLink);

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
          window.location.href = whatsappLink;
        } else {
          const newWin = window.open(whatsappLink, '_blank');
          if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
            window.location.href = whatsappLink;
          }
        }
      } catch (err) {
        console.error('Visa form error:', err);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        alert('There was an issue submitting your visa request. Please call G.Naveen Kumar directly at +91 95003 60969 or WhatsApp.');
      }
    });
  }

  function showVisaConfirmationModal(data, whatsappLink) {
    let modal = document.getElementById('visa-confirmation-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'visa-confirmation-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-content" style="max-width: 660px;">
        <button class="modal-close-btn" id="close-visa-modal" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="confirmation-box">
          <div class="confirm-icon-wrap" style="background:#FDF2F8; color:#BE185D;">
            <svg viewBox="0 0 24 24">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
          </div>

          <h2 style="font-size: 1.8rem; margin-bottom: 8px; color: var(--deep-wine);">Visa Enquiry Prepared!</h2>
          <div class="confirm-ref-badge">Enquiry Reference: ${data.ref}</div>
          
          <p style="font-size: 0.95rem; color: var(--body-text); margin-bottom: 14px;">
            Thank you, <strong>${data.customerName}</strong>. Your <strong>${data.visaType}</strong> request for <strong>${data.country}</strong> (${data.applicants}) has been prepared.
          </p>

          <div class="confirm-pending-notice" style="background:#F0FDF4; border:1px solid #BBF7D0; color:#166534; padding:14px; border-radius:var(--radius-sm); margin-bottom:20px; text-align:left; font-size:0.90rem; line-height:1.5;">
            <strong>Opening WhatsApp:</strong><br>
            Connecting directly to G.Naveen Kumar (+91 95003 60969). Our team will provide the exact document checklist, photo specifications, and appointment timeline for ${data.country}.
          </div>

          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="padding:12px 24px; font-weight:700;">
              Send on WhatsApp Now
            </a>
            <a href="tel:+919500360969" class="btn btn-call" style="padding:12px 20px;">
              Call: +91 95003 60969
            </a>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    modal.querySelector('#close-visa-modal').addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /**
   * Foreign Currency Exchange Form Handler
   */
  function initForexExchangeForm() {
    const form = document.getElementById('forex-enquiry-form');
    if (!form) return;

    const actionBtns = form.querySelectorAll('.forex-toggle-btn');
    const actionInput = document.getElementById('forex-action-val');
    const currencyPills = form.querySelectorAll('.forex-currency-pill');
    const currencySelect = document.getElementById('forex-currency-select');
    const amountInput = document.getElementById('forex-amount');
    const rateInput = document.getElementById('forex-rate-val');
    const inrDisplay = document.getElementById('forex-inr-estimate');
    const inrInput = document.getElementById('forex-inr-val');

    // Rates map
    const ratesMap = {
      USD: 86.50,
      EUR: 93.80,
      GBP: 110.20,
      AED: 23.55,
      SGD: 65.20,
      AUD: 56.40,
      THB: 2.45,
      CAD: 62.80,
      MYR: 19.60,
      OTHER: 1.00
    };

    function recalculateForex() {
      if (!amountInput || !rateInput || !inrDisplay || !inrInput) return;
      const amount = parseFloat(amountInput.value) || 0;
      const rate = parseFloat(rateInput.value) || 86.50;
      
      if (rate === 1.00) {
        inrDisplay.textContent = 'Custom Quote';
        inrInput.value = 'Quote on Request';
        return;
      }

      const approxInr = Math.round(amount * rate);
      const formatted = approxInr.toLocaleString('en-IN');
      inrDisplay.textContent = `₹${formatted} INR`;
      inrInput.value = formatted;
    }

    // Action toggle Buy / Sell
    actionBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        actionBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const action = this.dataset.action;
        if (actionInput) actionInput.value = action;
        recalculateForex();
      });
    });

    // Currency Quick Pills
    currencyPills.forEach(pill => {
      pill.addEventListener('click', function(e) {
        e.preventDefault();
        currencyPills.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        const code = this.dataset.code;
        const rate = parseFloat(this.dataset.rate) || ratesMap[code] || 86.50;

        if (rateInput) rateInput.value = rate;

        // Sync dropdown
        if (currencySelect) {
          for (let i = 0; i < currencySelect.options.length; i++) {
            if (currencySelect.options[i].dataset.code === code) {
              currencySelect.selectedIndex = i;
              break;
            }
          }
        }
        recalculateForex();
      });
    });

    // Currency Select change
    if (currencySelect) {
      currencySelect.addEventListener('change', function() {
        const selected = this.options[this.selectedIndex];
        const code = selected.dataset.code || 'USD';
        const rate = parseFloat(selected.dataset.rate) || ratesMap[code] || 86.50;
        if (rateInput) rateInput.value = rate;

        // Sync pills
        currencyPills.forEach(p => {
          if (p.dataset.code === code) {
            p.classList.add('active');
          } else {
            p.classList.remove('active');
          }
        });
        recalculateForex();
      });
    }

    // Amount input change
    if (amountInput) {
      amountInput.addEventListener('input', recalculateForex);
    }

    // Submit handler
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

      const nameInput = document.getElementById('forex-name');
      const phoneInput = document.getElementById('forex-phone');
      const dateInput = document.getElementById('forex-date');
      const submitBtn = form.querySelector('button[type="submit"]');

      let hasError = false;

      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        nameInput.classList.add('is-invalid');
        hasError = true;
      }
      if (!phoneInput.value.trim() || !isValidPhone(phoneInput.value.trim())) {
        phoneInput.classList.add('is-invalid');
        hasError = true;
      }
      if (!dateInput.value) {
        dateInput.classList.add('is-invalid');
        hasError = true;
      }
      if (!amountInput.value || parseFloat(amountInput.value) <= 0) {
        amountInput.classList.add('is-invalid');
        hasError = true;
      }

      if (hasError) {
        const firstErr = form.querySelector('.is-invalid');
        if (firstErr) firstErr.focus();
        return;
      }

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Preparing Forex Quote Request...';

      const selectedOpt = currencySelect ? currencySelect.options[currencySelect.selectedIndex] : null;
      const currencyCode = selectedOpt ? selectedOpt.dataset.code : 'USD';
      const ref = generateReference('FX');
      const data = {
        ref,
        customerName: nameInput.value.trim(),
        mobileNumber: phoneInput.value.trim(),
        action: actionInput ? actionInput.value : 'Buy',
        currency: currencySelect ? currencySelect.value : 'USD - US Dollar',
        currencyCode: currencyCode,
        currencyAmount: amountInput.value.trim(),
        inrEstimate: inrInput ? inrInput.value : '86,500',
        transactionDate: dateInput.value,
        submittedAt: new Date().toISOString()
      };

      try {
        if (window.location.hostname !== 'localhost' && window.location.protocol !== 'file:') {
          const formData = new FormData(form);
          formData.append('referenceNumber', ref);
          fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
          }).catch(() => {});
        }

        const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_FOREX) || '[]');
        existing.unshift(data);
        localStorage.setItem(STORAGE_KEY_FOREX, JSON.stringify(existing));

        const whatsappMessage = window.ZORRO_CONFIG.messages.forexExchangeDetail(ref, data);
        const whatsappLink = window.ZORRO_CONFIG.getWhatsAppUrl(whatsappMessage);

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        form.reset();
        recalculateForex();

        showForexConfirmationModal(data, whatsappLink);

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
          window.location.href = whatsappLink;
        } else {
          const newWin = window.open(whatsappLink, '_blank');
          if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
            window.location.href = whatsappLink;
          }
        }
      } catch (err) {
        console.error('Forex form error:', err);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        alert('There was an issue submitting your forex request. Please call G.Naveen Kumar directly at +91 95003 60969 or WhatsApp.');
      }
    });
  }

  function showForexConfirmationModal(data, whatsappLink) {
    let modal = document.getElementById('forex-confirmation-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'forex-confirmation-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-content" style="max-width: 660px;">
        <button class="modal-close-btn" id="close-forex-modal" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="confirmation-box">
          <div class="confirm-icon-wrap" style="background:#ECFDF5; color:#059669;">
            <svg viewBox="0 0 24 24">
              <path d="M12.89 11.1c-1.78-.59-2.64-.96-2.64-1.9 0-1.02 1.11-1.39 1.81-1.39 1.31 0 1.79.59 1.9 1.4h2.15c-.15-1.38-.96-2.58-2.55-2.98V4h-2.97v2.19c-1.92.42-3.15 1.6-3.15 3.19 0 2.22 1.84 2.89 3.51 3.4 1.79.54 2.68 1.07 2.68 2.05 0 1.07-.95 1.58-2 1.58-1.57 0-2.18-.74-2.31-1.63H6.7c.18 1.66 1.32 2.69 2.97 3.09V20h2.97v-2.16c1.92-.41 3.23-1.54 3.23-3.23 0-2.36-1.97-2.98-2.98-3.51z"/>
            </svg>
          </div>

          <h2 style="font-size: 1.8rem; margin-bottom: 8px; color: var(--deep-wine);">Forex Quote Request Ready!</h2>
          <div class="confirm-ref-badge">Enquiry Reference: ${data.ref}</div>
          
          <p style="font-size: 0.95rem; color: var(--body-text); margin-bottom: 14px;">
            Thank you, <strong>${data.customerName}</strong>. Your request to <strong>${data.action} ${data.currencyAmount} ${data.currencyCode}</strong> (~ ₹${data.inrEstimate} INR) has been prepared.
          </p>

          <div class="confirm-pending-notice" style="background:#F0FDF4; border:1px solid #BBF7D0; color:#166534; padding:14px; border-radius:var(--radius-sm); margin-bottom:20px; text-align:left; font-size:0.90rem; line-height:1.5;">
            <strong>Opening WhatsApp:</strong><br>
            Sending your enquiry directly to G.Naveen Kumar (+91 95003 60969). We will share the best live rate quote and authorized KYC fulfillment details for Coimbatore pickup/delivery.
          </div>

          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="padding:12px 24px; font-weight:700;">
              Send on WhatsApp Now
            </a>
            <a href="tel:+919500360969" class="btn btn-call" style="padding:12px 20px;">
              Call: +91 95003 60969
            </a>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    modal.querySelector('#close-forex-modal').addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Keyboard shortcut to open Booking Portal for business owner Naveen (Alt + B)
  window.addEventListener('keydown', function(e) {
    if (e.altKey && (e.key === 'b' || e.key === 'B')) {
      e.preventDefault();
      openBookingsPortal();
    }
  });

  /**
   * Unified Business Inquiries Portal (Admin Viewer)
   * Displays Taxi Bookings, Holiday Inquiries, Ticket Bookings, Visa Assistance, and Forex Requests
   */
  window.openBookingsPortal = function() {
    let modal = document.getElementById('admin-bookings-portal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'admin-bookings-portal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    const taxiBookings = JSON.parse(localStorage.getItem(STORAGE_KEY_BOOKINGS) || '[]');
    const tripEnquiries = JSON.parse(localStorage.getItem(STORAGE_KEY_TRIPS) || '[]');
    const ticketEnquiries = JSON.parse(localStorage.getItem(STORAGE_KEY_TICKETS) || '[]');
    const visaEnquiries = JSON.parse(localStorage.getItem(STORAGE_KEY_VISAS) || '[]');
    const forexEnquiries = JSON.parse(localStorage.getItem(STORAGE_KEY_FOREX) || '[]');

    modal.innerHTML = `
      <div class="modal-content" style="max-width: 960px; max-height:90vh; overflow-y:auto; padding: 30px;">
        <button class="modal-close-btn" id="close-portal-modal" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; border-bottom: 2px solid var(--border-color); padding-bottom: 14px;">
          <div>
            <h2 style="font-size: 1.6rem; color: var(--deep-wine);">Business Inquiries Portal</h2>
            <p style="font-size: 0.85rem; color: var(--muted-text);">All submitted Taxi Bookings, Holiday Packages, Ticket Bookings, Visa & Forex Enquiries</p>
          </div>
          <button id="clear-all-data-btn" class="btn btn-outline" style="font-size:0.75rem; padding:6px 12px;">Clear Demo Data</button>
        </div>

        <!-- 1. Taxi Bookings -->
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 1.15rem; color: var(--primary-burgundy); margin-bottom: 10px;">
            🚕 Taxi Bookings (${taxiBookings.length})
          </h3>
          ${taxiBookings.length === 0 ? '<p style="color:var(--muted-text); font-size:0.86rem;">No taxi bookings yet.</p>' : `
            <div style="max-height: 200px; overflow-y: auto; border: 1px solid var(--border-color); border-radius: 8px;">
              <table style="width:100%; border-collapse: collapse; font-size: 0.82rem; text-align: left;">
                <thead style="background:#FAF4EB; border-bottom:1px solid var(--border-color);">
                  <tr>
                    <th style="padding:8px 12px;">Ref</th>
                    <th style="padding:8px 12px;">Customer</th>
                    <th style="padding:8px 12px;">Route</th>
                    <th style="padding:8px 12px;">Date & Time</th>
                    <th style="padding:8px 12px;">Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${taxiBookings.map(b => `
                    <tr style="border-bottom: 1px solid var(--border-light);">
                      <td style="padding:8px 12px; font-weight:700; color:var(--primary-burgundy);">${b.ref}</td>
                      <td style="padding:8px 12px;"><strong>${b.customerName}</strong><br><small>${b.mobileNumber}</small></td>
                      <td style="padding:8px 12px;">${b.pickupLocation} ➔ ${b.dropLocation}<br><small style="color:var(--deep-wine); font-weight:600;">🚗 ${b.passengers || 'Sedan'} &bull; ${b.tripType}</small></td>
                      <td style="padding:8px 12px;">${b.travelDate} @ ${b.pickupTime}</td>
                      <td style="padding:8px 12px;">
                        <a href="https://wa.me/91${b.mobileNumber.replace(/\D/g,'')}?text=${encodeURIComponent(`Hello ${b.customerName}, this is Naveen from Zorro Holidays regarding your taxi booking ${b.ref}.`)}" target="_blank" class="btn btn-whatsapp" style="padding:4px 8px; font-size:0.75rem;">WhatsApp</a>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>

        <!-- 2. Ticket Booking Enquiries -->
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 1.15rem; color: var(--primary-burgundy); margin-bottom: 10px;">
            🎫 Ticket Booking Enquiries (${ticketEnquiries.length})
          </h3>
          ${ticketEnquiries.length === 0 ? '<p style="color:var(--muted-text); font-size:0.86rem;">No ticket booking enquiries yet.</p>' : `
            <div style="max-height: 200px; overflow-y: auto; border: 1px solid var(--border-color); border-radius: 8px;">
              <table style="width:100%; border-collapse: collapse; font-size: 0.82rem; text-align: left;">
                <thead style="background:#FAF4EB; border-bottom:1px solid var(--border-color);">
                  <tr>
                    <th style="padding:8px 12px;">Ref</th>
                    <th style="padding:8px 12px;">Service</th>
                    <th style="padding:8px 12px;">Customer</th>
                    <th style="padding:8px 12px;">Route & Class</th>
                    <th style="padding:8px 12px;">Date</th>
                    <th style="padding:8px 12px;">Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${ticketEnquiries.map(t => `
                    <tr style="border-bottom: 1px solid var(--border-light);">
                      <td style="padding:8px 12px; font-weight:700; color:var(--primary-burgundy);">${t.ref}</td>
                      <td style="padding:8px 12px;"><span class="badge badge-ivory">${t.transportType}</span></td>
                      <td style="padding:8px 12px;"><strong>${t.customerName}</strong><br><small>${t.mobileNumber}</small></td>
                      <td style="padding:8px 12px;">${t.fromLocation} ➔ ${t.toLocation}<br><small style="color:var(--muted-text);">${t.passengers} &bull; ${t.travelClass}</small></td>
                      <td style="padding:8px 12px;">${t.travelDate}</td>
                      <td style="padding:8px 12px;">
                        <a href="https://wa.me/91${t.mobileNumber.replace(/\D/g,'')}?text=${encodeURIComponent(`Hello ${t.customerName}, this is Naveen from Zorro Holidays regarding your ${t.transportType} ticket enquiry ${t.ref}.`)}" target="_blank" class="btn btn-whatsapp" style="padding:4px 8px; font-size:0.75rem;">WhatsApp</a>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>

        <!-- 3. Visa Assistance Enquiries -->
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 1.15rem; color: var(--primary-burgundy); margin-bottom: 10px;">
            🛂 Visa Assistance Enquiries (${visaEnquiries.length})
          </h3>
          ${visaEnquiries.length === 0 ? '<p style="color:var(--muted-text); font-size:0.86rem;">No visa enquiries yet.</p>' : `
            <div style="max-height: 200px; overflow-y: auto; border: 1px solid var(--border-color); border-radius: 8px;">
              <table style="width:100%; border-collapse: collapse; font-size: 0.82rem; text-align: left;">
                <thead style="background:#FAF4EB; border-bottom:1px solid var(--border-color);">
                  <tr>
                    <th style="padding:8px 12px;">Ref</th>
                    <th style="padding:8px 12px;">Country</th>
                    <th style="padding:8px 12px;">Customer</th>
                    <th style="padding:8px 12px;">Visa Category</th>
                    <th style="padding:8px 12px;">Travel Date</th>
                    <th style="padding:8px 12px;">Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${visaEnquiries.map(v => `
                    <tr style="border-bottom: 1px solid var(--border-light);">
                      <td style="padding:8px 12px; font-weight:700; color:var(--primary-burgundy);">${v.ref}</td>
                      <td style="padding:8px 12px; font-weight:600;">${v.country}</td>
                      <td style="padding:8px 12px;"><strong>${v.customerName}</strong><br><small>${v.mobileNumber}</small></td>
                      <td style="padding:8px 12px;">${v.visaType}<br><small style="color:var(--muted-text);">${v.applicants}</small></td>
                      <td style="padding:8px 12px;">${v.travelDate}</td>
                      <td style="padding:8px 12px;">
                        <a href="https://wa.me/91${v.mobileNumber.replace(/\D/g,'')}?text=${encodeURIComponent(`Hello ${v.customerName}, this is Naveen from Zorro Holidays regarding your ${v.country} visa assistance enquiry ${v.ref}.`)}" target="_blank" class="btn btn-whatsapp" style="padding:4px 8px; font-size:0.75rem;">WhatsApp</a>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>

        <!-- 4. Forex Currency Enquiries -->
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 1.15rem; color: var(--primary-burgundy); margin-bottom: 10px;">
            💱 Currency Exchange Enquiries (${forexEnquiries.length})
          </h3>
          ${forexEnquiries.length === 0 ? '<p style="color:var(--muted-text); font-size:0.86rem;">No currency enquiries yet.</p>' : `
            <div style="max-height: 200px; overflow-y: auto; border: 1px solid var(--border-color); border-radius: 8px;">
              <table style="width:100%; border-collapse: collapse; font-size: 0.82rem; text-align: left;">
                <thead style="background:#FAF4EB; border-bottom:1px solid var(--border-color);">
                  <tr>
                    <th style="padding:8px 12px;">Ref</th>
                    <th style="padding:8px 12px;">Type</th>
                    <th style="padding:8px 12px;">Customer</th>
                    <th style="padding:8px 12px;">Amount & Currency</th>
                    <th style="padding:8px 12px;">Approx INR</th>
                    <th style="padding:8px 12px;">Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${forexEnquiries.map(f => `
                    <tr style="border-bottom: 1px solid var(--border-light);">
                      <td style="padding:8px 12px; font-weight:700; color:var(--primary-burgundy);">${f.ref}</td>
                      <td style="padding:8px 12px;"><span class="badge ${f.action === 'Buy' ? 'badge-gold' : 'badge-ivory'}">${f.action}</span></td>
                      <td style="padding:8px 12px;"><strong>${f.customerName}</strong><br><small>${f.mobileNumber}</small></td>
                      <td style="padding:8px 12px;">${f.currencyAmount} ${f.currencyCode}</td>
                      <td style="padding:8px 12px; font-weight:700; color:var(--deep-wine);">₹${f.inrEstimate}</td>
                      <td style="padding:8px 12px;">
                        <a href="https://wa.me/91${f.mobileNumber.replace(/\D/g,'')}?text=${encodeURIComponent(`Hello ${f.customerName}, this is Naveen from Zorro Holidays regarding your forex quote enquiry ${f.ref}.`)}" target="_blank" class="btn btn-whatsapp" style="padding:4px 8px; font-size:0.75rem;">WhatsApp</a>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>

        <!-- 5. Holiday & Custom Trip Inquiries -->
        <div>
          <h3 style="font-size: 1.15rem; color: var(--primary-burgundy); margin-bottom: 10px;">
            🗺️ Holiday & Custom Trip Inquiries (${tripEnquiries.length})
          </h3>
          ${tripEnquiries.length === 0 ? '<p style="color:var(--muted-text); font-size:0.86rem;">No holiday enquiries yet.</p>' : `
            <div style="max-height: 200px; overflow-y: auto; border: 1px solid var(--border-color); border-radius: 8px;">
              <table style="width:100%; border-collapse: collapse; font-size: 0.82rem; text-align: left;">
                <thead style="background:#FAF4EB; border-bottom:1px solid var(--border-color);">
                  <tr>
                    <th style="padding:8px 12px;">Ref</th>
                    <th style="padding:8px 12px;">Customer</th>
                    <th style="padding:8px 12px;">Destination</th>
                    <th style="padding:8px 12px;">Travel Date</th>
                    <th style="padding:8px 12px;">Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${tripEnquiries.map(t => `
                    <tr style="border-bottom: 1px solid var(--border-light);">
                      <td style="padding:8px 12px; font-weight:700; color:var(--primary-burgundy);">${t.ref}</td>
                      <td style="padding:8px 12px;"><strong>${t.customerName}</strong><br><small>${t.mobileNumber}</small></td>
                      <td style="padding:8px 12px;"><strong>${t.destination}</strong> (${t.tourType})</td>
                      <td style="padding:8px 12px;">${t.departureDate}</td>
                      <td style="padding:8px 12px;">
                        <a href="https://wa.me/91${t.mobileNumber.replace(/\D/g,'')}?text=${encodeURIComponent(`Hello ${t.customerName}, this is Naveen from Zorro Holidays regarding your ${t.destination} tour enquiry ${t.ref}.`)}" target="_blank" class="btn btn-whatsapp" style="padding:4px 8px; font-size:0.75rem;">WhatsApp</a>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    modal.querySelector('#close-portal-modal').addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    const clearBtn = modal.querySelector('#clear-all-data-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Clear all stored demo inquiries?')) {
          localStorage.removeItem(STORAGE_KEY_BOOKINGS);
          localStorage.removeItem(STORAGE_KEY_TRIPS);
          localStorage.removeItem(STORAGE_KEY_CONTACTS);
          localStorage.removeItem(STORAGE_KEY_TICKETS);
          localStorage.removeItem(STORAGE_KEY_VISAS);
          localStorage.removeItem(STORAGE_KEY_FOREX);
          openBookingsPortal();
        }
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  };

  // Expose global helper methods
  window.showTaxiConfirmationModal = showTaxiConfirmationModal;
  window.initTaxiBookingForms = initTaxiBookingForms;

  // Initialize on DOM load
  document.addEventListener('DOMContentLoaded', () => {
    initDatePickers();
    initTripTypeSelectors();
    initTaxiBookingForms();
    initPlanTripForm();
    initContactForm();
    initTicketBookingTabs();
    initTicketBookingForm();
    initVisaEnquiryForm();
    initForexExchangeForm();
  });
})();
