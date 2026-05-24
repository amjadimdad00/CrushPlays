export type Song = {
    id: string
    title: string
    artist: string
    image: string
}

export const songs: Song[] = [
    {
        id: "khasara",
        title: "Khasara",
        artist: "Abdul Hannan & Samar Jafri",
        image: "https://c.saavncdn.com/427/Khasara-Hindi-2026-20260324193728-500x500.jpg",
    },
    {
        id: "roya-tha",
        title: "Roya Tha!",
        artist: "AMAN",
        image: "https://i.scdn.co/image/ab67616d00001e02a023edcd6e3657eecab9369a",
    },
].reverse()
