import type { Metadata } from "next";
import { DM_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MotionRuntime } from "@/components/motion";
import { BRAND, PRODUCT } from "@/lib/brand";

/* Poppins site-wide — Ben-locked (DAF V3 law, inherited). */
const body = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const display = body;

const mono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mono-demo.vercel.app"),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s — ${BRAND.name}`,
  },
  description:
    "A handheld garment steamer sold as a system, not a spec: 2000 W, 25-second heat-up, 300 ml tank, ceramic soleplate, three-year warranty. $89. Concept brand demonstration.",
  openGraph: {
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: `${PRODUCT.name}. ${PRODUCT.priceLabel}. ${PRODUCT.power}, ${PRODUCT.heatUp} to heat, ${PRODUCT.steamRate} of steam.`,
    type: "website",
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionRuntime />
        <Header />
        <main id="main" className="relative z-10 flex-1 bg-ground">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}