import StyledComponentsRegistry from "lib/registry";
import { Metadata, Viewport } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Yashpreet Voladoddi | Applied AI Engineer",
  description: "Applied AI Engineer building production RAG systems, LLM agents, backend integrations, and GenAI product workflows across Azure OpenAI, AWS, Golang, Python, and TypeScript.",
  openGraph: {
    title: "Yashpreet Voladoddi | Applied AI Engineer",
    description: "Portfolio and resume for Yashpreet Voladoddi, Applied AI Engineer.",
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



