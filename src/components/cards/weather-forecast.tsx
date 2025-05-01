import { format } from "date-fns"
import { ForecastData } from "../api/types"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";

interface ForecastDataProps {
    data: ForecastData
}
interface DailyForecast {
    date: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    wind: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    };
  }

const WeatherForecast=({data}: ForecastDataProps)=> {
    const dailyForecasts=data.list.reduce((acc, forecast) => {
        const date=format(new Date(forecast.dt*1000), "yyyy-MM-dd");
        if(!acc[date]){
            acc[date]= {
                temp_min: Math.round(forecast.main.temp_min),
                temp_max: Math.round(forecast.main.temp_max),
                humidity: forecast.main.humidity,
                wind: forecast.wind.speed,
                weather: forecast.weather[0],
                date: forecast.dt,
            };
        }
        else {
            acc[date].temp_min=Math.round(Math.min(acc[date].temp_min, forecast.main.temp_min));
            acc[date].temp_max=Math.round(Math.max(acc[date].temp_max, forecast.main.temp_max));
        }
        return acc;
    }
    , {} as Record<string, DailyForecast> );
    
    const arr=Object.values(dailyForecasts).slice(0,6);
    console.log(arr);
    
        
    return (
        <Card>
            <CardHeader><CardTitle>5 Days Forecast</CardTitle></CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    {arr.map((day) => {
                        return (
                            <div className="flex items-center justify-between px-4 py-3 text-sm shadow-sm border rounded-lg" key={day.date}>
                                <div className="flex flex-col">
                                    <span className="font-medium">{format(new Date(day.date*1000), "EEE, MMM d")}</span>
                                    <span className="text-muted-foreground capitalize">{day.weather.description}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="flex gap-1 text-blue-500">
                                        <ArrowDown className="h-5 w-5" /> {day.temp_min}°
                                    </span>
                                    <span className="flex gap-1 text-red-400">
                                        <ArrowUp className="h-5 w-5" /> {day.temp_max}°
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="flex gap-1">
                                        <Droplet className="h-5 w-5 text-blue-500" /> {day.humidity} %
                                    </span>
                                    <span className="flex gap-1">
                                        <Wind className="h-5 w-5 text-blue-500" /> {day.wind} m/s
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
export default WeatherForecast