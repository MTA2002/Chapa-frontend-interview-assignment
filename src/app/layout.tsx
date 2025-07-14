import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import TopLoader from "@/components/toploader";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Chapa PSP Dashboard",
  description: "Payment Service Provider Dashboard with role-based access",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${manrope.className} antialiased scroll-smooth`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Ethiopic&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <TopLoader />
        {children}
      </body>
    </html>
  );
}
