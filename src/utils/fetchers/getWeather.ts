import axios, { AxiosResponse } from "axios"
import { ForecastWeatherResponseType, SunriseAndSunSetResponseType } from "types/WeatherDataType"
import { getWeekDateFromToday } from "utils/getDate"

const urlBase = `https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/`

const getAPIResponse = async (url: string): Promise<AxiosResponse> => {
  try {
    return await axios.get(url)
  } catch(e: any) {
    throw new Error(`Failed to get data from ${url}: ${e.message}`)
  }
}

const getWeatherDataByFileKey = async (fileKey: string) => {
  const url = `${urlBase}${fileKey}?Authorization=${process.env.REACT_APP_APIKEY}&downloadType=WEB&format=JSON`
  try {
    const { data:{ cwbopendata:{ dataset:{ locations:{ location }}}}}: ForecastWeatherResponseType = await getAPIResponse(url)
    return location
  } catch(e: any) {
    throw new Error(`Failed to get weather data from ${url}: ${e.message}`)
  }
}

export const getWeekForecastWeather = async () => {
  const fileKey = `F-B0053-032`
  return await getWeatherDataByFileKey(fileKey)
}

export const getHourForecastWeather = async () => {
  const fileKey = `F-B0053-036`
  return await getWeatherDataByFileKey(fileKey)
}

export const getSunriseAndSunset = async () => {
  const { start, end } = getWeekDateFromToday()
  const url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization=${process.env.REACT_APP_APIKEY}&parameter=SunRiseTime,SunSetTime&timeFrom=${start}&timeTo=${end}`
  try {
    const { data:{records:{locations:{ location }}}}: SunriseAndSunSetResponseType = await getAPIResponse(url)
    return location
  } catch(e: any) {
    throw new Error(`Failed to get sunrise and sunset data' from ${url}: ${e.message}`)
  }
}