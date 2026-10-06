import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F7F5F2] antialiased">{children}</body>
    </html>
  );
}
