/**
 * ZORRO HOLIDAYS - Central Official Configuration
 * Tagline: Explore Beyond Limits
 * Contact Person: G.Naveen Kumar
 * Email: Zorroholidayss@gmail.com
 * Phone & WhatsApp: +91 95003 60969
 */

const ZORRO_CONFIG = {
  brandName: "ZORRO HOLIDAYS",
  tagline: "Explore Beyond Limits",
  contactPerson: "G.Naveen Kumar",
  email: "Zorroholidayss@gmail.com",
  phoneDisplay: "+91 95003 60969",
  phoneTel: "+919500360969",
  whatsappNumber: "919500360969",
  whatsappUrlBase: "https://wa.me/919500360969",

  // Secondary Contact
  secondaryContact: {
    name: "S.Ajay Kumar",
    phoneDisplay: "+91 90872 87965",
    phoneTel: "+919087287965",
    whatsappNumber: "919087287965",
    whatsappUrl: "https://wa.me/919087287965"
  },

  // Simple pre-filled messages
  messages: {
    taxi: "Hello, I want to book a taxi in Coimbatore with Zorro Holidays.",
    domestic: "Hello, I want details about your domestic tour packages.",
    international: "Hello, I want details about your international tour packages.",
    temple: "Hello, I want details about your temple tour packages.",
    honeymoon: "Hello, I want details about your honeymoon tour packages.",
    customTrip: "Hello, please help me plan a custom tour trip.",
    destination: (destinationName) => 
      `Hello, please share the full itinerary and price quote for the ${destinationName} tour package from Zorro Holidays.`,
    taxiBookingDetail: (ref, name, phone, pickup, drop, date, time, tripType, carType, returnDate) => {
      let carLabel = carType || 'Sedan (Swift / Etios)';
      if (carLabel === '1-4' || carLabel === 'Sedan') carLabel = 'Sedan (Swift / Etios)';
      else if (carLabel === 'MUV') carLabel = 'MUV (Ertiga / Rumion)';
      else if (carLabel === '5-7' || carLabel === 'SUV') carLabel = 'SUV (Innova / Innova Crysta / Hycross)';
      else if (carLabel === '8-12' || carLabel === 'Maxi cab') carLabel = 'Maxi cab (Tempo Traveller / Urbania / Coach)';
      else if (carLabel === '13+' || carLabel === 'Bus') carLabel = 'Bus (Mini Bus / Bus)';

      let msg = `*Taxi Booking Request - ZORRO HOLIDAYS* 🚕\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `📌 *Booking Ref:* ${ref}\n`;
      msg += `👤 *Customer Name:* ${name}\n`;
      msg += `📱 *Phone Number:* ${phone}\n`;
      msg += `🚕 *Trip Type:* ${tripType}\n`;
      msg += `📍 *Pickup Location:* ${pickup}\n`;
      msg += `🏁 *Drop Location:* ${drop}\n`;
      msg += `📅 *Travel Date:* ${date}\n`;
      msg += `⏰ *Pickup Time:* ${time}\n`;
      if (returnDate) {
        msg += `🔄 *Return Date:* ${returnDate}\n`;
      }
      msg += `🚗 *Car Selected:* ${carLabel}\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `Please confirm cab availability and driver details. Thank you!`;
      return msg;
    },
    ticketBookingDetail: (ref, data) => {
      let msg = `*Ticket Booking Enquiry - ZORRO HOLIDAYS* 🎫\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `📌 *Enquiry Ref:* ${ref}\n`;
      msg += `👤 *Customer Name:* ${data.customerName}\n`;
      msg += `📱 *Phone Number:* ${data.mobileNumber}\n`;
      msg += `✈️ *Service Type:* ${data.transportType} Ticket Booking\n`;
      msg += `📍 *From:* ${data.fromLocation}\n`;
      msg += `🏁 *To / Destination:* ${data.toLocation}\n`;
      msg += `📅 *Departure Date:* ${data.travelDate}\n`;
      if (data.tripType === 'Round Trip' && data.returnDate) {
        msg += `🔄 *Return Date:* ${data.returnDate}\n`;
      }
      msg += `👥 *Passengers:* ${data.passengers}\n`;
      if (data.travelClass) {
        msg += `💺 *Preferred Class / Type:* ${data.travelClass}\n`;
      }
      if (data.notes) {
        msg += `📝 *Notes:* ${data.notes}\n`;
      }
      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `Please verify route options, fare quote, and availability. Thank you!`;
      return msg;
    },
    visaAssistanceDetail: (ref, data) => {
      let msg = `*Visa Assistance Enquiry - ZORRO HOLIDAYS* 🛂\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `📌 *Enquiry Ref:* ${ref}\n`;
      msg += `👤 *Applicant Name:* ${data.customerName}\n`;
      msg += `📱 *Phone Number:* ${data.mobileNumber}\n`;
      msg += `🌍 *Destination Country:* ${data.country}\n`;
      msg += `📋 *Visa Category:* ${data.visaType}\n`;
      msg += `📅 *Intended Travel Date:* ${data.travelDate}\n`;
      msg += `👥 *Number of Applicants:* ${data.applicants}\n`;
      if (data.notes) {
        msg += `📝 *Additional Details:* ${data.notes}\n`;
      }
      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `Please provide the document checklist, processing timeline, and assistance guidance. Thank you!`;
      return msg;
    },
    forexExchangeDetail: (ref, data) => {
      let msg = `*Currency Exchange Enquiry - ZORRO HOLIDAYS* 💱\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `📌 *Enquiry Ref:* ${ref}\n`;
      msg += `👤 *Customer Name:* ${data.customerName}\n`;
      msg += `📱 *Phone Number:* ${data.mobileNumber}\n`;
      msg += `🔄 *Transaction Type:* ${data.action} Foreign Currency\n`;
      msg += `💵 *Selected Currency:* ${data.currency}\n`;
      msg += `💰 *Foreign Amount:* ${data.currencyAmount} ${data.currencyCode}\n`;
      if (data.inrEstimate) {
        msg += `🇮🇳 *Approx. INR Value:* ₹${data.inrEstimate} (Indicative)\n`;
      }
      msg += `📅 *Preferred Date:* ${data.transactionDate}\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `Please share current rate quote, KYC requirements, and availability in Coimbatore. Thank you!`;
      return msg;
    },
    customTripDetail: (ref, data) => {
      let msg = `*Custom Trip Enquiry - ZORRO HOLIDAYS* 🌴\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `📌 *Enquiry Ref:* ${ref}\n`;
      msg += `👤 *Customer Name:* ${data.customerName}\n`;
      msg += `📱 *Phone Number:* ${data.mobileNumber}\n`;
      msg += `📍 *Destination:* ${data.destination} (${data.tourType || 'Custom Tour'})\n`;
      msg += `📅 *Departure Date:* ${data.departureDate}\n`;
      if (data.returnDate) {
        msg += `🔄 *Return Date:* ${data.returnDate}\n`;
      }
      msg += `👥 *Guests:* ${data.adults} Adults${data.children && data.children !== '0' && data.children !== '0 Children' ? `, ${data.children} Children` : ''}\n`;
      if (data.budget) {
        msg += `💰 *Budget Category:* ${data.budget}\n`;
      }
      if (data.hotelPreference) {
        msg += `🏨 *Accommodation Style:* ${data.hotelPreference}\n`;
      }
      if (data.foodPreference) {
        msg += `🍽️ *Meals:* ${data.foodPreference}\n`;
      }
      if (data.specialRequests) {
        msg += `📝 *Special Requests:* ${data.specialRequests}\n`;
      }
      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `Please prepare a personalized day-wise itinerary and quote. Thank you!`;
      return msg;
    },
    generalContactDetail: (ref, data) => {
      let msg = `*Quick Enquiry - ZORRO HOLIDAYS* 📩\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `📌 *Enquiry Ref:* ${ref}\n`;
      msg += `👤 *Name:* ${data.name}\n`;
      msg += `📱 *Phone Number:* ${data.phone}\n`;
      msg += `🏷️ *Enquiry About:* ${data.subject}\n`;
      msg += `📝 *Message:* ${data.message}\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `Please reply with details. Thank you!`;
      return msg;
    }
  },

  /**
   * Helper to generate encoded WhatsApp URL
   */
  getWhatsAppUrl(message) {
    return `${this.whatsappUrlBase}?text=${encodeURIComponent(message)}`;
  },

  /**
   * Helper to generate destination-specific WhatsApp URL
   */
  getDestinationWhatsAppUrl(destinationName) {
    return this.getWhatsAppUrl(this.messages.destination(destinationName));
  }
};

// Export to window
if (typeof window !== "undefined") {
  window.ZORRO_CONFIG = ZORRO_CONFIG;
}
