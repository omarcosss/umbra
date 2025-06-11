import type { Metadata } from "next";
import { Geist, Geist_Mono, Wix_Madefor_Display, Spectral } from "next/font/google";
import "./globals.css";
import "./layout.scss";
import Header from "./components/Header/Header";
// import LogDialog from "./components/Dialogs/Dialog";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const wixDisplay = Wix_Madefor_Display({
  variable: "--font-wix",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"]
});

const spectral = Spectral({
  variable: "--font-spectral",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Pavorama",
  description: "Horror Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${wixDisplay.variable} ${geistMono.variable} ${spectral.variable} antialiased`}
      >
        <Header/>
        {/* <LogDialog /> */}

        <div className="page-container">
          {children}
        </div>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
