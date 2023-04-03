import Search from 'components/Search'
import Lists from './Lists'
import { useContext } from 'react'
import { WeatherContext } from 'context/WeatherContext'

export default function Home() {
  const { weatherMap } = useContext(WeatherContext)
  // console.log("weatherMap", weatherMap)

  return (
    <div>
      <Search />
      <Lists data={weatherMap} />
    </div>
  )
}