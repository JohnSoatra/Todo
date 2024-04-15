import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Todo",
    description: "Todo list.",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
};

export default RootLayout;
