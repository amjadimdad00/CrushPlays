"use client"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import JioSaavn from "@/components/SongSearch/JioSaavn"
import MusicWidget from "@/demos/MusicWidget"
import SongPlayer from "@/components/SongSearch/SongPlayer"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"

interface SongTrack {
    songid: string
    title: string
    singers: string
    image_url: string
    media_url: string
    album: string
    year: string
    duration: string
}

interface JioSaavnApiItem {
    album: string
    album_url: string
    autoplay: string
    duration: string
    e_songid: string
    has_rbt: string
    image_url: string
    label: string
    label_url: string
    language: string
    liked: string
    map: string
    music: string
    origin: string
    origin_val: string
    page: number
    pass_album_ctx: string
    perma_url: string
    publish_to_fb: boolean
    singers: string
    songid: string
    starred: string
    starring: string
    streaming_source: string | null
    tiny_url: string
    title: string
    twitter_url: string
    url: string
    year: string
}

const Home = () => {
    const [query, setQuery] = useState("")
    const [tracks, setTracks] = useState<SongTrack[]>([])
    const [loading, setLoading] = useState(false)
    const [playTrack, setPlayTrack] = useState<SongTrack | null>(null)
    const [hasSearched, setHasSearched] = useState(false)

    const handlePlayTrack = (track: SongTrack) => {
        setPlayTrack(track)
        setTracks([])
    }

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!query.trim()) return

        setHasSearched(true)
        setPlayTrack(null)
        setLoading(true)

        try {
            const res = await fetch(
                `http://127.0.0.1:5100/result/?query=${encodeURIComponent(query)}`,
            )
            if (!res.ok) throw new Error("JioSaavn API request failed")

            const data = await res.json()

            if (Array.isArray(data)) {
                const mappedTracks: SongTrack[] = data.map(
                    (item: JioSaavnApiItem) => ({
                        songid: item.songid,
                        title: item.title,
                        singers: item.singers || item.music || "Unknown Artist",
                        image_url: item.image_url,
                        media_url: item.url,
                        album: item.album || "Unknown Album",
                        year: item.year || "",
                        duration: item.duration || "",
                    }),
                )
                setTracks(mappedTracks)
            } else {
                setTracks([])
            }
        } catch (err) {
            console.error("Search failed", err)
            setTracks([])
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="container mx-auto flex min-h-svh max-w-md flex-col items-center justify-between gap-10 py-10">
            <Header
                handleSearch={handleSearch}
                query={query}
                setQuery={setQuery}
            />

            <AnimatePresence mode="wait">
                {!hasSearched ? (
                    <MusicWidget key="music-widget" />
                ) : playTrack ? (
                    <SongPlayer
                        key="music-widget-playing"
                        playTrack={playTrack}
                    />
                ) : (
                    <JioSaavn
                        key="jiosaavn-results"
                        loading={loading}
                        tracks={tracks}
                        setPlayTrack={handlePlayTrack}
                    />
                )}
            </AnimatePresence>

            <Footer />
        </main>
    )
}

export default Home
