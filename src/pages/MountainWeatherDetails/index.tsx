import { Box } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import Info from "./Info";
import CurrentWeather from "./CurrentWeather";
import WeatherForecast from "./WeatherForecast";
import { useContext, useEffect } from 'react'
import { WeatherContext } from 'context/WeatherContext'
import { WeatherDataType } from "types/WeatherDataType";
import { MtInfoType } from "types/MtInfoType";
import data from 'data/mtInfo.json'
import Back from "components/Back";
import NoData from "components/NoData";

export default function MountainWeatherDetails() {
  const matches = /^D(00[1-9]|0[0-9][0-9]|1[0-4][0-9]|15[0-1])$/
  const navigate = useNavigate()
  const { forecastWeather, sunriseAndSunset } = useContext(WeatherContext)
  const { mountainId } = useParams()
  const id: string = 
    mountainId 
      ? matches.test(mountainId) ? mountainId : "D001"
      : "D001"
  const mountainInfo: MtInfoType = (data as {[key: string]: MtInfoType})[id]
  const { weekForecastWeatherData = [], hourForecastWeatherData = [] } = forecastWeather.size > 0 ? forecastWeather.get(id) as WeatherDataType : {}
  const sunriseAndSunsetList = Object.keys(sunriseAndSunset).length > 0 ? sunriseAndSunset[mountainInfo.county[0]] : []
  const hasData = weekForecastWeatherData.length > 0 && hourForecastWeatherData.length > 0

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
        <Info mountainInfo={mountainInfo} />
        {hasData
          ? (<>
              <CurrentWeather weekForecastWeatherData={weekForecastWeatherData} hourForecastWeatherData={hourForecastWeatherData} />
              <WeatherForecast weekForecastWeatherData={weekForecastWeatherData} hourForecastWeatherData={hourForecastWeatherData} sunriseAndSunsetList={sunriseAndSunsetList} />
            </>)
          : <NoData />
        }
      </Box>
    </>
  )
}