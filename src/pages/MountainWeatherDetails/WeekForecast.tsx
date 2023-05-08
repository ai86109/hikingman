import { TableContainer, Table, Thead, Tr, Th, Tbody, Text, Flex, SystemCSSProperties } from "@chakra-ui/react";
import { Fragment, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { getBgColorByWindSpeed, getWeekForecastWeatherDetail } from "utils/getWeather";
import { SunriseAndSunsetTimeType, WeatherElementType, WeekWeatherDataType, WeatherDateInfoType } from "types/WeatherDataType"
import ButtonsGroup from "components/ButtonsGroup";
import { weekForecastWeatherTableHeaders, weekTabs, weekTabsIcon } from "data/constant";
import { TemperatureContext } from "context/TemperatureContext";
import NoData from "components/NoData";
import TdContainer from "components/TdContainer";
import { CIBlock, HumidityBlock, SunriseAndSunset, MultiTemperatureBlock, WeatherAndPoPBlock, WindBlock } from "components/WeatherTableBlock";

const DateBlock = ({ 
  dateInfo, style
} : { 
  dateInfo: WeatherDateInfoType,
  style?: SystemCSSProperties
}) => {
  const { t } = useTranslation()
  const { month, date, day }: WeatherDateInfoType = dateInfo
  return (
    <TdContainer style={{...style}}>
      <Flex flexDirection="row" justifyContent="center">
        {month}/{date}
        <Text as="b" fontSize="12px" ml="2px">({t(`time.daysOfTheWeek.${day}`)})</Text>
      </Flex>
    </TdContainer>
  )
}

const TableBlock = ({ 
  weekWeatherData, 
  table
} : { 
  weekWeatherData: WeekWeatherDataType[],
  table: string
}) => {
  const { t } = useTranslation()
  const { isCelsius } = useContext(TemperatureContext)

  return (
    <TableContainer bg="white" borderRadius={10}>
      <Table variant='simple' bg="gray.200">
        <Thead>
          <Tr>
            <Th></Th>
            {weekForecastWeatherTableHeaders[table].map((header) => (
              <Th textAlign={"center"} key={header.title}>
                {t(header.title)}
                {header.unit && <>({isCelsius ? "°C" : "°F"})</>}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {weekWeatherData.length > 0 && 
            weekWeatherData.map((datum) => (
            <Fragment key={`${table}-${datum.date.day}`}>
              {table === "table1" && (
                <Tr>
                  <DateBlock dateInfo={datum.date} />
                  <WeatherAndPoPBlock Wx={datum.Wx} PoP={datum.PoP} isDayTime={true} style={{ bg: "white" }} />
                  <MultiTemperatureBlock maxTemp={datum.maxTemp} minTemp={datum.minTemp} isCelsius={isCelsius} style={{ bg: "white" }} />
                </Tr>
              )}
              {table === "table2" && (
                <Tr>
                  <DateBlock dateInfo={datum.date} style={{ px: "12px" }} />
                  <MultiTemperatureBlock maxTemp={datum.maxBodyTemp} minTemp={datum.minBodyTemp} isCelsius={isCelsius} style={{ bg: "white" }} />
                  <HumidityBlock humidity={datum.humidity} style={{ bg: "white", textAlign: "center" }} />
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
                  <DateBlock dateInfo={datum.date} />
                  <CIBlock
                    maxIndex={Number(datum.maxComfortIdx)} 
                    minIndex={Number(datum.minComfortIdx)} 
                    style={{ bg: "white", px: "8px" }} 
                  />
                  <SunriseAndSunset sunriseAndSunset={datum.sunriseAndSunset} style={{ bg: "white" }} />
                </Tr>
              )}
            </Fragment>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default function WeekForecast({ 
  weekForecastWeatherData,
  sunriseAndSunsetList
}: {
  weekForecastWeatherData: WeatherElementType[],
  sunriseAndSunsetList: SunriseAndSunsetTimeType[]
}) {
  const [ selectedTable, setSelectedTable ] = useState<string>('table1')
  const weekWeatherData = getWeekForecastWeatherDetail(weekForecastWeatherData, sunriseAndSunsetList)

  return (
    <>
      <ButtonsGroup 
        tabs={weekTabs}
        icons={weekTabsIcon}
        selectedType={selectedTable}
        setSelectedType={setSelectedTable} 
      />
      {weekWeatherData.length > 0 
        ? <TableBlock weekWeatherData={weekWeatherData} table={selectedTable} />
        : <NoData />
      }
    </>
  )
}