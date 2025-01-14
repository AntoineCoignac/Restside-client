import type { Metadata } from "next";
import "@/app/globals.scss";
import TopBar from "@/app/components/TopBar";
import BottomBar from "@/app/components/BottomBar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <TopBar/>
        <div className="page-container">
          {children}
        </div>
        <BottomBar/>
      </body>
    </html>
  );
}
