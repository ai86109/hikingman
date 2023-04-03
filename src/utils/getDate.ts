const options = { timeZone: 'Asia/Taipei' }
const today = new Date().toLocaleString('en-US', options)

const getMonth = (date: Date) => date.getMonth() + 1
const getDate = (date: Date) => date.getDate()
const getDay = (date: Date) => date.getDay()

export const getDateInfo = (date: string = today, relativeOfTheDate: number = 0) => {
  let chosenDate = new Date(date)
  chosenDate.setDate(chosenDate.getDate() + relativeOfTheDate)
  return { month: getMonth(chosenDate), date: getDate(chosenDate), day: getDay(chosenDate) }
}

export const getTime = (date: Date) => {
  const chosenDate = new Date(date)
  return chosenDate.getHours()
}