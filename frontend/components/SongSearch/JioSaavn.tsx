"use client"

import React from "react"
import { Play } from "lucide-react"
import Image from "next/image"

interface JioSaavnTrack {
    singers: string
    image: string
    media_url: string
    album: string
    year: string
    duration: string
}

export default function JioSaavnSearch({
    loading,
    tracks,
    setPlayTrack,
}: {
    loading: boolean
    tracks: JioSaavnTrack[]
    setPlayTrack: (track: JioSaavnTrack) => void
}) {
    return (
        <div className="mx-auto max-w-xl p-4">
            {/* Spotify-style loading animation */}
            {loading && (
                <div className="flex justify-center py-8">
                    <div className="flex space-x-2">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="h-3 w-3 animate-bounce rounded-full bg-blue-500"
                                style={{
                                    animationDelay: `${i * 0.1}s`,
                                    animationDuration: "0.8s",
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div
                className="space-y-4 overflow-y-auto"
                style={{ maxHeight: "16rem" }}
            >
                {tracks.map((track, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 rounded border p-2 transition-colors hover:bg-gray-50"
                    >
                        <div className="group relative">
                            <Image
                                src={track.image}
                                alt={track.album}
                                width={64}
                                height={64}
                                className="h-16 w-16 rounded object-cover"
                            />
                            <button
                                className="absolute inset-0 flex h-full w-full items-center justify-center rounded bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                onClick={() => {
                                    setPlayTrack(track)
                                }}
                            >
                                <Play className="text-lg text-white" />
                            </button>
                        </div>
                        <div className="flex-1">
                            <p className="text-md text-gray-500">
                                {track.album} • {track.year}
                            </p>
                            <p className="text-xs text-gray-400">
                                {track.singers}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
