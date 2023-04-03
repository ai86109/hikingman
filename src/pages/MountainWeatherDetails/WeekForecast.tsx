import { Image, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getWeekWeatherDetail } from "utils/getWeather";
import { weekWeatherDataType } from "types/WeatherDataType"
import { TFunction } from "i18next";
import SelectButtons from "components/SelectButtons";
import { weekTabs } from "data/constant";

const TableBlock = ({ 
  data, 
  t,
  table
} : { 
  data: weekWeatherDataType[],
  t: TFunction,
  table: string
}) => {
  return (
    <TableContainer bg="white" borderRadius={10}>
      <Table variant='simple' bg="gray.200">
        <Thead>
          <Tr>
            <Th></Th>
            {table === "table1" && (
            <>
              <Th textAlign={"center"}>天気 / 降水確率</Th>
              <Th textAlign={"center"}>気温</Th>
            </>)}
            {table === "table2" && (
            <>
              <Th textAlign={"center"}>體感溫度</Th>
              <Th textAlign={"center"}>濕度</Th>
              <Th textAlign={"center"}>風</Th>
            </>)}
            {table === "table3" && (
            <>
              <Th textAlign={"center"}>舒適度</Th>
              <Th textAlign={"center"}>日出日落</Th>
            </>)}
          </Tr>
        </Thead>
        <Tbody>
          {table === "table1" &&
          data.length > 0 && 
            data.map((datum) => (
              <Tr key={`${table}-${datum.date.day}`}>
                <Td>{datum.date.month}/{datum.date.date} ({t(`time.daysOfTheWeek.${datum.date.day}`)})</Td>
                <Td display={"flex"} flexDirection={"row"} bg="white">
                  {/* image need to change */}
                  <Image src="https://cdn1.n-kishou.co.jp/image/icon_weather/13.png" w="40px" /> 
                  {/* Wx 用 tooltip 表示 */}
                  <div>{datum.PoP || "--"}%</div>
                </Td>
                <Td textAlign="center" bg="white">{datum.maxTemp} / {datum.minTemp}</Td>
              </Tr>
            ))
          }
          {table === "table2" &&
          data.length > 0 && 
            data.map((datum) => (
              <Tr key={`${table}-${datum.date.day}`}>
                <Td>{datum.date.month}/{datum.date.date} ({t(`time.daysOfTheWeek.${datum.date.day}`)})</Td>
                <Td textAlign="center" bg="white">{datum.maxBodyTemp} / {datum.minBodyTemp}</Td>
                <Td textAlign="center" bg="white">{datum.humidity}</Td>
                {/* wind direction image */}
                <Td textAlign="center" bg="white">{datum.wind.direction} / {datum.wind.speed}</Td>
              </Tr>
            ))
          }
          {table === "table3" &&
          data.length > 0 && 
            data.map((datum) => (
              <Tr key={`${table}-${datum.date.day}`}>
                <Td>{datum.date.month}/{datum.date.date} ({t(`time.daysOfTheWeek.${datum.date.day}`)})</Td>
                <Td textAlign="center" bg="white">{datum.maxComfortIdx} / {datum.minComfortIdx}</Td>
                {/* sunrise / sunset */}
                <Td textAlign="center" bg="white">sunrise / sunset</Td>
              </Tr>
            ))
          }
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default function WeekForecast({ 
  weekWeatherData
}: {
  weekWeatherData: any[]
}) {
  const { t } = useTranslation()
  const [selectedType, setSelectedType] = useState('table1')
  const data = getWeekWeatherDetail(weekWeatherData)

  // console.log("weekWeatherData", weekWeatherData, "data", data)

  return (
    <>
      <SelectButtons 
        tabs={weekTabs}
        setSelectedType={setSelectedType} 
      />
      <TableBlock data={data} t={t} table={selectedType} />
    </>
  )
}