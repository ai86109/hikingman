import { HourWeatherDataType, WeekWeatherDataType, SunriseAndSunsetTimeType, PoP6hrType, WeatherElementType, HourWeatherListType } from "types/WeatherDataType"
import { getDateInfo, getTime, isSameDate, today } from "./getDate"

export const getWxName = (wx: string): string => {
  return wx.split(" ").map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join("")
}

export const getPoP6hrOfTheDay = (PoP6hr: PoP6hrType[]): string[][] => {
  const rearrangeDataByDay = () => {
    let isFirstRow = true
    let tempDate = ''
    const PoPList: string[][] = []
    
    for(let data of PoP6hr) {
      const dateString = data.startTime
      const dateRaw = new Date(dateString)
      const date = dateRaw.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" }).replace(/\//g, "")
      const PoP = data.elementValue.value

      if(date === tempDate) PoPList[PoPList.length - 1].push(PoP)
      else {
        if(isFirstRow) {
          if(isSameDate(today, dateString)) {
            tempDate = date
            PoPList.push([PoP])
            isFirstRow = false
          } else if(new Date(today) < new Date(dateString)) {
            const emptyArr = new Array(4).fill("--")
            PoPList.push(emptyArr)
            isFirstRow = false
          }
        } else {
          tempDate = date
          PoPList.push([PoP])
        }
      }
    }

    return PoPList
  }

  const padList = (PoP6hrRearrangeByDay: string[][]): string[][] => {
    return PoP6hrRearrangeByDay.map((datum) => {
      const diff = 4 - datum.length
      if(diff > 0) {
        const prefix = new Array(diff).fill("--")
        return [...prefix, ...datum]
      } else return datum
    })
  }

  const PoP6hrRearrangeByDay = rearrangeDataByDay()
  const result = padList(PoP6hrRearrangeByDay)

  return result
}

export const getWeekForecastWeatherDetail = (
  weekForecastWeatherData: WeatherElementType[], 
  sunriseAndSunsetList: SunriseAndSunsetTimeType[]
): WeekWeatherDataType[] => {
  const weekWeatherData: WeekWeatherDataType[] = []

  if(weekForecastWeatherData && weekForecastWeatherData.length > 0) {
    const startDate = weekForecastWeatherData[0].time[0].startTime
    for(let i = 0; i < 7; i++) {
      const { month, date, day } = getDateInfo(startDate, i)
      const weatherInfo: WeekWeatherDataType = {
        date: { month, date, day },
        Wx: { 
          text: weekForecastWeatherData[12].time[i].elementValue[0].value,
          index: weekForecastWeatherData[12].time[i].elementValue[1].value
        },
        PoP: weekForecastWeatherData[9].time[i].elementValue.value,
        maxTemp: weekForecastWeatherData[3].time[i].elementValue.value,
        minTemp: weekForecastWeatherData[4].time[i].elementValue.value,
        maxBodyTemp: weekForecastWeatherData[5].time[i].elementValue.value,
        minBodyTemp: weekForecastWeatherData[6].time[i].elementValue.value,
        humidity: weekForecastWeatherData[2].time[i].elementValue.value,
        wind: {
          direction: weekForecastWeatherData[10].time[i].elementValue.value,
          speed: weekForecastWeatherData[11].time[i].elementValue[1].value //蒲福風級
        },
        maxComfortIdx: weekForecastWeatherData[7].time[i].elementValue[0].value,
        minComfortIdx: weekForecastWeatherData[8].time[i].elementValue[0].value,
        sunriseAndSunset: {
          sunRiseTime: sunriseAndSunsetList[i]?.SunRiseTime || "",
          sunSetTime: sunriseAndSunsetList[i]?.SunSetTime || ""
        }
      }
      weekWeatherData.push(weatherInfo)
    }
  }

  return weekWeatherData
}

export const getHourForecastWeatherDetail = (
  hourForecastWeatherData: WeatherElementType[]
): HourWeatherListType[] => {
  const hourWeatherData: HourWeatherListType[] = []
  let tempDate = 0

  if(hourForecastWeatherData && hourForecastWeatherData.length > 0) {
    for(let i = 0; i < hourForecastWeatherData[0].time.length; i++) {
      const dateString: string = hourForecastWeatherData[0].time[i].dataTime
      const { month, date, day } = getDateInfo(dateString)
      const currentTime = getTime(dateString)
      
      const rearrangePoPDataFrom6hrTo3hr = (rawPoPList: PoP6hrType[]) => {
        let timeIndex = 0
        let popData = "--"
        if(rawPoPList.length > timeIndex) {
          const currentPoPEndtime = new Date(rawPoPList[timeIndex].endTime).getTime()
          const currentEndtime = new Date(dateString).getTime()
    
          if(currentPoPEndtime > currentEndtime) popData = rawPoPList[timeIndex].elementValue.value
          else {
            timeIndex++
            if(rawPoPList.length > timeIndex) popData = rawPoPList[timeIndex].elementValue.value
          }
        }
  
        return popData
      }
  
      const popData = rearrangePoPDataFrom6hrTo3hr(hourForecastWeatherData[3].time)
      
      const weatherInfo: HourWeatherDataType = {
        time: currentTime,
        Wx: {
          text: hourForecastWeatherData[9].time[i].elementValue[0].value,
          index: hourForecastWeatherData[9].time[i].elementValue[1].value
        },
        PoP: popData,
        temp: hourForecastWeatherData[0].time[i].elementValue.value,
        bodyTemp: hourForecastWeatherData[8].time[i].elementValue.value,
        humidity: hourForecastWeatherData[2].time[i].elementValue.value,
        wind: {
          direction: hourForecastWeatherData[5].time[i].elementValue.value,
          speed: hourForecastWeatherData[6].time[i].elementValue[1].value
        },
        comfortIdx: hourForecastWeatherData[7].time[i].elementValue[0].value
      }

      if(tempDate === date) {
        hourWeatherData[hourWeatherData.length -1].weatherData.push(weatherInfo)
      } else {
        tempDate = date
        hourWeatherData.push({ date: { month, date, day }, weatherData: [ weatherInfo ] })
      }
    }
  }
  
  return hourWeatherData
}

export const getCIindex = (index: number): string => {
  let CItext
  switch(true) {
    case index <= 10:
      CItext = "veryCold"
      break
    case index <= 15:
      CItext = "cold"
      break
    case index <= 19:
      CItext = "slightCold"
      break
    case index <= 26:
      CItext = "cozy"
      break
    case index <= 30:
      CItext = "hot"
      break
    case index > 30:
      CItext = "veryHot"
      break
    default:
      CItext = "cozy"

  }
  return CItext
}

export const getBgColorByWindSpeed = (speed: number): string => {
  let bgColor = 'white'
  if(speed >= 8) bgColor = 'red'
  else if(speed >= 6) bgColor = 'yellow'
  
  return bgColor
}