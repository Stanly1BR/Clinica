import Sidebar from "@/components/slidebar/Sidebar";
import "./globals.css";
import QueryProvider from "@/utils/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-full flex flex-col md:flex-row">
        <QueryProvider>
          <Sidebar />
          <div className="flex-1 bg-zinc-900/50">
          {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
