import { ForecastData } from "../api/types"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format } from "date-fns";
interface HourlyTemperatureProps {
    data: ForecastData,
}


const HourlyTemperature=({data}: HourlyTemperatureProps ) => {

    const chartData=data.list.slice(0, 8).map((item) => ({
        time: format(new Date(item.dt*1000), "ha"),
        temp: Math.round(item.main.temp),
        feels_like: Math.round(item.main.feels_like)
    }))
    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>Today's Temperature</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full">
                <ResponsiveContainer width={"100%"} height={"100%"}>
                <LineChart data={chartData}>
                    <XAxis 
                    dataKey="time" 
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    />
                    <YAxis 
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}°`}
                    />
                    <Line 
                    type="monotone" 
                    dataKey="temp" 
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={true} />
                    <Line 
                    type="monotone" 
                    dataKey="feels_like" 
                    stroke="#ffffff"
                    strokeWidth={2}
                    dot={false}
                    strokeDasharray="5 5" />

                    <Tooltip
                    content={({active, payload}) => {
                        if(active && payload && payload.length){
                            return(
                                <div className="p-2 border bg-background shadow-sm rounded-xl grid grid-cols-2 gap-2">
                                    <div className="flex flex-col uppercase text-xs">
                                        <div className="text-muted-foreground">Temperature</div>
                                        <div>{payload[0].value}°</div>
                                    </div>
                                    <div className="flex flex-col uppercase text-xs">
                                        <div className="text-muted-foreground">Feels like</div>
                                        <div>{payload[1].value}°</div>
                                    </div>
                                </div>
                            )
                        }
                        return null;
                    }} />
                </LineChart>
                </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

export default HourlyTemperature