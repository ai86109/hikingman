const options = { timeZone: 'Asia/Taipei' }
const today = new Date().toLocaleString('en-US', options)

const getMonth = (date: Date) => date.getMonth() + 1
const getDate = (date: Date) => date.getDate()
const getDay = (date: Date) => date.getDay()
const formatDate = (date: Date) => `${date.getFullYear()}-${getMonth(date).toString().padStart(2, '0')}-${getDate(date).toString().padStart(2, '0')}`

export const getDateInfo = (date: string = today, relativeOfTheDate: number = 0) => {
  let chosenDate = new Date(date)
  chosenDate.setDate(chosenDate.getDate() + relativeOfTheDate)
  return { month: getMonth(chosenDate), date: getDate(chosenDate), day: getDay(chosenDate) }
}

export const getTime = (date: Date) => {
  const chosenDate = new Date(date)
  return chosenDate.getHours()
}

export const getWeekDateFromToday = () => {
  const startDate = new Date(today)
  let endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 7)

  return { start: formatDate(startDate), end: formatDate(endDate) }
}

export const getCurrentHour = () => {
  return new Date(today).getHours()
}