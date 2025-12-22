import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


export const metadata: Metadata = {
  title: "Procedural Music Generation",
  description: "Handmade 'songwriting' algorithm inspired by classical music theory, video game music, and jrock. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Cormorant+SC:wght@300;400;500;600;700&family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=DM+Serif+Text:ital@0;1&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Stoke:wght@300;400&family=Zain:ital,wght@0,200;0,300;0,400;0,700;0,800;0,900;1,300;1,400&display=swap');
        </style>
        <title>Procedural Music Generation</title>
    </head>
      <body className={"dm-serif-text-regular"}>
        {children}
      </body>
    </html>
  );
}
