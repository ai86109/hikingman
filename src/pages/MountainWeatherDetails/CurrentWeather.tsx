import { Box, Flex, Grid, GridItem, Image, Text, Divider, Tooltip } from "@chakra-ui/react";
import { TemperatureContext } from "context/TemperatureContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { getDateInfo, isSameDate, today } from "utils/getDate";
import { getWxName, getPoP6hrOfTheDay } from "utils/getWeather";
import { convertCelsiusToFahrenheit } from 'utils/unitCalculate'
import { WeatherElementType } from "types/WeatherDataType";

const getWeatherDataByDate = (relativeOfToday: number, weekWeatherData: WeatherElementType[]): string[] => {
  let [ weatherText, weatherCode, maxTemp, minTemp ] = ["--", "--", "--", "--"]
  let targetDate = new Date(today)
  targetDate.setDate(targetDate.getDate() + relativeOfToday)

  function getTargetDateWeather(idx: number) {
    weatherText = weekWeatherData[12].time[idx].elementValue[0].value || "--"
    weatherCode = weekWeatherData[12].time[idx].elementValue[1].value || "--"
    maxTemp = weekWeatherData[3].time[idx].elementValue.value || "--"
    minTemp = weekWeatherData[4].time[idx].elementValue.value || "--"
  }

  if(isSameDate(targetDate.toDateString(), weekWeatherData[3].time[relativeOfToday].startTime)) {
    getTargetDateWeather(relativeOfToday)
  } else {
    for(let i = weekWeatherData[3].time.length - 1; i >= 0; i--) {
      if(isSameDate(targetDate.toDateString(), weekWeatherData[3].time[i].startTime)) getTargetDateWeather(i)
    }
  }

  return [ weatherText, weatherCode, maxTemp, minTemp ]
}

const TempBlock = ({ 
  isMax,
  temp,
} : {
  isMax: boolean,
  temp: string,
}) => {
  const { isCelsius } = useContext(TemperatureContext)
  const { t } = useTranslation()
  const mainBg = isMax ? "#ed4350" : "#1477d0"
  const isNoData = temp === '--'

  return (
    <Box bg={mainBg} w={110} borderRadius={10} textAlign="center" borderWidth={2} borderColor={mainBg}>
      <Text as="b" color="white">
        {isMax ? t(`currentWeather.max`) : t(`currentWeather.min`)}
      </Text>
      <Box bg="white" color={mainBg} borderBottomRadius={8}>
        <Text as="b">
          {(isCelsius || isNoData)
            ? temp 
            : convertCelsiusToFahrenheit(Number(temp))
          }
          {isCelsius ? "°C" : "°F"}
        </Text>
      </Box>
    </Box>
  )
}

const WeatherOverview = ({ 
  relativeOfToday, 
  weekForecastWeatherData,
  PoP
} : { 
  relativeOfToday: number,
  weekForecastWeatherData: WeatherElementType[],
  PoP: string[][]
}) => {
  const { t } = useTranslation()
  const [ weatherText, weatherCode, maxTemp, minTemp ] = getWeatherDataByDate(relativeOfToday, weekForecastWeatherData)
  let targetDate = new Date(today)
  targetDate.setDate(targetDate.getDate() + relativeOfToday)
  const { month, date, day } = getDateInfo(targetDate.toDateString())

  return (
    <Flex direction={{ base: "row" }} justify={{ base: "space-between" }}>
      <Flex direction={{ base: "column" }} alignItems={{ base: "center" }} w="150px">
        <Text fontSize="md" as="b">{t(`time.${relativeOfToday === 0 ? "today" : "tomorrow"}`)}</Text>
        <Text fontSize="md" as="b">
          {month}/{date}
          ({t(`time.daysOfTheWeek.${day}`)})
        </Text>
        <Flex direction={{ base: "column" }} alignItems={{ base: "center" }} mt={4}>
          {weatherText !== '--' ? (
          <>
            <Tooltip label=
            {t(`Wx.${getWxName(weatherText)}`)}>
              <Image 
                src={require(`assets/icons/Wx/wx_day_${weatherCode}.svg`)} 
                alt={t(`Wx.${getWxName(weatherText)}`) || "--"}
                boxSize="54px"
                objectFit={'contain'}
              />
            </Tooltip>
            <Text fontSize="sm" as="b" textAlign={'center'}>
              {t(`Wx.${getWxName(weatherText)}`)}
            </Text>
          </>) : (<Text fontSize="sm" as="b" textAlign={'center'} mt={8}>--</Text>)}
        </Flex>
      </Flex>
      <Box w="250px">
        <Flex direction={{ base: "row" }} justify={{ base: "space-between" }} mb={2}>
          <TempBlock isMax={true} temp={maxTemp} />
          <TempBlock isMax={false} temp={minTemp} />
        </Flex>
        <Grid 
          templateColumns="repeat(5, 1fr)"
          templateRows="repeat(2, 1fr)"
          gap="1px"
          bg="gray"
          borderRadius={10}
          textAlign="center"
          overflow="hidden"
          fontSize={14}
          borderColor="gray"
          borderWidth="1px"
          mt={4}
        >
          <GridItem w="100%" h="10" bg="gray.100" lineHeight="3em">
            {t('currentWeather.time')}
          </GridItem>
          {["0-6", "6-12", "12-18", "18-24"].map((timeRange: string) => (
            <GridItem w="100%" h="10" bg="gray.100" lineHeight="3em" key={`${relativeOfToday}${timeRange}`}>
              {timeRange}
            </GridItem>
          ))}
          <GridItem w="100%" h="10" bg="gray.100" lineHeight="3em">
            {t('currentWeather.PoP')}
          </GridItem>
          {PoP[relativeOfToday].map((value, index) => (
            <GridItem key={index} w="100%" h="10" bg="white" lineHeight="3em">
              {value}{value !== "--" && "%"}
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Flex>
  )
}

export default function CurrentWeather({ 
  weekForecastWeatherData,
  hourForecastWeatherData
}: {
  weekForecastWeatherData: WeatherElementType[],
  hourForecastWeatherData: WeatherElementType[]
}) {
  const PoP6hr = getPoP6hrOfTheDay(hourForecastWeatherData[3].time)

  return (
    <Box bg="white" borderRadius={10} pr={3} py={8} mt={4}>
      <WeatherOverview relativeOfToday={0} weekForecastWeatherData={weekForecastWeatherData} PoP={PoP6hr} />
      <Divider orientation='horizontal' m={[5, 0]} w="unset" />
      <WeatherOverview relativeOfToday={1} weekForecastWeatherData={weekForecastWeatherData} PoP={PoP6hr} />
    </Box>
  )
}