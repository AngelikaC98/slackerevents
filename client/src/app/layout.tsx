// ------------ Imports ---------------
import type { ReactNode } from "react";
import "@/styles/global.css";
import Footer from "@/components/Footer/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
