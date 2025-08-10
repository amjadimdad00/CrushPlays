import { motion, TargetAndTransition } from "framer-motion"
import { FC, RefObject, useEffect, useState } from "react"
import { generateWaveFormAnimation } from "./animation"

const hoveringAnimation = {
    height: 2,
    opacity: 0,
}

const toPauseAnimation = {
    height: 11,
}

const staticAnimation = {
    height: 2,
}

type WaveFormProps = {
    active: boolean
    audioRef: RefObject<HTMLAudioElement> | null
    paused: boolean
    setPaused: (paused: boolean) => void
}

const WaveForm: FC<WaveFormProps> = ({
    active,
    audioRef,
    paused,
    setPaused,
}) => {
    const [isHovering, setIsHovering] = useState(false)
    const [animation, setAnimation] = useState<TargetAndTransition[]>([])

    useEffect(() => {
        if (active && !paused && !isHovering) {
            setAnimation(generateWaveFormAnimation(6))
        }
    }, [active, paused, isHovering])

    useEffect(() => {
        if (active) {
            setPaused(false)
            audioRef?.current?.play()
        }
    }, [active])

    return (
        <motion.button
            className="flex h-8 min-w-8 flex-1 items-center justify-center gap-[1.5px] overflow-hidden rounded-full bg-white"
            animate={isHovering || paused ? { gap: "3px" } : { gap: "1.5px" }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => {
                setPaused(!paused)
                if (paused) {
                    setIsHovering(false)
                    audioRef?.current?.play()
                } else {
                    audioRef?.current?.pause()
                }
            }}
        >
            {animation.slice(0, 2).map((animation, index) => (
                <motion.div
                    key={index}
                    className="h-3 w-[2px] rounded-full bg-black"
                    animate={
                        !active
                            ? staticAnimation
                            : isHovering || paused
                              ? toPauseAnimation
                              : animation
                    }
                ></motion.div>
            ))}

            <motion.div
                key={3}
                className="h-3 w-[2px] rounded-full bg-black"
                animate={
                    !active
                        ? staticAnimation
                        : isHovering || paused
                          ? toPauseAnimation
                          : animation[2]
                }
            ></motion.div>

            <motion.div
                key={4}
                className="h-3 w-[2px] rounded-full bg-black"
                animate={
                    !active
                        ? staticAnimation
                        : isHovering || paused
                          ? toPauseAnimation
                          : animation[3]
                }
            ></motion.div>

            {animation.slice(4, 6).map((animation, index) => (
                <motion.div
                    key={index}
                    className="h-3 w-[2px] rounded-full bg-black"
                    animate={
                        !active
                            ? staticAnimation
                            : isHovering || paused
                              ? toPauseAnimation
                              : animation
                    }
                ></motion.div>
            ))}
        </motion.button>
    )
}

export default WaveForm
