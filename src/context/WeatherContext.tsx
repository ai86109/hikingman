import { createContext, ReactNode } from "react";
import { useQuery } from 'react-query'
import { getWeekWeather, getHourWeather, getWeekWeatherTW, getHourWeatherTW, getSunrise } from 'utils/fetchers/getWeather'
import { WeatherMapType, BasicInfoType } from "types/WeatherDataType";

interface WeatherContextProps {
  weatherMap: WeatherMapType
}

interface WeatherContextProviderProps {
  children: ReactNode
}

const WeatherContext = createContext<WeatherContextProps>({
  weatherMap: new Map()
})

const WeatherContextProvider = ({ children }: WeatherContextProviderProps) => {
  const { data: weekWeather, isLoading: weekWeatherIsLoading, isError: weekWeatherIsError } = useQuery<any>(['week'], getWeekWeather, {staleTime: 600000})
  const { data: hourWeather, isLoading: hourWeatherIsLoading, isError: hourWeatherIsError } = useQuery<any>(['hour'], getHourWeather, {staleTime: 600000})
  // const { data: weekWeatherTW, isLoading: weekWeatherIsLoadingTW, isError: weekWeatherIsErrorTW } = useQuery<any>(['weekTW'], getWeekWeatherTW, {staleTime: 60000})
  // const { data: hourWeatherTW, isLoading: hourWeatherIsLoadingTW, isError: hourWeatherIsErrorTW } = useQuery<any>(['hourTW'], getHourWeatherTW, {staleTime: 60000})
  // const { data: sunrise } = useQuery(['sunrise'], getSunrise, {staleTime: 600000})
  // console.log("sunrise", sunrise)
  // if(!weekWeatherIsLoadingTW && !weekWeatherIsErrorTW) console.log("weekWeatherTW", weekWeatherTW)

  if(weekWeatherIsLoading || hourWeatherIsLoading) return <h2>Loading...</h2>

  if(weekWeatherIsError || hourWeatherIsError) return <div>Something went wrong...</div>

  const weatherMap = new Map()
  if(weekWeather?.length > 0 && hourWeather?.length > 0) {
    for(let data of weekWeather) {
      const id: string = data.parameterSet.parameter.parameterValue
      const basicInfo: BasicInfoType = {
        "geocode": data.geocode,
        "lat": data.lat,
        "locationName": data.locationName,
        "lon": data.lon,
        "id": data.parameterSet.parameter.parameterValue
      }
      weatherMap.set(id, {basicInfo, weekWeatherData: data.weatherElement})
    }
    
    for(let data of hourWeather) {
      const id: string = data.parameterSet.parameter.parameterValue
      if(weatherMap.has(id)) weatherMap.set(id, { ...weatherMap.get(id), hourWeatherData: data.weatherElement })
    }

    //拿資料
    // if(weekWeatherTW.length > 0 && weekWeather.length > 0) {
    //   const res = weekWeatherTW.map((r) => {
    //     // console.log("test", r.weatherElement[12].time[0].elementValue[0].value)
    //     const id = r.parameterSet.parameter.parameterValue
    //     let enName
    //     weekWeather.forEach(ele => {
    //       if(ele.parameterSet.parameter.parameterValue === id) enName = ele.weatherElement[12].time[0].elementValue[0].value
    //     });

    //     return [`Wx.${enName.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("")}`, enName]
    //   })
    //   console.log("res", res.reduce((acc, [key, value]) => ({ ...acc, [key]: value}), {}))
    // }
}
// console.log("weatherMap", JSON.stringify(Object.fromEntries(weatherMap)))

  return (
    <WeatherContext.Provider value={{ weatherMap }}>
      {children}
    </WeatherContext.Provider>
  )
}

export { WeatherContext, WeatherContextProvider }