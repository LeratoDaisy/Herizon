import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Herizon — Turn what you have into what's next",
  description: "A financial and economic empowerment prototype for women.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
