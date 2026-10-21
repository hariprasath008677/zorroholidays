/**
 * ZORRO HOLIDAYS - Core Site Interactivity & UI Controllers
 * "Explore Beyond Limits"
 */

(function() {
  'use strict';

  /**
   * Mobile Menu Drawer Toggle
   */
  function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!toggleBtn || !navMenu) return;

    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      toggleBtn.setAttribute('aria-expanded', isOpen);
      toggleBtn.innerHTML = isOpen
        ? `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
        toggleBtn.setAttribute('aria-expanded', false);
        toggleBtn.innerHTML = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
        toggleBtn.setAttribute('aria-expanded', false);
        toggleBtn.innerHTML = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });
  }

  /**
   * Header Scroll Shadow & Blur
   */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = '0 6px 24px rgba(75, 0, 24, 0.1)';
      } else {
        header.style.boxShadow = '0 4px 20px rgba(75, 0, 24, 0.04)';
      }
    }, { passive: true });
  }

  /**
   * Package Detail Modal Controller
   * Dynamically renders rich itinerary, photos, food details, and WhatsApp quote
   */
  window.openPackageModal = function(packageId) {
    if (!window.TOUR_PACKAGES) return;

    // Search in domestic or international
    let pkg = window.TOUR_PACKAGES.domestic.find(p => p.id === packageId);
    if (!pkg) {
      pkg = window.TOUR_PACKAGES.international.find(p => p.id === packageId);
    }
    if (!pkg) return;

    let modal = document.getElementById('package-detail-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'package-detail-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    const whatsappLink = window.ZORRO_CONFIG.getDestinationWhatsAppUrl(pkg.name);

    modal.innerHTML = `
      <div class="modal-content" style="max-width: 820px;">
        <button class="modal-close-btn" id="close-pkg-modal" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div style="position:relative; height: 320px; overflow: hidden; border-radius: var(--radius-lg) var(--radius-lg) 0 0;">
          <img src="${pkg.image}" alt="${pkg.title}" style="width:100%; height:100%; object-fit:cover;">
          <div style="position:absolute; inset:0; background: linear-gradient(to top, rgba(36,52,71,0.92) 0%, rgba(36,52,71,0.2) 60%, transparent 100%);"></div>
          <div style="position:absolute; bottom: 24px; left: 28px; right: 28px; color: var(--white);">
            <div style="display:flex; gap:8px; margin-bottom:8px;">
              <span class="badge badge-ivory">${pkg.badge || 'Featured Tour'}</span>
            </div>
            <h2 style="font-size: 2rem; color: var(--white); margin-bottom: 4px; line-height:1.2;">${pkg.title}</h2>
            <p style="font-size: 0.95rem; color: var(--warm-ivory);">${pkg.tagline}</p>
          </div>
        </div>

        <div style="padding: 32px 28px;">
          <!-- Overview -->
          <div style="margin-bottom: 24px;">
            <h3 style="font-size: 1.25rem; color: var(--deep-wine); margin-bottom: 8px;">Destination Overview</h3>
            <p style="font-size: 0.94rem; color: var(--body-text); line-height:1.7;">${pkg.overview}</p>
          </div>

          <!-- Sightseeing Highlights & Photo Spots Grid -->
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 28px;">
            <div style="background: var(--light-bg); padding: 18px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <h4 style="font-size: 1.05rem; color: var(--primary-burgundy); margin-bottom: 12px; display:flex; align-items:center; gap:6px;">
                🏛️ Key Sightseeing Attractions
              </h4>
              <ul style="list-style:none; font-size:0.86rem; display:flex; flex-direction:column; gap:8px;">
                ${pkg.sightseeing.map(item => `
                  <li style="display:flex; align-items:flex-start; gap:8px;">
                    <span style="color:var(--primary-burgundy); font-weight:bold;">•</span>
                    <span>${item}</span>
                  </li>
                `).join('')}
              </ul>
            </div>

            <div style="background: var(--warm-ivory-light); padding: 18px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <h4 style="font-size: 1.05rem; color: var(--deep-wine); margin-bottom: 12px; display:flex; align-items:center; gap:6px;">
                📸 Recommended Photography Spots
              </h4>
              <ul style="list-style:none; font-size:0.86rem; display:flex; flex-direction:column; gap:8px;">
                ${pkg.photoSpots.map(spot => `
                  <li style="display:flex; align-items:flex-start; gap:8px;">
                    <span style="color:var(--gold-accent); font-weight:bold;">📷</span>
                    <span>${spot}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>

          <!-- Suggested Day-wise Itinerary -->
          <div style="margin-bottom: 28px;">
            <h3 style="font-size: 1.25rem; color: var(--deep-wine); margin-bottom: 14px;">Suggested Day-Wise Itinerary</h3>
            <div style="display:flex; flex-direction:column; gap:14px;">
              ${pkg.itinerary.map(day => `
                <div style="border-left: 3px solid var(--primary-burgundy); padding-left: 16px; margin-left: 4px;">
                  <span style="font-size: 0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--primary-burgundy);">Day ${day.day}</span>
                  <h5 style="font-size: 1.05rem; color:var(--deep-wine); margin-bottom: 4px;">${day.title}</h5>
                  <p style="font-size: 0.88rem; color:var(--body-text); line-height:1.6;">${day.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Food & Inclusions Details -->
          <div style="background: #FFFDF9; border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 18px; margin-bottom: 28px;">
            <h4 style="font-size: 1.05rem; color: var(--deep-wine); margin-bottom: 8px;">🍽️ Food & Meal Plan Details</h4>
            <p style="font-size: 0.88rem; color: var(--body-text); line-height:1.6; margin-bottom: 14px;">${pkg.foodInclusions}</p>

            <h4 style="font-size: 1.05rem; color: var(--deep-wine); margin-bottom: 8px;">🚗 Transport & Chauffeur</h4>
            <p style="font-size: 0.88rem; color: var(--body-text); line-height:1.6;">${pkg.transport}</p>
          </div>

          <!-- Inclusions & Exclusions -->
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
            <div>
              <h5 style="font-size: 0.95rem; color: #166534; margin-bottom: 8px;">✓ Included in Package</h5>
              <ul style="list-style:none; font-size: 0.84rem; display:flex; flex-direction:column; gap:6px; color: var(--body-text);">
                ${pkg.inclusions.map(inc => `<li>✓ ${inc}</li>`).join('')}
              </ul>
            </div>
            <div>
              <h5 style="font-size: 0.95rem; color: #991B1B; margin-bottom: 8px;">✕ Excluded / Optional</h5>
              <ul style="list-style:none; font-size: 0.84rem; display:flex; flex-direction:column; gap:6px; color: var(--body-text);">
                ${pkg.exclusions.map(exc => `<li>✕ ${exc}</li>`).join('')}
              </ul>
            </div>
          </div>

          <!-- Action Footer -->
          <div style="display:flex; justify-content: space-between; align-items:center; flex-wrap:wrap; gap:16px; padding-top:20px; border-top:1px solid var(--border-color);">
            <div>
              <span style="font-size:0.75rem; color:var(--muted-text); text-transform:uppercase;">Price Transparency</span>
              <div style="font-size:1.3rem; font-weight:700; color:var(--primary-burgundy);">${pkg.pricing}</div>
              <small style="font-size:0.78rem; color:var(--muted-text);">${pkg.pricingNote}</small>
            </div>
            <div style="display:flex; gap:10px;">
              <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
                Chat on WhatsApp
              </a>
              <a href="tel:+919500360969" class="btn btn-call">
                Call G.Naveen Kumar
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    modal.querySelector('#close-pkg-modal').addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  };

  /**
   * Modal trigger for "Book a Taxi" button in header
   */
  window.openTaxiModal = function(defaultTripType, defaultCar) {
    let modal = document.getElementById('header-taxi-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'header-taxi-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    const selectedTrip = defaultTripType || 'Local';
    const isRoundTrip = selectedTrip === 'Round Trip';

    modal.innerHTML = `
      <div class="modal-content" style="max-width: 640px; padding: 28px;">
        <button class="modal-close-btn" id="close-taxi-modal" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="booking-card" style="box-shadow:none; padding:0; border:none;">
          <div class="booking-card-header">
            <span class="booking-badge">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:-1px; margin-right:4px;"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></svg>
              <span>Coimbatore Taxi Services</span>
            </span>
            <h2 class="booking-title">Book Your Taxi</h2>
            <p class="booking-desc">Request sent directly via WhatsApp to G.Naveen Kumar (+91 95003 60969)</p>
          </div>

          <form class="taxi-booking-form" name="modal-taxi-booking" method="POST" data-netlify="true" netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="modal-taxi-booking">
            <p style="display:none;"><label>Don't fill this out: <input name="bot-field"></label></p>
            <input type="hidden" name="tripType" value="${selectedTrip}">

            <div class="trip-type-selector">
              <button type="button" class="trip-type-btn ${selectedTrip === 'Local' ? 'active' : ''}" data-trip-type="Local">Local</button>
              <button type="button" class="trip-type-btn ${selectedTrip === 'Airport Transfer' ? 'active' : ''}" data-trip-type="Airport Transfer">Airport</button>
              <button type="button" class="trip-type-btn ${selectedTrip === 'Outstation One-Way' ? 'active' : ''}" data-trip-type="Outstation One-Way">One-Way</button>
              <button type="button" class="trip-type-btn ${isRoundTrip ? 'active' : ''}" data-trip-type="Round Trip">Round Trip</button>
            </div>

            <div class="form-grid">
              <div class="form-group full-width">
                <label class="form-label">Full Name <span class="required">*</span></label>
                <div class="input-icon-wrapper">
                  <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  <input type="text" name="customerName" class="form-control" placeholder="Your Name" required>
                </div>
              </div>

              <div class="form-group full-width">
                <label class="form-label">Mobile Number <span class="required">*</span></label>
                <div class="input-icon-wrapper">
                  <svg viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  <input type="tel" name="mobileNumber" class="form-control" placeholder="10-digit Mobile Number" required>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Pickup Location <span class="required">*</span></label>
                <div class="input-icon-wrapper">
                  <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  <input type="text" name="pickupLocation" class="form-control" placeholder="${selectedTrip === 'Airport Transfer' ? 'e.g. Coimbatore Airport (CJB) / Hotel' : 'e.g. Coimbatore Airport / Gandhipuram'}" required>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Drop-off Location <span class="required">*</span></label>
                <div class="input-icon-wrapper">
                  <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  <input type="text" name="dropLocation" class="form-control" placeholder="${selectedTrip === 'Airport Transfer' ? 'e.g. Ooty / Munnar / RS Puram' : 'e.g. Ooty, Munnar, RS Puram'}" required>
                </div>
              </div>

              <div class="form-group" style="overflow:hidden !important; width:100% !important; max-width:100% !important; box-sizing:border-box !important;">
                <label class="form-label">Travel Date <span class="required">*</span></label>
                <input type="date" name="travelDate" class="form-control no-icon" style="width:100% !important; max-width:100% !important; min-width:0 !important; box-sizing:border-box !important; font-size:16px !important;" required>
              </div>

              <div class="form-group" style="overflow:hidden !important; width:100% !important; max-width:100% !important; box-sizing:border-box !important;">
                <label class="form-label">Pickup Time <span class="required">*</span></label>
                <input type="time" name="pickupTime" class="form-control no-icon" style="width:100% !important; max-width:100% !important; min-width:0 !important; box-sizing:border-box !important; font-size:16px !important;" required>
              </div>

              <div class="form-group return-date-group full-width" style="display:${isRoundTrip ? 'flex' : 'none'}; overflow:hidden !important; width:100% !important; max-width:100% !important; box-sizing:border-box !important;">
                <label class="form-label">Return Date <span class="required">*</span></label>
                <input type="date" name="returnDate" class="form-control no-icon" style="width:100% !important; max-width:100% !important; min-width:0 !important; box-sizing:border-box !important; font-size:16px !important;" ${isRoundTrip ? 'required' : ''}>
              </div>

              <div class="form-group full-width">
                <label class="form-label">Select Car Type</label>
                <select name="passengers" class="form-control no-icon">
                  <option value="Sedan (Swift / Etios)" ${(!defaultCar || defaultCar === 'Sedan' || defaultCar === '1-4' || defaultCar === 'Sedan (Swift / Etios)') ? 'selected' : ''}>Sedan (Swift / Etios)</option>
                  <option value="MUV (Ertiga / Rumion)" ${(defaultCar === 'MUV' || defaultCar === 'MUV (Ertiga / Rumion)') ? 'selected' : ''}>MUV (Ertiga / Rumion)</option>
                  <option value="SUV (Innova / Innova Crysta / Hycross)" ${(defaultCar === 'SUV' || defaultCar === '5-7' || defaultCar === 'SUV (Innova / Innova Crysta / Hycross)') ? 'selected' : ''}>SUV (Innova / Innova Crysta / Hycross)</option>
                  <option value="Maxi cab (Tempo Traveller / Urbania / Coach)" ${(defaultCar === 'Maxi cab' || defaultCar === '8-12' || defaultCar === 'Maxi cab (Tempo Traveller / Urbania / Coach)') ? 'selected' : ''}>Maxi cab (Tempo Traveller / Urbania / Coach)</option>
                  <option value="Bus (Mini Bus / Bus)" ${(defaultCar === 'Bus' || defaultCar === '13+' || defaultCar === 'Bus (Mini Bus / Bus)') ? 'selected' : ''}>Bus (Mini Bus / Bus)</option>
                </select>
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-submit-booking" style="width:100%; display:flex; align-items:center; justify-content:center; gap:8px;">
              <span>Book Taxi on WhatsApp</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.2.662.589 1.221.771 1.394.858.173.086.274.072.375-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/></svg>
            </button>
            <p class="form-footnote" style="text-align:center; margin-top:10px; display:flex; align-items:center; justify-content:center; gap:6px;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#C5A059"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
              <span>Direct VIP routing to G.Naveen Kumar (+91 95003 60969)</span>
            </p>
          </form>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Set dates and times
    const form = modal.querySelector('form');
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const dateInput = form.querySelector('input[name="travelDate"]');
    if (dateInput) {
      dateInput.min = todayStr;
      dateInput.value = tomorrowStr;
    }

    const timeInput = form.querySelector('input[name="pickupTime"]');
    if (timeInput && !timeInput.value) {
      timeInput.value = '09:00';
    }

    const returnDateInput = form.querySelector('input[name="returnDate"]');
    if (returnDateInput) {
      const returnDate = new Date();
      returnDate.setDate(returnDate.getDate() + 2);
      returnDateInput.min = tomorrowStr;
      returnDateInput.value = returnDate.toISOString().split('T')[0];
    }

    // Bind tab clicks inside this modal
    const tripBtns = modal.querySelectorAll('.trip-type-btn');
    const tripTypeInput = form.querySelector('input[name="tripType"]');
    const returnDateGroup = form.querySelector('.return-date-group');

    tripBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        tripBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const type = this.dataset.tripType;
        if (tripTypeInput) tripTypeInput.value = type;

        if (returnDateGroup) {
          if (type === 'Round Trip') {
            returnDateGroup.style.display = 'flex';
            const rInput = returnDateGroup.querySelector('input');
            if (rInput) rInput.required = true;
          } else {
            returnDateGroup.style.display = 'none';
            const rInput = returnDateGroup.querySelector('input');
            if (rInput) rInput.required = false;
          }
        }
      });
    });

    modal.querySelector('#close-taxi-modal').addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  };

  /**
   * Terms & Privacy Policy Modal
   */
  window.openLegalModal = function(type) {
    let modal = document.getElementById('legal-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'legal-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    const isPrivacy = type === 'privacy';
    const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions of Service';

    modal.innerHTML = `
      <div class="modal-content" style="max-width: 720px; padding: 36px 30px;">
        <button class="modal-close-btn" id="close-legal-modal" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h2 style="font-size: 1.6rem; color: var(--deep-wine); margin-bottom: 16px;">${title}</h2>
        <div style="font-size: 0.88rem; color: var(--body-text); line-height: 1.7; max-height: 60vh; overflow-y: auto; padding-right: 12px;">
          ${isPrivacy ? `
            <p><strong>1. Data Collection & Purpose</strong><br>ZORRO HOLIDAYS collects customer names, phone numbers, travel dates, and destination preferences exclusively for booking verification, dispatching vehicles, and planning holiday itineraries.</p>
            <p style="margin-top:12px;"><strong>2. Information Protection</strong><br>We respect your privacy. Customer information is never sold, leased, or distributed to unauthorized third parties. Booking details are accessed strictly by Naveen and authorized dispatch coordinators.</p>
            <p style="margin-top:12px;"><strong>3. Direct Communication</strong><br>By submitting a booking or inquiry form, you consent to receive direct operational updates via phone call or WhatsApp from +91 95003 60969.</p>
          ` : `
            <p><strong>1. Booking Confirmation Status</strong><br>A taxi booking or holiday tour request submitted through this website is an enquiry and remains pending until confirmed by Naveen. Confirmation is subject to vehicle availability and schedule validation.</p>
            <p style="margin-top:12px;"><strong>2. Pricing & Quotes</strong><br>Quotes for outstation journeys, domestic tour packages, and international travel are provided transparently based on client specifications, group size, and vehicle choice. No hidden fees are charged.</p>
            <p style="margin-top:12px;"><strong>3. Safety & Punctuality</strong><br>Our drivers are professional, background-verified, and experienced on hill roads. Passengers are expected to comply with safety regulations and travel guidelines.</p>
          `}
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    modal.querySelector('#close-legal-modal').addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initHeaderScroll();
  });
})();
