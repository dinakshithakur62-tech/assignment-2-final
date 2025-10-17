'use client';

import { useEffect } from 'react';
import { Scale } from 'lucide-react';
import { setCookie } from '@/lib/cookies';

export const dynamic = 'force-dynamic';

export default function CourtRoomPage() {
  useEffect(() => {
    setCookie('lastVisitedPage', '/court-room');
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Court Room
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 border border-gray-200 dark:border-gray-700 text-center">
        <Scale size={64} className="mx-auto mb-4 text-gray-400" />
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Coming Soon
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Debug code under pressure with messages and consequences.
        </p>
      </div>
    </div>
  );
}
