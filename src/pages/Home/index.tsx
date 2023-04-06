import Search from 'components/Search'
import Lists from './Lists'
import { useContext, useState } from 'react'
import { WeatherContext } from 'context/WeatherContext'

export default function Home() {
  const { weatherMap } = useContext(WeatherContext)
  const [inputVal, setInputVal] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputVal(e.target.value)

  return (
    <div>
      <Search inputVal={inputVal} handleChange={handleChange} />
      <Lists data={weatherMap} inputVal={inputVal} />
    </div>
  )
}