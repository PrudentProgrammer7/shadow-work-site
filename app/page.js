import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold">Shadow Work Interactive Journal</h1>
      <p className="mt-4 text-lg text-gray-300">
        Explore your subconscious through interactive prompts.
      </p>
      <Link href="/prompts">
        <button className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg">
          Start Your Journey
        </button>
      </Link>
    </div>
  );
}
