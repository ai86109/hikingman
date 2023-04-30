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
  const { weatherMap, sunriseAndSunset } = useContext(WeatherContext)
  const { mountainId } = useParams()
  const id: string = 
    mountainId 
      ? matches.test(mountainId) ? mountainId : "D001"
      : "D001"
  const mtInfo: MtInfoType = (data as Record<string, MtInfoType>)[id]
  const { weekWeatherData = [], hourWeatherData = [] } = weatherMap.size > 0 ? weatherMap.get(id) as WeatherDataType : {}
  const sunriseAndSunsetList = Object.keys(sunriseAndSunset).length > 0 ? sunriseAndSunset[mtInfo.county[0]] : []

  // interface DifficultyData {
  //   [key: string]: string[]
  // }
  
  // const obj: DifficultyData = {}
  // Object.keys(data).map((key: string) => {
  //   const county = (data as any)[key].county
  //   for(let c of county) {
  //     if(Object.prototype.hasOwnProperty.call(obj, c)) obj[c].push(key)
  //     else obj[c] = [key]
  //   }
  //   // if(Object.prototype.hasOwnProperty.call(obj, cate)) obj[park].push(key)
  //   // else obj[park] = [key]
  // })
  // Object.keys(obj).map((key: string) => {
  //   // obj[key] = (obj[key][1] as [string, number][]).sort((a, b) => b - a)
  //   obj[key] = obj[key].sort((a, b) => {
  //     return b[1] - a[1]
  //   })
  // })
  // console.log("data", obj)

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
        <Info mtInfo={mtInfo} />
        {(weekWeatherData.length > 0 && hourWeatherData.length > 0)
          ? (<>
              <CurrentWeather weekWeatherData={weekWeatherData} hourWeatherData={hourWeatherData} />
              <WeatherForecast weekWeatherData={weekWeatherData} hourWeatherData={hourWeatherData} sunriseAndSunsetList={sunriseAndSunsetList} />
            </>)
          : <NoData />
        }
      </Box>
    </>
  )
}