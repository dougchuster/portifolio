import type { Metadata } from "next";
import { Syne, Rajdhani, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/** Syne: geometric, futuristic — perfect for display/hero headings */
const syne = Syne({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

/** Rajdhani: military-tech feel, condensed and sharp for body */
const rajdhani = Rajdhani({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const siteUrl = "https://douglaschuster.com";

export const metadata: Metadata = {
  title: {
    default: "Douglas Chuster | Full Stack Architect",
    template: "%s | Douglas Chuster",
  },
  description:
    "Full Stack Architect especialista em sistemas de alta performance, landing pages de conversão e arquitetura cloud. Transformando ideias em soluções digitais escaláveis.",
  keywords: [
    "Full Stack Developer",
    "Software Architect",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Cloud Architecture",
    "AWS",
    "Landing Pages",
    "Web Development",
    "API Development",
    "High Performance Systems",
  ],
  authors: [{ name: "Douglas Chuster", url: siteUrl }],
  creator: "Douglas Chuster",
  publisher: "Douglas Chuster",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Douglas Chuster",
    title: "Douglas Chuster | Full Stack Architect",
    description:
      "Full Stack Architect especialista em sistemas de alta performance, landing pages de conversão e arquitetura cloud.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Douglas Chuster - Full Stack Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Douglas Chuster | Full Stack Architect",
    description:
      "Full Stack Architect especialista em sistemas de alta performance, landing pages de conversão e arquitetura cloud.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body
        className={`${syne.variable} ${rajdhani.variable} ${jetbrains.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
