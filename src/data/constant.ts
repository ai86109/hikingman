type subTabsType = {
  [x: string]: string[]
}

type badgeColorType = {
  [x: string]: string
}

type twCountyType = {
  [x: string]: string
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