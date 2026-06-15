import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ContactBadge } from "@/components/contact-badge";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.consilanto.de"),
  title: {
    default: "Consilanto — Unabhängige Honorarberatung",
    template: "%s · Consilanto",
  },
  description:
    "Unabhängige Honorarberatung für Menschen, die mehr wollen. Consilanto begleitet Sie persönlich dabei, finanzielle Klarheit zu schaffen und aus Ihren Zielen eine unabhängige Strategie zu entwickeln.",
  openGraph: {
    title: "Consilanto — Unabhängige Honorarberatung",
    description:
      "Der wahre Luxus ist, die eigene Zukunft selbst zu gestalten. Strategische Finanzberatung auf Honorarbasis.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${montserrat.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SmoothScroll />
        {children}
        <ContactBadge />
      </body>
    </html>
  );
}
