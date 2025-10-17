'use client';

import { useEffect } from 'react';
import { Video, User, Hash } from 'lucide-react';

export const dynamic = 'force-dynamic';
import { setCookie } from '@/lib/cookies';

export default function AboutPage() {
  useEffect(() => {
    setCookie('lastVisitedPage', '/about');
  }, []);

  const studentName = process.env.NEXT_PUBLIC_STUDENT_NAME || 'Your Name';
  const studentNumber = process.env.NEXT_PUBLIC_STUDENT_NUMBER || '123456789';

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        About This Project
      </h1>

      <div className="grid gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-500 w-10 h-10 rounded-lg flex items-center justify-center">
              <User className="text-white" size={20} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Student Information
            </h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User size={18} className="text-gray-500 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Name:</strong> {studentName}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Hash size={18} className="text-gray-500 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Student Number:</strong> {studentNumber}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-500 w-10 h-10 rounded-lg flex items-center justify-center">
              <Video className="text-white" size={20} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Usage Video
            </h2>
          </div>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-8 text-center">
            <Video size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400">
              Video demonstration will be embedded here
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Duration: 3-8 minutes
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Project Overview
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This interactive coding platform was developed as part of Assignment 2, demonstrating
            proficiency in modern web development technologies and best practices.
          </p>
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            Technologies Used
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Next.js 14+</strong> with App Router and TypeScript</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Prisma ORM</strong> for type-safe database operations</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>PostgreSQL</strong> for data persistence</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Docker</strong> for containerization and orchestration</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Playwright</strong> for automated end-to-end testing</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Tailwind CSS</strong> for responsive styling</span>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Key Features
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Dynamic tabs generator with HTML5 output</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Escape Room with multi-stage coding challenges</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Dark mode support with localStorage persistence</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Cookie-based navigation memory</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Full WCAG 2.1 AA accessibility compliance</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Database integration with CRUD operations</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Automated testing with Playwright</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Instrumentation for observability and monitoring</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
