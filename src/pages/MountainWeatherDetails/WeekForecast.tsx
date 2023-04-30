import { Image, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Tooltip, Box, Text, Flex } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCIindex, getWeekWeatherDetail, getWxName } from "utils/getWeather";
import { convertCelsiusToFahrenheit } from 'utils/unitCalculate'
import { sunriseAndSunsetTime, weekWeatherDataType } from "types/WeatherDataType"
import { TFunction } from "i18next";
import ButtonsGroup from "components/ButtonsGroup";
import { weekTabs, weekTabsIcon, windDirection } from "data/constant";
import { TemperatureContext } from "context/TemperatureContext";
import NoData from "components/NoData";

const CIBlock = ({
  maxIndex,
  minIndex
} : {
  maxIndex: number,
  minIndex: number
}) => {
  const max = getCIindex(maxIndex)
  const min = getCIindex(minIndex)

  return (
    <Flex alignItems="center" justifyContent="center">
      {max !== min && 
        <>
          <Tooltip label={`${min}，${minIndex}`}>
            <Image w="50px" src={require(`assets/icons/CI/${min}.svg`)} />
          </Tooltip>
          ～
        </>}
      <Tooltip label={`${max}，${maxIndex}`}>
        <Image w="50px" src={require(`assets/icons/CI/${max}.svg`)} />
      </Tooltip>
    </Flex>
  )
}

