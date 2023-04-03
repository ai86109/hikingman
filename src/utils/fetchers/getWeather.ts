import axios from "axios"

const urlBase = `https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/`

const getAPIData = async (url: string) => await axios.get(url)

const getWeatherByFileKey = async (fileKey: string) => {
  const url = `${urlBase}${fileKey}?Authorization=${process.env.REACT_APP_APIKEY}&downloadType=WEB&format=JSON`
  return await getAPIData(url)
}

export const getWeekWeather = async () => {
  const fileKey = `F-B0053-032`
  const res: any = await getWeatherByFileKey(fileKey)
  const datas = res.data.cwbopendata.dataset.locations.location
  return datas
}

export const getHourWeather = async () => {
  const fileKey = `F-B0053-036`
  const res: any = await getWeatherByFileKey(fileKey)
  const datas = res.data.cwbopendata.dataset.locations.location
  return datas
}

export const getWeekWeatherTW = async () => {
  const fileKey = `F-B0053-031`
  const res: any = await getWeatherByFileKey(fileKey)
  const datas = res.data.cwbopendata.dataset.locations.location
  return datas
}

export const getHourWeatherTW = async () => {
  const fileKey = `F-B0053-035`
  const res: any = await getWeatherByFileKey(fileKey)
  const datas = res.data.cwbopendata.dataset.locations.location
  return datas
}

export const getSunrise = async () => {
  const res: any = await getAPIData(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization=${process.env.REACT_APP_APIKEY}&locationName=中央尖山&timeFrom=2023-03-31&timeTo=2023-04-07`)
  const datas = res.data.records.locations.location
  return datas
}