import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/utils/constants";
import { organizationSchema } from "@/lib/seo/structured-data";
import { getAllSettings } from "@/lib/database/content";
import ChatWidget from "@/components/chatbot/ChatWidget";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} 2026 – Cities, Areas & Live Valuations`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Explore UK cities and areas, see prices, rental yields, and 5-year growth projections. Get an instant property valuation.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getAllSettings();
  const isDark = settings.theme_mode === "dark";

  return (
    <html lang="en" className={isDark ? "dark" : ""}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
