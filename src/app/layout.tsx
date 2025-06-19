import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}>
        <Providers>
          <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="hidden md:flex md:flex-shrink-0">
              <div className="flex w-64 flex-col">
                <div className="flex min-h-0 flex-1 flex-col bg-gray-900">
                  <div className="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
                    <h1 className="text-xl font-bold text-white">AthenaOS</h1>
                  </div>
                  <Navigation />
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="flex flex-1 flex-col overflow-hidden">
              <main className="flex-1 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

// Import the Navigation component at the bottom to avoid circular dependencies
import Navigation from "@/components/Navigation";
