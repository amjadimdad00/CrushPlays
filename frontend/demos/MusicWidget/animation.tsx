import { TargetAndTransition } from "framer-motion"

const randomBetweenFloat = (min: number, max: number): number =>
    Math.random() * (max - min) + min

const generateFloatArray = (
    length: number,
    min: number,
    max: number,
): number[] => {
    const array: number[] = []
    for (let i = 0; i < length; i++) {
        array.push(randomBetweenFloat(min, max))
    }
    return array
}

const DURATION_UPPER = 2.3
const DURATION_LOWER = 1.8
const MAX_HEIGHT = 12
const MIN_HEIGHT = 3

const transitionBase: TargetAndTransition["transition"] = {
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
}

export const generateWaveFormAnimation = (
    count: number,
): TargetAndTransition[] => {
    // Generate keyframe heights as px strings for each bar
    const heightKeyframesArray = Array.from({ length: count }, () => {
        // Generate 3-5 keyframes for smooth oscillation
        const keyframesCount = 5
        const keyframes = generateFloatArray(
            keyframesCount,
            MIN_HEIGHT,
            MAX_HEIGHT,
        )
        // Convert to px string
        return keyframes.map((h) => `${h.toFixed(2)}px`)
    })

    // Generate durations for each bar animation (random between duration limits)
    const durations = generateFloatArray(count, DURATION_LOWER, DURATION_UPPER)

    return heightKeyframesArray.map((heightKeyframes, index) => ({
        height: heightKeyframes,
        transition: {
            ...transitionBase,
            duration: durations[index],
            times: heightKeyframes.map(
                (_, i) => i / (heightKeyframes.length - 1),
            ), // linear timing between keyframes
        },
    }))
}
