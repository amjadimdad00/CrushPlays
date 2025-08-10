"use client"
import { cn } from "@/utils"
import {
    animate,
    PanInfo,
    useMotionValue,
    useTransform,
    motion,
} from "framer-motion"
import Image from "next/image"
import { FC, RefObject, useEffect, useRef, useState } from "react"
import WaveForm from "./WaveForm"
import RotationText from "./RotationText"

const SongWidget: FC<SongWidgetProps> = ({
    song,
    orderedSongs,
    previousOrderedSongs,
    emitSwipe,
    leaning,
    setLeaning,
    volume,
    muted,
}) => {
    const rank = orderedSongs.indexOf(song.id)
    const previousRank = previousOrderedSongs.indexOf(song.id)

    const ref = useRef<HTMLDivElement>(null)
    const [isActive, setIsActive] = useState(false)
    const [isLast, setIsLast] = useState(false)
    const [isNext, setIsNext] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [paused, setPaused] = useState(false)

    const dragOffSet = useMotionValue(0)
    const dragRotation = useTransform(dragOffSet, [-200, 200], [-5, 5])
    const affectedRotation = useMotionValue(0)
    const affectedX = useMotionValue(0)

    const audioRef = useRef<HTMLAudioElement>(null)

    const handleDrag = (_: unknown, info: PanInfo) => {
        setIsDragging(true)
        dragOffSet.set(info.offset.x)
        if (info.offset.x > 100) {
            setLeaning("right")
        } else if (info.offset.x <= -100) {
            setLeaning("left")
        } else {
            setLeaning(null)
        }
    }

    const handleDragEnd = (_: unknown, info: PanInfo) => {
        setIsDragging(false)
        setLeaning(null)

        // Reset the active card's rotation
        animate(dragOffSet, 0, { type: "spring", stiffness: 300, damping: 30 })

        // Reset adjacent cards' position and rotation
        animate(affectedRotation, 0, {
            type: "spring",
            stiffness: 300,
            damping: 30,
        })
        animate(affectedX, 0, { type: "spring", stiffness: 300, damping: 30 })

        if (info.offset.x > 100) {
            emitSwipe("right")
        } else if (info.offset.x < -100) {
            emitSwipe("left")
        }
    }

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume
        }
    }, [volume])

    useEffect(() => {
        if (!audioRef.current) return
        if (isActive) {
            audioRef.current.play().catch((error) => {
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
            audioRef.current.pause()
            audioRef.current.currentTime = 0
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current.currentTime = 0
            }
        }
    }, [isActive, song])

    useEffect(() => {
        if (isLast && leaning === "right") {
            affectedRotation.set(-5)
            affectedX.set(-50)
        } else if (isNext && leaning === "left") {
            affectedRotation.set(5)
            affectedX.set(50)
        } else {
            affectedRotation.set(0)
            affectedX.set(0)
        }
    }, [leaning, isDragging, isNext, isLast])

    useEffect(() => {
        setIsActive(rank === orderedSongs.length - 1)
        setIsNext(rank === orderedSongs.length - 2)
        setIsLast(rank === 0)
    }, [rank, orderedSongs.length])

    return (
        <motion.div
            ref={ref}
            className="absolute flex size-48 cursor-grab items-center justify-center overflow-hidden rounded-[42px] active:cursor-grabbing"
            drag="x"
            dragMomentum={false}
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
            onDrag={handleDrag}
            style={{
                rotate: isDragging ? dragRotation : affectedRotation,
                x: affectedX,
                zIndex: rank,
            }}
        >
            <div>
                <Image
                    src={song.image}
                    alt={`${song.title} by ${song.artist}`}
                    className={cn(
                        "pointer-event-none h-full w-full object-cover transition-opacity duration-150",
                        !isActive && "opacity-50",
                    )}
                    width={300}
                    height={300}
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
                            {/* Rotating Text */}
                            <RotationText text={song.title} />
                            <RotationText
                                text={song.artist}
                                className="w-full truncate text-xs font-normal text-zinc-300"
                            />
                        </div>
                    </div>
                    <audio
                        ref={audioRef}
                        className="hidden"
                        src={`/api/audio?id=${song.id}`}
                        muted={muted}
                        loop
                    ></audio>
                </div>
            </div>
        </motion.div>
    )
}

export default SongWidget
