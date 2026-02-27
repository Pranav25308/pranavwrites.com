'use client';

import { useEffect, useState } from 'react';
import About from "@/app/components/user/About";
import { DUMMY_ABOUT, SKILLS, WORK_EXPERIENCE, DOMAINS } from "@/app/about/data";

export default function AboutPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDarkMode(localStorage.getItem('darkMode') === 'true');
    }
  }, []);

  return (
    <About
      aboutContent={DUMMY_ABOUT}
      skills={SKILLS}
      workExperience={WORK_EXPERIENCE}
      domains={DOMAINS}
      darkMode={darkMode}
    />
  );
}
