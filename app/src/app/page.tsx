import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to TaskFlow</h1>
        <p className="text-xl mb-8">
          Streamline your workflow, boost productivity, and collaborate seamlessly with your team.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/auth/signin" 
            className="btn btn-primary"
          >
            Get Started
          </Link>
          <Link 
            href="/dashboard" 
            className="btn btn-secondary"
          >
            View Demo
          </Link>
        </div>
      </div>
    </main>
  );
}
