import { weatherDateInfoType, hourWeatherDataType, weekWeatherDataType, sunriseAndSunsetTime } from "types/WeatherDataType"
import { getDateInfo, getTime } from "./getDate"

export const getWxName = (wx: string) => {
  return wx.split(" ").map((word: any) => word.charAt(0).toUpperCase() + word.slice(1)).join("")
}

export const getPoP6hrOfTheDay = (PoP6hr: any) => {
  let tempDate
  const result: string[][] = []
  for(let data of PoP6hr) {
    const dateString = data.startTime
    const dateRaw = new Date(dateString)
    const date = dateRaw.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" }).replace(/\//g, "")
    const PoP = data.elementValue.value
    
    if(date === tempDate) result[result.length - 1].push(PoP)
    else {
      tempDate = date
      result.push([PoP])
    }
  }

  const missingDataCount = 4 - result[0].length
  if(missingDataCount <= 0) return result
  result[0] = Array(missingDataCount).fill("--").concat(result[0])
  return result
}

export const getWeekWeatherDetail = (data: any[], sunriseAndSunsetList: sunriseAndSunsetTime[]) => {
  const weekWeatherData: weekWeatherDataType[] = []
  const dateString = data[0].time[0].startTime
  for(let i = 0; i < 7; i++) {
    const { month, date, day } = getDateInfo(dateString, i)
    const weatherInfo: weekWeatherDataType = {
      date: { month, date, day },
      Wx: { 
        text: data[12].time[i].elementValue[0].value,
        index: data[12].time[i].elementValue[1].value
      },
      PoP: data[9].time[i].elementValue.value,
      maxTemp: data[3].time[i].elementValue.value,
      minTemp: data[4].time[i].elementValue.value,
      maxBodyTemp: data[5].time[i].elementValue.value,
      minBodyTemp: data[6].time[i].elementValue.value,
      humidity: data[2].time[i].elementValue.value,
      wind: {
        direction: data[10].time[i].elementValue.value,
        speed: data[11].time[i].elementValue[1].value //蒲福風級
      },
      maxComfortIdx: data[7].time[i].elementValue[0].value,
      minComfortIdx: data[8].time[i].elementValue[0].value,
      sunriseAndSunset: {
        sunRiseTime: sunriseAndSunsetList[i].SunRiseTime,
        sunSetTime: sunriseAndSunsetList[i].SunSetTime
      }
    }
    weekWeatherData.push(weatherInfo)
  }

  return weekWeatherData
}

export const getHourWeatherDetail = (data: any[]) => {
  const hourWeatherData = []
  let tempDate
  let timeIndex = 0

  for(let i = 0; i < data[0].time.length; i++) {
    const dateString = data[0].time[i].dataTime
    const { month, date, day } = getDateInfo(dateString) as weatherDateInfoType
    const currentTime = getTime(dateString)

    let popData
    const popDataList = data[3].time
    if(popDataList.length > timeIndex) {
      const currentPoPEndtime = new Date(popDataList[timeIndex].endTime).getTime()
      const currentEndtime = new Date(dateString).getTime()

      if(currentPoPEndtime > currentEndtime) popData = popDataList[timeIndex].elementValue.value
      else {
        timeIndex++
        if(popDataList.length > timeIndex) popData = popDataList[timeIndex].elementValue.value
      }
    } else popData = "--"
    
    const weatherInfo: hourWeatherDataType = {
      time: currentTime,
      Wx: {
        text: data[9].time[i].elementValue[0].value,
        index: data[9].time[i].elementValue[1].value
      },
      PoP: popData,
      temp: data[0].time[i].elementValue.value,
      bodyTemp: data[8].time[i].elementValue.value,
      humidity: data[2].time[i].elementValue.value,
      wind: {
        direction: data[5].time[i].elementValue.value,
        speed: data[6].time[i].elementValue[1].value
      },
      comfortIdx: data[7].time[i].elementValue[0].value
    }

    if(tempDate === date) {
      hourWeatherData[hourWeatherData.length -1].weatherData.push(weatherInfo)
    } else {
      tempDate = date
      hourWeatherData.push({ date: { month, date, day }, weatherData: [ weatherInfo ] })
    }
  }
  return hourWeatherData
}

export const getCIindex = (index: number) => {
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