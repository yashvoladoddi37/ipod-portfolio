import StyledComponentsRegistry from "lib/registry";
import { Metadata, Viewport } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "yv's portfolio | AI Engineer",
  description: "A unique interactive iPod-style resume and portfolio for Yashpreet Voladoddi, AI Engineer.",
  openGraph: {
    title: "yv's portfolio | AI Engineer",
    description: "Interactive iPod-style resume for Yashpreet Voladoddi.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ 
        margin: 0, 
        background: "radial-gradient(circle at center, #1a1a1a 0%, #000 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}




