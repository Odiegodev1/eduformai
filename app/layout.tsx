import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Sora } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});
const geistSans = Sora({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- CONFIGURAÇÃO DE SEO OTIMIZADA ---
export const metadata: Metadata = {
  metadataBase: new URL("https://eduform.website"),

  title: {
    default: "Gerador de Questionários com IA para Professores | EduForm AI",
    template: "%s | EduForm AI",
  },

  description:
    "Crie provas, formulários e questionários automaticamente com IA. Ferramenta ideal para professores economizarem tempo.",

  keywords: [
    "gerador de provas com IA",
    "questionário com IA",
    "criar formulário online",
    "ferramenta para professores",
    "alternativa google forms",
    "IA para educação",
  ],

  openGraph: {
    title: "EduForm AI",
    description:
      "Crie provas e questionários automaticamente com IA.",
    url: "https://eduform.website",
    siteName: "EduForm AI",
    locale: "pt_BR",
    type: "website",
  },

  alternates: {
    canonical: "https://eduform.website",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}
// -------------------------------------

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Alterado o lang="en" para lang="pt-BR" para SEO focado no Brasil
    <html
      lang="pt-BR" 
      className={cn("h-full", "antialiased", geistSans.className, geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
          <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NBX4ZH64EP"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-NBX4ZH64EP');
          `}
        </Script>
        {children}
        <Analytics />
      </body>
    </html>
  );
}