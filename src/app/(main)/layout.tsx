import Link from 'next/link';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
   
      <main >
        {children}
      </main>
    </div>
  );
}
