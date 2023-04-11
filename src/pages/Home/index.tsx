import Search from 'components/Search'
import Lists from './Lists'
import { useContext, useState } from 'react'
import { WeatherContext } from 'context/WeatherContext'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { weatherMap } = useContext(WeatherContext)
  const [inputVal, setInputVal] = useState('')
  const { t } = useTranslation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputVal(e.target.value)

  return (
    <div>
      <Search placeholder={t('search.placeholder')} inputVal={inputVal} handleChange={handleChange} />
      <Lists data={weatherMap} inputVal={inputVal} />
    </div>
  )
}