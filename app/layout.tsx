import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TalentDash',
  description: 'Structured career intelligence for compensation, interviews, and company comparisons.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-app text-deep font-inter">
        <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  );
}
