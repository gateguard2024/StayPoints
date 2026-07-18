import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "StayPoints",
    template: "%s | StayPoints",
  },
  description:
    "Earn rewards for being an awesome resident. StayPoints is the gamified loyalty platform that makes renting rewarding.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "StayPoints",
  },
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
  openGraph: {
    title: "StayPoints",
    description: "Earn rewards for being an awesome resident.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1628",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen" style={{ background: "var(--page-bg)", color: "var(--text-primary)" }}>
        {children}
      </body>
    </html>
  );
}
