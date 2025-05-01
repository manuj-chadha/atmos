import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

interface FavoriteCity {
    id: string,
    name: string,
    lat: number,
    lon: number,
    country: string,
    state?: string,
    addedAt : number

}

export function useFavourite() {
    const [favorite, setFavorite]=useLocalStorage<FavoriteCity[]>("favorite", []);
    const queryClient=useQueryClient();
    const favoriteQuery=useQuery({
        queryKey: ["favorite"],
        queryFn: ()=> favorite,
        initialData: favorite,
        staleTime : Infinity
    });
    const addToFavorite=useMutation({
        mutationFn: async(city: Omit<FavoriteCity, "id"| "addedAt">) => {
            const newFavorite : FavoriteCity ={
                ...city,
                id: `${city.lat}-${city.lon}}`,
                addedAt: Date.now()
            };
            const exists=favorite.some((fav) => fav.id === newFavorite.id)
            if(exists) return favorite;

            const newFavorites=[newFavorite, ...favorite].slice(0, 10);
            setFavorite(newFavorites);
            return newFavorites;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["favorite"],
            });
        }
    });
    const removeFavorite=useMutation({
        mutationFn: async (cityId : string) => {
            const filteredFavorites=favorite.filter((city) => !(city.id === cityId));
            setFavorite(filteredFavorites);
            return filteredFavorites;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["favorite"],
            });
        }
    });
    return {
        favorite: favoriteQuery.data,
        addToFavorite,
        removeFavorite,
        isFavorite: (lat: number, lon: number) => 
            favorite.some((city) => city.lat === lat && city.lon === lon)
        
    }

}