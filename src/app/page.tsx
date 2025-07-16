import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <Hero />
    </main>
  );
}
