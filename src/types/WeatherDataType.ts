export interface BasicInfoType {
  geocode: string,
  lat: string,
  locationName: string,
  lon: string,
  id: string
}

export interface WeatherElementType {
  description: string,
  elementName: string,
  time: any[]
}

export interface WeatherDataType { 
  basicInfo: BasicInfoType, 
  weekForecastWeatherData: WeatherElementType[], 
  hourForecastWeatherData: WeatherElementType[] 
}

export type ForecastWeatherType = Map<string, WeatherDataType>

export interface PoP6hrType {
  startTime: string,
  endTime: string,
  elementValue: {
    measures: string,
    value: string
  }
}

export interface WeatherDateInfoType {
  month: number,
  date: number,
  day: number
}

export interface WeekWeatherDataType {
  date: WeatherDateInfoType,
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

export interface HourWeatherDataType {
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

export interface HourWeatherListType {
  date: WeatherDateInfoType,
  weatherData: HourWeatherDataType[]
}

export interface SunriseAndSunsetTimeType {
  Date: string, 
  SunRiseTime: string, 
  SunSetTime: string 
}

export interface SunriseAndSunsetListType {
  CountyName: string, 
  time: SunriseAndSunsetTimeType[]
}

export interface SunriseAndSunsetType {
  [key: string]: SunriseAndSunsetTimeType[]
}

export interface SunriseAndSunSetResponseType {
  data: {
    records: {
      locations: {
        location: SunriseAndSunsetListType[]
      }
    }
  }  
}

export interface ForecastWeatherListType {
  geocode: string,
  lat: string,
  locationName: string
  lon: string,
  parameterSet: {
    parameter: {
      parameterName: string,
      parameterValue: string
    }
  },
  weatherElement: WeatherElementType[]
}

export interface ForecastWeatherResponseType {
  data: {
    cwbopendata: {
      dataset: {
        locations: {
          location: ForecastWeatherListType[]
        }
      }
    }
  }
}