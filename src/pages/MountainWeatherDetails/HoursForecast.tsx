import { Box, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text } from "@chakra-ui/react";
import ButtonsGroup from "components/ButtonsGroup";
import { Fragment, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { getBgColorByWindSpeed, getHourForecastWeatherDetail } from "utils/getWeather";
import { HourWeatherListType, WeatherElementType } from "types/WeatherDataType"
import { hourForecastWeatherTableHeaders, hourTabs, hourTabsIcon } from "data/constant";
import { TemperatureContext } from "context/TemperatureContext";
import { CIBlock, HumidityBlock, SingleTemperatureBlock, WeatherAndPoPBlock, WindBlock } from "components/WeatherTableBlock";

const TableBlock = ({ 
  hourWeatherData, table
} : { 
  hourWeatherData: HourWeatherListType[],
  table: string
}) => {
  const { t } = useTranslation()
  const { isCelsius } = useContext(TemperatureContext)

  return (
    <>
      {hourWeatherData.length > 0 &&
        hourWeatherData.map(({date, weatherData}) => (
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
                    {hourForecastWeatherTableHeaders[table].map((header) => (
                      <Th textAlign={"center"} key={header.title}>
                        {t(header.title)}
                        {header.unit && <>({isCelsius ? "°C" : "°F"})</>}
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                {weatherData.length > 0 &&
                  weatherData.map((datum) => {
                    const hour = datum.time
                    const isDayTime = hour >= 6 && hour < 18

                    return (
                      <Fragment key={`${table}-${datum.time}`}>
                      {table === "table1" && (
                        <Tr>
                          <Td textAlign="center">{datum.time}</Td>
                          <WeatherAndPoPBlock 
                            Wx={datum.Wx} 
                            PoP={datum.PoP} 
                            isDayTime={isDayTime} 
                            style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }} 
                          />
                          <SingleTemperatureBlock temp={datum.temp} isCelsius={isCelsius} style={{ textAlign: "center" }} />
                        </Tr>
                      )}
                      {table === "table2" && (
                        <Tr>
                          <Td textAlign="center">{datum.time}</Td>
                          <HumidityBlock humidity={datum.humidity} style={{ textAlign: "center" }} />
                          <WindBlock
                            wind={datum.wind} 
                            style={{
                              textAlign: "center",
                              bg: getBgColorByWindSpeed(Number(datum.wind.speed))
                            }} 
                          />
                        </Tr>
                      )}
                      {table === "table3" && (
                        <Tr>
                          <Td textAlign="center">{datum.time}</Td>
                          <SingleTemperatureBlock temp={datum.bodyTemp} isCelsius={isCelsius} style={{ textAlign: "center" }} />
                          <CIBlock
                            maxIndex={Number(datum.comfortIdx)} 
                            minIndex={Number(datum.comfortIdx)} 
                            style={{ display: "flex", textAlign: "center", justifyContent: "center" }} 
                          />
                        </Tr>
                      )}
                      </Fragment>
                    )
                  })
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
  hourForecastWeatherData
}: {
  hourForecastWeatherData: WeatherElementType[]
}) {
  const [ selectedType, setSelectedType ] = useState<string>('table1')
  const hourWeatherData = getHourForecastWeatherDetail(hourForecastWeatherData)

  return (
    <>
      <ButtonsGroup
        tabs={hourTabs}
        icons={hourTabsIcon}
        selectedType={selectedType}
        setSelectedType={setSelectedType} 
      />
      <TableBlock hourWeatherData={hourWeatherData} table={selectedType} />
    </>
  )
}