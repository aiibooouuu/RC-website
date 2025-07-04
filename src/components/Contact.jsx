import React from 'react';
import { Mail, Phone, Instagram, MessageCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const sendWhatsAppMessage = (number) => {
    const message = `Hello Rotaract CRCE team,\nI would like more information about your activities.`;
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info">
            <div className="rotary-info">
              <p className="rotary-title">Rotary Club of Bandra and Rotaract Mumbai</p>
              <p className="rotary-details">RI District 3141 | Zone 1A</p>
            </div>
            <div className="whatsapp-section">
              <h4>Quick Connect via WhatsApp</h4>
              <div className="whatsapp-buttons">
                <button onClick={() => sendWhatsAppMessage('+91 9022418384')}>
                  <div className="button-content">
                    <div className="icon-circle">
                      <MessageCircle className="icon" />
                    </div>
                    <div className="button-text">
                      <p>Contact RC CRCE</p>
                    </div>
                  </div>
                  <span>💬 Chat Now</span>
                </button>
              </div>
            </div>
            <div className="social-section">
              <h4>Connect With Us</h4>
              <div className="social-icons">
                <a href="https://www.instagram.com/rotaract_crce" target="_blank" rel="noopener noreferrer">
                  <Instagram className="icon" />
                </a>
                <a href="mailto:rotaractcrce@gmail.com">
                  <Mail className="icon" />
                </a>
                <a href="tel:+91 9022418384">
                  <Phone className="icon" />
                </a>
              </div>
            </div>
            <p className='reserved'>© 2025 Rotaract CRCE | All rights reserved.</p>
          </div>
          {/* Location */}
          <div className="location-section">
            <div className="location-info"></div>
            <div className="map-container">
              <iframe
                title="FR CRCE Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.441013713026!2d72.81779557492925!3d19.04433805296634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9410830616d%3A0x111b63353dbbce01!2sFr.%20Conceicao%20Rodrigues%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1748863436551!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-creators-bar">
        Website created by AbuHamza and Zeon Dsouza
      </div>
    </section>
  );
};

export default Contact;