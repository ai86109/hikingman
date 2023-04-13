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

export interface weatherDateInfoType {
  month: number,
  date: number,
  day: number
}

export interface weekWeatherDataType {
  date: weatherDateInfoType,
  Wx: {
    text: string,
    index: string
  },
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

export interface hourWeatherDataType {
  time: number,
  Wx: {
    text: string,
    index: string
  },
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

export interface sunriseListType {
  CountyName: string, 
  time: sunriseAndSunsetTime[]
}

export interface sunriseAndSunsetType {
  [key: string]: sunriseAndSunsetTime[]
}