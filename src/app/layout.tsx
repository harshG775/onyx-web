import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import { ModeToggle } from "@/components/ui/ModeToggle";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Next-Js App template",
    description: "with TailwindCSS and ShadeCn theme",
};

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;
export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${fontSans.variable} min-h-screen bg-background font-sans antialiased`}
            >
                <Providers>
                    {children}
                    <ModeToggle className="fixed bottom-4 right-4" />
                </Providers>
            </body>
        </html>
    );
}
