import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { FC } from "react"

const figtree = Figtree({
    subsets: ["latin"],
})

const description =
    "A modern music streaming web app, originally designed by CrushPlays, now upgraded with full Spotify API integration by Amjad Imdad. Users can search, discover, and stream millions of songs through a sleek, fast, and fully responsive interface."

export const metadata: Metadata = {
    title: {
        template: "%s | CrushPlays",
        default: "CrushPlays",
    },
    description,
    openGraph: {
        type: "website",
        title: "CrushPlays",
        siteName: "CrushPlays",
        url: "https://crushplays.vercel.app",
        description,
        images: [
            {
                url: "/og.jpg",
                width: 1200,
                height: 630,
                alt: "CrushPlays – Modern Music Streaming Web App",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "CrushPlays",
        description,
        images: [
            {
                url: "/og.jpg",
                alt: "CrushPlays – Modern Music Streaming Web App",
            },
        ],
    },
}

type RootLayoutProps = {
    children: React.ReactNode
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <body className={cn("bg-zinc-50 antialiased", figtree.className)}>
                {children}
            </body>
        </html>
    )
}

export default RootLayout
