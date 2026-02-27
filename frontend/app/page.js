'use client';

import { useState, useEffect } from 'react';
import Home from './components/user/Home';
import { DUMMY_ROLES } from '@/app/admin/data';
import { DUMMY_REVIEWS } from '@/app/reviews/data';

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const roles = DUMMY_ROLES;
  const filteredReviews = DUMMY_REVIEWS.slice(0, 6);

  // Typing animation effect
  useEffect(() => {
    if (roles.length === 0) return;
    const currentRole = roles[currentRoleIndex];
    if (!currentRole) return;
    let charIndex = 0;
    let isDeleting = false;
    
    const typeInterval = setInterval(() => {
      if (!isDeleting && charIndex <= currentRole.title.length) {
        setTypedText(currentRole.title.substring(0, charIndex));
        charIndex++;
      } else if (charIndex > currentRole.title.length && !isDeleting) {
        setTimeout(() => {
          isDeleting = true;
        }, 2000);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTypedText(currentRole.title.substring(0, charIndex));
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        clearInterval(typeInterval);
      }
    }, isDeleting ? 50 : 100);

    return () => clearInterval(typeInterval);
  }, [currentRoleIndex, roles]);

  // Initialize dark mode
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedDarkMode = localStorage.getItem('darkMode') === 'true';
      setDarkMode(savedDarkMode);
    }
  }, []);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', darkMode.toString());
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-slate-950 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-purple-50/30 to-cyan-50/30 text-slate-900'
    }`}>
      <main className="container mx-auto px-4 py-8">
        <Home 
          typedText={typedText}
          filteredReviews={filteredReviews}
          darkMode={darkMode}
        />
      </main>
    </div>
  );
}
