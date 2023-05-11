import { WeatherDataType } from "types/WeatherDataType"
import { useTranslation } from "react-i18next";


export const useGetSearchedList = (list: WeatherDataType[], inputVal: string) => {
  const { t } = useTranslation()
  
  if(inputVal.length === 0) return list
  
  const getSearchedList = (list: WeatherDataType[], searchedText: string) => {
    return list.filter((item: WeatherDataType) => {
      let currentItem = t(`locationName.${item.basicInfo.locationName}`).toLowerCase()
      return currentItem.match(searchedText)
    })
  }

  const searchedText = inputVal.trim().toLowerCase()
  const searchedList = getSearchedList(list, searchedText)
  
  return searchedList
}