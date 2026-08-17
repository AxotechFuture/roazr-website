import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "revenue attribution",
    "ad attribution platform",
    "ROAS tracking",
    "Meta Conversions API",
    "WhatsApp sales tracking",
    "African businesses",
  ],
  openGraph: {
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
  },
  icons: {
    icon: [
      {
        url: "/brand/roazr-mark-light.png",
        media: "(prefers-color-scheme: light)",
        type: "image/png",
        sizes: "108x108",
      },
      {
        url: "/brand/roazr-mark-dark.png",
        media: "(prefers-color-scheme: dark)",
        type: "image/png",
        sizes: "108x108",
      },
    ],
    apple: [
      {
        url: "/brand/roazr-mark-light.png",
        type: "image/png",
        sizes: "108x108",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          // Runs before first paint of the page content: applies the saved
          // theme so light-mode users never see a dark flash (and vice versa).
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("roazr-theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
