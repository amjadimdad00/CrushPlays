"use client"
import { useState } from "react"
import SongWidget from "./SongWidget"
import VolumeBar from "@/demos/MusicWidget/VolumeBar"

export type Lean = "left" | "right" | null

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

interface MusicWidgetProps {
    playTrack?: SongTrack | null
}

const MusicWidget = ({ playTrack }: MusicWidgetProps) => {
    const [volume, setVolume] = useState(0.5)
    const [muted, setMuted] = useState(false)

    return (
        <div className="relative flex items-center justify-center -translate-x-8">
            <SongWidget playTrack={playTrack} volume={volume} muted={muted} />

            {/* Volume Bar */}
            <VolumeBar
                volume={volume}
                setVolume={setVolume}
                muted={muted}
                setMuted={setMuted}
            />
        </div>
    )
}

export default MusicWidget
