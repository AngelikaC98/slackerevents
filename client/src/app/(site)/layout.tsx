"use client";
// ------------ Imports ---------------
import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { useConnectionStatus } from "../../hooks/connectionStatus";
import Navigation from "@/components/Navigation/navigation";
import { usePathname } from "next/navigation";

// -----------------------------
// Constants
// -----------------------------
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * SiteLayout
 * ----------
 * Provides global layout for the site, including:
 * - Backend connection check
 * - SessionProvider for authentication
 * - Navigation bar
 * - Main content area
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  // Check backend connection status
  const status = useConnectionStatus(apiUrl);
  const pathname = usePathname();
  const hideNavigation =
    pathname?.startsWith("/all-events/") || pathname === "/login";

  // Show loading or error if backend is not ready
  if (status === "checking")
    return (
      <p className="text-center mt-10">🔄 Checking backend connection...</p>
    );

  if (status === "disconnected") {
    return (
      <div className="text-center text-red-600 mt-10">
        <h2>❌ No connection to backend</h2>
        <p>Check your Directus server or NEXT_PUBLIC_API_URL</p>
      </div>
    );
  }

  // Render layout with session and navigation
  return (
    <SessionProvider>
      {!hideNavigation && <Navigation />}
      <main className="min-h-screen">{children}</main>
    </SessionProvider>
  );
}
