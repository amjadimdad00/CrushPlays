export type Song = {
    id: string
    title: string
    artist: string
    image: string
}

export const songs: Song[] = [
    {
        id: "afsos",
        title: "AFSOS ft. AP Dhillon (Official Visualizer)",
        artist: "Anuv Jain",
        image: "/assets/demos/music-widget/image/DP.jpg",
    },
    {
        id: "kabhi-kabhi",
        title: "Kabhi Kabhi by AUR | کبھی کبھی (Official Visualizer)",
        artist: "Ahad Usama Rafey",
        image: "/assets/demos/music-widget/image/DP.jpg",
    },
    {
        id: "mayi-ri",
        title: "Mayi Ri - OST | Audio 🎧 ARY Digital",
        artist: "Asrar | Waqar ali ",
        image: "/assets/demos/music-widget/image/DP.jpg",
    },
    {
        id: "pal-pal",
        title: "Afusic - Pal Pal (Audio) Prod. @AliSoomroMusic",
        artist: "Affan Khan",
        image: "/assets/demos/music-widget/image/DP.jpg",
    },
    {
        id: "tu-hi-haqeeqat",
        title: "Tu hi Haqeeqat - Arunima Sharma | Cover song",
        artist: "Arunima Sharma",
        image: "/assets/demos/music-widget/image/DP.jpg",
    },
].reverse()
