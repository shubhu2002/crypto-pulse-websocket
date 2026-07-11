import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WebSocketProvider } from "@/hooks/useWebSocket";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CryptoPulse — Live WebSocket Prices",
  description:
    "Real-time multi-coin crypto dashboard powered by WebSockets. Track Bitcoin, Ethereum and more with live price charts, sparklines, and instant alerts.",
  keywords: [
    "crypto",
    "bitcoin",
    "ethereum",
    "websocket",
    "real-time",
    "dashboard",
    "cryptocurrency",
    "live prices",
  ],
  authors: [{ name: "CryptoPulse" }],
  metadataBase: new URL("https://crypto-pulse-websocket-ten.vercel.app"),
  openGraph: {
    title: "CryptoPulse — Live WebSocket Prices",
    description:
      "Real-time multi-coin crypto dashboard powered by WebSockets.",
	  
    type: "website",
    siteName: "CryptoPulse",
    images: [
      {
        url: "https://crypto-pulse-websocket-ten.vercel.app/og-image.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CryptoPulse — Live WebSocket Prices",
    description:
      "Real-time multi-coin crypto dashboard powered by WebSockets.",
    images: ["https://crypto-pulse-websocket-ten.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <WebSocketProvider>{children}</WebSocketProvider>
      </body>
    </html>
  );
}
