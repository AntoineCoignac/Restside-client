import type { Metadata } from "next";
import "@/app/globals.scss";
import TopBar from "@/app/components/TopBar";
import BottomBar from "@/app/components/BottomBar";

export const metadata: Metadata = {
  title: "Restside. – Simulez votre restaurant",
  description: "Avec Restside, simulez votre restaurant en ligne et monitorez votre production.",
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        {modal}
        <TopBar/>
        <div className="page-container">
          {children}
        </div>
        <BottomBar/>
      </body>
    </html>
  );
}
