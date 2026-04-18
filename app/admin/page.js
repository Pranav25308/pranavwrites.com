'use client';

import Link from 'next/link';

export default function AdminIndexPage() {
  const links = [
    { href: '/admin/analytics', label: 'Analytics' },
    { href: '/admin/users', label: 'Users' },
    { href: '/admin/settings', label: 'Settings' }
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      <ul className="grid gap-4 sm:grid-cols-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="block p-6 rounded-lg border border-slate-200 hover:border-purple-500 transition-colors"
            >
              <span className="text-lg font-semibold">{l.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
