import axios from "axios"
import { getWeekDateFromToday } from "utils/getDate"

const urlBase = `https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/`

const getAPIData = async (url: string) => {
  try {
    const res = await axios.get(url)
    return res
  } catch(e: any) {
    console.error(`Failed to get data from ${url}: ${e.message}`)
    throw new Error("Failed to get data")
  }
}

const getWeatherByFileKey = async (fileKey: string) => {
  const url = `${urlBase}${fileKey}?Authorization=${process.env.REACT_APP_APIKEY}&downloadType=WEB&format=JSON`
  try {
    const res = await getAPIData(url)
    const datas = res.data.cwbopendata.dataset.locations.location
    return datas
  } catch(e: any) {
    console.error(`Failed to get weather data from ${url}: ${e.message}`)
    throw new Error("Failed to get weather data")
  }
}

export const getWeekWeather = async () => {
  const fileKey = `F-B0053-032`
  return await getWeatherByFileKey(fileKey)
}

export const getHourWeather = async () => {
  const fileKey = `F-B0053-036`
  return await getWeatherByFileKey(fileKey)
}

// export const getWeekWeatherTW = async () => {
//   const fileKey = `F-B0053-031`
//   return await getWeatherByFileKey(fileKey)
// }

// export const getHourWeatherTW = async () => {
//   const fileKey = `F-B0053-035`
//   return await getWeatherByFileKey(fileKey)
// }

export const getSunrise = async () => {
  const { start, end } = getWeekDateFromToday()
  try {
    const res: any = await getAPIData(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization=${process.env.REACT_APP_APIKEY}&parameter=SunRiseTime,SunSetTime&timeFrom=${start}&timeTo=${end}`)
    const datas = res.data.records.locations.location
    return datas
  } catch(e: any) {
    console.error(`Failed to get sunrise data: ${e.message}`)
    throw new Error("Failed to get sunrise data")
  }
}