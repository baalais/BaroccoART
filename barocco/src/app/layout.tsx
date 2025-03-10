// app/layout.tsx
import "~/styles/globals.css"; // Add your global styles
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ThemeProvider } from "./context/ThemeContext";

export const metadata = {
  title: "Barocco Art",
  description: "Created by Baalais",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className="flex flex-col min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <ThemeProvider>
          <Header />
          <main className="flex-grow pt-24 pb-32 bg-white dark:bg-black">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}