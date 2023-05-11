import { createContext, ReactNode } from "react";
import { useQuery } from 'react-query'
import { getWeekForecastWeather, getHourForecastWeather, getSunriseAndSunset } from 'utils/fetchers/getWeather'
import { ForecastWeatherType, BasicInfoType, SunriseAndSunsetListType, SunriseAndSunsetType, ForecastWeatherListType } from "types/WeatherDataType";
import { twCounty } from "data/constant";
import { Flex, Skeleton, Spinner, Stack, Text } from "@chakra-ui/react";

interface WeatherContextPropsType {
  forecastWeather: ForecastWeatherType,
  sunriseAndSunset: SunriseAndSunsetType
}

interface WeatherContextProviderPropsType {
  children: ReactNode
}

const WeatherContext = createContext<WeatherContextPropsType>({
  forecastWeather: new Map(),
  sunriseAndSunset: {}
})

const staleTime: number = 5*(60*1000)
const cacheTime: number = 10*(60*1000)
const queryOptions = {
  staleTime, 
  cacheTime, 
  refetchOnWindowFocus: false
}

const rearrangeForecastWeatherData = (
  weekWeatherForecastData: ForecastWeatherListType[] | undefined, 
  hourWeatherForecastData: ForecastWeatherListType[] | undefined
): ForecastWeatherType => {
  const forecastWeatherMap = new Map()
  if(weekWeatherForecastData && weekWeatherForecastData.length > 0) {
    for(let data of weekWeatherForecastData) {
      const id = data.parameterSet.parameter.parameterValue
      const basicInfo: BasicInfoType = {
        "geocode": data.geocode,
        "lat": data.lat,
        "locationName": data.locationName,
        "lon": data.lon,
        "id": id
      }
      forecastWeatherMap.set(id, {basicInfo, weekForecastWeatherData: data.weatherElement})
    }
  }
  
  if(hourWeatherForecastData && hourWeatherForecastData.length > 0 && forecastWeatherMap.size > 0) {
    for(let data of hourWeatherForecastData) {
      const id: string = data.parameterSet.parameter.parameterValue
      if(forecastWeatherMap.has(id)) forecastWeatherMap.set(id, { ...forecastWeatherMap.get(id), hourForecastWeatherData: data.weatherElement })
    }
  }

  return forecastWeatherMap
}

const rearrangeSunriseAndSunsetData = (
  sunriseAndSunsetData: SunriseAndSunsetListType[] | undefined
): SunriseAndSunsetType => {
  let sunriseAndSunset = {}
  if(sunriseAndSunsetData && sunriseAndSunsetData.length > 0) {
    sunriseAndSunset = sunriseAndSunsetData.reduce((acc: SunriseAndSunsetType, { CountyName, time }: SunriseAndSunsetListType) => {
      acc[twCounty[CountyName]] = time
      return acc;
    }, {});
  }

  return sunriseAndSunset
}

const WeatherContextProvider = ({ children }: WeatherContextProviderPropsType) => {
  const { 
    data: weekWeatherForecastData, 
    isLoading: weekWeatherForecastDataIsLoading, 
    isError: weekWeatherForecastDataIsError 
  } = useQuery<ForecastWeatherListType[]>(['week'], getWeekForecastWeather, queryOptions)
  const { 
    data: hourWeatherForecastData, 
    isLoading: hourWeatherForecastDataIsLoading, 
    isError: hourWeatherForecastDataIsError 
  } = useQuery<ForecastWeatherListType[]>(['hour'], getHourForecastWeather, queryOptions)
  const { 
    data: sunriseAndSunsetData, 
    isLoading: sunriseAndSunsetDataIsLoading, 
    isError: sunriseAndSunsetDataIsError 
  } = useQuery<SunriseAndSunsetListType[]>(['sunrise'], getSunriseAndSunset, queryOptions)

  if(weekWeatherForecastDataIsLoading || hourWeatherForecastDataIsLoading || sunriseAndSunsetDataIsLoading) {
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

  if(weekWeatherForecastDataIsError || hourWeatherForecastDataIsError || sunriseAndSunsetDataIsError) {
    return (
      <Flex justifyContent="center" h="100vh" alignItems="center" direction="column" bg="green">
        <Text as="b" fontSize={28}>Something went wrong ...</Text>
        <Text fontSize={20}>Please reload later</Text>
      </Flex>
    )
  }

  const forecastWeather = rearrangeForecastWeatherData(weekWeatherForecastData, hourWeatherForecastData)
  const sunriseAndSunset = rearrangeSunriseAndSunsetData(sunriseAndSunsetData)

  return (
    <WeatherContext.Provider value={{ forecastWeather, sunriseAndSunset }}>
      <Skeleton isLoaded={true}>
        {children}
      </Skeleton>
    </WeatherContext.Provider>
  )
}

export { WeatherContext, WeatherContextProvider }