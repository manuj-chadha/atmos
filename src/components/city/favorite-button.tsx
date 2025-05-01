import { Star } from "lucide-react"
import { WeatherData } from "../api/types"
import { useFavourite } from "../hooks/use-favourite"
import { Button } from "../ui/button"
import { toast } from "sonner"

interface FavoriteButtonProps {
    data: WeatherData
}

const FavoriteButton=({data}: FavoriteButtonProps) => {
    const {addToFavorite, isFavorite, removeFavorite}=useFavourite();
    const currentlyFavorite=isFavorite(data.coord.lat, data.coord.lon);
    const togglefavourite =() => {
        if(currentlyFavorite){
            removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
            toast.error(`Removed ${data.name} from favorites.`);
        }
        else{
            addToFavorite.mutate({
                name:data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country
            })
            toast.success(`Added ${data.name} to favorites.`);

        }
    }
    return(
        <Button
        variant={currentlyFavorite ? "default" : "outline"}
        size={"icon"}
        className={`${currentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
        onClick={togglefavourite}
        >
            <Star className={`h-4 w-4 ${currentlyFavorite ? "fill-current" : ""}`} />
        </Button>
    )
}
export default FavoriteButton