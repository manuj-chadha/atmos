import Header from "@/components/header"
import { Heart } from "lucide-react"
import { PropsWithChildren } from "react"

const Layout=({children}: PropsWithChildren)=>{
    return(
        <div className="bg-gradient-to-br from-background to-muted">
            <Header />
            <main className="min-h-screen container mx-auto px-4 py-2">{children}</main>
            <footer className="border-t py-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto text-black dark:text-gray-200 text-md text-center">
                    Made with <Heart className="inline h-4 w-4 mx-0.5" /> by <span className="font-semibold">Manuj Chadha</span>
                </div>
            </footer>
        </div>
    )
}
export default Layout