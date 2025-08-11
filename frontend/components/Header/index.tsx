"use client"

import { useState } from "react"
import { AnimatePresence, cubicBezier, motion } from "framer-motion"
import Logo from "../Logo"
import SplitText from "../SplitText"

interface HeaderProps {
    handleSearch: (e: React.FormEvent) => void
    query: string
    setQuery: (query: string) => void
}

const Header = ({ handleSearch, query, setQuery }: HeaderProps) => {
    const [showSearch, setShowSearch] = useState(false)

    const toggleSearch = () => {
        setShowSearch(!showSearch)
        if (showSearch) setQuery("")
    }

    const handleSubmit = (e: React.FormEvent) => {
        handleSearch(e)
        toggleSearch()
    }

    return (
        <div className="relative flex flex-col">
            {/* Header Content */}
            <div className="relative flex w-full items-center justify-center gap-3 py-4">
                <Logo className="h-8 w-8" />
                <SplitText className="split-text text-3xl font-semibold">
                    CrushPlays
                </SplitText>

                {/* Animated Search Button */}
                <motion.button
                    onClick={toggleSearch}
                    className="relative right-0 p-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                    >
                        {showSearch ? (
                            <motion.path
                                d="M18 6L6 18M6 6l12 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{
                                    duration: 0.5,
                                    ease: cubicBezier(0.645, 0.045, 0.355, 1.0),
                                }}
                            />
                        ) : (
                            <motion.path
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{
                                    delay: 1.6,
                                    duration: 0.5,
                                    ease: cubicBezier(0.645, 0.045, 0.355, 1.0),
                                }}
                            />
                        )}
                    </svg>
                </motion.button>
            </div>

            {/* Animated Search Input */}
            <AnimatePresence>
                {showSearch && (
                    <motion.div
                        className="absolute left-0 right-0 top-full z-10 flex w-full items-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                            duration: 0.3,
                            ease: cubicBezier(0.645, 0.045, 0.355, 1.0),
                        }}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="relative w-full"
                        >
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search..."
                                className="w-full rounded-md border-0 p-2 pl-3 pr-10 shadow-md ring-2 ring-blue-500 focus:outline-none"
                                autoFocus
                            />
                            <motion.button
                                type="submit"
                                className="absolute right-2 top-1/2 p-1 -translate-y-1/2"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10,
                                }}
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-500"
                                >
                                    <motion.path
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: cubicBezier(
                                                0.645,
                                                0.045,
                                                0.355,
                                                1.0,
                                            ),
                                        }}
                                    />
                                </svg>
                            </motion.button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Header
