export const shortenString = (str: string, len = 13, start = 4, end = 6) => {
  if (str.length <= len) {
    return str;
  }

  return `${str.substr(0, start)}...${str.substr(-end)}`;
}

export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
