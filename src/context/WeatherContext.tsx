import { createContext, ReactNode } from "react";
import { useQuery } from 'react-query'
import { getWeekWeather, getHourWeather, getSunrise } from 'utils/fetchers/getWeather'
import { WeatherMapType, BasicInfoType, sunriseListType, sunriseAndSunsetType } from "types/WeatherDataType";
import { twCounty } from "data/constant";
import { Flex, Skeleton, Spinner, Stack, Text } from "@chakra-ui/react";

interface WeatherContextProps {
  weatherMap: WeatherMapType,
  sunriseAndSunset: sunriseAndSunsetType
}

interface WeatherContextProviderProps {
  children: ReactNode
}

const WeatherContext = createContext<WeatherContextProps>({
  weatherMap: new Map(),
  sunriseAndSunset: {}
})

const WeatherContextProvider = ({ children }: WeatherContextProviderProps) => {
  const { data: weekWeather, isLoading: weekWeatherIsLoading, isError: weekWeatherIsError } = useQuery<any>(['week'], getWeekWeather, {staleTime: 600000, cacheTime: 600000, refetchOnWindowFocus: false})
  const { data: hourWeather, isLoading: hourWeatherIsLoading, isError: hourWeatherIsError } = useQuery<any>(['hour'], getHourWeather, {staleTime: 600000, cacheTime: 600000, refetchOnWindowFocus: false})
  const { data: sunrise, isLoading: sunriseIsLoading, isError: sunriseIsError } = useQuery(['sunrise'], getSunrise, {staleTime: 600000, cacheTime: 600000, refetchOnWindowFocus: false})
  // const { data: weekWeatherTW, isLoading: weekWeatherIsLoadingTW, isError: weekWeatherIsErrorTW } = useQuery<any>(['weekTW'], getWeekWeatherTW, {staleTime: 60000})
  // const { data: hourWeatherTW, isLoading: hourWeatherIsLoadingTW, isError: hourWeatherIsErrorTW } = useQuery<any>(['hourTW'], getHourWeatherTW, {staleTime: 60000})
  // if(!weekWeatherIsLoadingTW && !weekWeatherIsErrorTW) console.log("weekWeatherTW", weekWeatherTW)

  if(weekWeatherIsLoading || hourWeatherIsLoading || sunriseIsLoading) {
    return (
      <Stack pt={10} px={4}>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.300'
          color='gray'
          size='xl'
        />
        <Skeleton height='40px' />
        <Skeleton height='40px' />
        <Skeleton height='50px' />
        <Skeleton height='50px' />
        <Skeleton height='50px' />
      </Stack>
    )
  }

  if(weekWeatherIsError && hourWeatherIsError && sunriseIsError) {
    return (
      <Flex justifyContent="center" h="100vh" alignItems="center" direction="column" bg="green">
        <Text as="b" fontSize={28}>Something went wrong ...</Text>
        <Text fontSize={20}>Please reload later</Text>
      </Flex>
    )
  }

  const weatherMap = new Map()
  if(!weekWeatherIsError && !hourWeatherIsError && weekWeather?.length > 0 && hourWeather?.length > 0) {
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

  let sunriseAndSunset: sunriseAndSunsetType = {}
  if(!sunriseIsError && Object.keys(sunrise).length > 0) {
    sunriseAndSunset = sunrise.reduce((acc: sunriseAndSunsetType, { CountyName, time }: sunriseListType) => {
      acc[twCounty[CountyName]] = time
      return acc;
    }, {});
  }

  return (
    <WeatherContext.Provider value={{ weatherMap, sunriseAndSunset }}>
      <Skeleton isLoaded={true}>
        {children}
      </Skeleton>
    </WeatherContext.Provider>
  )
}

export { WeatherContext, WeatherContextProvider }