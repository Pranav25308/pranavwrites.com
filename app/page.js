'use client';

import { useEffect, useState } from 'react';
import Home from '@/components/user/Home';
import { DUMMY_ROLES } from '@/app/admin/data';

export default function HomePage() {
  const [typedText, setTypedText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [filteredReviews, setFilteredReviews] = useState([]);

  const roles = DUMMY_ROLES;

  useEffect(() => {
    let active = true;
    fetch('/api/reviews?limit=6')
      .then((res) => res.json())
      .then((data) => {
        if (active) setFilteredReviews(data.reviews || []);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Typing animation
  useEffect(() => {
    if (!roles || roles.length === 0) return;
    const currentRole = roles[currentRoleIndex];
    if (!currentRole) return;
    let charIndex = 0;
    let isDeleting = false;

    const typeInterval = setInterval(
      () => {
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
      },
      isDeleting ? 50 : 100
    );

    return () => clearInterval(typeInterval);
  }, [currentRoleIndex, roles]);

  return (
    <Home
      typedText={typedText}
      filteredReviews={filteredReviews}
    />
  );
}
