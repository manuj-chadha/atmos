import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";
import { GeocodeResponse, WeatherData } from "../api/types"
import { Card, CardContent } from "../ui/card";

interface CurrentWeatherProps {
    data: WeatherData,
    locationName?: GeocodeResponse

}

const CurrentWeather=({data, locationName}: CurrentWeatherProps)=>{
    const {
        weather: [currentWeather],
        main: {temp, feels_like, temp_min, temp_max, humidity},
        wind: { speed }
    }=data;

    const formatTemp= (temp: number) => `${Math.round(temp)}°`;
    
    return(
        <Card className="overflow-hidden">
            <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-end">
                                <h2 className="text-3xl font-bold">{locationName?.name}</h2>
                                {locationName?.state && (
                                    <span className="text-muted-foreground">
                                        , {locationName.state}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {locationName?.country}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <p className="font-bold text-7xl">{formatTemp(temp)}</p>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Feels like {formatTemp(feels_like)}</p>
                                <div className="flex gap-1 items-center">
                                    <span className="flex items-center gap-1 text-blue-400">
                                        <ArrowDown className="h-3 w-3" />
                                        {formatTemp(temp_min)}
                                    </span>
                                    <span className="flex items-center gap-1 text-red-400">
                                        <ArrowUp className="h-3 w-3" />
                                        {formatTemp(temp_max)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 space-y-1">
                            <div className="flex items-center gap-2">
                                <Droplet className="w-4 h-4 text-blue-400" />
                                <div className="flex flex-col items-start gap-1">
                                    <p className="text-sm font-medium">Humidity</p>
                                    <p className="text-sm text-muted-foreground">{humidity} %</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Wind className="w-4 h-4 text-blue-400" />
                                <div className="flex flex-col items-start gap-1">
                                    <p className="text-sm font-medium">Wind</p>
                                    <p className="text-sm text-muted-foreground">{speed} m/s</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative aspect-square flex w-full max-w-[200px] items-center justify-center">
                            <img src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                            className="h-full w-full object-contain" alt="Not found" />
                            <div className="absolute bottom-0 text-center">
                                <div className="text-sm font-bold capitalize">
                                {currentWeather.description}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )

}
export default CurrentWeather