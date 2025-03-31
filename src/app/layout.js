import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'WordPuzzle - Daily Word Challenges',
  description: 'Challenge your vocabulary with daily word puzzles and improve your language skills.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-gray-100">
        {children}
      </body>
    </html>
  );
}
