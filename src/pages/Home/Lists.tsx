import { Card, CardBody, CardFooter, Stack, Heading, Button, Flex, Box, Image, Tooltip } from '@chakra-ui/react'
import { TemperatureContext } from 'context/TemperatureContext'
import { WeatherContext } from 'context/WeatherContext'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { WeatherDataType } from 'types/WeatherDataType'
import { getWxName } from 'utils/getWeather'
import { convertCelsiusToFahrenheit } from 'utils/unitCalculate'
import { useGetSearchedList } from 'hooks/useGetSearchedList'
import { getCurrentHour, isSameDate, today } from 'utils/getDate'
import NoData from 'components/NoData'

const getTargetIndex = (list: WeatherDataType[]) => {
  if(list.length > 0) {
    const timeList = list[0].hourForecastWeatherData[0].time
    for(let i = 0; i < timeList.length; i++) {
      const isGreaterThanCurrentTime = isSameDate(today, timeList[i].dataTime) && new Date(timeList[i].dataTime) > new Date(today)
      if(isGreaterThanCurrentTime) return i - 1
    }
  }
  return 0
}

export default function Lists({ 
  inputVal
}: {
  inputVal: string
} ) {
  const { forecastWeather } = useContext(WeatherContext)
  const { isCelsius } = useContext(TemperatureContext)
  const { t } = useTranslation()
  const mountainList = useGetSearchedList(Array.from(forecastWeather.values()), inputVal)
  const currentHour = getCurrentHour()
  const isDayTime = currentHour >= 6 && currentHour < 18
  const targetIndex = getTargetIndex(mountainList)

  return (
    <>
      {mountainList.length > 0 ?
        mountainList.map((mountain: WeatherDataType) => (
          <Card
            key={mountain.basicInfo.id}
            direction={{ base: 'row' }}
            alignItems={{ base: 'center' }}
            justifyContent={{ base: 'space-between' }}
            overflow='hidden'
          >
            <Heading size='md' pl={4} w={{ base: '150px' }}>
              {t(`locationName.${mountain.basicInfo.locationName}`)}
            </Heading>
            <Stack direction={{ base: 'row' }} alignItems={{ base: 'center' }}>
              <CardBody>
                <Flex alignItems={'center'}>
                  <Tooltip label={t(`Wx.${getWxName(mountain.hourForecastWeatherData[9].time[targetIndex].elementValue[0].value)}`)}>
                    <Image 
                      src={require(`assets/icons/Wx/wx_${isDayTime ? "day" : "night"}_${mountain.hourForecastWeatherData[9].time[targetIndex].elementValue[1].value}.svg`)} 
                      alt={t(`Wx.${getWxName(mountain.hourForecastWeatherData[9].time[targetIndex].elementValue[0].value)}`) || "--"}
                      w="40px" 
                    />
                  </Tooltip>
                  <Box ml={4}>
                    {isCelsius 
                      ? mountain.hourForecastWeatherData[0].time[targetIndex].elementValue.value 
                      : convertCelsiusToFahrenheit(mountain.hourForecastWeatherData[0].time[targetIndex].elementValue.value)
                    }
                    {isCelsius ? "°C" : "°F"}
                  </Box>
                </Flex>
              </CardBody>
              <CardFooter>
                <Link to={mountain.basicInfo.id}>
                  <Button variant='solid' colorScheme='blue'>
                    {t('lists.detail')}
                  </Button>
                </Link>
              </CardFooter>
            </Stack>
          </Card>)
        ) : <NoData />
      }
    </>
  )
}