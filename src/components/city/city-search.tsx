import { useState } from "react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { Button } from "../ui/button";
import { Clock, Loader2, Search, Star, XCircle, XIcon } from "lucide-react";
import { useLocationSearch } from "../hooks/use-weatherquery";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/use-local-storage";
import { useSearchHistory } from "../hooks/use-search-history";
import { format } from "date-fns";
import { formatDate } from "date-fns";
import { useFavourite } from "../hooks/use-favourite";

const CitySearch=() => {
    const navigate=useNavigate();
    const [open, setOpen]=useState(false);
    const [query, setQuery]=useState("");

    const {favorite}=useFavourite();

    const {data:locations, isLoading}=useLocationSearch(query);
    const{history, addToHistory, clearHistory}=useSearchHistory();
    console.log(locations);

    const handleSelect=(cityData : string)=> {
        const [lat, lon, name, country] = cityData.split("|");
        addToHistory.mutate({
            query,
            name,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            country,
        });
        setOpen(false);
        navigate(`city/${name}?lat=${lat}&lon=${lon}`);
    }

    
    return (
        <div>
            <Button
            variant="outline"
            className="relative cursor-pointer text-muted-foreground flex justify-start w-full sm:pr-12 text-sm md:w-40 lg:w-64"
            onClick={()=> setOpen(true)}>
                <Search className="h-4 w-4" />
                Search cities...
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
              <CommandInput 
              value={query}
              onValueChange={setQuery}
              placeholder="Type a command or search..." />
              <CommandList>
                {query.length>2 && !isLoading && <CommandEmpty>No results found.</CommandEmpty>}
                <CommandGroup heading="Favorites">
                    {
                        favorite.map((city) => {
                            return(               
                                <CommandItem
                                key={city.id}
                                value={`${city.lat}|${city.lon}|${city.name}|${city.country}`}
                                onSelect={handleSelect}>
                                    <Star /> {city.name}, <span className="text-muted-foreground">{city.country}</span></CommandItem>
                            )
                        })
                    }
                </CommandGroup>
                {
                    history.length > 0 && 
                    <CommandGroup>
                        <div className="flex gap-2 justify-between items-center py-2 px-1">
                            <p className="text-xs text-muted-foreground">Recent Searches</p>
                            <Button 
                            variant='ghost'
                            size="sm"
                            onClick={() => clearHistory.mutate()}>
                                <XCircle className="h-4 w-4"/>
                                Clear
                            </Button>
                        </div>
                        {history.map((location) => {
                            return (
                                <CommandItem
                                key={`${location.lat}-${location.lon}`}
                                value={`${location.lat} | ${location.lon} | ${location.name} | ${location.country}`}
                                onSelect={handleSelect}>
                                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <span>{location.name}</span>
                                    {location.state && (
                                        <span className="text-sm text-muted-foreground">, {location.state}</span>
                                    )}
                                    {location.country && (
                                        <span className="text-sm text-muted-foreground">, {location.country}</span>
                                    )}
                                    <span className="ml-auto text-xs text-muted-foreground">{format(location.searchedAt, "MMM d, h:mm a")}</span>
                                </CommandItem>
                            )
                        })}
                    </CommandGroup>
                }
                {locations && locations.length > 0 && 
                <CommandGroup heading="Suggestions">
                    {
                        isLoading && (
                            <div className="flex items-center justify-center p-4">
                                <Loader2 className="h-4 w-4 animate-spin" />
                            </div>
                        )
                    }
                    { locations.map((location) => {
                        return (
                            <CommandItem
                            key={`${location.lat}-${location.lon}`}
                            value={`${location.lat} | ${location.lon} | ${location.name} | ${location.country}`}
                            onSelect={handleSelect}>
                                <Search className="mr-2 h-4 w-4" />
                                <span>{location.name}</span>
                                {location.state && (
                                    <span className="text-sm text-muted-foreground">, {location.state}</span>
                                )}
                                {location.country && (
                                    <span className="text-sm text-muted-foreground">, {location.country}</span>
                                )}
                            </CommandItem>
                        )
                    })}
                  <CommandItem>Calendar</CommandItem>
                </CommandGroup>
                }
              </CommandList>
            </CommandDialog>
        </div>
    )
}
export default CitySearch