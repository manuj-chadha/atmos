import { Gauge, Sunrise, Sunset, Wind } from "lucide-react";
import { WeatherData } from "../api/types"
import { Card, CardContent, CardHeader } from "../ui/card"
import { format } from "date-fns";

interface WeatherDetailsProps {
    data : WeatherData
}
const WeatherDetails=({data}: WeatherDetailsProps)=>{
    const {main, wind, sys}=data;
    const formatNumber=(timestamp : number) => {
        return format(new Date(timestamp*1000), "h:mm a")
    };
    const getWindDirection=(degree: number) => {
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        const index = Math.round(((degree%= 360) < 0 ? degree = 360 : degree) / 45) % 8;
        return directions[index];
    }
    const weatherData=[
        {
            field: "Sunrise",
            data: formatNumber(sys.sunrise),
            icon: <Sunrise />,
            color: "text-orange-400"
        },
        {
            field: "Sunset",
            data: formatNumber(sys.sunset),
            icon: <Sunset />,
            color: "text-blue-400"
        },
        {
            field: "Wind Direction",
            data: `${getWindDirection(wind.deg)} ${wind.deg}°`,
            icon: <Wind />,
            color: "text-green-400"
        },
        {
            field: "Pressure",
            data: `${main.pressure} hPa`,
            icon: <Gauge />,
            color: "text-purple-400"
        }
    ]

    return(
        <Card>
            <CardHeader className="font-semibold">Weather Details</CardHeader>
            <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                {weatherData.map((item) => {
                    return (
                        <div key={item.data} className="flex gap-6 items-center p-2 border rounded-lg">
                            <div className={`ml-3 h-5 w-5 ${item.color}`}>{item.icon}</div>
                            <div className="flex flex-col items-start">
                                <span className={`text-nowrap font-medium`}>{item.field}</span>
                                <span className="text-muted-foreground">{item.data}</span>
                            </div>
                        </div>
                    )
                })}
                </div>
            </CardContent>
        </Card>
    )
}
export default WeatherDetails