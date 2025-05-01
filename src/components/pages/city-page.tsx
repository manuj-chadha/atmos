import { useParams, useSearchParams } from "react-router-dom";
import { useForecastQuery, useWeatherQuery } from "../hooks/use-weatherquery";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import WeatherSkeleton from "../ui/loading-skeleton";
import CurrentWeather from "../cards/current-weather";
import HourlyTemperature from "../cards/hourly-temperature";
import WeatherDetails from "../cards/weather-details";
import WeatherForecast from "../cards/weather-forecast";
import FavoriteButton from "../city/favorite-button";

const CityPage = () => {
    const [searchParams]=useSearchParams();
    const params=useParams();
    const lat=parseFloat(searchParams.get("lat") || "0");
    const lon=parseFloat(searchParams.get("lon") || "0");
    const coordinates={ lat, lon};

    const weatherQuery=useWeatherQuery(coordinates);
    const forecastQuery=useForecastQuery(coordinates);

    const handleClick=()=>{        
        if(coordinates){
            //reload data
            weatherQuery.refetch();
            forecastQuery.refetch();
            
        }
    };

    if(weatherQuery.error || forecastQuery.error){
        return(
            <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-4">
              <p>Error fetching weather data. Please try again.</p>
              <Button variant="outline" onClick={()=> handleClick} className="w-fit">
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )
    }
    if(!weatherQuery.data || !forecastQuery.data || !params.cityName){
        return(
          <WeatherSkeleton />
        )
      }
    return (
        <div className="space-y-4">
            {/* Favourite cities */}
            <div className="flex justify-between items-center py-3">
              <h1 className="font-bold tracking-tight text-3xl">{params.cityName}, {weatherQuery.data.sys.country}</h1>
              <div>
                <FavoriteButton data={{...weatherQuery.data, name: params.cityName}} />
              </div>
            </div>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <CurrentWeather 
                data={weatherQuery.data}
                />
                <HourlyTemperature data={forecastQuery.data} />
              </div>
              <div className="grid gap-6 md:grid-cols-2 items-start">
                <WeatherDetails data={weatherQuery.data} />
                <WeatherForecast data={forecastQuery.data} />
              </div>
              <div>

              </div>
            </div>
        </div>
    );
};

export default CityPage;