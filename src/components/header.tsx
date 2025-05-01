import { Link } from "react-router-dom";
import { useTheme } from "./context/theme-provider";
import { Home, HomeIcon, Moon, Sun } from "lucide-react";
import CitySearch from "./city/city-search";

const Header= () => {
    const {theme, setTheme} = useTheme();
    const isDark= theme === "dark";
    return (
        <header className="max-w-screen sticky top-0 z-50 container border-b py-3 backdrop-blur supports-[backdrop-filter]:bg-background/90">
            <div className="container px-2 h-16 flex lg:flex-row justify-between items-center mx-auto">
                <Link to="/" className="flex items-center justify-center gap-4">
                    <img src={isDark ? "./src/assets/dark.png" : "./src/assets/light.png"} className="max-w-32" alt="" />
                    {/* <h1 className="text-3xl font-bold  dark:gray-300">Atmos</h1> */}
                </Link>
                <div className="flex gap-6 items-center">
                    <CitySearch /> 

                    <div className={`cursor-pointer transition-transform duration-700 ${isDark ? "rotate-180" : "rotate-0"}`} onClick={() => setTheme(isDark ? "light": "dark")}>
                        {isDark ? <Sun className="w-6 h-6 text-yellow-400 rotate-0 transition-all" /> 
                        : <Moon className="w-6 h-6 text-blue-400 rotate-0 transition-all" />}
                    </div>
                </div>
                {/* <h1 className="text-3xl font-bold text-gray-800">Mausam</h1>
                <p className="text-center text-gray-600">Check the weather in your city</p> */}
            </div>
        </header>
    );
};

export default Header;