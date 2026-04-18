'use client';

import About from '@/components/user/About';
import { DUMMY_ABOUT, SKILLS, WORK_EXPERIENCE, DOMAINS } from '@/app/about/data';

export default function AboutPage() {
  return (
    <About
      aboutContent={DUMMY_ABOUT}
      skills={SKILLS}
      workExperience={WORK_EXPERIENCE}
      domains={DOMAINS}
    />
  );
}
