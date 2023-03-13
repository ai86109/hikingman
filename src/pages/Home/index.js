import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button } from '@chakra-ui/react'

export default function Home() {
  return (
    <div>
      home
      <div>
        
      </div>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        height='250px'
        cursor='pointer'
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '200px' }}
          src='https://cdntwrunning.biji.co/800_4c44f4176f1839bfaeed076d93369ce5.jpg'
        />
        <Stack>
          <CardBody>
            <Heading size='md'>品田山</Heading>
            <Text py='2'>
            坐落於武陵農場北方、屬於雪山東北稜脈的品田山（3524公尺）、池有山（3303公尺）、桃山（3325公尺）與喀拉業山（3133公尺），在岳界被合稱為「武陵四秀」。

攀登這四座各具特色的山頭，須從武陵山莊起登，其中又分為兩條路線：池有山步道與桃山步道，若擇一條上山而另一條下山，標準行程需時三天。而登山經驗豐富、對路況熟悉且體能過人之山友，則可挑戰由池有山步道經前往品田山，並於當日返回武陵山莊。

品田山是武陵四秀之最高峰，為台灣百岳名山的「十峻」之一，山頂有著以險峻聞名於岳界的「品田斷崖」，向西北可眺望桃園都會區，往東則可俯瞰蘭陽平原，甚至在天氣晴朗時有機會看見海上的龜山島。

注意：由於行進時間極長，會有摸黑時段，請務必備妥頭燈及保暖衣物等裝備，此外，若上午 10:00 前未抵達新達山屋則建議原路撤退。
            </Text>
          </CardBody>
          <CardFooter>
            <Button variant='solid' colorScheme='blue'>
              加到我的最愛
            </Button>
          </CardFooter>
        </Stack>
      </Card>
      <Card>
        <CardHeader>池有山</CardHeader>
        <CardBody>body</CardBody>
      </Card>
      <Card>
        <CardHeader>桃山</CardHeader>
        <CardBody>body</CardBody>
      </Card>
      <Card>
        <CardHeader>喀拉業山</CardHeader>
        <CardBody>body</CardBody>
      </Card>
    </div>
  )
}