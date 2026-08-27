import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "The Unlikely Lab",
    template: "%s | The Unlikely Lab",
  },
  description:
    "The Unlikely Lab — research in machine learning, density estimation, anomaly detection, and collider physics.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
