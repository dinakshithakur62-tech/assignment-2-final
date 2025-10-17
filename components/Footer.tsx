'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const studentName = process.env.NEXT_PUBLIC_STUDENT_NAME || 'Your Name';
  const studentNumber = process.env.NEXT_PUBLIC_STUDENT_NUMBER || '123456789';

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="text-center md:text-left">
            <p>&copy; {currentYear} {studentName}. All rights reserved.</p>
            <p>Student Number: {studentNumber}</p>
          </div>
          <div className="text-center md:text-right">
            <p>{currentDate}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
