import { Box } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import MtHeader from "./MtHeader";
import OverviewRecentWeather from "./OverviewRecentWeather";
import WeatherForecast from "./WeatherForecast";
import { useContext, useEffect } from 'react'
import { WeatherContext } from 'context/WeatherContext'
import { WeatherDataType } from "types/WeatherDataType";
import { MtInfoType } from "types/MtInfoType";
import data from 'data/mtInfo.json'
import Back from "components/Back";

export default function MountainWeatherDetails() {
  const matches = /^D(00[1-9]|0[0-9][0-9]|1[0-4][0-9]|15[0-1])$/
  const navigate = useNavigate()
  const { weatherMap, sunriseAndSunset } = useContext(WeatherContext)
  const { mountainId } = useParams()
  // if(!mountainId || !mountainId?.match(matches)) {
  //   console.log("in")
    // navigate("/")
    // return null
  // }
  const id: string = 
    mountainId 
      ? matches.test(mountainId) ? mountainId : "D001"
      : "D001"
  navigate(`/${id}`, { replace: true })
  const mtInfo: MtInfoType = (data as Record<string, MtInfoType>)[id]
  const { weekWeatherData, hourWeatherData } = weatherMap.get(id) as WeatherDataType
  const sunriseAndSunsetList = sunriseAndSunset[mtInfo.county[0]]

  useEffect(() => {
    navigate(`/${id}`, { replace: true })
  }, [id, navigate])

  return (
    <>
      <Back />
      <Box 
        bg="green" 
        minH="100vh" 
        backgroundImage="url('https://cdn1.n-kishou.co.jp/image/charge/tozan/main_lower_sp01.jpg')" 
        backgroundRepeat="no-repeat"
        p={3}
        mt={6}
      >
        <MtHeader mtInfo={mtInfo} />
        <OverviewRecentWeather weekWeatherData={weekWeatherData} hourWeatherData={hourWeatherData} />
        <WeatherForecast weekWeatherData={weekWeatherData} hourWeatherData={hourWeatherData} sunriseAndSunsetList={sunriseAndSunsetList} />
      </Box>
    </>
  )
}