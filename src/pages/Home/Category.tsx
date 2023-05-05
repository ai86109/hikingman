import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card, Heading, Flex, Text, Checkbox, Button, Stack, CardBody, Stat, StatArrow, Badge } from "@chakra-ui/react";
import mtCate from 'data/mtCate.json'
import mtCounty from 'data/mtCounty.json'
import mtDifficulty from 'data/mtDifficulty.json'
import mtHeight from 'data/mtHeight.json'
import mtPark from 'data/mtPark.json'
import mtInfo from 'data/mtInfo.json'
import { useTranslation } from "react-i18next";
import i18n from "i18n"
import { convertMeterToFeet } from "utils/unitCalculate";
import { useNavigate, Link } from "react-router-dom";
import { Fragment, useState } from "react";
import { badgeColor } from "data/constant";

interface categoryGroupType {
  [key: string]: any
}

// const AccordionBlock = ({data}: categoryGroupType) => {
//   const { t } = useTranslation()
//   const isNestStructure = !Array.isArray(data)
//   const navigate = useNavigate()

//   return (
//     <>
//       {isNestStructure
//         ? <>
//           {Object.keys(data).map((title: string) => (
//             <Accordion allowMultiple w="100%" key={title}>
//               <AccordionItem>
//                 <AccordionButton>
//                   <Box as="span" flex='1' textAlign='left'>
//                     <Text as="b" fontSize={18}>{t(`mtTag.${title}`)}</Text>
//                   </Box>
//                   <AccordionIcon />
//                 </AccordionButton>
//                 <AccordionPanel pb={4}>
//                   <AccordionBlock data={data[title]} />
//                 </AccordionPanel>
//               </AccordionItem>
//             </Accordion>
//           ))}
//         </>
//         : (<Flex wrap="wrap" justifyContent="space-between">
//             {data.map((datum) => {
//               const isHeight = Array.isArray(datum)
//               return (
//                 <Card h="auto" key={datum} w={isHeight ? "100%" : "100px"} mb={4} cursor="pointer" onClick={() => navigate(`/${datum}`)}>
//                   <CardHeader padding={2}>
//                     <Heading size='md'>
//                       {isHeight
//                         ? (<Flex justifyContent="space-between">
//                             <Text>{t(`locationName.${(mtInfo as any)[datum[0]]?.locationName}`)}</Text>
//                             <Text>
//                               {i18n.language === 'en' ? convertMeterToFeet(datum[1]) : datum[1]}
//                               {i18n.language === 'en' ? ' ft' : ' m'}
//                             </Text>
//                           </Flex>)
//                         : <Box>{t(`locationName.${(mtInfo as any)[datum]?.locationName}`)}</Box>
//                       }
//                     </Heading>
//                   </CardHeader>
//                 </Card>
//               )
//             })}
//           </Flex>)
//       }
//     </>
//   )
// }

const SearchList = ({
  categoryList
} : {
  categoryList: string[]
}) => {
  const { t } = useTranslation()

  return (
    <Box p={2}>
      {categoryList.length > 0 && 
        categoryList.map((mountainId) => (
          <Link to={mountainId}>
            <Card 
              key={mountainId}
              direction={{ base: 'column' }}
              overflow='hidden'
            >
              <Flex
                direction={{ base: 'row' }}
                alignItems={{ base: 'center' }}
                justifyContent={{ base: 'space-between' }}
              >
                <Heading size='md' pl={4} w={{ base: '250px' }}>
                  {t(`locationName.${(mtInfo as any)[mountainId].locationName}`)}
                  <Badge colorScheme="gray" ml={2}>
                    {(mtInfo as any)[mountainId].difficulty && 
                    `${(mtInfo as any)[mountainId].difficulty}`}
                  </Badge>
                </Heading>
                <Stack direction={{ base: 'row' }} alignItems={{ base: 'center' }}>
                  <CardBody>
                    <Stat flex="unset" fontSize={'18px'}>
                      <StatArrow type="increase" />
                      {i18n.language === 'en' 
                        ? convertMeterToFeet((mtInfo as any)[mountainId].height) 
                        : (mtInfo as any)[mountainId].height
                      }
                      {i18n.language === 'en' ? ' ft' : ' m'}
                    </Stat>
                  </CardBody>
                </Stack>
              </Flex>
              <Flex pl={4} pb={4}>
                {Object.entries((mtInfo as any)[mountainId]).map(([key, value]: [string, any]) => {
                  const isArray = Array.isArray(value)
                  const isEmpty = value.length === 0
                  if(isEmpty) return <></>

                  return (
                    <Flex key={key} flexWrap="wrap">
                      {!['locationName', 'height', 'difficulty', 'county'].includes(key) &&
                        <>
                          {isArray 
                            ? value.map((value) => (
                                <Badge key={value} mr={2} colorScheme={badgeColor[value]}>{t(`mtTag.${value}`)}</Badge>
                              ))
                            : <Badge mr={2} colorScheme="cyan">
                                {value && key === 'park' && `${t(`mtTag.${value}`)} ${t(`mtTag.mtPark`)}`}
                              </Badge>
                          }
                        </>
                      }
                    </Flex>
                  )
                })}
              </Flex>
            </Card>
          </Link>
      ))}
    </Box>
  )
}

export default function Category() {
  const { t } = useTranslation()
  const categoryGroup: categoryGroupType = { mtCate, mtCounty, mtDifficulty, mtPark, mtHeight }
  const [selected, setSelected] = useState(() => {
    return Object.keys(categoryGroup).reduce((acc, key) => {
      (acc as {[key: string]: string})[key] = ''
      return acc
    }, {})
  })
  const [categoryList, setCategoryList] = useState([] as string[])

  const handleChange = ((title: string, list: string) => {
    const target: string = (selected as categoryGroupType)[title]
    setSelected(currentValues => ({
      ...currentValues, 
      [title]: target === list ? '' : list
    }))
  })

  const handleClick = () => {
    let res: string[] = []
    let isFirst = true
    Object.keys(selected).forEach((title) => {
      const items = categoryGroup[title][(selected as categoryGroupType)[title]] || []
      if(items.length !== 0) {
        if(isFirst) {
          items.map((item: string) => res.push(item))
          isFirst = false
        }
        else res = res.filter((value) => items.includes(value))
      }
    })
    setCategoryList(res)
  }

  return (
    <Box>
      <Box 
        bgImage={`https://www.yamarepo.com/image/yama/t-yama.png`} 
        bgRepeat="no-repeat" 
        h="30px"
        borderBottom="2px solid #003956"
      ></Box>
      <Box p={2}>
        {Object.keys(categoryGroup).map((title) => (
          <Accordion allowMultiple key={title}>
            <AccordionItem>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                <Text as="b" color="#7F5E44" fontSize={16}>{t(`mtTag.${title}`)}</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {Object.keys(categoryGroup[title]).map((list) => (
                <Checkbox 
                  key={list}
                  value={list} 
                  isChecked={(selected as categoryGroupType)[title] === list}
                  onChange={() => handleChange(title, list)}
                  mr={4}
                  size="lg"
                >
                  {t(`mtTag.${list}`)}
                </Checkbox>
              ))}
            </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
      </Box>
      <Box p={2}>
        <Button colorScheme="teal" onClick={handleClick} w="100%">Search</Button>
      </Box>
      <SearchList categoryList={categoryList} />
      {/* <AccordionBlock data={categoryGroup} /> */}
    </Box>
  )
}