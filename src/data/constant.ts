type subTabsType = {
  [x: string]: string[]
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