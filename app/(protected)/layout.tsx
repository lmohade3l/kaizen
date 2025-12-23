import { FooterNav } from "@/components/footer-nav";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-[100vh]">
      <header className="flex-shrink-0 p-4">header</header>
      <main className="flex-1 overflow-y-auto px-4">
        {children}
      </main>
      <FooterNav />
    </div>
  );
}