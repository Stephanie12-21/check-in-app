import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Check-in",
  description:
    "Une application où vous pourrez trouver des professionnels de santé pour vous, vos proches ou vos animaux.",
};

export default async function RootLayout({ children }) {
  return (
    <html className="h-full" lang="fr">
      <body
        className={` ${geistSans.variable} ${geistMono.variable}antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
