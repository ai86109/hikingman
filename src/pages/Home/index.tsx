import SearchBar from 'components/SearchBar'
import Lists from './Lists'
import { useContext, useState } from 'react'
import { WeatherContext } from 'context/WeatherContext'
import { useTranslation } from 'react-i18next'
import { Box } from '@chakra-ui/react'
import ButtonsGroup from 'components/ButtonsGroup'
import { searchTabs, searchTabsIcon } from 'data/constant'
import Category from './Category'

export default function Home() {
  const { weatherMap } = useContext(WeatherContext)
  const [inputVal, setInputVal] = useState('')
  const [selectedType, setSelectedType] = useState('name')
  const { t } = useTranslation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputVal(e.target.value)

  return (
    <Box mt={6}>
      <ButtonsGroup
        tabs={searchTabs}
        icons={searchTabsIcon}
        selectedType={selectedType}
        setSelectedType={setSelectedType} 
      />
      {selectedType === 'name'
        ? (<>
            <SearchBar placeholder={t('search.placeholder')} inputVal={inputVal} handleChange={handleChange} />
            <Lists data={weatherMap} inputVal={inputVal} />
          </>)
        : (<Category />)
      }
    </Box>
  )
}