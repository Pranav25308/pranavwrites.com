'use client';

import { useState } from 'react';
import Contact from '@/components/user/Contact';

export default function ContactPage() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully! (Demo - no backend)');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Contact
      contactForm={contactForm}
      setContactForm={setContactForm}
      handleContactSubmit={handleContactSubmit}
    />
  );
}
