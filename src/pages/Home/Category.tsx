import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card, CardHeader, Heading, Flex, Text } from "@chakra-ui/react";
import mtCate from 'data/mtCate.json'
import mtCounty from 'data/mtCounty.json'
import mtDifficulty from 'data/mtDifficulty.json'
import mtHeight from 'data/mtHeight.json'
import mtPark from 'data/mtPark.json'
import mtInfo from 'data/mtInfo.json'
import { useTranslation } from "react-i18next";
import i18n from "i18n"
import { convertMeterToFeet } from "utils/unitCalculate";
import { useNavigate } from "react-router-dom";

const AccordionBlock = ({data}: {[key: string]: any[]}) => {
  const { t } = useTranslation()
  const isNestStructure = !Array.isArray(data)
  const navigate = useNavigate()

  return (
    <>
      {isNestStructure
        ? <>
          {Object.keys(data).map((title: string) => (
            <Accordion allowMultiple w="100%" key={title}>
              <AccordionItem>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                      <Text as="b" fontSize={18}>{t(`mtTag.${title}`)}</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                <AccordionPanel pb={4}>
                  <AccordionBlock data={data[title]} />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          ))}
        </>
        : (<Flex wrap="wrap" justifyContent="space-between">
            {data.map((datum) => {
              const isHeight = Array.isArray(datum)
              return (
                <Card h="auto" key={datum} w={isHeight ? "100%" : "100px"} mb={4} cursor="pointer" onClick={() => navigate(`/${datum}`)}>
                  <CardHeader padding={2}>
                    <Heading size='md'>
                      {isHeight
                        ? (<Flex justifyContent="space-between">
                            <Text>{t(`locationName.${(mtInfo as any)[datum[0]]?.locationName}`)}</Text>
                            <Text>
                              {i18n.language === 'en' ? convertMeterToFeet(datum[1]) : datum[1]}
                              {i18n.language === 'en' ? ' ft' : ' m'}
                            </Text>
                          </Flex>)
                        : <Box>{t(`locationName.${(mtInfo as any)[datum]?.locationName}`)}</Box>
                      }
                    </Heading>
                  </CardHeader>
                </Card>
              )
            })}
          </Flex>)
      }
    </>
  )
}

export default function Category() {
  const categoryGroup: any = { mtCate, mtCounty, mtDifficulty, mtPark, mtHeight }
  return (
    <Box>
      <AccordionBlock data={categoryGroup} />
    </Box>
  )
}