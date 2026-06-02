import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Sora } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next"

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
  title: {
    default: "EduForm AI | Criação de Formulários Inteligentes com IA",
    template: "%s | EduForm AI",
  },
  description: "Crie formulários, questionários e pesquisas automatizadas com o poder da Inteligência Artificial. Potencialize a educação e a coleta de dados de forma simples.",
  keywords: ["EduForm AI", "formulários com IA","EduForm","inteligência artificial educação", "criar questionários online", "gerador de formulários"],
  authors: [{ name: "Sua Equipe/Sua Empresa" }],
  creator: "EduForm AI",
  openGraph: {
    title: "EduForm AI | Formulários Inteligentes com IA",
    description: "Crie formulários e questionários automatizados com o poder da Inteligência Artificial.",
    url: "https://eduform.website/", // Substitua pelo seu link real
    siteName: "EduForm AI",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduForm AI | Formulários Inteligentes com IA",
    description: "Crie formulários e questionários automatizados com o poder da Inteligência Artificial.",
  },
  robots: {
    index: true,
    follow: true,
  },
};
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}