import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h2 className="text-3xl font-bold">Page Not Found</h2>
      <p className="mt-4 text-gray-500">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Link
        href="/"
        className="mt-8 px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
      >
        Go Home
      </Link>
    </div>
  );
}
