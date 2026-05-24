import { motion } from "framer-motion"
import { FC, RefObject, useEffect, useState } from "react"

const WaveForm: FC<{
    active: boolean
    audioRef: RefObject<HTMLAudioElement> | null
    paused: boolean
    setPaused: (paused: boolean) => void
}> = ({ active, audioRef, paused, setPaused }) => {
    const [isHovering, setIsHovering] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Number of bars in the waveform
    const barCount = 6

    // Static animation for inactive state
    const staticAnimation = {
        height: 2,
        transition: { duration: 0.3 },
    }

    // Pause icon style
    const pauseBarStyle = {
        height: 11,
        transition: { type: "spring", stiffness: 500, damping: 20 },
    }

    // Playing animation - more dynamic waveform
    const playingAnimation = (i: number) => ({
        height: [2, 4 + Math.random() * 8, 2],
        transition: {
            repeat: Infinity,
            repeatType: "reverse" as const,
            duration: 0.5 + Math.random() * 0.5,
            ease: "easeInOut" as const,
        },
    })

    useEffect(() => {
        if (!audioRef?.current) return

        const handlePlay = () => {
            setIsPlaying(true)
            setIsLoading(false)
        }

        const handlePause = () => setIsPlaying(false)
        const handleWaiting = () => setIsLoading(true)
        const handleCanPlay = () => setIsLoading(false)

        audioRef.current.addEventListener("play", handlePlay)
        audioRef.current.addEventListener("pause", handlePause)
        audioRef.current.addEventListener("waiting", handleWaiting)
        audioRef.current.addEventListener("canplay", handleCanPlay)

        return () => {
            audioRef.current?.removeEventListener("play", handlePlay)
            audioRef.current?.removeEventListener("pause", handlePause)
            audioRef.current?.removeEventListener("waiting", handleWaiting)
            audioRef.current?.removeEventListener("canplay", handleCanPlay)
        }
    }, [audioRef])

    const handleClick = () => {
        if (isLoading) return

        setPaused(!paused)
        if (paused) {
            setIsHovering(false)
            audioRef?.current?.play()
        } else {
            audioRef?.current?.pause()
        }
    }

    return (
        <motion.button
            className="flex h-8 min-w-8 flex-1 items-center justify-center gap-[1.5px] overflow-hidden rounded-full bg-white"
            animate={isHovering || paused ? { gap: "3px" } : { gap: "1.5px" }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={handleClick}
            disabled={isLoading}
            whileTap={{ scale: 0.95 }}
        >
            {isLoading ? (
                <div className="flex h-full items-center justify-center cursor-pointer">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                </div>
            ) : paused ? (
                <>
                    <motion.div
                        key="pause-bar-1"
                        className="w-[2px] rounded-full bg-blue-500"
                        animate={pauseBarStyle}
                    />
                    <motion.div
                        key="pause-bar-2"
                        className="w-[2px] rounded-full bg-blue-500"
                        animate={pauseBarStyle}
                    />
                </>
            ) : /* Inactive state - shows small static bars */
            !active ? (
                Array(barCount)
                    .fill(0)
                    .map((_, i) => (
                        <motion.div
                            key={`static-${i}`}
                            className="w-[2px] rounded-full bg-blue-500"
                            animate={staticAnimation}
                        />
                    ))
            ) : (
                /* Active and playing state - shows animated waveform */
                Array(barCount)
                    .fill(0)
                    .map((_, i) => (
                        <motion.div
                            key={`wave-${i}`}
                            className="w-[2px] rounded-full bg-blue-500"
                            animate={playingAnimation(i)}
                        />
                    ))
            )}
        </motion.button>
    )
}

export default WaveForm
