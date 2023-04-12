import { Box, Image, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text, Tooltip, Flex } from "@chakra-ui/react";
import SelectButtons from "components/SelectButtons";
import { Fragment, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCIindex, getHourWeatherDetail, getWxName } from "utils/getWeather";
import { convertCelsiusToFahrenheit } from 'utils/unitCalculate'
import { TFunction } from "i18next";
import { hourWeatherListType } from "types/WeatherDataType"
import { hourTabs, hourTabsIcon, windDirection } from "data/constant";
import { TemperatureContext } from "context/TemperatureContext";

const CIBlock = ({index}: {index: number}) => {
  const CI = getCIindex(index)

  return (
    <Tooltip label={`${CI}，${index}`}>
      <Image w="60px" src={require(`assets/icons/CI/${CI}.png`)} />
    </Tooltip>
  )
}

const TableBlock = ({ 
  data, 
  t,
  table
} : { 
  data: hourWeatherListType[],
  t: TFunction,
  table: string
}) => {
  const { isCelsius } = useContext(TemperatureContext)
  // console.log("data", data)
  return (
    <>
      {data.length > 0 &&
        data.map(({date, weatherData}) => (
          <Fragment key={date.date}>
            <Box bg="#c2ddf6" borderRadius={10} p={3} margin="25px 0 15px">
              {date.month}/{date.date}
              <Text as="b" fontSize="12px" ml="2px">
                ({t(`time.daysOfTheWeek.${date.day}`)})
              </Text>
            </Box>
            <TableContainer bg="white" borderRadius={10}>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th textAlign="center">{t('forecast.time')}</Th>
                    {table === "table1" && (
                      <>
                        <Th textAlign={"center"}>{t('forecast.weatherAndPoP')}</Th>
                        <Th textAlign={"center"}>{t('forecast.temp')}({isCelsius ? "°C" : "°F"})</Th>
                      </>)}
                    {table === "table2" && (
                    <>
                      <Th textAlign={"center"}>{t('forecast.humidity')}</Th>
                      <Th textAlign={"center"}>{t('wind')}</Th>
                    </>)}
                    {table === "table3" && (
                    <>
                      <Th textAlign={"center"}>{t('forecast.bodyTemp')}({isCelsius ? "°C" : "°F"})</Th>
                      <Th textAlign={"center"}>{t('forecast.comfortIndex')}</Th>
                    </>)}
                  </Tr>
                </Thead>
                <Tbody>
                  {table === "table1" &&
                  weatherData.length > 0 &&
                    weatherData.map((datum) => {
                      const hour = datum.time
                      const isDayTime = hour >= 6 && hour < 18

                      return (
                        <Tr key={`${table}-${datum.time}`}>
                          <Td textAlign="center">{datum.time}</Td>
                          <Td display={"flex"} flexDirection={"row"} alignItems="center" justifyContent="center">
                            <Tooltip label={t(`Wx.${getWxName(datum.Wx.text)}`)}>
                              <Image 
                                src={require(`assets/icons/Wx/wx_${isDayTime ? "day" : "night"}_${datum.Wx.index}.svg`)} 
                                alt={t(`Wx.${getWxName(datum.Wx.text)}`) || "--"}
                                boxSize="40px"
                                objectFit={'contain'}
                              />
                            </Tooltip>
                            <Text ml={2} as="b">{datum.PoP || "--"}%</Text>
                          </Td>
                          <Td textAlign="center">
                            {isCelsius 
                              ? datum.temp 
                              : convertCelsiusToFahrenheit(Number(datum.temp))
                            }
                          </Td>
                        </Tr>
                        )
                    })
                  }
                  {table === "table2" &&
                  weatherData.length > 0 &&
                    weatherData.map((datum) => (
                      <Tr key={`${table}-${datum.time}`}>
                        <Td textAlign="center">{datum.time}</Td>
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
                              w="12px"
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
                  weatherData.length > 0 &&
                    weatherData.map((datum) => (
                      <Tr key={`${table}-${datum.time}`}>
                        <Td textAlign="center">{datum.time}</Td>
                        <Td textAlign="center" bg="white">
                          {isCelsius 
                            ? datum.bodyTemp 
                            : convertCelsiusToFahrenheit(Number(datum.bodyTemp))
                          }
                        </Td>
                        <Td textAlign="center" bg="white" display="flex" justifyContent="center">
                          <CIBlock index={Number(datum.comfortIdx)} />
                        </Td>
                      </Tr>
                    ))
                  }
                </Tbody>
              </Table>
            </TableContainer>
          </Fragment>
        ))
      }
    </>
  )
}

export default function HoursForecast({ 
  hourWeatherData
}: {
  hourWeatherData: any[]
}) {
  const [selectedType, setSelectedType] = useState('table1')
  const { t } = useTranslation()
  const data: hourWeatherListType[] = getHourWeatherDetail(hourWeatherData)

  return (
    <>
      <SelectButtons
        tabs={hourTabs}
        icons={hourTabsIcon}
        setSelectedType={setSelectedType} 
      />
      <TableBlock data={data} t={t} table={selectedType} />
    </>
  )
}