export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="container mx-auto py-6 px-6">
        {children}
      </main>
    </div>
  );
}
