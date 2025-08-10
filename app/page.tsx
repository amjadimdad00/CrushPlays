import Footer from "@/components/Footer"
import Header from "@/components/Header"
import MusicWidget from "@/demos/MusicWidget"
import { AnimatePresence } from "framer-motion"

const Home = () => {
    return (
        <main className="container mx-auto flex min-h-svh max-w-md flex-col items-center justify-between gap-10 py-10">
            <AnimatePresence>
                <Header />
                <MusicWidget />
                <Footer />
            </AnimatePresence>
        </main>
    )
}

export default Home
