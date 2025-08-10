"use client"

import { motion } from "framer-motion"
import { container, children } from "./animations"

const Footer = () => {
    return (
        <motion.div
            variants={container}
            initial="initial"
            animate="animate"
            exit="exit"
            className="footer flex flex-col items-center justify-center gap-1 text-sm text-zinc-500 *:opacity-0 sm:flex-row sm:*:translate-x-3"
        >
            {/* Built with passion by Amjad */}
            <motion.div
                className="link-container flex items-center gap-1"
                variants={children}
            >
                <motion.span variants={children}>
                    💙 Built with passion by{" "}
                </motion.span>
                <motion.a
                    variants={children}
                    href="https://www.github.com/amjadimdad00/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Amjad Imdad
                </motion.a>
            </motion.div>

            {/* Original by DeveloperRahul */}
            <motion.div className="flex items-center gap-1" variants={children}>
                <motion.span variants={children}>(Original by</motion.span>
                <motion.div
                    className="link-container flex items-center"
                    variants={children}
                >
                    <motion.a
                        variants={children}
                        href="https://github.com/developerrahulofficial/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                    >
                        DeveloperRahul
                    </motion.a>
                    <motion.span variants={children}>)</motion.span>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default Footer
