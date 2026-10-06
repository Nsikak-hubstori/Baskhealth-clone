import "./globals.css";
import { TRPCProvider } from "../lib/trpc-provider";
export const metadata = { title: "Bask Lite - Shopify for Telehealth" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><TRPCProvider>{children}</TRPCProvider></body></html>);
}
