'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
import { BookOpen, Code2, Trophy, Scale, Layout } from 'lucide-react';
import { setCookie, getCookie } from '@/lib/cookies';

export default function Home() {
  useEffect(() => {
    setCookie('lastVisitedPage', '/');
    const lastPage = getCookie('lastVisitedPage');
    console.log('Last visited page:', lastPage);
  }, []);

  const features = [
    {
      name: 'About',
      description: 'Learn more about this project and the developer',
      icon: BookOpen,
      href: '/about',
      color: 'bg-blue-500',
    },
    {
      name: 'Tabs Generator',
      description: 'Create dynamic tabbed interfaces with custom content',
      icon: Layout,
      href: '/tabs',
      color: 'bg-green-500',
    },
    {
      name: 'Escape Room',
      description: 'Code your way out through challenging programming puzzles',
      icon: Code2,
      href: '/escape-room',
      color: 'bg-orange-500',
    },
    {
      name: 'Coding Races',
      description: 'Compete in timed coding challenges',
      icon: Trophy,
      href: '/coding-races',
      color: 'bg-purple-500',
    },
    {
      name: 'Court Room',
      description: 'Debug code under pressure with consequences',
      icon: Scale,
      href: '/court-room',
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Interactive Coding Platform
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Enhance your programming skills through interactive challenges and tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.name}
              href={feature.href}
              className="group block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:scale-105"
            >
              <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="text-white" size={24} />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
          Getting Started
        </h2>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Navigate through different features using the menu or cards above</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Toggle between light and dark mode for comfortable viewing</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Your last visited page is remembered for easy navigation</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>All interfaces are keyboard accessible and screen reader friendly</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
