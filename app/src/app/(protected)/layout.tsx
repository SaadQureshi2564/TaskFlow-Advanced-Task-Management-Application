import Navbar from '@/components/shared/Navbar';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4">{children}</main>
      <footer className="bg-gray-800 p-4 text-center text-sm text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
