type subTabsType = {
  [x: string]: string[]
}

type tabsIconType = {
  [x: string]: string
}

type badgeColorType = {
  [x: string]: string
}

type twCountyType = {
  [x: string]: string
}

type windDirectionType = {
  [x: string]: number
}

export const weekTabs: subTabsType = {
  "table1": ["weather", "temp", "probabilityOfPrecipitation"],
  "table2": ["bodyTemp", "humidity", "wind"],
  "table3": ["comfortIndex", "sunrise"]
}

export const hourTabs: subTabsType = {
  "table1": ["weather", "temp", "probabilityOfPrecipitation"],
  "table2": ["humidity", "wind"],
  "table3": ["bodyTemp", "comfortIndex"]
}

export const weekTabsIcon: tabsIconType = {
  "table1": "https://1.bp.blogspot.com/-aL7kYiiQLsQ/Wp94LnyOJ1I/AAAAAAABKrc/8GoMzMIipwkffwR6uyieCobTimT4W2pKwCLcBGAs/s400/machine_ondo_shitsudokei.png",
  "table2": "https://1.bp.blogspot.com/-GSOdiltwLdE/YHOSs5Nn5bI/AAAAAAABdoY/WHKSUwHeKfEXEV9YG8wkYtYyJsYqPp_1gCNcBGAsYHQ/s180-c/nature_kaze.png",
  "table3": "https://4.bp.blogspot.com/-4WiPCzXztgM/WD_cX8RogBI/AAAAAAABAEc/OQzqLlcMhZs_eqMt_8AItsIXt3inScRCACLcB/s300/sun_red1.png"
}

export const hourTabsIcon: tabsIconType = {
  "table1": "https://1.bp.blogspot.com/-aL7kYiiQLsQ/Wp94LnyOJ1I/AAAAAAABKrc/8GoMzMIipwkffwR6uyieCobTimT4W2pKwCLcBGAs/s400/machine_ondo_shitsudokei.png",
  "table2": "https://1.bp.blogspot.com/-GSOdiltwLdE/YHOSs5Nn5bI/AAAAAAABdoY/WHKSUwHeKfEXEV9YG8wkYtYyJsYqPp_1gCNcBGAsYHQ/s180-c/nature_kaze.png",
  "table3": "https://2.bp.blogspot.com/-3tqOSBlyens/UsZtKFlgtRI/AAAAAAAAcyY/GtGKv2OEDIU/s400/kids_hashirimawaru_snow.png"
}

export const badgeColor: badgeColorType = {
  "hundredPeaks": "gray",
  "contiguousSix": "blue", 
  "craggyEight": "red", 
  "eightBeauties": "purple", 
  "fiveGreats": "pink", 
  "flatNine": "yellow", 
  "fourBeauties": "orange", 
  "gentleTen": "pink", 
  "harshTen": "red", 
  "littleEight": "purple", 
  "loftyNine": "blue", 
  "majesticTen": "red", 
  "narrowEight": "purple", 
  "nineWalls": "blue", 
  "oneOgre": "red", 
  "remoteNine": "purple", 
  "rockyTen": "blue", 
  "simpleSix": "red", 
  "steepSeven": "purple", 
  "threeSpires": "blue", 
  "verdantTen": "red"
}

export const twCounty: twCountyType = {
  "嘉義縣": "Chiayi",
  "新北市": "NewTaipei",
  "嘉義市": "ChiayiCity",
  "新竹縣": "Hsinchu",
  "新竹市": "HsinchuCity",
  "臺北市": "Taipei",
  "臺南市": "Tainan",
  "宜蘭縣": "Yilan",
  "苗栗縣": "Miaoli",
  "雲林縣": "Yunlin",
  "花蓮縣": "Hualien",
  "臺中市": "Taichung",
  "臺東縣": "Taitung",
  "桃園市": "Taoyuan",
  "南投縣": "Nantou",
  "高雄市": "Kaohsiung",
  "金門縣": "Kinmen",
  "屏東縣": "Pingtung",
  "基隆市": "Keelung",
  "澎湖縣": "Penghu",
  "彰化縣": "Changhua",
  "連江縣": "Matsu"
}

export const windDirection: windDirectionType = {
  "S": 0,
  "SW": 45,
  "W": 90,
  "NW": 135,
  "N": 180,
  "NE": 225,
  "E": 270,
  "SE": 315
}