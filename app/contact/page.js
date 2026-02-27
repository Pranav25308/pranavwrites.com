 'use client';

import { useEffect, useState } from 'react';
import Contact from "@/components/user/Contact";

export default function ContactPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDarkMode(localStorage.getItem('darkMode') === 'true');
    }
  }, []);

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
      darkMode={darkMode}
    />
  );
}
