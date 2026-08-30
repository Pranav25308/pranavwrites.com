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
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      if (res.ok) {
        setStatus({ type: 'success', text: "Message sent successfully! I'll get back to you soon." });
        setContactForm({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await res.json();
        setStatus({ type: 'error', text: data.error || 'Failed to send message. Please try again.' });
      }
    } catch {
      setStatus({ type: 'error', text: 'Failed to send message. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Contact
      contactForm={contactForm}
      setContactForm={setContactForm}
      handleContactSubmit={handleContactSubmit}
      status={status}
      submitting={submitting}
    />
  );
}
