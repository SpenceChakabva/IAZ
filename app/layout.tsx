import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/seo";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import Transition from "@/components/Transition";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["400", "500"],
  display: "swap",
});

const DESCRIPTION =
  "The Institute of Architects of Zimbabwe keeps the register of persons entitled to practise, upholds the standard of qualification, and speaks for the built environment — since 1924.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Institute of Architects of Zimbabwe",
    template: "%s · Institute of Architects of Zimbabwe",
  },
  description: DESCRIPTION,
  applicationName: "Institute of Architects of Zimbabwe",
  keywords: [
    "Institute of Architects of Zimbabwe",
    "IAZ",
    "Architects Council of Zimbabwe",
    "ACZ",
    "register of architects",
    "Architects (Private) Act",
    "architecture Zimbabwe",
    "NUST architecture",
    "professional practice examination",
    "registered architect Zimbabwe",
  ],
  authors: [{ name: "Institute of Architects of Zimbabwe", url: SITE_URL }],
  creator: "Institute of Architects of Zimbabwe",
  publisher: "Institute of Architects of Zimbabwe",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Institute of Architects of Zimbabwe",
    title: "Institute of Architects of Zimbabwe",
    description: DESCRIPTION,
    url: "/",
    locale: "en_ZW",
  },
  twitter: {
    card: "summary_large_image",
    title: "Institute of Architects of Zimbabwe",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: { telephone: false, email: false, address: false },
  category: "architecture",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f2ee" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a17" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-ZW"
      data-theme="light"
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('iaz-theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}`,
          }}
        />
      </head>
      <body>
        <Loader />
        <Cursor />
        <Transition />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
