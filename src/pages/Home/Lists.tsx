import { Card, CardBody, CardFooter, Stack, Heading, Button, Flex, Box, Image, Tooltip } from '@chakra-ui/react'
import { TemperatureContext } from 'context/TemperatureContext'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { WeatherMapType, WeatherDataType } from 'types/WeatherDataType'
import { getWxName } from 'utils/getWeather'
import { convertCelsiusToFahrenheit } from 'utils/unitCalculate'
import { getSearchedList } from 'utils/search'
import { getCurrentHour, isSameDate, today } from 'utils/getDate'
import NoData from 'components/NoData'

export default function Lists({ 
  data,
  inputVal
}: {
  data: WeatherMapType,
  inputVal: string
} ) {
  const { isCelsius } = useContext(TemperatureContext)
  const { t } = useTranslation()
  const list = getSearchedList(Array.from(data.values()), inputVal, t)
  const currentHour = getCurrentHour()
  const isDayTime = currentHour >= 6 && currentHour < 18
  let targetIdx = 0
  if(list.length > 0) {
    for(let [key, value] of list[0].hourWeatherData[0].time.entries()) {
      if(isSameDate(today, value.dataTime) && new Date(value.dataTime) > new Date(today)) {
        targetIdx = key - 1
        break
      }
    }
  }

  return (
    <>
      {list.length > 0 ?
        list.map((mountain: WeatherDataType) => {
          return (
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
                    <Tooltip label={t(`Wx.${getWxName(mountain.hourWeatherData[9].time[targetIdx].elementValue[0].value)}`)}>
                      <Image 
                        src={require(`assets/icons/Wx/wx_${isDayTime ? "day" : "night"}_${mountain.hourWeatherData[9].time[targetIdx].elementValue[1].value}.svg`)} 
                        alt={t(`Wx.${getWxName(mountain.hourWeatherData[9].time[targetIdx].elementValue[0].value)}`) || "--"}
                        w="40px" 
                      />
                    </Tooltip>
                    <Box ml={4}>
                      {isCelsius 
                        ? mountain.hourWeatherData[0].time[targetIdx].elementValue.value 
                        : convertCelsiusToFahrenheit(mountain.hourWeatherData[0].time[targetIdx].elementValue.value)
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
        }) : <NoData />
      }
    </>
  )
}