import { WeatherDataType } from "types/WeatherDataType"
import { TFunction } from "i18next";

export const getSearchedList = (list: WeatherDataType[], matches: string, t: TFunction) => {
  if(matches.length === 0) return list

  const keyword = matches.trim().toLowerCase()
  let searchedList = []
  searchedList = list.filter((item: WeatherDataType) => {
    let currentItem = t(`locationName.${item.basicInfo.locationName}`).toLowerCase()
    return currentItem.match(keyword)
  })
  return searchedList
}