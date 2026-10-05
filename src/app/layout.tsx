import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import BackToTop from "@/components/layout/BackToTop";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "IJITMES — Peer-Reviewed Open Access Journal",
    template: "%s | IJITMES",
  },
  description:
    "International Journal of Innovative Technologies and Modern Trends in Engineering and Science. A peer-reviewed, open-access, monthly journal. Acceptance in 7–8 hours, publication within 1–2 days at just ₹449.",
  keywords: [
    "IJITMES",
    "research journal",
    "engineering journal",
    "open access",
    "peer reviewed",
    "publish research paper",
    "fast publication",
  ],
  icons: { icon: "/images/live/logo.jpg", apple: "/images/live/logo.jpg" },
};

/* Applies the saved palette before first paint so there is no flash. */
const themeScript = `(function(){try{var t=localStorage.getItem("ijitmes-theme");if(t==="classic"||t==="signature"){document.documentElement.dataset.theme=t;}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="signature"
      className={`${fraunces.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <ScrollProgress />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ThemeSwitcher />
        <BackToTop />
      </body>
    </html>
  );
}
