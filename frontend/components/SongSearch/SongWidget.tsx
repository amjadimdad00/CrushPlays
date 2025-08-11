"use client"
import { cn } from "@/utils"
import { motion } from "framer-motion"
import Image from "next/image"
import { RefObject, useEffect, useRef, useState } from "react"
import WaveForm from "@/demos/MusicWidget/WaveForm"
import RotationText from "@/demos/MusicWidget/RotationText"

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

interface SongWidgetProps {
    playTrack?: SongTrack | null
    volume: number
    muted: boolean
}

const SongWidget = ({ playTrack, volume, muted }: SongWidgetProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const [isActive, setIsActive] = useState(false)
    const [paused, setPaused] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume
        }
    }, [volume])

    useEffect(() => {
        if (!playTrack) return
        setIsActive(true)
    }, [playTrack])

    useEffect(() => {
        const audioEl = audioRef.current
        if (!audioEl) return

        if (isActive && !paused) {
            audioEl.play().catch((error) => {
                if (error.name === "NotAllowedError") {
                    setPaused(true)
                    console.error(
                        "Audio playback was prevented due to user interaction requirements.",
                    )
                } else {
                    console.log("Audio PlayBack Error", error)
                }
            })
        } else {
            audioEl.pause()
        }

        return () => {
            audioEl.pause()
        }
    }, [isActive, paused, playTrack])


    if (!playTrack) return null

    return (
        <motion.div
            ref={ref}
            className="absolute flex size-48 items-center justify-center overflow-hidden rounded-[42px]"
        >
            <div className="relative h-full w-full">
                <Image
                    src={playTrack.image_url}
                    alt={`${playTrack.title} by ${playTrack.singers}`}
                    className={cn(
                        "pointer-events-none h-full w-full object-cover transition-opacity duration-150",
                        !isActive && "opacity-50",
                    )}
                    width={300}
                    height={300}
                    priority
                />
                <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black to-transparent">
                    <div className="absolute bottom-0 left-0 flex w-full items-center justify-start gap-4 p-4">
                        <WaveForm
                            active={isActive}
                            audioRef={audioRef as RefObject<HTMLAudioElement>}
                            paused={paused}
                            setPaused={setPaused}
                        />
                        <div className="relative flex w-full flex-col items-center justify-center pr-5 -translate-x-2">
                            <RotationText text={playTrack.title} />
                            <RotationText
                                text={playTrack.singers}
                                className="w-full truncate text-xs font-normal text-zinc-300"
                            />
                        </div>
                    </div>
                    <audio
                        ref={audioRef}
                        className="hidden"
                        src={playTrack.media_url}
                        muted={muted}
                        loop
                    />
                </div>
            </div>
        </motion.div>
    )
}

export default SongWidget
