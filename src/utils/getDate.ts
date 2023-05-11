import { WeatherDateInfoType } from "types/WeatherDataType"

const options = { timeZone: 'Asia/Taipei' }
export const today = new Date().toLocaleString('en-US', options)

const getMonth = (date: Date): number => date.getMonth() + 1
const getDate = (date: Date): number => date.getDate()
const getDay = (date: Date): number => date.getDay()
const formatDate = (date: Date): string => `${date.getFullYear()}-${getMonth(date).toString().padStart(2, '0')}-${getDate(date).toString().padStart(2, '0')}`

export const getDateInfo = (date: string = today, relativeOfTheDate: number = 0): WeatherDateInfoType => {
  let chosenDate = new Date(date)
  chosenDate.setDate(chosenDate.getDate() + relativeOfTheDate)
  return { month: getMonth(chosenDate), date: getDate(chosenDate), day: getDay(chosenDate) }
}

export const getTime = (date: string): number => {
  const chosenDate = new Date(date)
  return chosenDate.getHours()
}

export const getWeekDateFromToday = (): { start: string, end: string } => {
  const startDate = new Date(today)
  let endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 7)

  return { start: formatDate(startDate), end: formatDate(endDate) }
}

export const getCurrentHour = (): number => {
  return new Date(today).getHours()
}

export const isSameDate = (date1: string, date2: string): boolean => {
  return new Date(date1).toDateString() === new Date(date2).toDateString()
}