const TableBlock = ({ 
  data, 
  t,
  table
} : { 
  data: weekWeatherDataType[],
  t: TFunction,
  table: string
}) => {
  const { isCelsius } = useContext(TemperatureContext)

  return (
    <TableContainer bg="white" borderRadius={10}>
      <Table variant='simple' bg="gray.200">
        <Thead>
          <Tr>
            <Th></Th>
            {table === "table1" && (
            <>
              <Th textAlign={"center"}>{t('forecast.weatherAndPoP')}</Th>
              <Th textAlign={"center"}>{t('forecast.temp')}({isCelsius ? "°C" : "°F"})</Th>
            </>)}
            {table === "table2" && (
            <>
              <Th textAlign={"center"} flexWrap="wrap">{t('forecast.bodyTemp')}({isCelsius ? "°C" : "°F"})</Th>
              <Th textAlign={"center"}>{t('forecast.humidity')}</Th>
              <Th textAlign={"center"}>{t('wind')}</Th>
            </>)}
            {table === "table3" && (
            <>
              <Th textAlign={"center"}>{t('forecast.comfortIndex')}</Th>
              <Th textAlign={"center"}>{t('forecast.sunrise')}</Th>
            </>)}
          </Tr>
        </Thead>
        <Tbody>
          {table === "table1" &&
          data.length > 0 && 
            data.map((datum) => (
              <Tr key={`${table}-${datum.date.day}`}>
                <Td>
                  <Box display="flex" flexDirection="row" justifyContent="center">
                    {datum.date.month}/{datum.date.date}
                    <Text as="b" fontSize="12px" ml="2px">({t(`time.daysOfTheWeek.${datum.date.day}`)})</Text>
                  </Box>
                </Td>
                <Td display={"flex"} flexDirection={"row"} bg="white" alignItems="center">
                  <Tooltip label={t(`Wx.${getWxName(datum.Wx.text)}`)}>
                    <Image 
                      src={require(`assets/icons/Wx/wx_day_${datum.Wx.index}.svg`)} 
                      alt={t(`Wx.${getWxName(datum.Wx.text)}`) || "--"}
                      boxSize="40px"
                      objectFit={'contain'}
                    />
                  </Tooltip>
                  <Text ml={2} as="b">{datum.PoP || "--"}%</Text>
                </Td>
                <Td bg="white">
                  <Flex justifyContent="center">
                    <Text color="#ed4350" as="b">
                      {isCelsius 
                        ? datum.maxTemp 
                        : convertCelsiusToFahrenheit(Number(datum.maxTemp))
                      }
                    </Text>
                    <Text mx={2}>/</Text>
                    <Text color="#1477d0" as="b">
                      {isCelsius 
                        ? datum.minTemp 
                        : convertCelsiusToFahrenheit(Number(datum.minTemp))
                      }
                    </Text>
                  </Flex>
                </Td>
              </Tr>
            ))
          }
          {table === "table2" &&
          data.length > 0 && 
            data.map((datum) => (
              <Tr key={`${table}-${datum.date.day}`}>
                <Td px={3}>
                  <Box display="flex" flexDirection="row" justifyContent="center">
                    {datum.date.month}/{datum.date.date}
                    <Text as="b" fontSize="12px" ml="2px">({t(`time.daysOfTheWeek.${datum.date.day}`)})</Text>
                  </Box>
                </Td>
                <Td textAlign="center" bg="white">
                  <Flex justifyContent="center">
                    <Text color="#ed4350" as="b">
                      {isCelsius 
                        ? datum.maxBodyTemp 
                        : convertCelsiusToFahrenheit(Number(datum.maxBodyTemp))
                      }
                    </Text>
                    <Text mx={2}>/</Text>
                    <Text color="#1477d0" as="b">
                      {isCelsius 
                        ? datum.minBodyTemp 
                        : convertCelsiusToFahrenheit(Number(datum.minBodyTemp))
                      }
                    </Text>
                  </Flex>
                </Td>
                <Td textAlign="center" bg="white">{datum.humidity || "--"}%</Td>
                <Td 
                  textAlign="center" 
                  bg={Number(datum.wind.speed) >= 8 
                    ? "red" 
                    : Number(datum.wind.speed) >= 6
                      ? "yellow" 
                      : "white"}
                >
                  <Flex direction="column" justifyContent="center" alignItems="center">
                    <Image
                      src={require('assets/icons/windDirection.png')}
                      w="14px"
                      mb={1}
                      transform={`rotate(${windDirection[datum.wind.direction]}deg)`}
                    />
                    <Text as="b">{datum.wind.speed}</Text>
                  </Flex>
                </Td>
              </Tr>
            ))
          }
          {table === "table3" &&
          data.length > 0 && 
            data.map((datum) => (
              <Tr key={`${table}-${datum.date.day}`}>
                <Td>
                  <Box display="flex" flexDirection="row" justifyContent="center">
                    {datum.date.month}/{datum.date.date}
                    <Text as="b" fontSize="12px" ml="2px">({t(`time.daysOfTheWeek.${datum.date.day}`)})</Text>
                  </Box>
                </Td>
                <Td textAlign="center" bg="white" px={2}>
                  <CIBlock maxIndex={Number(datum.maxComfortIdx)} minIndex={Number(datum.minComfortIdx)} />
                </Td>
                <Td textAlign="center" bg="white">
                  {datum.sunriseAndSunset.sunRiseTime.length > 0
                    ? <>{datum.sunriseAndSunset.sunRiseTime} / {datum.sunriseAndSunset.sunSetTime}</>
                    : <>--</>
                  }
                </Td>
              </Tr>
            ))
          }
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default function WeekForecast({ 
  weekWeatherData,
  sunriseAndSunsetList
}: {
  weekWeatherData: any[],
  sunriseAndSunsetList: sunriseAndSunsetTime[]
}) {
  const { t } = useTranslation()
  const [selectedType, setSelectedType] = useState('table1')
  const data = getWeekWeatherDetail(weekWeatherData, sunriseAndSunsetList)

  return (
    <>
      <ButtonsGroup 
        tabs={weekTabs}
        icons={weekTabsIcon}
        selectedType={selectedType}
        setSelectedType={setSelectedType} 
      />
      {data.length > 0 
        ? <TableBlock data={data} t={t} table={selectedType} />
        : <NoData />
      }
    </>
  )
}