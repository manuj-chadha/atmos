import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { useGeoLocation } from "../hooks/use-geolocation";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import WeatherSkeleton from "../ui/loading-skeleton";
import { useForecastQuery, useReverseGeoCodeQuery, useWeatherQuery } from "../hooks/use-weatherquery";
import CurrentWeather from "../cards/current-weather";
import HourlyTemperature from "../cards/hourly-temperature";
import WeatherDetails from "../cards/weather-details";
import WeatherForecast from "../cards/weather-forecast";
import { FavoriteCities } from "../cards/favorite-cities";

const WeatherDashboard = () => {
    const {coordinates, isLoading: locationLoading, error : locationError, getLocation} = useGeoLocation();

    const locationQuery=useReverseGeoCodeQuery(coordinates);
    const weatherQuery=useWeatherQuery(coordinates);
    const forecastQuery=useForecastQuery(coordinates);

    // console.log(locationQuery);
    // console.log("Weather data :", weatherQuery);
    // console.log(forecastQuery);   

    const handleClick=()=>{
        getLocation();
        
        if(coordinates){
            //reload data
            locationQuery.refetch();
            weatherQuery.refetch();
            forecastQuery.refetch();
            
        }
    };
    const locationName=locationQuery.data?.[0];
    if(locationLoading) {
        return (
            <WeatherSkeleton />
        )
    }
    if (locationError) {
        return (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Location Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-4">
              <p>{locationError}</p>
              <Button variant="outline" onClick={()=> getLocation} className="w-fit">
                <MapPin className="mr-2 h-4 w-4" />
                Enable Location
              </Button>
            </AlertDescription>
          </Alert>
        );
    }
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
    if(!weatherQuery.data || !forecastQuery.data){
      return(
        <WeatherSkeleton />
      )
    }
    
    return (
        <div className="space-y-4">
          <FavoriteCities />
            <div className="flex justify-between items-center py-3">
              <h1 className="font-medium text-lg">My Location</h1>
              <Button variant={"outline"}
              size={"icon"}
              onClick={()=> handleClick()}
              disabled={weatherQuery.isFetching || forecastQuery.isFetching}
            >
              <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin": ""}`} />
              </Button>
            </div>
            <div className="grid gap-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <CurrentWeather 
                data={weatherQuery.data}
                locationName={locationName}
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

export default WeatherDashboard;