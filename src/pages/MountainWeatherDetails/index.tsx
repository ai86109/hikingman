import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import MtHeader from "./MtHeader";
import OverviewRecentWeather from "./OverviewRecentWeather";
import WeatherForecast from "./WeatherForecast";
import { useContext } from 'react'
import { WeatherContext } from 'context/WeatherContext'
import { WeatherDataType } from "types/WeatherDataType";

export default function MountainWeatherDetails() {
  const { mountainId } = useParams()
  const { weatherMap } = useContext(WeatherContext)
  const { basicInfo, weekWeatherData, hourWeatherData } = weatherMap.get(mountainId as string) as WeatherDataType
  // console.log("weekWeatherData", weekWeatherData)
  return (
    <Box 
      bg="green" 
      minH="100vh" 
      backgroundImage="url('https://cdn1.n-kishou.co.jp/image/charge/tozan/main_lower_sp01.jpg')" 
      backgroundRepeat="no-repeat"
      p={3}
    >
      <MtHeader basicInfo={basicInfo} />
      <OverviewRecentWeather weekWeatherData={weekWeatherData} hourWeatherData={hourWeatherData} />
      <WeatherForecast weekWeatherData={weekWeatherData} hourWeatherData={hourWeatherData} />
    </Box>
  )
}