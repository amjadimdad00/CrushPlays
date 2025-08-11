"use client"
import { cn } from "@/utils"
import { useEffect, useRef, useState } from "react"
import Marquee from "react-fast-marquee"

type RotatingTextProps = {
    text: string
    className?: string
}

const RotationText = ({ text, className }: RotatingTextProps) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const textRef = useRef<HTMLSpanElement>(null)
    const [needsMarquee, setNeedsMarquee] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Check if text needs marquee effect
    useEffect(() => {
        if (textRef.current && containerRef.current) {
            const textWidth = textRef.current.scrollWidth
            const containerWidth = containerRef.current.clientWidth

            // Only enable marquee if text is wider than container
            setNeedsMarquee(textWidth > containerWidth)
            setIsPlaying(textWidth > containerWidth)
        }
    }, [text])

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative flex h-full w-full items-center justify-start overflow-hidden",
                className,
            )}
        >
            {needsMarquee ? (
                <Marquee
                    className="flex items-center"
                    style={{
                        maskImage: `linear-gradient(to right, transparent, black 10%, black 90%, transparent)`,
                    }}
                    speed={30}
                    play={isPlaying}
                    pauseOnHover
                    gradient={false}
                >
                    <span className="px-4 font-semibold text-zinc-50">
                        {text}
                    </span>
                </Marquee>
            ) : (
                <span className="truncate font-semibold text-zinc-50">
                    {text}
                </span>
            )}

            {/* Hidden element for measurement */}
            <span
                ref={textRef}
                className="absolute left-0 top-0 -z-50 whitespace-nowrap opacity-0"
            >
                {text}
            </span>
        </div>
    )
}

export default RotationText
