import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen flex flex-col items-center text-white bg-[#020617] overflow-hidden">

        {/* Glow Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full top-[-100px] left-[-100px]"></div>
          <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[150px] rounded-full bottom-[-100px] right-[-100px]"></div>
        </div>

        {/* Navbar */}
        <Navbar />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1e293b",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
            },
          }}
        />

        {/* Page Content */}
        <div className="flex-1 flex items-center justify-center w-full z-10">
          {children}
        </div>

      </body>
    </html>
  );
}