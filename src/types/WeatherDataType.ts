export interface BasicInfoType {
  geocode: string,
  lat: string,
  locationName: string,
  lon: string,
  id: string
}

export interface WeatherDataType { 
  basicInfo: BasicInfoType, 
  weekWeatherData: any[], 
  hourWeatherData: any[] 
}

export type WeatherMapType = Map<string, WeatherDataType>

export type weatherDateInfoType = {
  month: number,
  date: number,
  day: number
}

export type weekWeatherDataType = {
  date: weatherDateInfoType,
  Wx: string,
  PoP: string,
  maxTemp: string,
  minTemp: string,
  maxBodyTemp: string,
  minBodyTemp: string,
  humidity: string,
  wind: {
    direction: string,
    speed: string
  },
  maxComfortIdx: string,
  minComfortIdx: string,
  sunriseAndSunset: {
    sunRiseTime: string,
    sunSetTime: string
  }
}

export type hourWeatherDataType = {
  time: number,
  Wx: string,
  PoP: string,
  temp: string,
  bodyTemp: string,
  humidity: string,
  wind: {
    direction: string,
    speed: string
  },
  comfortIdx: string
}

export interface hourWeatherListType {
  date: weatherDateInfoType,
  weatherData: hourWeatherDataType[]
}

export interface sunriseAndSunsetTime {
  Date: string, 
  SunRiseTime: string, 
  SunSetTime: string 
}

export type sunriseListType = {
  CountyName: string, 
  time: sunriseAndSunsetTime[]
}

export type sunriseAndSunsetType = {
  [key: string]: sunriseAndSunsetTime[]
}