import { Inter } from "next/font/google";
import "../assets/styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import AuthWrapper from "../components/AuthWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BookIt App | Book a Room",
  description: "Book a meeting or conference room for your team.",
};

export default function RootLayout({ children }) {
  return (
    <AuthWrapper>
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          <Header />
          <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </AuthWrapper>
  );
}
